import deviceData from './spectrum_expansion_slot.device.ir.json' with { type: 'json' };
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
    function method_romcs(runtime) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            return (members.m_card.romcs?.() ?? 0);
        }
        else {
            return 0;
        }
    }
    function method_pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            (members.m_card.pre_opcode_fetch?.(offset) ?? 0);
        }
    }
    function method_post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            (members.m_card.post_opcode_fetch?.(offset) ?? 0);
        }
    }
    function method_pre_data_fetch(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            (members.m_card.pre_data_fetch?.(offset) ?? 0);
        }
    }
    function method_post_data_fetch(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            (members.m_card.post_data_fetch?.(offset) ?? 0);
        }
    }
    function method_iorq_r(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            return (((members.m_card.iorq_r?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((((((offset) & (1))) ? (method_fb_r(runtime)) : (255))) & 0xff);
        }
    }
    function method_fb_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_fb_r_handler"];
        return (((__L0 ? __L0() : typeof members.m_fb_r_handler === 'function' ? members.m_fb_r_handler() : runtime.invoke("m_fb_r_handler"))) & 0xff);
    }
    function method_iorq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_card ?? 0)) {
            (members.m_card.iorq_w?.(offset, data) ?? 0);
        }
    }
    function method_mreq_r(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            return (((members.m_card.mreq_r?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_mreq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_card ?? 0)) {
            (members.m_card.mreq_w?.(offset, data) ?? 0);
        }
    }
    function method_spectrum_expansion_slot_device(runtime, mconfig, tag, owner, slot_options, default_option) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(slot_options) : runtime.macro("std::forward", slot_options)), default_option, 0) : runtime.macro("set_options", (__L0 ? __L0(slot_options) : runtime.macro("std::forward", slot_options)), default_option, 0));
    }
    function method_irq_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_irq_handler(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function __deref_irq_handler(runtime, p) {
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
    function method_nmi_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_nmi_handler(runtime, members.m_nmi_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_nmi_handler, "bind"));
    }
    function __deref_nmi_handler(runtime, p) {
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
    function method_fb_r_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_fb_r_handler(runtime, members.m_fb_r_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_fb_r_handler, "bind"));
    }
    function __deref_fb_r_handler(runtime, p) {
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
    function method_irq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_handler"];
        (__L0 ? __L0(Number(state)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(state) : runtime.invoke("m_irq_handler", state));
    }
    function method_nmi_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_nmi_handler"];
        (__L0 ? __L0(Number(state)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(state) : runtime.invoke("m_nmi_handler", state));
    }
    function method_spectrum_expansion_slot_device__spectrum_expansion_slot_device(runtime, mconfig, tag, owner, slot_options, default_option) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(slot_options) : runtime.macro("std::forward", slot_options)), default_option, 0) : runtime.macro("set_options", (__L0 ? __L0(slot_options) : runtime.macro("std::forward", slot_options)), default_option, 0));
    }
    function method_spectrum_expansion_slot_device__irq_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_spectrum_expansion_slot_device__irq_handler(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function __deref_spectrum_expansion_slot_device__irq_handler(runtime, p) {
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
    function method_spectrum_expansion_slot_device__nmi_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_spectrum_expansion_slot_device__nmi_handler(runtime, members.m_nmi_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_nmi_handler, "bind"));
    }
    function __deref_spectrum_expansion_slot_device__nmi_handler(runtime, p) {
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
    function method_spectrum_expansion_slot_device__fb_r_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_spectrum_expansion_slot_device__fb_r_handler(runtime, members.m_fb_r_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_fb_r_handler, "bind"));
    }
    function __deref_spectrum_expansion_slot_device__fb_r_handler(runtime, p) {
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
    function method_spectrum_expansion_slot_device__irq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_handler"];
        (__L0 ? __L0(Number(state)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(state) : runtime.invoke("m_irq_handler", state));
    }
    function method_spectrum_expansion_slot_device__nmi_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_nmi_handler"];
        (__L0 ? __L0(Number(state)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(state) : runtime.invoke("m_nmi_handler", state));
    }
    function method_spectrum_expansion_slot_device__fb_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_fb_r_handler"];
        return (((__L0 ? __L0() : typeof members.m_fb_r_handler === 'function' ? members.m_fb_r_handler() : runtime.invoke("m_fb_r_handler"))) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "romcs": method_romcs,
        "pre_opcode_fetch": method_pre_opcode_fetch,
        "post_opcode_fetch": method_post_opcode_fetch,
        "pre_data_fetch": method_pre_data_fetch,
        "post_data_fetch": method_post_data_fetch,
        "iorq_r": method_iorq_r,
        "fb_r": method_fb_r,
        "iorq_w": method_iorq_w,
        "mreq_r": method_mreq_r,
        "mreq_w": method_mreq_w,
        "spectrum_expansion_slot_device": method_spectrum_expansion_slot_device,
        "irq_handler": method_irq_handler,
        "nmi_handler": method_nmi_handler,
        "fb_r_handler": method_fb_r_handler,
        "irq_w": method_irq_w,
        "nmi_w": method_nmi_w,
        "spectrum_expansion_slot_device::spectrum_expansion_slot_device": method_spectrum_expansion_slot_device__spectrum_expansion_slot_device,
        "spectrum_expansion_slot_device::irq_handler": method_spectrum_expansion_slot_device__irq_handler,
        "spectrum_expansion_slot_device::nmi_handler": method_spectrum_expansion_slot_device__nmi_handler,
        "spectrum_expansion_slot_device::fb_r_handler": method_spectrum_expansion_slot_device__fb_r_handler,
        "spectrum_expansion_slot_device::irq_w": method_spectrum_expansion_slot_device__irq_w,
        "spectrum_expansion_slot_device::nmi_w": method_spectrum_expansion_slot_device__nmi_w,
        "spectrum_expansion_slot_device::fb_r": method_spectrum_expansion_slot_device__fb_r
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["get_card_device", "m_fb_r_handler", "m_irq_handler", "m_nmi_handler", "set_options", "std::forward"];
definition.slot.options["intf2"].compiledMethods = (() => {
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
    function method_pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_pre_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_post_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_mreq_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cart.exists"], __L1 = __l["m_cart.get_rom_base"];
        const h_m_cart = members.m_cart ?? 0;
        if ((((h_m_cart) && ((__L0 ? __L0() : ((members.m_cart)?.exists?.() ?? 0)))) ? 1 : 0)) {
            return ((runtime.readIndex((__L1 ? __L1() : ((members.m_cart)?.get_rom_base?.() ?? 0)), ((offset) & (16383)))) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_mreq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_iorq_r(runtime, offset) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        let data = ((((((offset) & (1))) ? ((__t0 = __deref_iorq_r(runtime, members.m_slot), typeof __t0.fb_r === 'function' ? __t0.fb_r() : typeof __t0.fb_r === 'number' || typeof __t0.fb_r === 'boolean' ? __t0.fb_r : runtime.container(members.m_slot, "fb_r"))) : (255))) & 0xff);
        switch (((offset) & (255))) {
            case 254:
                {
                    if (((Number(((((offset) >>> (8))) & (8))) === Number(0)) ? 1 : 0)) {
                        data = (((((__t1 = __deref_iorq_r(runtime, members.m_exp_line3), typeof __t1.read === 'function' ? __t1.read() : typeof __t1.read === 'number' || typeof __t1.read === 'boolean' ? __t1.read : runtime.container(members.m_exp_line3, "read"))) | (224))) & 0xff);
                    }
                    if (((Number(((((offset) >>> (8))) & (16))) === Number(0)) ? 1 : 0)) {
                        data = (((((__t2 = __deref_iorq_r(runtime, members.m_exp_line4), typeof __t2.read === 'function' ? __t2.read() : typeof __t2.read === 'number' || typeof __t2.read === 'boolean' ? __t2.read : runtime.container(members.m_exp_line4, "read"))) | (224))) & 0xff);
                    }
                    break;
                }
        }
        return ((data) & 0xff);
    }
    function __deref_iorq_r(runtime, p) {
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
    function method_iorq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_romcs(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cart.exists"];
        const h_m_cart = members.m_cart ?? 0;
        if ((((h_m_cart) && ((__L0 ? __L0() : ((members.m_cart)?.exists?.() ?? 0)))) ? 1 : 0)) {
            return 1;
        }
        else {
            return 0;
        }
    }
    function method_device_spectrum_expansion_interface__pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__pre_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__post_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__mreq_r(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_spectrum_expansion_interface__mreq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_spectrum_expansion_interface__iorq_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return ((((((offset) & (1))) ? ((__t0 = __deref_device_spectrum_expansion_interface__iorq_r(runtime, members.m_slot), typeof __t0.fb_r === 'function' ? __t0.fb_r() : typeof __t0.fb_r === 'number' || typeof __t0.fb_r === 'boolean' ? __t0.fb_r : runtime.container(members.m_slot, "fb_r"))) : (255))) & 0xff);
    }
    function __deref_device_spectrum_expansion_interface__iorq_r(runtime, p) {
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
    function method_device_spectrum_expansion_interface__iorq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_spectrum_expansion_interface__romcs(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "pre_opcode_fetch": method_pre_opcode_fetch,
        "post_opcode_fetch": method_post_opcode_fetch,
        "pre_data_fetch": method_pre_data_fetch,
        "post_data_fetch": method_post_data_fetch,
        "mreq_r": method_mreq_r,
        "mreq_w": method_mreq_w,
        "iorq_r": method_iorq_r,
        "iorq_w": method_iorq_w,
        "romcs": method_romcs,
        "device_spectrum_expansion_interface::pre_opcode_fetch": method_device_spectrum_expansion_interface__pre_opcode_fetch,
        "device_spectrum_expansion_interface::post_opcode_fetch": method_device_spectrum_expansion_interface__post_opcode_fetch,
        "device_spectrum_expansion_interface::pre_data_fetch": method_device_spectrum_expansion_interface__pre_data_fetch,
        "device_spectrum_expansion_interface::post_data_fetch": method_device_spectrum_expansion_interface__post_data_fetch,
        "device_spectrum_expansion_interface::mreq_r": method_device_spectrum_expansion_interface__mreq_r,
        "device_spectrum_expansion_interface::mreq_w": method_device_spectrum_expansion_interface__mreq_w,
        "device_spectrum_expansion_interface::iorq_r": method_device_spectrum_expansion_interface__iorq_r,
        "device_spectrum_expansion_interface::iorq_w": method_device_spectrum_expansion_interface__iorq_w,
        "device_spectrum_expansion_interface::romcs": method_device_spectrum_expansion_interface__romcs,
        "device_start": method_device_start
    };
    return __methodTable;
})();
definition.slot.options["intf2"].compiledMethodLinks = ["m_cart.exists", "m_cart.get_rom_base"];
definition.slot.options["intf2"].children[0].definition.compiledMethods = (() => {
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_card_device"];
        let __t0, __t1;
        members.m_cart = (__L0 ? __L0() : runtime.macro("get_card_device"));
        (__t0 = __deref_device_start(runtime, members.m_device_image_load), typeof __t0.resolve === 'function' ? __t0.resolve() : typeof __t0.resolve === 'number' || typeof __t0.resolve === 'boolean' ? __t0.resolve : runtime.container(members.m_device_image_load, "resolve"));
        (__t1 = __deref_device_start(runtime, members.m_device_image_unload), typeof __t1.resolve === 'function' ? __t1.resolve() : typeof __t1.resolve === 'number' || typeof __t1.resolve === 'boolean' ? __t1.resolve : runtime.container(members.m_device_image_unload, "resolve"));
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
    function method_call_load(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::error_condition"], __L1 = __l["std::string"], __L2 = __l["std::make_pair"], __L3 = __l["m_device_image_load.isnull"], __L4 = __l["m_device_image_load"];
        const h_m_device_image_load = members.m_device_image_load ?? 0;
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return (__L2 ? __L2((__L0 ? __L0() : runtime.macro("std::error_condition")), (__L1 ? __L1() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__L0 ? __L0() : runtime.macro("std::error_condition")), (__L1 ? __L1() : runtime.macro("std::string"))));
        }
        else {
            if ((((__L3 ? __L3() : typeof (h_m_device_image_load)?.isnull === 'function' ? (h_m_device_image_load).isnull() : ((__L3 ?? globalThis.mamekitMissingCall?.("m_device_image_load.isnull"))?.() ?? 0))) ? 0 : 1)) {
                return (__L4 ? __L4((members.this ?? 0)) : runtime.macro("m_device_image_load", (members.this ?? 0)));
            }
            else {
                let len = ((method_common_get_size(runtime, "rom")) >>> 0);
                method_rom_alloc(runtime, len, (members.m_width ?? 0), (members.m_endianness ?? 0));
                method_common_load_rom(runtime, method_get_rom_base(runtime), len, "rom");
                return (__L2 ? __L2((__L0 ? __L0() : runtime.macro("std::error_condition")), (__L1 ? __L1() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__L0 ? __L0() : runtime.macro("std::error_condition")), (__L1 ? __L1() : runtime.macro("std::string"))));
            }
        }
    }
    function method_common_get_size(runtime, region) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["loaded_through_softlist"], __L1 = __l["length"], __L2 = __l["get_software_region_length"];
        return (((((((__L0 ? __L0() : runtime.macro("loaded_through_softlist"))) ? 0 : 1)) ? ((__L1 ? __L1() : runtime.macro("length"))) : ((__L2 ? __L2(region) : runtime.macro("get_software_region_length", region))))) >>> 0);
    }
    function method_rom_alloc(runtime, size, width, end) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["tag"];
        if ((members.m_cart ?? 0)) {
            (members.m_cart.rom_alloc?.(size, width, end, (__L0 ? __L0() : runtime.macro("tag"))) ?? 0);
        }
    }
    function method_common_load_rom(runtime, ROM, len, region) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["loaded_through_softlist"], __L1 = __l["fread"], __L2 = __l["get_software_region"], __L3 = __l["memcpy"];
        if ((((__L0 ? __L0() : runtime.macro("loaded_through_softlist"))) ? 0 : 1)) {
            (__L1 ? __L1(ROM, len) : runtime.macro("fread", ROM, len));
        }
        else {
            (__L3 ? __L3(ROM, (__L2 ? __L2(region) : runtime.macro("get_software_region", region)), len) : runtime.macro("memcpy", ROM, (__L2 ? __L2(region) : runtime.macro("get_software_region", region)), len));
        }
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return 0;
        }
        else {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_rom_base?.() ?? 0);
            }
        }
    }
    function method_call_unload(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_device_image_unload.isnull"], __L1 = __l["m_device_image_unload"];
        const h_m_device_image_unload = members.m_device_image_unload ?? 0;
        if ((((__L0 ? __L0() : typeof (h_m_device_image_unload)?.isnull === 'function' ? (h_m_device_image_unload).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_device_image_unload.isnull"))?.() ?? 0))) ? 0 : 1)) {
            return (__L1 ? __L1((members.this ?? 0)) : runtime.macro("m_device_image_unload", (members.this ?? 0)));
        }
    }
    function method_get_default_card_software(runtime, hook) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["software_get_default_slot"];
        return (__L0 ? __L0((members.m_default_card ?? 0)) : runtime.macro("software_get_default_slot", (members.m_default_card ?? 0)));
    }
    function method_read_rom(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.read_rom?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_read16_rom(runtime, offset, mem_mask = 65535) {
        const members = runtime.members;
        mem_mask = ((mem_mask) & 0xffff);
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.read16_rom?.(offset, mem_mask) ?? 0)) & 0xffff);
        }
        else {
            return ((65535) & 0xffff);
        }
    }
    function method_read32_rom(runtime, offset, mem_mask = 4294967295) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.read32_rom?.(offset, mem_mask) ?? 0)) >>> 0);
        }
        else {
            return ((4294967295) >>> 0);
        }
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.read_ram?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.write_ram?.(offset, data) ?? 0);
        }
    }
    function method_set_interface(runtime, $interface) {
        const members = runtime.members;
        members.m_interface = $interface;
    }
    function method_set_default_card(runtime, def) {
        const members = runtime.members;
        members.m_default_card = def;
    }
    function method_set_extensions(runtime, exts) {
        const members = runtime.members;
        members.m_extensions = exts;
    }
    function method_set_width(runtime, width) {
        const members = runtime.members;
        members.m_width = ((width) | 0);
    }
    function method_set_endian(runtime, end) {
        const members = runtime.members;
        members.m_endianness = end;
    }
    function method_is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_image_interface(runtime) {
        const members = runtime.members;
        return (members.m_interface ?? 0);
    }
    function method_file_extensions(runtime) {
        const members = runtime.members;
        return (members.m_extensions ?? 0);
    }
    function method_ram_alloc(runtime, size) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            (members.m_cart.ram_alloc?.(size) ?? 0);
        }
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return ((0) >>> 0);
        }
        else {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_rom_size?.() ?? 0)) >>> 0);
            }
        }
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return (((members.m_cart ?? 0)) ? ((members.m_cart.get_ram_base?.() ?? 0)) : (0));
    }
    function method_save_ram(runtime) {
        const members = runtime.members;
        if (((((members.m_cart ?? 0)) && ((members.m_cart.get_ram_size?.() ?? 0))) ? 1 : 0)) {
            (members.m_cart.save_ram?.() ?? 0);
        }
    }
    function method_generic_slot_device__set_interface(runtime, $interface) {
        const members = runtime.members;
        members.m_interface = $interface;
    }
    function method_generic_slot_device__set_default_card(runtime, def) {
        const members = runtime.members;
        members.m_default_card = def;
    }
    function method_generic_slot_device__set_extensions(runtime, exts) {
        const members = runtime.members;
        members.m_extensions = exts;
    }
    function method_generic_slot_device__set_width(runtime, width) {
        const members = runtime.members;
        members.m_width = ((width) | 0);
    }
    function method_generic_slot_device__set_endian(runtime, end) {
        const members = runtime.members;
        members.m_endianness = end;
    }
    function method_generic_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_generic_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return (members.m_interface ?? 0);
    }
    function method_generic_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return (members.m_extensions ?? 0);
    }
    function method_generic_slot_device__rom_alloc(runtime, size, width, end) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["tag"];
        if ((members.m_cart ?? 0)) {
            (members.m_cart.rom_alloc?.(size, width, end, (__L0 ? __L0() : runtime.macro("tag"))) ?? 0);
        }
    }
    function method_generic_slot_device__ram_alloc(runtime, size) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            (members.m_cart.ram_alloc?.(size) ?? 0);
        }
    }
    function method_generic_slot_device__get_rom_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return 0;
        }
        else {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (members.m_cart.get_region_base?.() ?? 0);
            }
            else {
                return (members.m_cart.get_rom_base?.() ?? 0);
            }
        }
    }
    function method_generic_slot_device__get_rom_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["user_loadable"];
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return ((0) >>> 0);
        }
        else {
            if ((((__L0 ? __L0() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (((members.m_cart.get_region_size?.() ?? 0)) >>> 0);
            }
            else {
                return (((members.m_cart.get_rom_size?.() ?? 0)) >>> 0);
            }
        }
    }
    function method_generic_slot_device__get_ram_base(runtime) {
        const members = runtime.members;
        return (((members.m_cart ?? 0)) ? ((members.m_cart.get_ram_base?.() ?? 0)) : (0));
    }
    function method_generic_slot_device__save_ram(runtime) {
        const members = runtime.members;
        if (((((members.m_cart ?? 0)) && ((members.m_cart.get_ram_size?.() ?? 0))) ? 1 : 0)) {
            (members.m_cart.save_ram?.() ?? 0);
        }
    }
    function method_generic_cartslot_device(runtime, mconfig, tag, owner, opts, intf, exts = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["set_fixed"];
        (typeof opts === 'function' ? opts((members.this ?? 0)) : runtime.macro("opts", (members.this ?? 0)));
        (__L0 ? __L0(0) : runtime.macro("set_fixed", 0));
        method_set_interface(runtime, intf);
        if (exts) {
            method_set_extensions(runtime, exts);
        }
    }
    function method_generic_cartslot_device__generic_cartslot_device(runtime, mconfig, tag, owner, opts, intf, exts = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["set_fixed"];
        (typeof opts === 'function' ? opts((members.this ?? 0)) : runtime.macro("opts", (members.this ?? 0)));
        (__L0 ? __L0(0) : runtime.macro("set_fixed", 0));
        method_set_interface(runtime, intf);
        if (exts) {
            method_set_extensions(runtime, exts);
        }
    }
    function method_generic_cartslot_device__image_type_name(runtime) {
        const members = runtime.members;
        return "cartridge";
    }
    function method_generic_cartslot_device__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "cart";
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
        "device_start": method_device_start,
        "call_load": method_call_load,
        "common_get_size": method_common_get_size,
        "rom_alloc": method_rom_alloc,
        "common_load_rom": method_common_load_rom,
        "get_rom_base": method_get_rom_base,
        "call_unload": method_call_unload,
        "get_default_card_software": method_get_default_card_software,
        "read_rom": method_read_rom,
        "read16_rom": method_read16_rom,
        "read32_rom": method_read32_rom,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "set_interface": method_set_interface,
        "set_default_card": method_set_default_card,
        "set_extensions": method_set_extensions,
        "set_width": method_set_width,
        "set_endian": method_set_endian,
        "is_reset_on_load": method_is_reset_on_load,
        "image_interface": method_image_interface,
        "file_extensions": method_file_extensions,
        "ram_alloc": method_ram_alloc,
        "get_rom_size": method_get_rom_size,
        "get_ram_base": method_get_ram_base,
        "save_ram": method_save_ram,
        "generic_slot_device::set_interface": method_generic_slot_device__set_interface,
        "generic_slot_device::set_default_card": method_generic_slot_device__set_default_card,
        "generic_slot_device::set_extensions": method_generic_slot_device__set_extensions,
        "generic_slot_device::set_width": method_generic_slot_device__set_width,
        "generic_slot_device::set_endian": method_generic_slot_device__set_endian,
        "generic_slot_device::is_reset_on_load": method_generic_slot_device__is_reset_on_load,
        "generic_slot_device::image_interface": method_generic_slot_device__image_interface,
        "generic_slot_device::file_extensions": method_generic_slot_device__file_extensions,
        "generic_slot_device::rom_alloc": method_generic_slot_device__rom_alloc,
        "generic_slot_device::ram_alloc": method_generic_slot_device__ram_alloc,
        "generic_slot_device::get_rom_base": method_generic_slot_device__get_rom_base,
        "generic_slot_device::get_rom_size": method_generic_slot_device__get_rom_size,
        "generic_slot_device::get_ram_base": method_generic_slot_device__get_ram_base,
        "generic_slot_device::save_ram": method_generic_slot_device__save_ram,
        "generic_cartslot_device": method_generic_cartslot_device,
        "generic_cartslot_device::generic_cartslot_device": method_generic_cartslot_device__generic_cartslot_device,
        "generic_cartslot_device::image_type_name": method_generic_cartslot_device__image_type_name,
        "generic_cartslot_device::image_brief_type_name": method_generic_cartslot_device__image_brief_type_name
    };
    return __methodTable;
})();
definition.slot.options["intf2"].children[0].definition.compiledMethodLinks = ["fread", "get_card_device", "get_software_region", "get_software_region_length", "length", "loaded_through_softlist", "m_device_image_load", "m_device_image_load.isnull", "m_device_image_unload", "m_device_image_unload.isnull", "memcpy", "rom_software_list_loader::instance", "set_fixed", "software_get_default_slot", "std::error_condition", "std::make_pair", "std::string", "tag", "user_loadable"];
definition.slot.options["intf2"].children[0].definition.slot.options["rom"].compiledMethods = (() => {
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
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_region_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        return (((__t0 = __deref_get_region_base(runtime, members.m_region), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region, "found"))) ? ((__t1 = __deref_get_region_base(runtime, members.m_region), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region, "base"))) : (0));
    }
    function __deref_get_region_base(runtime, p) {
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
    function method_get_region_size(runtime) {
        const members = runtime.members;
        let __t0;
        return (((((__t0 = __deref_get_region_size(runtime, members.m_region), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region, "found"))) ? (runtime.container(members.m_region, "bytes")) : (0))) >>> 0);
    }
    function __deref_get_region_size(runtime, p) {
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
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_read_rom(runtime, offset) {
        const members = runtime.members;
        if ((((offset) < ((members.m_rom_size ?? 0))) ? 1 : 0)) {
            return ((runtime.readIndex((members.m_rom ?? 0), offset)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_generic_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_generic_cart_interface__get_region_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        return (((__t0 = __deref_device_generic_cart_interface__get_region_base(runtime, members.m_region), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region, "found"))) ? ((__t1 = __deref_device_generic_cart_interface__get_region_base(runtime, members.m_region), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region, "base"))) : (0));
    }
    function __deref_device_generic_cart_interface__get_region_base(runtime, p) {
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
    function method_device_generic_cart_interface__get_region_size(runtime) {
        const members = runtime.members;
        let __t0;
        return (((((__t0 = __deref_device_generic_cart_interface__get_region_size(runtime, members.m_region), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region, "found"))) ? (runtime.container(members.m_region, "bytes")) : (0))) >>> 0);
    }
    function __deref_device_generic_cart_interface__get_region_size(runtime, p) {
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
    function method_device_generic_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_generic_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_generic_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_generic_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    function method_generic_rom_device__device_start(runtime) {
        const members = runtime.members;
    }
    function method_device_generic_cart_interface__read_rom(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "map_non_power_of_two": method_map_non_power_of_two,
        "get_rom_base": method_get_rom_base,
        "get_rom_size": method_get_rom_size,
        "get_region_base": method_get_region_base,
        "get_region_size": method_get_region_size,
        "get_ram_base": method_get_ram_base,
        "get_ram_size": method_get_ram_size,
        "read_rom": method_read_rom,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "device_generic_cart_interface::get_rom_base": method_device_generic_cart_interface__get_rom_base,
        "device_generic_cart_interface::get_rom_size": method_device_generic_cart_interface__get_rom_size,
        "device_generic_cart_interface::get_region_base": method_device_generic_cart_interface__get_region_base,
        "device_generic_cart_interface::get_region_size": method_device_generic_cart_interface__get_region_size,
        "device_generic_cart_interface::get_ram_base": method_device_generic_cart_interface__get_ram_base,
        "device_generic_cart_interface::get_ram_size": method_device_generic_cart_interface__get_ram_size,
        "device_start": method_device_start,
        "generic_rom_device::device_start": method_generic_rom_device__device_start,
        "device_generic_cart_interface::read_rom": method_device_generic_cart_interface__read_rom,
        "install_non_power_of_two__5": method_install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["intf2"].children[0].definition.slot.options["rom"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["kempjoy"].compiledMethods = (() => {
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
    function method_pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_pre_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_post_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_mreq_r(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_mreq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_iorq_r(runtime, offset) {
        const members = runtime.members;
        let __t0, __t1;
        let data = ((((((offset) & (1))) ? ((__t0 = __deref_iorq_r(runtime, members.m_slot), typeof __t0.fb_r === 'function' ? __t0.fb_r() : typeof __t0.fb_r === 'number' || typeof __t0.fb_r === 'boolean' ? __t0.fb_r : runtime.container(members.m_slot, "fb_r"))) : (255))) & 0xff);
        if (((Number(((offset) & (224))) === Number(0)) ? 1 : 0)) {
            data = (((((__t1 = __deref_iorq_r(runtime, members.m_joy), typeof __t1.read === 'function' ? __t1.read() : typeof __t1.read === 'number' || typeof __t1.read === 'boolean' ? __t1.read : runtime.container(members.m_joy, "read"))) & (31))) & 0xff);
        }
        return ((data) & 0xff);
    }
    function __deref_iorq_r(runtime, p) {
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
    function method_iorq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_romcs(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_spectrum_expansion_interface__pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__pre_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__post_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__mreq_r(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_spectrum_expansion_interface__mreq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_spectrum_expansion_interface__iorq_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return ((((((offset) & (1))) ? ((__t0 = __deref_device_spectrum_expansion_interface__iorq_r(runtime, members.m_slot), typeof __t0.fb_r === 'function' ? __t0.fb_r() : typeof __t0.fb_r === 'number' || typeof __t0.fb_r === 'boolean' ? __t0.fb_r : runtime.container(members.m_slot, "fb_r"))) : (255))) & 0xff);
    }
    function __deref_device_spectrum_expansion_interface__iorq_r(runtime, p) {
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
    function method_device_spectrum_expansion_interface__iorq_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_spectrum_expansion_interface__romcs(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "pre_opcode_fetch": method_pre_opcode_fetch,
        "post_opcode_fetch": method_post_opcode_fetch,
        "pre_data_fetch": method_pre_data_fetch,
        "post_data_fetch": method_post_data_fetch,
        "mreq_r": method_mreq_r,
        "mreq_w": method_mreq_w,
        "iorq_r": method_iorq_r,
        "iorq_w": method_iorq_w,
        "romcs": method_romcs,
        "device_spectrum_expansion_interface::pre_opcode_fetch": method_device_spectrum_expansion_interface__pre_opcode_fetch,
        "device_spectrum_expansion_interface::post_opcode_fetch": method_device_spectrum_expansion_interface__post_opcode_fetch,
        "device_spectrum_expansion_interface::pre_data_fetch": method_device_spectrum_expansion_interface__pre_data_fetch,
        "device_spectrum_expansion_interface::post_data_fetch": method_device_spectrum_expansion_interface__post_data_fetch,
        "device_spectrum_expansion_interface::mreq_r": method_device_spectrum_expansion_interface__mreq_r,
        "device_spectrum_expansion_interface::mreq_w": method_device_spectrum_expansion_interface__mreq_w,
        "device_spectrum_expansion_interface::iorq_r": method_device_spectrum_expansion_interface__iorq_r,
        "device_spectrum_expansion_interface::iorq_w": method_device_spectrum_expansion_interface__iorq_w,
        "device_spectrum_expansion_interface::romcs": method_device_spectrum_expansion_interface__romcs,
        "device_start": method_device_start
    };
    return __methodTable;
})();
export const device = definition;
export default device;
