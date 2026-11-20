import deviceData from './watchdog_timer.device.ir.json' with { type: 'json' };
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
    function method_reset_line_w(runtime, state) {
        const members = runtime.members;
        state = ((((state) ? (1) : (0))) | 0);
        if ((((state) && ((((members.m_reset_line ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            method_watchdog_reset(runtime);
        }
        members.m_reset_line = ((state) | 0);
    }
    function method_watchdog_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_seconds"];
        if ((((members.m_enabled ?? 0)) ? 0 : 1)) {
            (__deref_watchdog_reset(runtime, members.m_timer).adjust?.(Infinity) ?? 0);
        }
        else {
            if (((((members.m_vblank_count ?? 0)) !== (0)) ? 1 : 0)) {
                members.m_counter = (((members.m_vblank_count ?? 0)) | 0);
            }
            else {
                if (((Number((members.m_time ?? 0)) !== Number(0)) ? 1 : 0)) {
                    (__deref_watchdog_reset(runtime, members.m_timer).adjust?.((members.m_time ?? 0)) ?? 0);
                }
                else {
                    (__deref_watchdog_reset(runtime, members.m_timer).adjust?.((__L0 ? __L0(3) : runtime.macro("attotime::from_seconds", 3))) ?? 0);
                }
            }
        }
    }
    function __deref_watchdog_reset(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_watchdog_expired(runtime, param) {
        const members = runtime.members;
        runtime.invoke("watchdog_fired");
    }
    function method_set_time(runtime, time) {
        const members = runtime.members;
        members.m_time = time;
    }
    function method_get_vblank_counter(runtime) {
        const members = runtime.members;
        return (((members.m_counter ?? 0)) | 0);
    }
    function method_watchdog_timer_device__set_time(runtime, time) {
        const members = runtime.members;
        members.m_time = time;
    }
    function method_watchdog_timer_device__get_vblank_counter(runtime) {
        const members = runtime.members;
        return (((members.m_counter ?? 0)) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "reset_line_w": method_reset_line_w,
        "watchdog_reset": method_watchdog_reset,
        "watchdog_expired": method_watchdog_expired,
        "set_time": method_set_time,
        "get_vblank_counter": method_get_vblank_counter,
        "watchdog_timer_device::set_time": method_watchdog_timer_device__set_time,
        "watchdog_timer_device::get_vblank_counter": method_watchdog_timer_device__get_vblank_counter
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["attotime::from_seconds"];
export const device = definition;
export default device;
