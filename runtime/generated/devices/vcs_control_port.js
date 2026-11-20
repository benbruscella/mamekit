import deviceData from './vcs_control_port.device.ir.json' with { type: 'json' };
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
    function method_trigger_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_trigger_wr_callback(runtime, members.m_write_trigger), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_trigger, "bind"));
    }
    function __deref_trigger_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_read_joy(runtime) {
        const members = runtime.members;
        return ((((method_exists(runtime)) ? ((members.m_device.vcs_joy_r?.() ?? 0)) : (255))) & 0xff);
    }
    function method_exists(runtime) {
        const members = runtime.members;
        return (((members.m_device ?? 0)) ? 1 : 0);
    }
    function method_read_pot_x(runtime) {
        const members = runtime.members;
        return ((((method_exists(runtime)) ? ((members.m_device.vcs_pot_x_r?.() ?? 0)) : (255))) & 0xff);
    }
    function method_read_pot_y(runtime) {
        const members = runtime.members;
        return ((((method_exists(runtime)) ? ((members.m_device.vcs_pot_y_r?.() ?? 0)) : (255))) & 0xff);
    }
    function method_joy_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (method_exists(runtime)) {
            (members.m_device.vcs_joy_w?.(data) ?? 0);
        }
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return (((method_exists(runtime)) && ((members.m_device.has_pot_x?.() ?? 0))) ? 1 : 0);
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return (((method_exists(runtime)) && ((members.m_device.has_pot_y?.() ?? 0))) ? 1 : 0);
    }
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_trigger"];
        (__L0 ? __L0(Number(state)) : typeof members.m_write_trigger === 'function' ? members.m_write_trigger(state) : runtime.invoke("m_write_trigger", state));
    }
    function method_vcs_control_port_device__trigger_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_vcs_control_port_device__trigger_wr_callback(runtime, members.m_write_trigger), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_trigger, "bind"));
    }
    function __deref_vcs_control_port_device__trigger_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_control_port_device__read_joy(runtime) {
        const members = runtime.members;
        return ((((method_exists(runtime)) ? ((members.m_device.vcs_joy_r?.() ?? 0)) : (255))) & 0xff);
    }
    function method_vcs_control_port_device__read_pot_x(runtime) {
        const members = runtime.members;
        return ((((method_exists(runtime)) ? ((members.m_device.vcs_pot_x_r?.() ?? 0)) : (255))) & 0xff);
    }
    function method_vcs_control_port_device__read_pot_y(runtime) {
        const members = runtime.members;
        return ((((method_exists(runtime)) ? ((members.m_device.vcs_pot_y_r?.() ?? 0)) : (255))) & 0xff);
    }
    function method_vcs_control_port_device__joy_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (method_exists(runtime)) {
            (members.m_device.vcs_joy_w?.(data) ?? 0);
        }
    }
    function method_vcs_control_port_device__exists(runtime) {
        const members = runtime.members;
        return (((members.m_device ?? 0)) ? 1 : 0);
    }
    function method_vcs_control_port_device__has_pot_x(runtime) {
        const members = runtime.members;
        return (((method_exists(runtime)) && ((members.m_device.has_pot_x?.() ?? 0))) ? 1 : 0);
    }
    function method_vcs_control_port_device__has_pot_y(runtime) {
        const members = runtime.members;
        return (((method_exists(runtime)) && ((members.m_device.has_pot_y?.() ?? 0))) ? 1 : 0);
    }
    function method_vcs_control_port_device__trigger_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_trigger"];
        (__L0 ? __L0(Number(state)) : typeof members.m_write_trigger === 'function' ? members.m_write_trigger(state) : runtime.invoke("m_write_trigger", state));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_wr_callback": method_trigger_wr_callback,
        "read_joy": method_read_joy,
        "exists": method_exists,
        "read_pot_x": method_read_pot_x,
        "read_pot_y": method_read_pot_y,
        "joy_w": method_joy_w,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "trigger_w": method_trigger_w,
        "vcs_control_port_device::trigger_wr_callback": method_vcs_control_port_device__trigger_wr_callback,
        "vcs_control_port_device::read_joy": method_vcs_control_port_device__read_joy,
        "vcs_control_port_device::read_pot_x": method_vcs_control_port_device__read_pot_x,
        "vcs_control_port_device::read_pot_y": method_vcs_control_port_device__read_pot_y,
        "vcs_control_port_device::joy_w": method_vcs_control_port_device__joy_w,
        "vcs_control_port_device::exists": method_vcs_control_port_device__exists,
        "vcs_control_port_device::has_pot_x": method_vcs_control_port_device__has_pot_x,
        "vcs_control_port_device::has_pot_y": method_vcs_control_port_device__has_pot_y,
        "vcs_control_port_device::trigger_w": method_vcs_control_port_device__trigger_w
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_write_trigger"];
definition.slot.options["joy"].compiledMethods = (() => {
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
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_vcs_joy_r(runtime, members.m_joy), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_joy, "read"))) & 0xff);
    }
    function __deref_vcs_joy_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y
    };
    return __methodTable;
})();
definition.slot.options["pad"].compiledMethods = (() => {
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
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_reverse_players = members.m_reverse_players ?? 0;
        let data = (((__t0 = __deref_vcs_joy_r(runtime, members.m_joy), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_joy, "read"))) & 0xff);
        return ((((h_m_reverse_players) ? (((((data) >>> (7)) & 1) << 7 | (((data) >>> (6)) & 1) << 6 | (((data) >>> (5)) & 1) << 5 | (((data) >>> (4)) & 1) << 4 | (((data) >>> (2)) & 1) << 3 | (((data) >>> (3)) & 1) << 2 | (((data) >>> (1)) & 1) << 1 | (((data) >>> (0)) & 1) << 0)) : (data))) & 0xff);
    }
    function __deref_vcs_joy_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_reverse_players = members.m_reverse_players ?? 0;
        return ((((h_m_reverse_players) ? ((__t0 = __deref_vcs_pot_x_r(runtime, members.m_poty), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_poty, "read"))) : ((__t1 = __deref_vcs_pot_x_r(runtime, members.m_potx), typeof __t1.read === 'function' ? __t1.read() : typeof __t1.read === 'number' || typeof __t1.read === 'boolean' ? __t1.read : runtime.container(members.m_potx, "read"))))) & 0xff);
    }
    function __deref_vcs_pot_x_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_reverse_players = members.m_reverse_players ?? 0;
        return ((((h_m_reverse_players) ? ((__t0 = __deref_vcs_pot_y_r(runtime, members.m_potx), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_potx, "read"))) : ((__t1 = __deref_vcs_pot_y_r(runtime, members.m_poty), typeof __t1.read === 'function' ? __t1.read() : typeof __t1.read === 'number' || typeof __t1.read === 'boolean' ? __t1.read : runtime.container(members.m_poty, "read"))))) & 0xff);
    }
    function __deref_vcs_pot_y_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_reverse_players(runtime, device) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["downcast"];
        (__L0 ? __L0(__deref_reverse_players(runtime, device)) : runtime.macro("downcast", __deref_reverse_players(runtime, device))).m_reverse_players = 1;
    }
    function __deref_reverse_players(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_paddles_device__reverse_players(runtime, device) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["downcast"];
        (__L0 ? __L0(__deref_vcs_paddles_device__reverse_players(runtime, device)) : runtime.macro("downcast", __deref_vcs_paddles_device__reverse_players(runtime, device))).m_reverse_players = 1;
    }
    function __deref_vcs_paddles_device__reverse_players(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_paddles_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_paddles_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "reverse_players": method_reverse_players,
        "vcs_paddles_device::reverse_players": method_vcs_paddles_device__reverse_players,
        "vcs_paddles_device::has_pot_x": method_vcs_paddles_device__has_pot_x,
        "vcs_paddles_device::has_pot_y": method_vcs_paddles_device__has_pot_y
    };
    return __methodTable;
})();
definition.slot.options["pad"].compiledMethodLinks = ["downcast"];
definition.slot.options["mouse"].compiledMethods = (() => {
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
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_vcs_joy_r(runtime, members.m_joy), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_joy, "read"))) & 0xff);
    }
    function __deref_vcs_joy_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((((__t0 = __deref_vcs_pot_x_r(runtime, members.m_potx), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_potx, "read"))) << (1))) & 0xff);
    }
    function __deref_vcs_pot_x_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((((__t0 = __deref_vcs_pot_y_r(runtime, members.m_poty), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_poty, "read"))) << (1))) & 0xff);
    }
    function __deref_vcs_pot_y_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_vcs_mouse_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_mouse_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "vcs_mouse_device::has_pot_x": method_vcs_mouse_device__has_pot_x,
        "vcs_mouse_device::has_pot_y": method_vcs_mouse_device__has_pot_y
    };
    return __methodTable;
})();
definition.slot.options["lp"].compiledMethods = (() => {
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
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_vcs_joy_r(runtime, members.m_joy), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_joy, "read"))) & 0xff);
    }
    function __deref_vcs_joy_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_trigger(runtime, field, param, oldval, newval) {
        const members = runtime.members;
        (__deref_trigger(runtime, members.m_port).trigger_w?.(newval) ?? 0);
    }
    function __deref_trigger(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "trigger": method_trigger
    };
    return __methodTable;
})();
definition.slot.options["joybstr"].compiledMethods = (() => {
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
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_vcs_joy_r(runtime, members.m_joy), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_joy, "read"))) & 0xff);
    }
    function __deref_vcs_joy_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_vcs_pot_x_r(runtime, members.m_potx), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_potx, "read"))) & 0xff);
    }
    function __deref_vcs_pot_x_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_vcs_pot_y_r(runtime, members.m_poty), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_poty, "read"))) & 0xff);
    }
    function __deref_vcs_pot_y_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_vcs_joystick_booster_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_joystick_booster_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "vcs_joystick_booster_device::has_pot_x": method_vcs_joystick_booster_device__has_pot_x,
        "vcs_joystick_booster_device::has_pot_y": method_vcs_joystick_booster_device__has_pot_y
    };
    return __methodTable;
})();
definition.slot.options["wheel"].compiledMethods = (() => {
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
    const __mame_table_0 = [0, 2, 3, 1];
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        return (((((__t0 = __deref_vcs_joy_r(runtime, members.m_joy), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_joy, "read"))) | ((__mame_table_0[(((((((__t1 = __deref_vcs_joy_r(runtime, members.m_wheel), typeof __t1.read === 'function' ? __t1.read() : typeof __t1.read === 'number' || typeof __t1.read === 'boolean' ? __t1.read : runtime.container(members.m_wheel, "read"))) >>> (3)) & ((1 << (2)) - 1))) % 4) + 4) % 4] ?? 0)))) & 0xff);
    }
    function __deref_vcs_joy_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y
    };
    return __methodTable;
})();
definition.slot.options["keypad"].compiledMethods = (() => {
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
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((~method_read_keys(runtime, 2))) & 0xff);
    }
    function method_read_keys(runtime, col) {
        const members = runtime.members;
        let __t0;
        col = ((col) & 0xff);
        let val = ((0) & 0xff);
        for (let row = ((0) | 0); (((row) < (4)) ? 1 : 0); row = ((((row) + (1))) | 0)) {
            if (((((((members.m_row ?? 0)) >>> (row)) & 1)) ? 0 : 1)) {
                if (((((((__t0 = __deref_read_keys(runtime, members.m_keypad), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_keypad, "read"))) >>> (((((3) * (row))) + (col)))) & 1)) ? 0 : 1)) {
                    val = ((255) & 0xff);
                }
                break;
            }
        }
        return val;
    }
    function __deref_read_keys(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((method_read_keys(runtime, 0)) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((method_read_keys(runtime, 1)) & 0xff);
    }
    function method_vcs_joy_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_row = ((((data) & (15))) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_vcs_keypad_device__vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((~method_read_keys(runtime, 2))) & 0xff);
    }
    function method_vcs_keypad_device__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((method_read_keys(runtime, 0)) & 0xff);
    }
    function method_vcs_keypad_device__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((method_read_keys(runtime, 1)) & 0xff);
    }
    function method_vcs_keypad_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_keypad_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "read_keys": method_read_keys,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "vcs_joy_w": method_vcs_joy_w,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "vcs_keypad_device::vcs_joy_r": method_vcs_keypad_device__vcs_joy_r,
        "vcs_keypad_device::vcs_pot_x_r": method_vcs_keypad_device__vcs_pot_x_r,
        "vcs_keypad_device::vcs_pot_y_r": method_vcs_keypad_device__vcs_pot_y_r,
        "vcs_keypad_device::has_pot_x": method_vcs_keypad_device__has_pot_x,
        "vcs_keypad_device::has_pot_y": method_vcs_keypad_device__has_pot_y
    };
    return __methodTable;
})();
definition.slot.options["cx85"].compiledMethods = (() => {
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
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_encoder.read"], __L1 = __l["m_encoder.da_r"];
        return (((((((~(__L0 ? __L0() : ((members.m_encoder)?.read?.() ?? 0)))) & (15))) | ((((__L1 ? __L1() : ((members.m_encoder)?.da_r?.() ?? 0))) ? (0) : (32))))) & 0xff);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_encoder.read"];
        return ((((((((__L0 ? __L0() : ((members.m_encoder)?.read?.() ?? 0))) >>> (4)) & 1)) ? (255) : (0))) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_atari_cx85_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_atari_cx85_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "atari_cx85_device::has_pot_x": method_atari_cx85_device__has_pot_x,
        "atari_cx85_device::has_pot_y": method_atari_cx85_device__has_pot_y
    };
    return __methodTable;
})();
definition.slot.options["cx85"].compiledMethodLinks = ["m_encoder.da_r", "m_encoder.read"];
definition.slot.options["cx85"].children[0].definition.compiledMethods = (() => {
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
    function method_perform_scan(runtime, param) {
        const members = runtime.members;
        method_change_output_lines(runtime);
        method_clock_scan_counters(runtime);
        method_detect_keypress(runtime);
    }
    function method_change_output_lines(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_da"];
        if (((((members.m_next_data ?? 0)) !== ((members.m_data ?? 0))) ? 1 : 0)) {
            members.m_data = (((members.m_next_data ?? 0)) & 0xff);
        }
        if (((Number((members.m_next_da ?? 0)) !== Number((members.m_da ?? 0))) ? 1 : 0)) {
            members.m_da = (((members.m_next_da ?? 0)) ? 1 : 0);
            0;
            (__L0 ? __L0(Number((((members.m_da ?? 0)) ? (1) : (0)))) : typeof members.m_write_da === 'function' ? members.m_write_da((((members.m_da ?? 0)) ? (1) : (0))) : runtime.invoke("m_write_da", (((members.m_da ?? 0)) ? (1) : (0))));
        }
    }
    function method_clock_scan_counters(runtime) {
        const members = runtime.members;
        if ((((members.m_inhibit ?? 0)) ? 0 : 1)) {
            members.m_x = ((((members.m_x) + (1))) | 0);
            members.m_x = ((((members.m_x) & (3))) | 0);
        }
    }
    function method_detect_keypress(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_tristate_data"];
        let data = ((runtime.readIndex((members.m_read_x ?? 0), (members.m_x ?? 0))()) & 0xff);
        if ((members.m_inhibit ?? 0)) {
            if ((((data) >>> ((members.m_y ?? 0))) & 1)) {
                members.m_inhibit = ((0) ? 1 : 0);
                members.m_next_da = ((0) ? 1 : 0);
                members.m_next_data = (((__L0 ? __L0() : typeof members.m_tristate_data === 'function' ? members.m_tristate_data() : runtime.invoke("m_tristate_data"))) & 0xff);
                0;
            }
        }
        else {
            for (let y = ((0) | 0); ((Number(y) < Number(5)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                if ((((((data) >>> (y)) & 1)) ? 0 : 1)) {
                    members.m_inhibit = ((1) ? 1 : 0);
                    members.m_next_da = ((1) ? 1 : 0);
                    members.m_y = ((y) | 0);
                    members.m_next_data = ((((((y) << (2))) | ((members.m_x ?? 0)))) & 0xff);
                    0;
                }
            }
        }
    }
    function method_set_cap_osc(runtime, value) {
        const members = runtime.members;
        members.m_cap_osc = value;
    }
    function method_set_cap_debounce(runtime, value) {
        const members = runtime.members;
        members.m_cap_debounce = value;
    }
    function method_da_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_da_wr_callback(runtime, members.m_write_da), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_da, "bind"));
    }
    function __deref_da_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_x1_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_x1_rd_callback(runtime, runtime.readIndex((members.m_read_x ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 0), "bind"));
    }
    function __deref_x1_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_x2_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_x2_rd_callback(runtime, runtime.readIndex((members.m_read_x ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 1), "bind"));
    }
    function __deref_x2_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_x3_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_x3_rd_callback(runtime, runtime.readIndex((members.m_read_x ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 2), "bind"));
    }
    function __deref_x3_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_x4_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_x4_rd_callback(runtime, runtime.readIndex((members.m_read_x ?? 0), 3)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 3), "bind"));
    }
    function __deref_x4_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_data_tri_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_data_tri_callback(runtime, members.m_tristate_data), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tristate_data, "bind"));
    }
    function __deref_data_tri_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_da_r(runtime) {
        const members = runtime.members;
        return (((members.m_da ?? 0)) | 0);
    }
    function method_mm74c922_device__set_cap_osc(runtime, value) {
        const members = runtime.members;
        members.m_cap_osc = value;
    }
    function method_mm74c922_device__set_cap_debounce(runtime, value) {
        const members = runtime.members;
        members.m_cap_debounce = value;
    }
    function method_mm74c922_device__da_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mm74c922_device__da_wr_callback(runtime, members.m_write_da), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_da, "bind"));
    }
    function __deref_mm74c922_device__da_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mm74c922_device__x1_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mm74c922_device__x1_rd_callback(runtime, runtime.readIndex((members.m_read_x ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 0), "bind"));
    }
    function __deref_mm74c922_device__x1_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mm74c922_device__x2_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mm74c922_device__x2_rd_callback(runtime, runtime.readIndex((members.m_read_x ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 1), "bind"));
    }
    function __deref_mm74c922_device__x2_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mm74c922_device__x3_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mm74c922_device__x3_rd_callback(runtime, runtime.readIndex((members.m_read_x ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 2), "bind"));
    }
    function __deref_mm74c922_device__x3_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mm74c922_device__x4_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mm74c922_device__x4_rd_callback(runtime, runtime.readIndex((members.m_read_x ?? 0), 3)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 3), "bind"));
    }
    function __deref_mm74c922_device__x4_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mm74c922_device__data_tri_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mm74c922_device__data_tri_callback(runtime, members.m_tristate_data), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tristate_data, "bind"));
    }
    function __deref_mm74c922_device__data_tri_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mm74c922_device__da_r(runtime) {
        const members = runtime.members;
        return (((members.m_da ?? 0)) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "perform_scan": method_perform_scan,
        "change_output_lines": method_change_output_lines,
        "clock_scan_counters": method_clock_scan_counters,
        "detect_keypress": method_detect_keypress,
        "set_cap_osc": method_set_cap_osc,
        "set_cap_debounce": method_set_cap_debounce,
        "da_wr_callback": method_da_wr_callback,
        "x1_rd_callback": method_x1_rd_callback,
        "x2_rd_callback": method_x2_rd_callback,
        "x3_rd_callback": method_x3_rd_callback,
        "x4_rd_callback": method_x4_rd_callback,
        "data_tri_callback": method_data_tri_callback,
        "da_r": method_da_r,
        "mm74c922_device::set_cap_osc": method_mm74c922_device__set_cap_osc,
        "mm74c922_device::set_cap_debounce": method_mm74c922_device__set_cap_debounce,
        "mm74c922_device::da_wr_callback": method_mm74c922_device__da_wr_callback,
        "mm74c922_device::x1_rd_callback": method_mm74c922_device__x1_rd_callback,
        "mm74c922_device::x2_rd_callback": method_mm74c922_device__x2_rd_callback,
        "mm74c922_device::x3_rd_callback": method_mm74c922_device__x3_rd_callback,
        "mm74c922_device::x4_rd_callback": method_mm74c922_device__x4_rd_callback,
        "mm74c922_device::data_tri_callback": method_mm74c922_device__data_tri_callback,
        "mm74c922_device::da_r": method_mm74c922_device__da_r
    };
    return __methodTable;
})();
definition.slot.options["cx85"].children[0].definition.compiledMethodLinks = ["m_tristate_data", "m_write_da"];
definition.slot.options["trakball"].compiledMethods = (() => {
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
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        (__deref_trigger_w(runtime, members.m_port).trigger_w?.(state) ?? 0);
    }
    function __deref_trigger_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_last_direction = members.m_last_direction ?? 0;
        const h_m_last_pos = members.m_last_pos ?? 0;
        let vcs_joy_return = ((0) & 0xff);
        for (let axis = ((0) | 0); (((axis) < (2)) ? 1 : 0); axis = ((((axis) + (1))) | 0)) {
            method_trakball_pos_and_dir_upd(runtime, axis);
        }
        vcs_joy_return = (((((((((((__t0 = __deref_vcs_joy_r(runtime, members.m_trakballb), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_trakballb, "read"))) | (((h_m_last_direction[0]) ? (1) : (0))))) | (((((h_m_last_pos[0]) & (2))) ? (2) : (0))))) | (((h_m_last_direction[1]) ? (4) : (0))))) | (((((h_m_last_pos[1]) & (2))) ? (8) : (0))))) & 0xff);
        return ((vcs_joy_return) & 0xff);
    }
    function __deref_vcs_joy_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_trakball_pos_and_dir_upd(runtime, axis) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        const h_m_trakballxy = members.m_trakballxy ?? 0;
        const h_m_last_pos = members.m_last_pos ?? 0;
        const h_m_last_direction = members.m_last_direction ?? 0;
        let diff_pos = ((0) | 0);
        let cur_pos = ((0) | 0);
        cur_pos = (((__t0 = __deref_trakball_pos_and_dir_upd(runtime, runtime.readIndex(h_m_trakballxy, axis)), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_trakballxy, axis), "read"))) | 0);
        if (((Number(h_m_last_pos[axis]) === Number(4294967295)) ? 1 : 0)) {
            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                h_m_last_pos[axis] = cur_pos;
            }
        }
        diff_pos = ((((cur_pos) - (h_m_last_pos[axis]))) | 0);
        if ((((diff_pos) > (127)) ? 1 : 0)) {
            diff_pos = ((((diff_pos) - (256))) | 0);
        }
        else {
            if (((Number(diff_pos) < Number(-128)) ? 1 : 0)) {
                diff_pos = ((((diff_pos) + (256))) | 0);
            }
        }
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            h_m_last_pos[axis] = cur_pos;
            if (diff_pos) {
                h_m_last_direction[axis] = (((diff_pos) > (0)) ? 1 : 0);
            }
        }
    }
    function __deref_trakball_pos_and_dir_upd(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_trakball_moved(runtime, field, param, oldval, newval) {
        const members = runtime.members;
        let axis = ((((param) | 0)) | 0);
        method_trakball_pos_and_dir_upd(runtime, axis);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "trakball_pos_and_dir_upd": method_trakball_pos_and_dir_upd,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "trakball_moved": method_trakball_moved
    };
    return __methodTable;
})();
definition.slot.options["trakball"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
