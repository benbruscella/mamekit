import deviceData from './k005849.device.ir.json' with { type: 'json' };
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
    function method_ctrl_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_cb"], __L1 = __l["m_firq_cb"], __L2 = __l["m_nmi_cb"], __L3 = __l["m_flipscreen_cb"];
        data = ((data) & 0xff);
        const h_m_ctrlram = members.m_ctrlram ?? 0;
        offset = ((offset) & (7));
        if ((((offset) === (4)) ? 1 : 0)) {
            if (((((((~data)) & (h_m_ctrlram[4]))) >>> (1)) & 1)) {
                (__L0 ? __L0(Number(0)) : typeof members.m_irq_cb === 'function' ? members.m_irq_cb(0) : runtime.invoke("m_irq_cb", 0));
            }
            if (((((((~data)) & (h_m_ctrlram[4]))) >>> (2)) & 1)) {
                (__L1 ? __L1(Number(0)) : typeof members.m_firq_cb === 'function' ? members.m_firq_cb(0) : runtime.invoke("m_firq_cb", 0));
            }
            if (((((((~data)) & (h_m_ctrlram[4]))) >>> (0)) & 1)) {
                (__L2 ? __L2(Number(0)) : typeof members.m_nmi_cb === 'function' ? members.m_nmi_cb(0) : runtime.invoke("m_nmi_cb", 0));
            }
            if ((((((data) ^ (h_m_ctrlram[4]))) >>> (3)) & 1)) {
                members.m_flipscreen = (((((data) >>> (3)) & 1)) ? 1 : 0);
                (__L3 ? __L3(Number((((data) >>> (3)) & 1))) : typeof members.m_flipscreen_cb === 'function' ? members.m_flipscreen_cb((((data) >>> (3)) & 1)) : runtime.invoke("m_flipscreen_cb", (((data) >>> (3)) & 1)));
            }
        }
        h_m_ctrlram[offset] = data;
    }
    function method_scanline(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_nmi_cb"], __L1 = __l["screen"], __L2 = __l["screen().frame_number"], __L3 = __l["m_firq_cb"], __L4 = __l["m_irq_cb"], __L5 = __l["screen().height"], __L6 = __l["screen().time_until_pos"];
        const h_m_ctrlram = members.m_ctrlram ?? 0;
        let scanline = ((param) | 0);
        if (((((((h_m_ctrlram[4]) >>> (0)) & 1)) && (((Number(((scanline) & (31))) === Number(16)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0(Number(1)) : typeof members.m_nmi_cb === 'function' ? members.m_nmi_cb(1) : runtime.invoke("m_nmi_cb", 1));
        }
        if ((((scanline) === (240)) ? 1 : 0)) {
            if (((((((h_m_ctrlram[4]) >>> (2)) & 1)) && (((((__L2 ?? globalThis.mamekitMissingCall?.("screen().frame_number"))?.() ?? 0)) & (1)))) ? 1 : 0)) {
                (__L3 ? __L3(Number(1)) : typeof members.m_firq_cb === 'function' ? members.m_firq_cb(1) : runtime.invoke("m_firq_cb", 1));
            }
            if ((((h_m_ctrlram[4]) >>> (1)) & 1)) {
                (__L4 ? __L4(Number(1)) : typeof members.m_irq_cb === 'function' ? members.m_irq_cb(1) : runtime.invoke("m_irq_cb", 1));
            }
        }
        scanline = ((((scanline) + (16))) | 0);
        if (((Number(scanline) >= Number(((__L5 ?? globalThis.mamekitMissingCall?.("screen().height"))?.() ?? 0))) ? 1 : 0)) {
            scanline = ((0) | 0);
        }
        (__deref_scanline(runtime, members.m_scanline_timer).adjust?.(((__L6 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(scanline) ?? 0), scanline) ?? 0);
    }
    function __deref_scanline(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_irq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_set_irq_cb(runtime, members.m_irq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_cb, "bind"));
    }
    function __deref_set_irq_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_firq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_set_firq_cb(runtime, members.m_firq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_firq_cb, "bind"));
    }
    function __deref_set_firq_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_nmi_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_set_nmi_cb(runtime, members.m_nmi_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_nmi_cb, "bind"));
    }
    function __deref_set_nmi_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_flipscreen_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_set_flipscreen_cb(runtime, members.m_flipscreen_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_flipscreen_cb, "bind"));
    }
    function __deref_set_flipscreen_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_flipscreen(runtime) {
        const members = runtime.members;
        return (members.m_flipscreen ?? 0);
    }
    function method_ctrl_r(runtime, offset) {
        const members = runtime.members;
        const h_m_ctrlram = members.m_ctrlram ?? 0;
        return ((h_m_ctrlram[((offset) & (7))]) & 0xff);
    }
    function method_scroll_r(runtime, offset) {
        const members = runtime.members;
        const h_m_scrollram = members.m_scrollram ?? 0;
        return ((h_m_scrollram[((offset) & (63))]) & 0xff);
    }
    function method_scroll_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_scrollram = members.m_scrollram ?? 0;
        h_m_scrollram[((offset) & (63))] = data;
    }
    function method_k005849_device__set_irq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k005849_device__set_irq_cb(runtime, members.m_irq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_cb, "bind"));
    }
    function __deref_k005849_device__set_irq_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_k005849_device__set_firq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k005849_device__set_firq_cb(runtime, members.m_firq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_firq_cb, "bind"));
    }
    function __deref_k005849_device__set_firq_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_k005849_device__set_nmi_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k005849_device__set_nmi_cb(runtime, members.m_nmi_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_nmi_cb, "bind"));
    }
    function __deref_k005849_device__set_nmi_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_k005849_device__set_flipscreen_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k005849_device__set_flipscreen_cb(runtime, members.m_flipscreen_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_flipscreen_cb, "bind"));
    }
    function __deref_k005849_device__set_flipscreen_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_k005849_device__flipscreen(runtime) {
        const members = runtime.members;
        return (members.m_flipscreen ?? 0);
    }
    function method_k005849_device__ctrl_r(runtime, offset) {
        const members = runtime.members;
        const h_m_ctrlram = members.m_ctrlram ?? 0;
        return ((h_m_ctrlram[((offset) & (7))]) & 0xff);
    }
    function method_k005849_device__scroll_r(runtime, offset) {
        const members = runtime.members;
        const h_m_scrollram = members.m_scrollram ?? 0;
        return ((h_m_scrollram[((offset) & (63))]) & 0xff);
    }
    function method_k005849_device__scroll_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_scrollram = members.m_scrollram ?? 0;
        h_m_scrollram[((offset) & (63))] = data;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "ctrl_w": method_ctrl_w,
        "scanline": method_scanline,
        "set_irq_cb": method_set_irq_cb,
        "set_firq_cb": method_set_firq_cb,
        "set_nmi_cb": method_set_nmi_cb,
        "set_flipscreen_cb": method_set_flipscreen_cb,
        "flipscreen": method_flipscreen,
        "ctrl_r": method_ctrl_r,
        "scroll_r": method_scroll_r,
        "scroll_w": method_scroll_w,
        "k005849_device::set_irq_cb": method_k005849_device__set_irq_cb,
        "k005849_device::set_firq_cb": method_k005849_device__set_firq_cb,
        "k005849_device::set_nmi_cb": method_k005849_device__set_nmi_cb,
        "k005849_device::set_flipscreen_cb": method_k005849_device__set_flipscreen_cb,
        "k005849_device::flipscreen": method_k005849_device__flipscreen,
        "k005849_device::ctrl_r": method_k005849_device__ctrl_r,
        "k005849_device::scroll_r": method_k005849_device__scroll_r,
        "k005849_device::scroll_w": method_k005849_device__scroll_w
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_firq_cb", "m_flipscreen_cb", "m_irq_cb", "m_nmi_cb", "screen", "screen().frame_number", "screen().height", "screen().time_until_pos"];
export const device = definition;
export default device;
