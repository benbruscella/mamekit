import deviceData from './buffered_spriteram8.device.ir.json' with { type: 'json' };
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
    function method_live(runtime) {
        const members = runtime.members;
        const h_m_spriteram = members.m_spriteram ?? 0;
        return h_m_spriteram;
    }
    function method_buffer(runtime) {
        const members = runtime.members;
        return ({ generatedPointer: true, source: (members.m_buffered ?? 0), offset: 0 });
    }
    function method_bytes(runtime) {
        const members = runtime.members;
        return ((runtime.container(members.m_spriteram, "bytes")) >>> 0);
    }
    function method_length(runtime) {
        const members = runtime.members;
        return ((runtime.divide(method_bytes(runtime), 1)) >>> 0);
    }
    function method_vblank_copy_rising(runtime, state) {
        const members = runtime.members;
        if (state) {
            method_copy(runtime);
        }
    }
    function method_copy(runtime, srcoffset = 0, srclength = 2147483647) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["memcpy"];
        const h_m_spriteram = members.m_spriteram ?? 0;
        if (((h_m_spriteram) ? 1 : 0)) {
            (__L0 ? __L0(({ generatedPointer: true, source: (members.m_buffered ?? 0), offset: 0 }), __addr_copy(runtime, h_m_spriteram, srcoffset), ((cppMin(+(srclength), +(((method_length(runtime)) - (srcoffset))))) * (1))) : runtime.macro("memcpy", ({ generatedPointer: true, source: (members.m_buffered ?? 0), offset: 0 }), __addr_copy(runtime, h_m_spriteram, srcoffset), ((cppMin(+(srclength), +(((method_length(runtime)) - (srcoffset))))) * (1))));
        }
        return ({ generatedPointer: true, source: (members.m_buffered ?? 0), offset: 0 });
    }
    function __addr_copy(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_vblank_copy_falling(runtime, state) {
        const members = runtime.members;
        if (((state) ? 0 : 1)) {
            method_copy(runtime);
        }
    }
    function method_buffered_spriteram_device__live(runtime) {
        const members = runtime.members;
        const h_m_spriteram = members.m_spriteram ?? 0;
        return h_m_spriteram;
    }
    function method_buffered_spriteram_device__buffer(runtime) {
        const members = runtime.members;
        return ({ generatedPointer: true, source: (members.m_buffered ?? 0), offset: 0 });
    }
    function method_buffered_spriteram_device__bytes(runtime) {
        const members = runtime.members;
        return ((runtime.container(members.m_spriteram, "bytes")) >>> 0);
    }
    function method_buffered_spriteram_device__length(runtime) {
        const members = runtime.members;
        return ((runtime.divide(method_bytes(runtime), 1)) >>> 0);
    }
    function method_buffered_spriteram_device__vblank_copy_rising(runtime, state) {
        const members = runtime.members;
        if (state) {
            method_copy(runtime);
        }
    }
    function method_buffered_spriteram_device__vblank_copy_falling(runtime, state) {
        const members = runtime.members;
        if (((state) ? 0 : 1)) {
            method_copy(runtime);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "live": method_live,
        "buffer": method_buffer,
        "bytes": method_bytes,
        "length": method_length,
        "vblank_copy_rising": method_vblank_copy_rising,
        "copy": method_copy,
        "vblank_copy_falling": method_vblank_copy_falling,
        "buffered_spriteram_device::live": method_buffered_spriteram_device__live,
        "buffered_spriteram_device::buffer": method_buffered_spriteram_device__buffer,
        "buffered_spriteram_device::bytes": method_buffered_spriteram_device__bytes,
        "buffered_spriteram_device::length": method_buffered_spriteram_device__length,
        "buffered_spriteram_device::vblank_copy_rising": method_buffered_spriteram_device__vblank_copy_rising,
        "buffered_spriteram_device::vblank_copy_falling": method_buffered_spriteram_device__vblank_copy_falling
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["memcpy"];
export const device = definition;
export default device;
