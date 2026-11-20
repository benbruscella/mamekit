import deviceData from './dma_slot.device.ir.json' with { type: 'json' };
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
        members.m_card = (__L0 ? __L0() : runtime.macro("get_card_device"));
    }
    function method_busreq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_busreq_cb"];
        (__L0 ? __L0(Number(state)) : typeof members.m_out_busreq_cb === 'function' ? members.m_out_busreq_cb(state) : runtime.invoke("m_out_busreq_cb", state));
    }
    function method_int_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_int_cb"];
        (__L0 ? __L0(Number(state)) : typeof members.m_out_int_cb === 'function' ? members.m_out_int_cb(state) : runtime.invoke("m_out_int_cb", state));
    }
    function method_mreq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_mreq_cb"];
        (__L0 ? __L0(Number(state)) : typeof members.m_out_mreq_cb === 'function' ? members.m_out_mreq_cb(state) : runtime.invoke("m_out_mreq_cb", state));
    }
    function method_mreq_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_mreq_cb"];
        return (((__L0 ? __L0(Number(offset)) : typeof members.m_in_mreq_cb === 'function' ? members.m_in_mreq_cb(offset) : runtime.invoke("m_in_mreq_cb", offset))) & 0xff);
    }
    function method_iorq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_iorq_cb"];
        (__L0 ? __L0(Number(state)) : typeof members.m_out_iorq_cb === 'function' ? members.m_out_iorq_cb(state) : runtime.invoke("m_out_iorq_cb", state));
    }
    function method_iorq_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_iorq_cb"];
        return (((__L0 ? __L0(Number(offset)) : typeof members.m_in_iorq_cb === 'function' ? members.m_in_iorq_cb(offset) : runtime.invoke("m_in_iorq_cb", offset))) & 0xff);
    }
    function method_bai_w(runtime, state) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            (members.m_card.bai_w?.(state) ?? 0);
        }
    }
    function method_dma_slot_device(runtime, mconfig, tag, owner, clock, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_set_io_space(runtime, tag, spacenum) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        (__deref_set_io_space(runtime, members.m_io).set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag)), spacenum) ?? 0);
    }
    function __deref_set_io_space(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_busreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_busreq_callback(runtime, members.m_out_busreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_busreq_cb, "bind"));
    }
    function __deref_out_busreq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_int_callback(runtime, members.m_out_int_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_cb, "bind"));
    }
    function __deref_out_int_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_in_mreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_mreq_callback(runtime, members.m_in_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_mreq_cb, "bind"));
    }
    function __deref_in_mreq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_mreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_mreq_callback(runtime, members.m_out_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_mreq_cb, "bind"));
    }
    function __deref_out_mreq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_in_iorq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_iorq_callback(runtime, members.m_in_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_iorq_cb, "bind"));
    }
    function __deref_in_iorq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_iorq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_iorq_callback(runtime, members.m_out_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_iorq_cb, "bind"));
    }
    function __deref_out_iorq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_io(runtime) {
        const members = runtime.members;
        const h_m_io = members.m_io ?? 0;
        return __deref_io(runtime, h_m_io);
    }
    function __deref_io(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__dma_slot_device(runtime, mconfig, tag, owner, clock, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_dma_slot_device__set_io_space(runtime, tag, spacenum) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        (__deref_dma_slot_device__set_io_space(runtime, members.m_io).set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag)), spacenum) ?? 0);
    }
    function __deref_dma_slot_device__set_io_space(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__out_busreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_dma_slot_device__out_busreq_callback(runtime, members.m_out_busreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_busreq_cb, "bind"));
    }
    function __deref_dma_slot_device__out_busreq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__out_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_dma_slot_device__out_int_callback(runtime, members.m_out_int_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_cb, "bind"));
    }
    function __deref_dma_slot_device__out_int_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__in_mreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_dma_slot_device__in_mreq_callback(runtime, members.m_in_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_mreq_cb, "bind"));
    }
    function __deref_dma_slot_device__in_mreq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__out_mreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_dma_slot_device__out_mreq_callback(runtime, members.m_out_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_mreq_cb, "bind"));
    }
    function __deref_dma_slot_device__out_mreq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__in_iorq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_dma_slot_device__in_iorq_callback(runtime, members.m_in_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_iorq_cb, "bind"));
    }
    function __deref_dma_slot_device__in_iorq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__out_iorq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_dma_slot_device__out_iorq_callback(runtime, members.m_out_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_iorq_cb, "bind"));
    }
    function __deref_dma_slot_device__out_iorq_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__io(runtime) {
        const members = runtime.members;
        const h_m_io = members.m_io ?? 0;
        return __deref_dma_slot_device__io(runtime, h_m_io);
    }
    function __deref_dma_slot_device__io(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_io_(runtime, __assigned) {
        const members = runtime.members;
        const h_m_io = members.m_io ?? 0;
        runtime.pointerStore(h_m_io, __assigned);
        return __deref_io_(runtime, h_m_io);
    }
    function __deref_io_(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dma_slot_device__io_(runtime, __assigned) {
        const members = runtime.members;
        const h_m_io = members.m_io ?? 0;
        runtime.pointerStore(h_m_io, __assigned);
        return __deref_dma_slot_device__io_(runtime, h_m_io);
    }
    function __deref_dma_slot_device__io_(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "busreq_w": method_busreq_w,
        "int_w": method_int_w,
        "mreq_w": method_mreq_w,
        "mreq_r": method_mreq_r,
        "iorq_w": method_iorq_w,
        "iorq_r": method_iorq_r,
        "bai_w": method_bai_w,
        "dma_slot_device": method_dma_slot_device,
        "set_io_space": method_set_io_space,
        "out_busreq_callback": method_out_busreq_callback,
        "out_int_callback": method_out_int_callback,
        "in_mreq_callback": method_in_mreq_callback,
        "out_mreq_callback": method_out_mreq_callback,
        "in_iorq_callback": method_in_iorq_callback,
        "out_iorq_callback": method_out_iorq_callback,
        "io": method_io,
        "dma_slot_device::dma_slot_device": method_dma_slot_device__dma_slot_device,
        "dma_slot_device::set_io_space": method_dma_slot_device__set_io_space,
        "dma_slot_device::out_busreq_callback": method_dma_slot_device__out_busreq_callback,
        "dma_slot_device::out_int_callback": method_dma_slot_device__out_int_callback,
        "dma_slot_device::in_mreq_callback": method_dma_slot_device__in_mreq_callback,
        "dma_slot_device::out_mreq_callback": method_dma_slot_device__out_mreq_callback,
        "dma_slot_device::in_iorq_callback": method_dma_slot_device__in_iorq_callback,
        "dma_slot_device::out_iorq_callback": method_dma_slot_device__out_iorq_callback,
        "dma_slot_device::io": method_dma_slot_device__io,
        "io=": method_io_,
        "dma_slot_device::io=": method_dma_slot_device__io_
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["get_card_device", "m_in_iorq_cb", "m_in_mreq_cb", "m_out_busreq_cb", "m_out_int_cb", "m_out_iorq_cb", "m_out_mreq_cb", "set_options", "std::forward"];
definition.compiledStructMethods = {
    "m_f": (() => {
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
        function method_s(runtime) {
            const members = runtime.members;
            const h_s_val = members.s_val ?? 0;
            return ((h_s_val) & (128));
        }
        function method_z(runtime) {
            const members = runtime.members;
            const h_z_val = members.z_val ?? 0;
            return ((h_z_val) ? (0) : (64));
        }
        function method_yx(runtime) {
            const members = runtime.members;
            const h_yx_val = members.yx_val ?? 0;
            return ((h_yx_val) & (40));
        }
        function method_h(runtime) {
            const members = runtime.members;
            const h_h_val = members.h_val ?? 0;
            return ((h_h_val) & (16));
        }
        function method_pv(runtime) {
            const members = runtime.members;
            const h_pv_val = members.pv_val ?? 0;
            let val = ((h_pv_val) & 0xff);
            val = ((((val) ^ (((val) >>> (4))))) & 0xff);
            val = ((((val) ^ (((val) << (2))))) & 0xff);
            val = ((((val) ^ (((val) >>> (1))))) & 0xff);
            return (((~val)) & (4));
        }
        function method_busreq_w(runtime, state) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_out_busreq_cb"];
            (__L0 ? __L0(Number(state)) : typeof members.m_out_busreq_cb === 'function' ? members.m_out_busreq_cb(state) : runtime.invoke("m_out_busreq_cb", state));
        }
        function method_int_w(runtime, state) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_out_int_cb"];
            (__L0 ? __L0(Number(state)) : typeof members.m_out_int_cb === 'function' ? members.m_out_int_cb(state) : runtime.invoke("m_out_int_cb", state));
        }
        function method_mreq_w(runtime, state) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_out_mreq_cb"];
            (__L0 ? __L0(Number(state)) : typeof members.m_out_mreq_cb === 'function' ? members.m_out_mreq_cb(state) : runtime.invoke("m_out_mreq_cb", state));
        }
        function method_mreq_r(runtime, offset) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_in_mreq_cb"];
            return (((__L0 ? __L0(Number(offset)) : typeof members.m_in_mreq_cb === 'function' ? members.m_in_mreq_cb(offset) : runtime.invoke("m_in_mreq_cb", offset))) & 0xff);
        }
        function method_iorq_w(runtime, state) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_out_iorq_cb"];
            (__L0 ? __L0(Number(state)) : typeof members.m_out_iorq_cb === 'function' ? members.m_out_iorq_cb(state) : runtime.invoke("m_out_iorq_cb", state));
        }
        function method_iorq_r(runtime, offset) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_in_iorq_cb"];
            return (((__L0 ? __L0(Number(offset)) : typeof members.m_in_iorq_cb === 'function' ? members.m_in_iorq_cb(offset) : runtime.invoke("m_in_iorq_cb", offset))) & 0xff);
        }
        function method_out_busreq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_out_busreq_callback(runtime, members.m_out_busreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_busreq_cb, "bind"));
        }
        function __deref_out_busreq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_out_int_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_out_int_callback(runtime, members.m_out_int_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_cb, "bind"));
        }
        function __deref_out_int_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_in_mreq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_in_mreq_callback(runtime, members.m_in_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_mreq_cb, "bind"));
        }
        function __deref_in_mreq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_out_mreq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_out_mreq_callback(runtime, members.m_out_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_mreq_cb, "bind"));
        }
        function __deref_out_mreq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_in_iorq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_in_iorq_callback(runtime, members.m_in_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_iorq_cb, "bind"));
        }
        function __deref_in_iorq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_out_iorq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_out_iorq_callback(runtime, members.m_out_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_iorq_cb, "bind"));
        }
        function __deref_out_iorq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_dma_slot_device__out_busreq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_dma_slot_device__out_busreq_callback(runtime, members.m_out_busreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_busreq_cb, "bind"));
        }
        function __deref_dma_slot_device__out_busreq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_dma_slot_device__out_int_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_dma_slot_device__out_int_callback(runtime, members.m_out_int_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_cb, "bind"));
        }
        function __deref_dma_slot_device__out_int_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_dma_slot_device__in_mreq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_dma_slot_device__in_mreq_callback(runtime, members.m_in_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_mreq_cb, "bind"));
        }
        function __deref_dma_slot_device__in_mreq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_dma_slot_device__out_mreq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_dma_slot_device__out_mreq_callback(runtime, members.m_out_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_mreq_cb, "bind"));
        }
        function __deref_dma_slot_device__out_mreq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_dma_slot_device__in_iorq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_dma_slot_device__in_iorq_callback(runtime, members.m_in_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_iorq_cb, "bind"));
        }
        function __deref_dma_slot_device__in_iorq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_dma_slot_device__out_iorq_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_dma_slot_device__out_iorq_callback(runtime, members.m_out_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_iorq_cb, "bind"));
        }
        function __deref_dma_slot_device__out_iorq_callback(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
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
            "s": method_s,
            "z": method_z,
            "yx": method_yx,
            "h": method_h,
            "pv": method_pv,
            "busreq_w": method_busreq_w,
            "int_w": method_int_w,
            "mreq_w": method_mreq_w,
            "mreq_r": method_mreq_r,
            "iorq_w": method_iorq_w,
            "iorq_r": method_iorq_r,
            "out_busreq_callback": method_out_busreq_callback,
            "out_int_callback": method_out_int_callback,
            "in_mreq_callback": method_in_mreq_callback,
            "out_mreq_callback": method_out_mreq_callback,
            "in_iorq_callback": method_in_iorq_callback,
            "out_iorq_callback": method_out_iorq_callback,
            "dma_slot_device::out_busreq_callback": method_dma_slot_device__out_busreq_callback,
            "dma_slot_device::out_int_callback": method_dma_slot_device__out_int_callback,
            "dma_slot_device::in_mreq_callback": method_dma_slot_device__in_mreq_callback,
            "dma_slot_device::out_mreq_callback": method_dma_slot_device__out_mreq_callback,
            "dma_slot_device::in_iorq_callback": method_dma_slot_device__in_iorq_callback,
            "dma_slot_device::out_iorq_callback": method_dma_slot_device__out_iorq_callback
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
