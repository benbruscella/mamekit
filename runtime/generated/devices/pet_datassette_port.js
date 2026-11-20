import deviceData from './pet_datassette_port.device.ir.json' with { type: 'json' };
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
        const __L0 = __l["get_card_device"];
        members.m_cart = (__L0 ? __L0() : runtime.macro("get_card_device"));
    }
    function method_read(runtime) {
        const members = runtime.members;
        let state = ((1) | 0);
        if ((((members.m_cart ?? 0)) ? 1 : 0)) {
            state = (((members.m_cart.datassette_read?.() ?? 0)) | 0);
        }
        return ((state) | 0);
    }
    function method_write(runtime, state) {
        const members = runtime.members;
        if ((((members.m_cart ?? 0)) ? 1 : 0)) {
            (members.m_cart.datassette_write?.(state) ?? 0);
        }
    }
    function method_sense_r(runtime) {
        const members = runtime.members;
        let state = ((1) | 0);
        if ((((members.m_cart ?? 0)) ? 1 : 0)) {
            state = (((members.m_cart.datassette_sense?.() ?? 0)) | 0);
        }
        return ((state) | 0);
    }
    function method_motor_w(runtime, state) {
        const members = runtime.members;
        if ((((members.m_cart ?? 0)) ? 1 : 0)) {
            (members.m_cart.datassette_motor?.(state) ?? 0);
        }
    }
    function method_read_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_read_handler"];
        (__L0 ? __L0(Number(state)) : typeof members.m_read_handler === 'function' ? members.m_read_handler(state) : runtime.invoke("m_read_handler", state));
    }
    function method_pet_datassette_port_device(runtime, mconfig, tag, owner, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_read_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_handler(runtime, members.m_read_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_handler, "bind"));
    }
    function __deref_read_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pet_datassette_port_device__pet_datassette_port_device(runtime, mconfig, tag, owner, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_pet_datassette_port_device__read_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_datassette_port_device__read_handler(runtime, members.m_read_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_handler, "bind"));
    }
    function __deref_pet_datassette_port_device__read_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "read": method_read,
        "write": method_write,
        "sense_r": method_sense_r,
        "motor_w": method_motor_w,
        "read_w": method_read_w,
        "pet_datassette_port_device": method_pet_datassette_port_device,
        "read_handler": method_read_handler,
        "pet_datassette_port_device::pet_datassette_port_device": method_pet_datassette_port_device__pet_datassette_port_device,
        "pet_datassette_port_device::read_handler": method_pet_datassette_port_device__read_handler
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["get_card_device", "m_read_handler", "set_options", "std::forward"];
definition.slot.options["c2n"].compiledMethods = (() => {
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
    function method_datassette_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.input"];
        return ((((((Number((__L0 ? __L0() : ((members.m_cassette)?.input?.() ?? 0))) > Number((+0))) ? 1 : 0)) ? (1) : (0))) | 0);
    }
    function method_datassette_write(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.output"];
        (__L0 ? __L0(((state) ? (-11599) : (11599))) : ((members.m_cassette)?.output?.(((state) ? (-11599) : (11599))) ?? 0));
    }
    function method_datassette_sense(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.get_state"];
        return ((((Number((((__L0 ? __L0() : ((members.m_cassette)?.get_state?.() ?? 0))) & (3))) === Number(0)) ? 1 : 0)) | 0);
    }
    function method_datassette_motor(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.change_state"];
        if (((state) ? 0 : 1)) {
            (__L0 ? __L0(0, 4) : ((members.m_cassette)?.change_state?.(0, 4) ?? 0));
            members.m_motor = ((1) ? 1 : 0);
        }
        else {
            (__L0 ? __L0(4, 4) : ((members.m_cassette)?.change_state?.(4, 4) ?? 0));
            members.m_motor = ((0) ? 1 : 0);
        }
        (__deref_datassette_motor(runtime, members.m_slot).read_w?.(method_datassette_read(runtime)) ?? 0);
    }
    function __deref_datassette_motor(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_device_pet_datassette_port_interface__datassette_read(runtime) {
        const members = runtime.members;
        return ((1) | 0);
    }
    function method_device_pet_datassette_port_interface__datassette_write(runtime, state) {
        const members = runtime.members;
    }
    function method_device_pet_datassette_port_interface__datassette_sense(runtime) {
        const members = runtime.members;
        return ((1) | 0);
    }
    function method_device_pet_datassette_port_interface__datassette_motor(runtime, state) {
        const members = runtime.members;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_hz"];
        (__deref_device_start(runtime, members.m_read_timer).adjust?.((__L0 ? __L0(44100) : runtime.macro("attotime::from_hz", 44100)), 0, (__L0 ? __L0(44100) : runtime.macro("attotime::from_hz", 44100))) ?? 0);
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
    function method_read_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_motor ?? 0)) {
            (__deref_read_tick(runtime, members.m_slot).read_w?.(method_datassette_read(runtime)) ?? 0);
        }
    }
    function __deref_read_tick(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cbm_datassette_devices(runtime, device) {
        const members = runtime.members;
        (__deref_cbm_datassette_devices(runtime, device).option_add?.("c2n", 829333770) ?? 0);
        (__deref_cbm_datassette_devices(runtime, device).option_add?.("c1530", 3390606303) ?? 0);
    }
    function __deref_cbm_datassette_devices(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "datassette_read": method_datassette_read,
        "datassette_write": method_datassette_write,
        "datassette_sense": method_datassette_sense,
        "datassette_motor": method_datassette_motor,
        "device_pet_datassette_port_interface::datassette_read": method_device_pet_datassette_port_interface__datassette_read,
        "device_pet_datassette_port_interface::datassette_write": method_device_pet_datassette_port_interface__datassette_write,
        "device_pet_datassette_port_interface::datassette_sense": method_device_pet_datassette_port_interface__datassette_sense,
        "device_pet_datassette_port_interface::datassette_motor": method_device_pet_datassette_port_interface__datassette_motor,
        "device_start": method_device_start,
        "read_tick": method_read_tick,
        "cbm_datassette_devices": method_cbm_datassette_devices
    };
    return __methodTable;
})();
definition.slot.options["c2n"].compiledMethodLinks = ["attotime::from_hz", "m_cassette.change_state", "m_cassette.get_state", "m_cassette.input", "m_cassette.output"];
definition.slot.options["c2n"].children[0].definition.compiledMethods = (() => {
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
    function method_update(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        let cur_time = (typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_update(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0));
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            let new_position = (((members.m_position ?? 0)) + (((((((cur_time) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
            switch ((((members.m_state ?? 0)) & (3))) {
                case 2:
                    {
                        (__deref_update(runtime, members.m_cassette).put_sample?.((members.m_channel ?? 0), (members.m_position ?? 0), ((new_position) - ((members.m_position ?? 0))), (members.m_value ?? 0)) ?? 0);
                        break;
                    }
                case 1:
                    {
                        if ((members.m_cassette ?? 0)) {
                            (__deref_update(runtime, members.m_cassette).get_sample?.((members.m_channel ?? 0), new_position, 0, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_value ?? 0), set: (value) => { members.m_value = ((value) | 0); } }), offset: 0 })) ?? 0);
                            let length = method_get_length(runtime);
                            if ((((new_position) > (length)) ? 1 : 0)) {
                                members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                new_position = length;
                            }
                            else {
                                if ((((new_position) < (0)) ? 1 : 0)) {
                                    members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                    new_position = 0;
                                }
                            }
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            members.m_position = new_position;
        }
        members.m_position_time = cur_time;
    }
    function __deref_update(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_is_stopped(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(0)) ? 1 : 0);
    }
    function method_motor_on(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (4))) === Number(0)) ? 1 : 0);
    }
    function method_get_length(runtime) {
        const members = runtime.members;
        let __t0;
        let info = (__t0 = __deref_get_length(runtime, members.m_cassette), typeof __t0.get_info === 'function' ? __t0.get_info() : typeof __t0.get_info === 'number' || typeof __t0.get_info === 'boolean' ? __t0.get_info : runtime.container(members.m_cassette, "get_info"));
        return ((info.sample_count) / (info.sample_frequency));
    }
    function __deref_get_length(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_change_state(runtime, state, mask) {
        const members = runtime.members;
        let new_state = 0;
        new_state = (members.m_state ?? 0);
        new_state = runtime.andAssign(new_state, (~mask));
        new_state = ((new_state) | (((state) & (mask))));
        if (((Number(new_state) !== Number((members.m_state ?? 0))) ? 1 : 0)) {
            method_update(runtime);
            members.m_state = new_state;
        }
    }
    function method_input(runtime) {
        const members = runtime.members;
        method_update(runtime);
        let value = (((members.m_value ?? 0)) / (2147483647));
        0;
        return value;
    }
    function method_output(runtime, value) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::clamp"];
        if ((((((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0)) && (((((members.m_value ?? 0)) !== (value)) ? 1 : 0))) ? 1 : 0)) {
            method_update(runtime);
            value = (__L0 ? __L0(value, (-1), 1) : runtime.macro("std::clamp", value, (-1), 1));
            members.m_value = ((((((value) * (2147483647))) | 0)) | 0);
        }
    }
    function method_get_position(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        let position = (members.m_position ?? 0);
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            position = ((position) + ((((((((typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_get_position(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0))) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
        }
        return position;
    }
    function __deref_get_position(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_channel(runtime, channel) {
        const members = runtime.members;
        members.m_channel = ((channel) | 0);
    }
    function method_set_speed(runtime, speed) {
        const members = runtime.members;
        members.m_speed = speed;
    }
    function method_go_forward(runtime) {
        const members = runtime.members;
        members.m_direction = ((1) | 0);
    }
    function method_go_reverse(runtime) {
        const members = runtime.members;
        members.m_direction = ((-1) | 0);
    }
    function method_seek(runtime, time, origin) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::clamp"];
        method_update(runtime);
        let length = method_get_length(runtime);
        switch (origin) {
            case 0:
                {
                    break;
                }
            case 2:
                {
                    time = ((time) + (length));
                    break;
                }
            case 1:
                {
                    time = ((time) + (method_get_position(runtime)));
                    break;
                }
        }
        members.m_position = (__L0 ? __L0(time, 0, length) : runtime.macro("std::clamp", time, 0, length));
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().sample_rate"], __L2 = __l["stream_alloc"], __L3 = __l["NAME"], __L4 = __l["save_item"];
        const h_m_default_state = members.m_default_state ?? 0;
        const h_m_stereo = members.m_stereo ?? 0;
        members.m_cassette = 0;
        members.m_state = h_m_default_state;
        members.m_value = ((0) | 0);
        (__L2 ? __L2(0, ((h_m_stereo) ? (2) : (1)), ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, ((h_m_stereo) ? (2) : (1)), ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        (__L4 ? __L4((__L3 ? __L3((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))));
    }
    function method_get_state(runtime) {
        const members = runtime.members;
        return (members.m_state ?? 0);
    }
    function method_is_playing(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(1)) ? 1 : 0);
    }
    function method_is_recording(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0);
    }
    function method_set_motor(runtime, state) {
        const members = runtime.members;
        method_change_state(runtime, ((state) ? (0) : (4)), 4);
    }
    function method_set_speaker(runtime, state) {
        const members = runtime.members;
        method_change_state(runtime, ((state) ? (0) : (8)), 8);
    }
    function method_speaker_on(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (8))) === Number(0)) ? 1 : 0);
    }
    function method_mount_image(runtime, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        const h_m_default_state = members.m_default_state ?? 0;
        if (((image) ? 0 : 1)) {
            return;
        }
        members.m_cassette = image;
        method_change_state(runtime, h_m_default_state, 3);
        members.m_position = 0;
        members.m_position_time = (typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_mount_image(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0));
        members.m_channel = ((0) | 0);
        members.m_speed = 1;
        members.m_direction = ((1) | 0);
    }
    function __deref_mount_image(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "update": method_update,
        "is_stopped": method_is_stopped,
        "motor_on": method_motor_on,
        "get_length": method_get_length,
        "change_state": method_change_state,
        "input": method_input,
        "output": method_output,
        "get_position": method_get_position,
        "set_channel": method_set_channel,
        "set_speed": method_set_speed,
        "go_forward": method_go_forward,
        "go_reverse": method_go_reverse,
        "seek": method_seek,
        "device_start": method_device_start,
        "get_state": method_get_state,
        "is_playing": method_is_playing,
        "is_recording": method_is_recording,
        "set_motor": method_set_motor,
        "set_speaker": method_set_speaker,
        "speaker_on": method_speaker_on,
        "mount_image": method_mount_image
    };
    return __methodTable;
})();
definition.slot.options["c2n"].children[0].definition.compiledMethodLinks = ["NAME", "machine", "machine().sample_rate", "machine().time", "save_item", "std::clamp", "stream_alloc"];
definition.slot.options["c2n"].children[0].definition.imageFormats[0].definition.compiledMethods = (() => {
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
    function method_tap_data_to_samplecount(runtime, data, frequency) {
        const members = runtime.members;
        return ((((0.5) * (((((44100) / (frequency))) * (((data) + (0.5))))))) | 0);
    }
    function method_toggle_wave_data(runtime) {
        const members = runtime.members;
        members.wave_data = ((((((Number((members.wave_data ?? 0)) === Number(11599)) ? 1 : 0)) ? (-11599) : (11599))) << 16 >> 16);
    }
    function method_cbm_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; (((length) > (0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(__deref_cbm_output_wave(runtime, buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, __add_cbm_output_wave(runtime, __deref_cbm_output_wave(runtime, buffer), 1));
        }
    }
    function __add_cbm_output_wave(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_cbm_output_wave(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cbm_tap_do_work(runtime, buffer, length, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_u24le"];
        let i = ((0) | 0);
        let j = ((0) | 0);
        let size = ((0) | 0);
        let version = ((0) | 0);
        let system = ((0) | 0);
        let video_standard = ((0) | 0);
        let tap_frequency = ((0) | 0);
        let byte_samples = ((0) | 0);
        let over_pulse_bytes = [0, 0, 0];
        let over_pulse_length = ((0) | 0);
        if ((((((data) ? 0 : 1)) || (((Number(length) <= Number(20)) ? 1 : 0))) ? 1 : 0)) {
            return -1;
        }
        version = ((runtime.readIndex(data, 12)) | 0);
        system = ((runtime.readIndex(data, 13)) | 0);
        video_standard = ((runtime.readIndex(data, 14)) | 0);
        if (((((buffer) ? 0 : 1)) ? 0 : 1)) {
            0;
            0;
            0;
            0;
        }
        if (((((((version) < (0)) ? 1 : 0)) || ((((version) > (2)) ? 1 : 0))) ? 1 : 0)) {
            0;
            return -1;
        }
        switch (system) {
            case 1:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (127841) : (138551))) | 0);
                    break;
                }
            case 2:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (111860) : (110840))) | 0);
                    break;
                }
            default:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (127841) : (123156))) | 0);
                    break;
                }
        }
        for (i = ((20) | 0); (((i) < (length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let byte = ((runtime.readIndex(data, i)) & 0xff);
            if (((version) ? 0 : 1)) {
                if ((((byte) !== (0)) ? 1 : 0)) {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, byte, tap_frequency)) | 0);
                }
                else {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, 882, tap_frequency)) | 0);
                }
            }
            if (version) {
                if (((((((byte) !== (0)) ? 1 : 0)) && (((j) ? 0 : 1))) ? 1 : 0)) {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, byte, tap_frequency)) | 0);
                }
                else {
                    if (((Number(((((length) - (i))) + (j))) >= Number(4)) ? 1 : 0)) {
                        if ((((j) > (0)) ? 1 : 0)) {
                            over_pulse_bytes[((j) - (1))] = byte;
                            j = ((((j) + (1))) | 0);
                            if ((((j) >= (4)) ? 1 : 0)) {
                                over_pulse_length = ((runtime.shiftRight((__L0 ? __L0(over_pulse_bytes) : runtime.macro("get_u24le", over_pulse_bytes)), 3)) | 0);
                                byte_samples = ((method_tap_data_to_samplecount(runtime, over_pulse_length, tap_frequency)) | 0);
                                j = ((0) | 0);
                            }
                        }
                        else {
                            j = ((((j) + (1))) | 0);
                            0;
                            0;
                            0;
                        }
                    }
                    else {
                        j = ((1) | 0);
                    }
                }
            }
            if ((((j) === (0)) ? 1 : 0)) {
                method_cbm_output_wave(runtime, buffer, byte_samples);
                size = ((((size) + (byte_samples))) | 0);
                method_toggle_wave_data(runtime);
                if ((((version) < (2)) ? 1 : 0)) {
                    method_cbm_output_wave(runtime, buffer, byte_samples);
                    size = ((((size) + (byte_samples))) | 0);
                    method_toggle_wave_data(runtime);
                }
            }
        }
        return size;
    }
    function method_cbm_tap_to_wav_size(runtime, tapdata, taplen) {
        const members = runtime.members;
        let size = ((method_cbm_tap_do_work(runtime, 0, taplen, tapdata)) | 0);
        members.len = ((taplen) | 0);
        return size;
    }
    function method_cbm_tap_fill_wave(runtime, buffer, length, bytes, int) {
        const members = runtime.members;
        let p = buffer;
        return method_cbm_tap_do_work(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }), (members.len ?? 0), runtime.byteView(bytes));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "tap_data_to_samplecount": method_tap_data_to_samplecount,
        "toggle_wave_data": method_toggle_wave_data,
        "cbm_output_wave": method_cbm_output_wave,
        "cbm_tap_do_work": method_cbm_tap_do_work,
        "cbm_tap_to_wav_size": method_cbm_tap_to_wav_size,
        "cbm_tap_fill_wave": method_cbm_tap_fill_wave
    };
    return __methodTable;
})();
definition.slot.options["c2n"].children[0].definition.imageFormats[0].definition.compiledMethodLinks = ["get_u24le"];
definition.slot.options["c2n"].children[0].definition.imageFormats[1].definition.compiledMethods = (() => {
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
    const cppScratch_wavfile_process_file_header = new Uint8Array(Math.max(0, Number(12)));
    const cppScratch_wavfile_process_tag_header = new Uint8Array(Math.max(0, Number(8)));
    const cppScratch_wavfile_process_format_tag = new Uint8Array(Math.max(0, Number(16)));
    function method_wavfile_process(runtime, cassette, opts, read_waveform) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["memcmp"], __L1 = __l["get_u32le"], __L2 = __l["get_u16le"];
        let __t0;
        const h_magic1 = members.magic1 ?? 0;
        const h_magic2 = members.magic2 ?? 0;
        const h_format_tag_id = members.format_tag_id ?? 0;
        const h_data_tag_id = members.data_tag_id ?? 0;
        let file_header = cppScratch_wavfile_process_file_header.fill(0);
        let tag_header = cppScratch_wavfile_process_tag_header.fill(0);
        let format_tag = cppScratch_wavfile_process_format_tag.fill(0);
        let stated_size = ((0) >>> 0);
        let file_size = 0;
        let tag_size = ((0) >>> 0);
        let tag_samples = ((0) >>> 0);
        let offset = 0;
        let format_specified = ((0) ? 1 : 0);
        let format_type = ((0) & 0xffff);
        let bytes_per_second = ((0) >>> 0);
        let waveform_flags = ((0) | 0);
        (__deref_wavfile_process(runtime, cassette).image_read?.(file_header, 0, ((file_header)?.byteLength ?? 1)) ?? 0);
        offset = ((file_header)?.byteLength ?? 1);
        if ((__L0 ? __L0(({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4))) {
            return 4;
        }
        if ((__L0 ? __L0(({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4))) {
            return 4;
        }
        stated_size = ((__add_wavfile_process(runtime, (__L1 ? __L1(({ generatedPointer: true, source: file_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: file_header, offset: 4 }))), 8)) >>> 0);
        file_size = (__t0 = __deref_wavfile_process(runtime, cassette), typeof __t0.image_size === 'function' ? __t0.image_size() : typeof __t0.image_size === 'number' || typeof __t0.image_size === 'boolean' ? __t0.image_size : runtime.container(cassette, "image_size"));
        if (((Number(stated_size) > Number(file_size)) ? 1 : 0)) {
            stated_size = ((((file_size) >>> 0)) >>> 0);
        }
        while (((Number(offset) < Number(stated_size)) ? 1 : 0)) {
            (__deref_wavfile_process(runtime, cassette).image_read?.(tag_header, offset, ((tag_header)?.byteLength ?? 1)) ?? 0);
            tag_size = (((__L1 ? __L1(({ generatedPointer: true, source: tag_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: tag_header, offset: 4 })))) >>> 0);
            offset = ((offset) + (((tag_header)?.byteLength ?? 1)));
            if ((((__L0 ? __L0(tag_header, h_format_tag_id, 4) : runtime.macro("memcmp", tag_header, h_format_tag_id, 4))) ? 0 : 1)) {
                if ((((format_specified) || (((Number(tag_size) < Number(((format_tag)?.byteLength ?? 1))) ? 1 : 0))) ? 1 : 0)) {
                    return 4;
                }
                format_specified = ((1) ? 1 : 0);
                (__deref_wavfile_process(runtime, cassette).image_read?.(format_tag, offset, ((format_tag)?.byteLength ?? 1)) ?? 0);
                format_type = (((__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 0 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 0 })))) & 0xffff);
                __deref_wavfile_process(runtime, opts).channels = (__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 2 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 2 })));
                __deref_wavfile_process(runtime, opts).sample_frequency = (__L1 ? __L1(({ generatedPointer: true, source: format_tag, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 4 })));
                bytes_per_second = (((__L1 ? __L1(({ generatedPointer: true, source: format_tag, offset: 8 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 8 })))) >>> 0);
                __deref_wavfile_process(runtime, opts).bits_per_sample = (__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 14 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 14 })));
                if (((Number(format_type) !== Number(1)) ? 1 : 0)) {
                    return 4;
                }
                if (((Number(runtime.divide(((((__deref_wavfile_process(runtime, opts).sample_frequency) * (__deref_wavfile_process(runtime, opts).bits_per_sample))) * (__deref_wavfile_process(runtime, opts).channels)), 8)) !== Number(bytes_per_second)) ? 1 : 0)) {
                    return 4;
                }
                switch (__deref_wavfile_process(runtime, opts).bits_per_sample) {
                    case 8:
                        {
                            waveform_flags = ((8) | 0);
                            break;
                        }
                    case 16:
                        {
                            waveform_flags = ((2) | 0);
                            break;
                        }
                    case 32:
                        {
                            waveform_flags = ((4) | 0);
                            break;
                        }
                    default:
                        {
                            return 4;
                        }
                }
            }
            else {
                if ((((__L0 ? __L0(tag_header, h_data_tag_id, 4) : runtime.macro("memcmp", tag_header, h_data_tag_id, 4))) ? 0 : 1)) {
                    if (((format_specified) ? 0 : 1)) {
                        return 4;
                    }
                    if (read_waveform) {
                        tag_samples = ((runtime.divide(runtime.divide(tag_size, runtime.divide(__deref_wavfile_process(runtime, opts).bits_per_sample, 8)), __deref_wavfile_process(runtime, opts).channels)) >>> 0);
                        (__deref_wavfile_process(runtime, cassette).read_samples?.(__deref_wavfile_process(runtime, opts).channels, 0, ((tag_samples) / (__deref_wavfile_process(runtime, opts).sample_frequency)), tag_samples, offset, waveform_flags) ?? 0);
                    }
                }
                else {
                }
            }
            offset = ((offset) + (tag_size));
        }
        return 0;
    }
    function __add_wavfile_process(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_wavfile_process(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "wavfile_process": method_wavfile_process
    };
    return __methodTable;
})();
definition.slot.options["c2n"].children[0].definition.imageFormats[1].definition.compiledMethodLinks = ["get_u16le", "get_u32le", "memcmp"];
definition.slot.options["c1530"].compiledMethods = (() => {
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
    function method_datassette_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.input"];
        return ((((((Number((__L0 ? __L0() : ((members.m_cassette)?.input?.() ?? 0))) > Number((+0))) ? 1 : 0)) ? (1) : (0))) | 0);
    }
    function method_datassette_write(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.output"];
        (__L0 ? __L0(((state) ? (-11599) : (11599))) : ((members.m_cassette)?.output?.(((state) ? (-11599) : (11599))) ?? 0));
    }
    function method_datassette_sense(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.get_state"];
        return ((((Number((((__L0 ? __L0() : ((members.m_cassette)?.get_state?.() ?? 0))) & (3))) === Number(0)) ? 1 : 0)) | 0);
    }
    function method_datassette_motor(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.change_state"];
        if (((state) ? 0 : 1)) {
            (__L0 ? __L0(0, 4) : ((members.m_cassette)?.change_state?.(0, 4) ?? 0));
            members.m_motor = ((1) ? 1 : 0);
        }
        else {
            (__L0 ? __L0(4, 4) : ((members.m_cassette)?.change_state?.(4, 4) ?? 0));
            members.m_motor = ((0) ? 1 : 0);
        }
        (__deref_datassette_motor(runtime, members.m_slot).read_w?.(method_datassette_read(runtime)) ?? 0);
    }
    function __deref_datassette_motor(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_device_pet_datassette_port_interface__datassette_read(runtime) {
        const members = runtime.members;
        return ((1) | 0);
    }
    function method_device_pet_datassette_port_interface__datassette_write(runtime, state) {
        const members = runtime.members;
    }
    function method_device_pet_datassette_port_interface__datassette_sense(runtime) {
        const members = runtime.members;
        return ((1) | 0);
    }
    function method_device_pet_datassette_port_interface__datassette_motor(runtime, state) {
        const members = runtime.members;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_hz"];
        (__deref_device_start(runtime, members.m_read_timer).adjust?.((__L0 ? __L0(44100) : runtime.macro("attotime::from_hz", 44100)), 0, (__L0 ? __L0(44100) : runtime.macro("attotime::from_hz", 44100))) ?? 0);
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
    function method_read_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_motor ?? 0)) {
            (__deref_read_tick(runtime, members.m_slot).read_w?.(method_datassette_read(runtime)) ?? 0);
        }
    }
    function __deref_read_tick(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cbm_datassette_devices(runtime, device) {
        const members = runtime.members;
        (__deref_cbm_datassette_devices(runtime, device).option_add?.("c2n", 829333770) ?? 0);
        (__deref_cbm_datassette_devices(runtime, device).option_add?.("c1530", 3390606303) ?? 0);
    }
    function __deref_cbm_datassette_devices(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "datassette_read": method_datassette_read,
        "datassette_write": method_datassette_write,
        "datassette_sense": method_datassette_sense,
        "datassette_motor": method_datassette_motor,
        "device_pet_datassette_port_interface::datassette_read": method_device_pet_datassette_port_interface__datassette_read,
        "device_pet_datassette_port_interface::datassette_write": method_device_pet_datassette_port_interface__datassette_write,
        "device_pet_datassette_port_interface::datassette_sense": method_device_pet_datassette_port_interface__datassette_sense,
        "device_pet_datassette_port_interface::datassette_motor": method_device_pet_datassette_port_interface__datassette_motor,
        "device_start": method_device_start,
        "read_tick": method_read_tick,
        "cbm_datassette_devices": method_cbm_datassette_devices
    };
    return __methodTable;
})();
definition.slot.options["c1530"].compiledMethodLinks = ["attotime::from_hz", "m_cassette.change_state", "m_cassette.get_state", "m_cassette.input", "m_cassette.output"];
definition.slot.options["c1530"].children[0].definition.compiledMethods = (() => {
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
    function method_update(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        let cur_time = (typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_update(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0));
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            let new_position = (((members.m_position ?? 0)) + (((((((cur_time) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
            switch ((((members.m_state ?? 0)) & (3))) {
                case 2:
                    {
                        (__deref_update(runtime, members.m_cassette).put_sample?.((members.m_channel ?? 0), (members.m_position ?? 0), ((new_position) - ((members.m_position ?? 0))), (members.m_value ?? 0)) ?? 0);
                        break;
                    }
                case 1:
                    {
                        if ((members.m_cassette ?? 0)) {
                            (__deref_update(runtime, members.m_cassette).get_sample?.((members.m_channel ?? 0), new_position, 0, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_value ?? 0), set: (value) => { members.m_value = ((value) | 0); } }), offset: 0 })) ?? 0);
                            let length = method_get_length(runtime);
                            if ((((new_position) > (length)) ? 1 : 0)) {
                                members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                new_position = length;
                            }
                            else {
                                if ((((new_position) < (0)) ? 1 : 0)) {
                                    members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                    new_position = 0;
                                }
                            }
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            members.m_position = new_position;
        }
        members.m_position_time = cur_time;
    }
    function __deref_update(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_is_stopped(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(0)) ? 1 : 0);
    }
    function method_motor_on(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (4))) === Number(0)) ? 1 : 0);
    }
    function method_get_length(runtime) {
        const members = runtime.members;
        let __t0;
        let info = (__t0 = __deref_get_length(runtime, members.m_cassette), typeof __t0.get_info === 'function' ? __t0.get_info() : typeof __t0.get_info === 'number' || typeof __t0.get_info === 'boolean' ? __t0.get_info : runtime.container(members.m_cassette, "get_info"));
        return ((info.sample_count) / (info.sample_frequency));
    }
    function __deref_get_length(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_change_state(runtime, state, mask) {
        const members = runtime.members;
        let new_state = 0;
        new_state = (members.m_state ?? 0);
        new_state = runtime.andAssign(new_state, (~mask));
        new_state = ((new_state) | (((state) & (mask))));
        if (((Number(new_state) !== Number((members.m_state ?? 0))) ? 1 : 0)) {
            method_update(runtime);
            members.m_state = new_state;
        }
    }
    function method_input(runtime) {
        const members = runtime.members;
        method_update(runtime);
        let value = (((members.m_value ?? 0)) / (2147483647));
        0;
        return value;
    }
    function method_output(runtime, value) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::clamp"];
        if ((((((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0)) && (((((members.m_value ?? 0)) !== (value)) ? 1 : 0))) ? 1 : 0)) {
            method_update(runtime);
            value = (__L0 ? __L0(value, (-1), 1) : runtime.macro("std::clamp", value, (-1), 1));
            members.m_value = ((((((value) * (2147483647))) | 0)) | 0);
        }
    }
    function method_get_position(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        let position = (members.m_position ?? 0);
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            position = ((position) + ((((((((typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_get_position(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0))) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
        }
        return position;
    }
    function __deref_get_position(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_channel(runtime, channel) {
        const members = runtime.members;
        members.m_channel = ((channel) | 0);
    }
    function method_set_speed(runtime, speed) {
        const members = runtime.members;
        members.m_speed = speed;
    }
    function method_go_forward(runtime) {
        const members = runtime.members;
        members.m_direction = ((1) | 0);
    }
    function method_go_reverse(runtime) {
        const members = runtime.members;
        members.m_direction = ((-1) | 0);
    }
    function method_seek(runtime, time, origin) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::clamp"];
        method_update(runtime);
        let length = method_get_length(runtime);
        switch (origin) {
            case 0:
                {
                    break;
                }
            case 2:
                {
                    time = ((time) + (length));
                    break;
                }
            case 1:
                {
                    time = ((time) + (method_get_position(runtime)));
                    break;
                }
        }
        members.m_position = (__L0 ? __L0(time, 0, length) : runtime.macro("std::clamp", time, 0, length));
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().sample_rate"], __L2 = __l["stream_alloc"], __L3 = __l["NAME"], __L4 = __l["save_item"];
        const h_m_default_state = members.m_default_state ?? 0;
        const h_m_stereo = members.m_stereo ?? 0;
        members.m_cassette = 0;
        members.m_state = h_m_default_state;
        members.m_value = ((0) | 0);
        (__L2 ? __L2(0, ((h_m_stereo) ? (2) : (1)), ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, ((h_m_stereo) ? (2) : (1)), ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        (__L4 ? __L4((__L3 ? __L3((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))));
    }
    function method_get_state(runtime) {
        const members = runtime.members;
        return (members.m_state ?? 0);
    }
    function method_is_playing(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(1)) ? 1 : 0);
    }
    function method_is_recording(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0);
    }
    function method_set_motor(runtime, state) {
        const members = runtime.members;
        method_change_state(runtime, ((state) ? (0) : (4)), 4);
    }
    function method_set_speaker(runtime, state) {
        const members = runtime.members;
        method_change_state(runtime, ((state) ? (0) : (8)), 8);
    }
    function method_speaker_on(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (8))) === Number(0)) ? 1 : 0);
    }
    function method_mount_image(runtime, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        const h_m_default_state = members.m_default_state ?? 0;
        if (((image) ? 0 : 1)) {
            return;
        }
        members.m_cassette = image;
        method_change_state(runtime, h_m_default_state, 3);
        members.m_position = 0;
        members.m_position_time = (typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_mount_image(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0));
        members.m_channel = ((0) | 0);
        members.m_speed = 1;
        members.m_direction = ((1) | 0);
    }
    function __deref_mount_image(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "update": method_update,
        "is_stopped": method_is_stopped,
        "motor_on": method_motor_on,
        "get_length": method_get_length,
        "change_state": method_change_state,
        "input": method_input,
        "output": method_output,
        "get_position": method_get_position,
        "set_channel": method_set_channel,
        "set_speed": method_set_speed,
        "go_forward": method_go_forward,
        "go_reverse": method_go_reverse,
        "seek": method_seek,
        "device_start": method_device_start,
        "get_state": method_get_state,
        "is_playing": method_is_playing,
        "is_recording": method_is_recording,
        "set_motor": method_set_motor,
        "set_speaker": method_set_speaker,
        "speaker_on": method_speaker_on,
        "mount_image": method_mount_image
    };
    return __methodTable;
})();
definition.slot.options["c1530"].children[0].definition.compiledMethodLinks = ["NAME", "machine", "machine().sample_rate", "machine().time", "save_item", "std::clamp", "stream_alloc"];
definition.slot.options["c1530"].children[0].definition.imageFormats[0].definition.compiledMethods = (() => {
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
    function method_tap_data_to_samplecount(runtime, data, frequency) {
        const members = runtime.members;
        return ((((0.5) * (((((44100) / (frequency))) * (((data) + (0.5))))))) | 0);
    }
    function method_toggle_wave_data(runtime) {
        const members = runtime.members;
        members.wave_data = ((((((Number((members.wave_data ?? 0)) === Number(11599)) ? 1 : 0)) ? (-11599) : (11599))) << 16 >> 16);
    }
    function method_cbm_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; (((length) > (0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(__deref_cbm_output_wave(runtime, buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, __add_cbm_output_wave(runtime, __deref_cbm_output_wave(runtime, buffer), 1));
        }
    }
    function __add_cbm_output_wave(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_cbm_output_wave(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cbm_tap_do_work(runtime, buffer, length, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_u24le"];
        let i = ((0) | 0);
        let j = ((0) | 0);
        let size = ((0) | 0);
        let version = ((0) | 0);
        let system = ((0) | 0);
        let video_standard = ((0) | 0);
        let tap_frequency = ((0) | 0);
        let byte_samples = ((0) | 0);
        let over_pulse_bytes = [0, 0, 0];
        let over_pulse_length = ((0) | 0);
        if ((((((data) ? 0 : 1)) || (((Number(length) <= Number(20)) ? 1 : 0))) ? 1 : 0)) {
            return -1;
        }
        version = ((runtime.readIndex(data, 12)) | 0);
        system = ((runtime.readIndex(data, 13)) | 0);
        video_standard = ((runtime.readIndex(data, 14)) | 0);
        if (((((buffer) ? 0 : 1)) ? 0 : 1)) {
            0;
            0;
            0;
            0;
        }
        if (((((((version) < (0)) ? 1 : 0)) || ((((version) > (2)) ? 1 : 0))) ? 1 : 0)) {
            0;
            return -1;
        }
        switch (system) {
            case 1:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (127841) : (138551))) | 0);
                    break;
                }
            case 2:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (111860) : (110840))) | 0);
                    break;
                }
            default:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (127841) : (123156))) | 0);
                    break;
                }
        }
        for (i = ((20) | 0); (((i) < (length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let byte = ((runtime.readIndex(data, i)) & 0xff);
            if (((version) ? 0 : 1)) {
                if ((((byte) !== (0)) ? 1 : 0)) {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, byte, tap_frequency)) | 0);
                }
                else {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, 882, tap_frequency)) | 0);
                }
            }
            if (version) {
                if (((((((byte) !== (0)) ? 1 : 0)) && (((j) ? 0 : 1))) ? 1 : 0)) {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, byte, tap_frequency)) | 0);
                }
                else {
                    if (((Number(((((length) - (i))) + (j))) >= Number(4)) ? 1 : 0)) {
                        if ((((j) > (0)) ? 1 : 0)) {
                            over_pulse_bytes[((j) - (1))] = byte;
                            j = ((((j) + (1))) | 0);
                            if ((((j) >= (4)) ? 1 : 0)) {
                                over_pulse_length = ((runtime.shiftRight((__L0 ? __L0(over_pulse_bytes) : runtime.macro("get_u24le", over_pulse_bytes)), 3)) | 0);
                                byte_samples = ((method_tap_data_to_samplecount(runtime, over_pulse_length, tap_frequency)) | 0);
                                j = ((0) | 0);
                            }
                        }
                        else {
                            j = ((((j) + (1))) | 0);
                            0;
                            0;
                            0;
                        }
                    }
                    else {
                        j = ((1) | 0);
                    }
                }
            }
            if ((((j) === (0)) ? 1 : 0)) {
                method_cbm_output_wave(runtime, buffer, byte_samples);
                size = ((((size) + (byte_samples))) | 0);
                method_toggle_wave_data(runtime);
                if ((((version) < (2)) ? 1 : 0)) {
                    method_cbm_output_wave(runtime, buffer, byte_samples);
                    size = ((((size) + (byte_samples))) | 0);
                    method_toggle_wave_data(runtime);
                }
            }
        }
        return size;
    }
    function method_cbm_tap_to_wav_size(runtime, tapdata, taplen) {
        const members = runtime.members;
        let size = ((method_cbm_tap_do_work(runtime, 0, taplen, tapdata)) | 0);
        members.len = ((taplen) | 0);
        return size;
    }
    function method_cbm_tap_fill_wave(runtime, buffer, length, bytes, int) {
        const members = runtime.members;
        let p = buffer;
        return method_cbm_tap_do_work(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }), (members.len ?? 0), runtime.byteView(bytes));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "tap_data_to_samplecount": method_tap_data_to_samplecount,
        "toggle_wave_data": method_toggle_wave_data,
        "cbm_output_wave": method_cbm_output_wave,
        "cbm_tap_do_work": method_cbm_tap_do_work,
        "cbm_tap_to_wav_size": method_cbm_tap_to_wav_size,
        "cbm_tap_fill_wave": method_cbm_tap_fill_wave
    };
    return __methodTable;
})();
definition.slot.options["c1530"].children[0].definition.imageFormats[0].definition.compiledMethodLinks = ["get_u24le"];
definition.slot.options["c1530"].children[0].definition.imageFormats[1].definition.compiledMethods = (() => {
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
    const cppScratch_wavfile_process_file_header = new Uint8Array(Math.max(0, Number(12)));
    const cppScratch_wavfile_process_tag_header = new Uint8Array(Math.max(0, Number(8)));
    const cppScratch_wavfile_process_format_tag = new Uint8Array(Math.max(0, Number(16)));
    function method_wavfile_process(runtime, cassette, opts, read_waveform) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["memcmp"], __L1 = __l["get_u32le"], __L2 = __l["get_u16le"];
        let __t0;
        const h_magic1 = members.magic1 ?? 0;
        const h_magic2 = members.magic2 ?? 0;
        const h_format_tag_id = members.format_tag_id ?? 0;
        const h_data_tag_id = members.data_tag_id ?? 0;
        let file_header = cppScratch_wavfile_process_file_header.fill(0);
        let tag_header = cppScratch_wavfile_process_tag_header.fill(0);
        let format_tag = cppScratch_wavfile_process_format_tag.fill(0);
        let stated_size = ((0) >>> 0);
        let file_size = 0;
        let tag_size = ((0) >>> 0);
        let tag_samples = ((0) >>> 0);
        let offset = 0;
        let format_specified = ((0) ? 1 : 0);
        let format_type = ((0) & 0xffff);
        let bytes_per_second = ((0) >>> 0);
        let waveform_flags = ((0) | 0);
        (__deref_wavfile_process(runtime, cassette).image_read?.(file_header, 0, ((file_header)?.byteLength ?? 1)) ?? 0);
        offset = ((file_header)?.byteLength ?? 1);
        if ((__L0 ? __L0(({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4))) {
            return 4;
        }
        if ((__L0 ? __L0(({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4))) {
            return 4;
        }
        stated_size = ((__add_wavfile_process(runtime, (__L1 ? __L1(({ generatedPointer: true, source: file_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: file_header, offset: 4 }))), 8)) >>> 0);
        file_size = (__t0 = __deref_wavfile_process(runtime, cassette), typeof __t0.image_size === 'function' ? __t0.image_size() : typeof __t0.image_size === 'number' || typeof __t0.image_size === 'boolean' ? __t0.image_size : runtime.container(cassette, "image_size"));
        if (((Number(stated_size) > Number(file_size)) ? 1 : 0)) {
            stated_size = ((((file_size) >>> 0)) >>> 0);
        }
        while (((Number(offset) < Number(stated_size)) ? 1 : 0)) {
            (__deref_wavfile_process(runtime, cassette).image_read?.(tag_header, offset, ((tag_header)?.byteLength ?? 1)) ?? 0);
            tag_size = (((__L1 ? __L1(({ generatedPointer: true, source: tag_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: tag_header, offset: 4 })))) >>> 0);
            offset = ((offset) + (((tag_header)?.byteLength ?? 1)));
            if ((((__L0 ? __L0(tag_header, h_format_tag_id, 4) : runtime.macro("memcmp", tag_header, h_format_tag_id, 4))) ? 0 : 1)) {
                if ((((format_specified) || (((Number(tag_size) < Number(((format_tag)?.byteLength ?? 1))) ? 1 : 0))) ? 1 : 0)) {
                    return 4;
                }
                format_specified = ((1) ? 1 : 0);
                (__deref_wavfile_process(runtime, cassette).image_read?.(format_tag, offset, ((format_tag)?.byteLength ?? 1)) ?? 0);
                format_type = (((__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 0 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 0 })))) & 0xffff);
                __deref_wavfile_process(runtime, opts).channels = (__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 2 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 2 })));
                __deref_wavfile_process(runtime, opts).sample_frequency = (__L1 ? __L1(({ generatedPointer: true, source: format_tag, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 4 })));
                bytes_per_second = (((__L1 ? __L1(({ generatedPointer: true, source: format_tag, offset: 8 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 8 })))) >>> 0);
                __deref_wavfile_process(runtime, opts).bits_per_sample = (__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 14 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 14 })));
                if (((Number(format_type) !== Number(1)) ? 1 : 0)) {
                    return 4;
                }
                if (((Number(runtime.divide(((((__deref_wavfile_process(runtime, opts).sample_frequency) * (__deref_wavfile_process(runtime, opts).bits_per_sample))) * (__deref_wavfile_process(runtime, opts).channels)), 8)) !== Number(bytes_per_second)) ? 1 : 0)) {
                    return 4;
                }
                switch (__deref_wavfile_process(runtime, opts).bits_per_sample) {
                    case 8:
                        {
                            waveform_flags = ((8) | 0);
                            break;
                        }
                    case 16:
                        {
                            waveform_flags = ((2) | 0);
                            break;
                        }
                    case 32:
                        {
                            waveform_flags = ((4) | 0);
                            break;
                        }
                    default:
                        {
                            return 4;
                        }
                }
            }
            else {
                if ((((__L0 ? __L0(tag_header, h_data_tag_id, 4) : runtime.macro("memcmp", tag_header, h_data_tag_id, 4))) ? 0 : 1)) {
                    if (((format_specified) ? 0 : 1)) {
                        return 4;
                    }
                    if (read_waveform) {
                        tag_samples = ((runtime.divide(runtime.divide(tag_size, runtime.divide(__deref_wavfile_process(runtime, opts).bits_per_sample, 8)), __deref_wavfile_process(runtime, opts).channels)) >>> 0);
                        (__deref_wavfile_process(runtime, cassette).read_samples?.(__deref_wavfile_process(runtime, opts).channels, 0, ((tag_samples) / (__deref_wavfile_process(runtime, opts).sample_frequency)), tag_samples, offset, waveform_flags) ?? 0);
                    }
                }
                else {
                }
            }
            offset = ((offset) + (tag_size));
        }
        return 0;
    }
    function __add_wavfile_process(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_wavfile_process(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "wavfile_process": method_wavfile_process
    };
    return __methodTable;
})();
definition.slot.options["c1530"].children[0].definition.imageFormats[1].definition.compiledMethodLinks = ["get_u16le", "get_u32le", "memcmp"];
export const device = definition;
export default device;
