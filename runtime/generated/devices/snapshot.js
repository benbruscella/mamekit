import deviceData from './snapshot.device.ir.json' with { type: 'json' };
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
    function method_get_software_list_loader(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["image_software_list_loader::instance"];
        return (__L0 ? __L0() : runtime.macro("image_software_list_loader::instance"));
    }
    function method_process_snapshot_or_quickload(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["check_for_file"], __L1 = __l["m_load"], __L2 = __l["tag"], __L3 = __l["basename"], __L4 = __l["osd_printf_error"];
        let __t0, __t1, __t2, __t3;
        (__L0 ? __L0() : runtime.macro("check_for_file"));
        let __binding_17 = (__L1 ? __L1((members.this ?? 0)) : runtime.macro("m_load", (members.this ?? 0)));
        let err = runtime.readIndex(__binding_17, 0);
        let message = runtime.readIndex(__binding_17, 1);
        if (err) {
            (__L4 ? __L4(((((((message).length === 0 ? 1 : 0)) ? 0 : 1)) ? ("%1$s: Error loading '%2$s': %3$s (%4$s:%5$d %6$s)\n") : ("%1$s: Error loading '%2$s': %6$s (%4$s:%5$d)\n")), (__L2 ? __L2() : runtime.macro("tag")), (__L3 ? __L3() : runtime.macro("basename")), message, (__t1 = __deref_process_snapshot_or_quickload(runtime, (__t0 = __deref_process_snapshot_or_quickload(runtime, err), typeof __t0.category === 'function' ? __t0.category() : typeof __t0.category === 'number' || typeof __t0.category === 'boolean' ? __t0.category : runtime.container(err, "category"))), typeof __t1.name === 'function' ? (__t1.name() ?? 0) : runtime.container((__t0 = __deref_process_snapshot_or_quickload(runtime, err), typeof __t0.category === 'function' ? __t0.category() : typeof __t0.category === 'number' || typeof __t0.category === 'boolean' ? __t0.category : runtime.container(err, "category")), "name")), (__t2 = __deref_process_snapshot_or_quickload(runtime, err), typeof __t2.value === 'function' ? __t2.value() : typeof __t2.value === 'number' || typeof __t2.value === 'boolean' ? __t2.value : runtime.container(err, "value")), (__t3 = __deref_process_snapshot_or_quickload(runtime, err), typeof __t3.message === 'function' ? __t3.message() : typeof __t3.message === 'number' || typeof __t3.message === 'boolean' ? __t3.message : runtime.container(err, "message"))) : runtime.macro("osd_printf_error", ((((((message).length === 0 ? 1 : 0)) ? 0 : 1)) ? ("%1$s: Error loading '%2$s': %3$s (%4$s:%5$d %6$s)\n") : ("%1$s: Error loading '%2$s': %6$s (%4$s:%5$d)\n")), (__L2 ? __L2() : runtime.macro("tag")), (__L3 ? __L3() : runtime.macro("basename")), message, (__t1 = __deref_process_snapshot_or_quickload(runtime, (__t0 = __deref_process_snapshot_or_quickload(runtime, err), typeof __t0.category === 'function' ? __t0.category() : typeof __t0.category === 'number' || typeof __t0.category === 'boolean' ? __t0.category : runtime.container(err, "category"))), typeof __t1.name === 'function' ? (__t1.name() ?? 0) : runtime.container((__t0 = __deref_process_snapshot_or_quickload(runtime, err), typeof __t0.category === 'function' ? __t0.category() : typeof __t0.category === 'number' || typeof __t0.category === 'boolean' ? __t0.category : runtime.container(err, "category")), "name")), (__t2 = __deref_process_snapshot_or_quickload(runtime, err), typeof __t2.value === 'function' ? __t2.value() : typeof __t2.value === 'number' || typeof __t2.value === 'boolean' ? __t2.value : runtime.container(err, "value")), (__t3 = __deref_process_snapshot_or_quickload(runtime, err), typeof __t3.message === 'function' ? __t3.message() : typeof __t3.message === 'number' || typeof __t3.message === 'boolean' ? __t3.message : runtime.container(err, "message"))));
            0;
        }
    }
    function __deref_process_snapshot_or_quickload(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_interface(runtime, $interface) {
        const members = runtime.members;
        members.m_interface = $interface;
    }
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
    function method_image_interface(runtime) {
        const members = runtime.members;
        return (members.m_interface ?? 0);
    }
    function method_file_extensions(runtime) {
        const members = runtime.members;
        return (members.m_file_extensions ?? 0);
    }
    function method_image_type_name(runtime) {
        const members = runtime.members;
        return "snapshot";
    }
    function method_image_brief_type_name(runtime) {
        const members = runtime.members;
        return "dump";
    }
    function method_set_extensions(runtime, ext) {
        const members = runtime.members;
        members.m_file_extensions = ext;
    }
    function method_set_delay(runtime, delay) {
        const members = runtime.members;
        members.m_delay = delay;
    }
    function method_snapshot_image_device__set_interface(runtime, $interface) {
        const members = runtime.members;
        members.m_interface = $interface;
    }
    function method_snapshot_image_device__is_readable(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_snapshot_image_device__is_writeable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_snapshot_image_device__is_creatable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_snapshot_image_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_snapshot_image_device__image_interface(runtime) {
        const members = runtime.members;
        return (members.m_interface ?? 0);
    }
    function method_snapshot_image_device__file_extensions(runtime) {
        const members = runtime.members;
        return (members.m_file_extensions ?? 0);
    }
    function method_snapshot_image_device__image_type_name(runtime) {
        const members = runtime.members;
        return "snapshot";
    }
    function method_snapshot_image_device__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "dump";
    }
    function method_snapshot_image_device__set_extensions(runtime, ext) {
        const members = runtime.members;
        members.m_file_extensions = ext;
    }
    function method_snapshot_image_device__set_delay(runtime, delay) {
        const members = runtime.members;
        members.m_delay = delay;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_software_list_loader": method_get_software_list_loader,
        "process_snapshot_or_quickload": method_process_snapshot_or_quickload,
        "set_interface": method_set_interface,
        "is_readable": method_is_readable,
        "is_writeable": method_is_writeable,
        "is_creatable": method_is_creatable,
        "is_reset_on_load": method_is_reset_on_load,
        "image_interface": method_image_interface,
        "file_extensions": method_file_extensions,
        "image_type_name": method_image_type_name,
        "image_brief_type_name": method_image_brief_type_name,
        "set_extensions": method_set_extensions,
        "set_delay": method_set_delay,
        "snapshot_image_device::set_interface": method_snapshot_image_device__set_interface,
        "snapshot_image_device::is_readable": method_snapshot_image_device__is_readable,
        "snapshot_image_device::is_writeable": method_snapshot_image_device__is_writeable,
        "snapshot_image_device::is_creatable": method_snapshot_image_device__is_creatable,
        "snapshot_image_device::is_reset_on_load": method_snapshot_image_device__is_reset_on_load,
        "snapshot_image_device::image_interface": method_snapshot_image_device__image_interface,
        "snapshot_image_device::file_extensions": method_snapshot_image_device__file_extensions,
        "snapshot_image_device::image_type_name": method_snapshot_image_device__image_type_name,
        "snapshot_image_device::image_brief_type_name": method_snapshot_image_device__image_brief_type_name,
        "snapshot_image_device::set_extensions": method_snapshot_image_device__set_extensions,
        "snapshot_image_device::set_delay": method_snapshot_image_device__set_delay
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["basename", "check_for_file", "image_software_list_loader::instance", "m_load", "osd_printf_error", "tag"];
export const device = definition;
export default device;
