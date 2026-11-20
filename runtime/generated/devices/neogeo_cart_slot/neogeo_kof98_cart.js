import deviceData from './neogeo_kof98_cart.device.ir.json' with { type: 'json' };
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
    function method_rom_r(runtime, offset) {
        const members = runtime.members;
        let rom = ((method_get_rom_size(runtime)) ? (method_get_rom_base(runtime)) : (method_get_region_rom_base(runtime)));
        let rom$s = undefined, rom$o = 0;
        if (ArrayBuffer.isView(rom) || Array.isArray(rom))
            rom$s = rom;
        else if (rom !== null && typeof rom === 'object' && rom.generatedPointer === true && rom.path === undefined && rom.target === undefined && (ArrayBuffer.isView(rom.source) || Array.isArray(rom.source))) {
            rom$s = rom.source;
            rom$o = rom.offset;
        }
        return (((rom$s !== undefined ? (rom$s[rom$o + (offset)] ?? 0) : runtime.readIndex(rom, offset))) & 0xffff);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((((members.m_rom).length) * (2))) >>> 0);
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_rom).length) > Number(0)) ? 1 : 0)) ? (__addr_get_rom_base(runtime, (members.m_rom ?? 0), 0)) : (0));
    }
    function __addr_get_rom_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_region_rom_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_region_rom = members.m_region_rom ?? 0;
        if ((__t0 = __deref_get_region_rom_base(runtime, members.m_region_rom), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_rom, "found"))) {
            return h_m_region_rom["as_u16&"](0);
        }
        return 0;
    }
    function __deref_get_region_rom_base(runtime, p) {
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
    function method_banksel_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
    }
    function method_ram_r(runtime, offset) {
        const members = runtime.members;
        return ((65535) & 0xffff);
    }
    function method_ram_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
    }
    function method_protection_r(runtime, space, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_prot.protection_r"];
        return (((__L0 ? __L0(offset) : ((members.m_prot)?.protection_r?.(offset) ?? 0))) & 0xffff);
    }
    function method_protection_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_prot.protection_w"];
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
        (__L0 ? __L0(data) : ((members.m_prot)?.protection_w?.(data) ?? 0));
    }
    function method_addon_r(runtime, offset) {
        const members = runtime.members;
        return ((65535) & 0xffff);
    }
    function method_get_bank_base(runtime, sel) {
        const members = runtime.members;
        sel = ((sel) & 0xffff);
        return ((0) >>> 0);
    }
    function method_get_special_bank(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_get_helper(runtime) {
        const members = runtime.members;
        return ((0) & 0xffff);
    }
    function method_get_fixed_bank_type(runtime) {
        const members = runtime.members;
        return ((0) | 0);
    }
    function method_rom_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_rom = runtime.resize(members.m_rom, runtime.divide(size, 2)));
    }
    function method_get_region_rom_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_get_region_rom_size(runtime, members.m_region_rom), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_rom, "found"))) {
            return ((runtime.container(members.m_region_rom, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_get_region_rom_size(runtime, p) {
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
    function method_fixed_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_fixed = runtime.resize(members.m_fixed, size));
    }
    function method_get_fixed_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_fixed).length) > Number(0)) ? 1 : 0)) ? (__addr_get_fixed_base(runtime, (members.m_fixed ?? 0), 0)) : (0));
    }
    function __addr_get_fixed_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_fixed_size(runtime) {
        const members = runtime.members;
        return (((members.m_fixed).length) >>> 0);
    }
    function method_get_region_fixed_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_get_region_fixed_base(runtime, members.m_region_fixed), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_fixed, "found"))) {
            return (__t1 = __deref_get_region_fixed_base(runtime, members.m_region_fixed), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_fixed, "base"));
        }
        return 0;
    }
    function __deref_get_region_fixed_base(runtime, p) {
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
    function method_get_region_fixed_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_get_region_fixed_size(runtime, members.m_region_fixed), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_fixed, "found"))) {
            return ((runtime.container(members.m_region_fixed, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_get_region_fixed_size(runtime, p) {
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
    function method_audio_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_audio = runtime.resize(members.m_audio, size));
    }
    function method_get_audio_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_audio).length) > Number(0)) ? 1 : 0)) ? (__addr_get_audio_base(runtime, (members.m_audio ?? 0), 0)) : (0));
    }
    function __addr_get_audio_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_audio_size(runtime) {
        const members = runtime.members;
        return (((members.m_audio).length) >>> 0);
    }
    function method_get_region_audio_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_get_region_audio_base(runtime, members.m_region_audio), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audio, "found"))) {
            return (__t1 = __deref_get_region_audio_base(runtime, members.m_region_audio), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_audio, "base"));
        }
        return 0;
    }
    function __deref_get_region_audio_base(runtime, p) {
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
    function method_get_region_audio_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_get_region_audio_size(runtime, members.m_region_audio), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audio, "found"))) {
            return ((runtime.container(members.m_region_audio, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_get_region_audio_size(runtime, p) {
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
    function method_audiocrypt_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_audiocrypt = runtime.resize(members.m_audiocrypt, size));
    }
    function method_get_audiocrypt_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_audiocrypt).length) > Number(0)) ? 1 : 0)) ? (__addr_get_audiocrypt_base(runtime, (members.m_audiocrypt ?? 0), 0)) : (0));
    }
    function __addr_get_audiocrypt_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_audiocrypt_size(runtime) {
        const members = runtime.members;
        return (((members.m_audiocrypt).length) >>> 0);
    }
    function method_get_region_audiocrypt_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_get_region_audiocrypt_base(runtime, members.m_region_audiocrypt), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audiocrypt, "found"))) {
            return (__t1 = __deref_get_region_audiocrypt_base(runtime, members.m_region_audiocrypt), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_audiocrypt, "base"));
        }
        return 0;
    }
    function __deref_get_region_audiocrypt_base(runtime, p) {
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
    function method_get_region_audiocrypt_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_get_region_audiocrypt_size(runtime, members.m_region_audiocrypt), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audiocrypt, "found"))) {
            return ((runtime.container(members.m_region_audiocrypt, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_get_region_audiocrypt_size(runtime, p) {
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
    function method_sprites_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_sprites = runtime.resize(members.m_sprites, size));
    }
    function method_get_sprites_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_sprites).length) > Number(0)) ? 1 : 0)) ? (__addr_get_sprites_base(runtime, (members.m_sprites ?? 0), 0)) : (0));
    }
    function __addr_get_sprites_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_sprites_size(runtime) {
        const members = runtime.members;
        return (((members.m_sprites).length) >>> 0);
    }
    function method_get_region_sprites_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_get_region_sprites_base(runtime, members.m_region_spr), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_spr, "found"))) {
            return (__t1 = __deref_get_region_sprites_base(runtime, members.m_region_spr), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_spr, "base"));
        }
        return 0;
    }
    function __deref_get_region_sprites_base(runtime, p) {
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
    function method_get_region_sprites_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_get_region_sprites_size(runtime, members.m_region_spr), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_spr, "found"))) {
            return ((runtime.container(members.m_region_spr, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_get_region_sprites_size(runtime, p) {
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
    function method_ym_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_ym = runtime.resize(members.m_ym, size));
    }
    function method_get_ym_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_ym).length) > Number(0)) ? 1 : 0)) ? (__addr_get_ym_base(runtime, (members.m_ym ?? 0), 0)) : (0));
    }
    function __addr_get_ym_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_ym_size(runtime) {
        const members = runtime.members;
        return (((members.m_ym).length) >>> 0);
    }
    function method_get_region_ym_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_get_region_ym_base(runtime, members.m_region_ym), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ym, "found"))) {
            return (__t1 = __deref_get_region_ym_base(runtime, members.m_region_ym), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_ym, "base"));
        }
        return 0;
    }
    function __deref_get_region_ym_base(runtime, p) {
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
    function method_get_region_ym_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_get_region_ym_size(runtime, members.m_region_ym), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ym, "found"))) {
            return ((runtime.container(members.m_region_ym, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_get_region_ym_size(runtime, p) {
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
    function method_ymdelta_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_ymdelta = runtime.resize(members.m_ymdelta, size));
    }
    function method_get_ymdelta_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_ymdelta).length) > Number(0)) ? 1 : 0)) ? (__addr_get_ymdelta_base(runtime, (members.m_ymdelta ?? 0), 0)) : (0));
    }
    function __addr_get_ymdelta_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_ymdelta_size(runtime) {
        const members = runtime.members;
        return (((members.m_ymdelta).length) >>> 0);
    }
    function method_get_region_ymdelta_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_get_region_ymdelta_base(runtime, members.m_region_ymd), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ymd, "found"))) {
            return (__t1 = __deref_get_region_ymdelta_base(runtime, members.m_region_ymd), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_ymd, "base"));
        }
        return 0;
    }
    function __deref_get_region_ymdelta_base(runtime, p) {
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
    function method_get_region_ymdelta_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_get_region_ymdelta_size(runtime, members.m_region_ymd), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ymd, "found"))) {
            return ((runtime.container(members.m_region_ymd, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_get_region_ymdelta_size(runtime, p) {
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
    function method_get_sprites_opt_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_sprites_opt).length) > Number(0)) ? 1 : 0)) ? (__addr_get_sprites_opt_base(runtime, (members.m_sprites_opt ?? 0), 0)) : (0));
    }
    function __addr_get_sprites_opt_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_sprites_opt_size(runtime) {
        const members = runtime.members;
        return (((members.m_sprites_opt).length) >>> 0);
    }
    function method_get_region_mask(runtime, rgn, rgn_size) {
        const members = runtime.members;
        let mask = ((4294967295) >>> 0);
        let len = ((rgn_size) >>> 0);
        for (let bit = ((2147483648) >>> 0); (((bit) !== (0)) ? 1 : 0); bit = ((((bit) >>> (1))) >>> 0)) {
            if (((((((len) * (2))) - (1))) & (bit))) {
                break;
            }
            mask = ((((mask) >>> (1))) >>> 0);
        }
        return ((mask) >>> 0);
    }
    function method_optimize_sprites(runtime, region_sprites, region_sprites_size) {
        const members = runtime.members;
        let __t0, __t1;
        let spritegfx_address_mask = ((method_get_region_mask(runtime, region_sprites, region_sprites_size)) >>> 0);
        let src = region_sprites;
        (members.m_sprites_opt = runtime.resize(members.m_sprites_opt, ((spritegfx_address_mask) + (1))));
        let dest = __addr_optimize_sprites(runtime, (members.m_sprites_opt ?? 0), 0);
        for (let i = 0; (((i) < (region_sprites_size)) ? 1 : 0); i = ((i) + (128)), src = __add_optimize_sprites(runtime, src, 128)) {
            for (let y = 0; (((y) < (16)) ? 1 : 0); y = ((y) + (1))) {
                for (let x = 0; (((x) < (8)) ? 1 : 0); x = ((x) + (1))) {
                    runtime.pointerStore((__t0 = dest, dest = __add_optimize_sprites(runtime, dest, 1), __t0), ((((((((((runtime.shiftRight(runtime.readIndex(src, ((67) | (((y) << (2))))), x)) & (1))) << (3))) | (((((runtime.shiftRight(runtime.readIndex(src, ((65) | (((y) << (2))))), x)) & (1))) << (2))))) | (((((runtime.shiftRight(runtime.readIndex(src, ((66) | (((y) << (2))))), x)) & (1))) << (1))))) | (((((runtime.shiftRight(runtime.readIndex(src, ((64) | (((y) << (2))))), x)) & (1))) << (0)))));
                }
                for (let x = 0; (((x) < (8)) ? 1 : 0); x = ((x) + (1))) {
                    runtime.pointerStore((__t1 = dest, dest = __add_optimize_sprites(runtime, dest, 1), __t1), ((((((((((runtime.shiftRight(runtime.readIndex(src, ((3) | (((y) << (2))))), x)) & (1))) << (3))) | (((((runtime.shiftRight(runtime.readIndex(src, ((1) | (((y) << (2))))), x)) & (1))) << (2))))) | (((((runtime.shiftRight(runtime.readIndex(src, ((2) | (((y) << (2))))), x)) & (1))) << (1))))) | (((((runtime.shiftRight(runtime.readIndex(src, ((0) | (((y) << (2))))), x)) & (1))) << (0)))));
                }
            }
        }
    }
    function __add_optimize_sprites(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_optimize_sprites(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__rom_r(runtime, offset) {
        const members = runtime.members;
        return ((65535) & 0xffff);
    }
    function method_device_neogeo_cart_interface__banksel_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
    }
    function method_device_neogeo_cart_interface__ram_r(runtime, offset) {
        const members = runtime.members;
        return ((65535) & 0xffff);
    }
    function method_device_neogeo_cart_interface__ram_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
    }
    function method_device_neogeo_cart_interface__protection_r(runtime, space, offset) {
        const members = runtime.members;
        return ((65535) & 0xffff);
    }
    function method_device_neogeo_cart_interface__protection_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
    }
    function method_device_neogeo_cart_interface__addon_r(runtime, offset) {
        const members = runtime.members;
        return ((65535) & 0xffff);
    }
    function method_device_neogeo_cart_interface__get_bank_base(runtime, sel) {
        const members = runtime.members;
        sel = ((sel) & 0xffff);
        return ((0) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_special_bank(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_helper(runtime) {
        const members = runtime.members;
        return ((0) & 0xffff);
    }
    function method_device_neogeo_cart_interface__decrypt_all(runtime, DECRYPT_ALL_PARAMS) {
        const members = runtime.members;
    }
    function method_device_neogeo_cart_interface__get_fixed_bank_type(runtime) {
        const members = runtime.members;
        return ((0) | 0);
    }
    function method_device_neogeo_cart_interface__rom_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_rom = runtime.resize(members.m_rom, runtime.divide(size, 2)));
    }
    function method_device_neogeo_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_rom).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_rom_base(runtime, (members.m_rom ?? 0), 0)) : (0));
    }
    function __addr_device_neogeo_cart_interface__get_rom_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((((members.m_rom).length) * (2))) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_region_rom_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_region_rom = members.m_region_rom ?? 0;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_rom_base(runtime, members.m_region_rom), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_rom, "found"))) {
            return h_m_region_rom["as_u16&"](0);
        }
        return 0;
    }
    function __deref_device_neogeo_cart_interface__get_region_rom_base(runtime, p) {
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
    function method_device_neogeo_cart_interface__get_region_rom_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_rom_size(runtime, members.m_region_rom), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_rom, "found"))) {
            return ((runtime.container(members.m_region_rom, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_device_neogeo_cart_interface__get_region_rom_size(runtime, p) {
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
    function method_device_neogeo_cart_interface__fixed_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_fixed = runtime.resize(members.m_fixed, size));
    }
    function method_device_neogeo_cart_interface__get_fixed_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_fixed).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_fixed_base(runtime, (members.m_fixed ?? 0), 0)) : (0));
    }
    function __addr_device_neogeo_cart_interface__get_fixed_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__get_fixed_size(runtime) {
        const members = runtime.members;
        return (((members.m_fixed).length) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_region_fixed_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_fixed_base(runtime, members.m_region_fixed), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_fixed, "found"))) {
            return (__t1 = __deref_device_neogeo_cart_interface__get_region_fixed_base(runtime, members.m_region_fixed), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_fixed, "base"));
        }
        return 0;
    }
    function __deref_device_neogeo_cart_interface__get_region_fixed_base(runtime, p) {
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
    function method_device_neogeo_cart_interface__get_region_fixed_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_fixed_size(runtime, members.m_region_fixed), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_fixed, "found"))) {
            return ((runtime.container(members.m_region_fixed, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_device_neogeo_cart_interface__get_region_fixed_size(runtime, p) {
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
    function method_device_neogeo_cart_interface__audio_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_audio = runtime.resize(members.m_audio, size));
    }
    function method_device_neogeo_cart_interface__get_audio_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_audio).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_audio_base(runtime, (members.m_audio ?? 0), 0)) : (0));
    }
    function __addr_device_neogeo_cart_interface__get_audio_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__get_audio_size(runtime) {
        const members = runtime.members;
        return (((members.m_audio).length) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_region_audio_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_audio_base(runtime, members.m_region_audio), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audio, "found"))) {
            return (__t1 = __deref_device_neogeo_cart_interface__get_region_audio_base(runtime, members.m_region_audio), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_audio, "base"));
        }
        return 0;
    }
    function __deref_device_neogeo_cart_interface__get_region_audio_base(runtime, p) {
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
    function method_device_neogeo_cart_interface__get_region_audio_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_audio_size(runtime, members.m_region_audio), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audio, "found"))) {
            return ((runtime.container(members.m_region_audio, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_device_neogeo_cart_interface__get_region_audio_size(runtime, p) {
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
    function method_device_neogeo_cart_interface__audiocrypt_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_audiocrypt = runtime.resize(members.m_audiocrypt, size));
    }
    function method_device_neogeo_cart_interface__get_audiocrypt_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_audiocrypt).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_audiocrypt_base(runtime, (members.m_audiocrypt ?? 0), 0)) : (0));
    }
    function __addr_device_neogeo_cart_interface__get_audiocrypt_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__get_audiocrypt_size(runtime) {
        const members = runtime.members;
        return (((members.m_audiocrypt).length) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_region_audiocrypt_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_audiocrypt_base(runtime, members.m_region_audiocrypt), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audiocrypt, "found"))) {
            return (__t1 = __deref_device_neogeo_cart_interface__get_region_audiocrypt_base(runtime, members.m_region_audiocrypt), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_audiocrypt, "base"));
        }
        return 0;
    }
    function __deref_device_neogeo_cart_interface__get_region_audiocrypt_base(runtime, p) {
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
    function method_device_neogeo_cart_interface__get_region_audiocrypt_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_audiocrypt_size(runtime, members.m_region_audiocrypt), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audiocrypt, "found"))) {
            return ((runtime.container(members.m_region_audiocrypt, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_device_neogeo_cart_interface__get_region_audiocrypt_size(runtime, p) {
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
    function method_device_neogeo_cart_interface__sprites_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_sprites = runtime.resize(members.m_sprites, size));
    }
    function method_device_neogeo_cart_interface__get_sprites_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_sprites).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_sprites_base(runtime, (members.m_sprites ?? 0), 0)) : (0));
    }
    function __addr_device_neogeo_cart_interface__get_sprites_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__get_sprites_size(runtime) {
        const members = runtime.members;
        return (((members.m_sprites).length) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_region_sprites_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_sprites_base(runtime, members.m_region_spr), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_spr, "found"))) {
            return (__t1 = __deref_device_neogeo_cart_interface__get_region_sprites_base(runtime, members.m_region_spr), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_spr, "base"));
        }
        return 0;
    }
    function __deref_device_neogeo_cart_interface__get_region_sprites_base(runtime, p) {
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
    function method_device_neogeo_cart_interface__get_region_sprites_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_sprites_size(runtime, members.m_region_spr), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_spr, "found"))) {
            return ((runtime.container(members.m_region_spr, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_device_neogeo_cart_interface__get_region_sprites_size(runtime, p) {
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
    function method_device_neogeo_cart_interface__ym_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_ym = runtime.resize(members.m_ym, size));
    }
    function method_device_neogeo_cart_interface__get_ym_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_ym).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_ym_base(runtime, (members.m_ym ?? 0), 0)) : (0));
    }
    function __addr_device_neogeo_cart_interface__get_ym_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__get_ym_size(runtime) {
        const members = runtime.members;
        return (((members.m_ym).length) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_region_ym_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_ym_base(runtime, members.m_region_ym), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ym, "found"))) {
            return (__t1 = __deref_device_neogeo_cart_interface__get_region_ym_base(runtime, members.m_region_ym), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_ym, "base"));
        }
        return 0;
    }
    function __deref_device_neogeo_cart_interface__get_region_ym_base(runtime, p) {
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
    function method_device_neogeo_cart_interface__get_region_ym_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_ym_size(runtime, members.m_region_ym), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ym, "found"))) {
            return ((runtime.container(members.m_region_ym, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_device_neogeo_cart_interface__get_region_ym_size(runtime, p) {
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
    function method_device_neogeo_cart_interface__ymdelta_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_ymdelta = runtime.resize(members.m_ymdelta, size));
    }
    function method_device_neogeo_cart_interface__get_ymdelta_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_ymdelta).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_ymdelta_base(runtime, (members.m_ymdelta ?? 0), 0)) : (0));
    }
    function __addr_device_neogeo_cart_interface__get_ymdelta_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__get_ymdelta_size(runtime) {
        const members = runtime.members;
        return (((members.m_ymdelta).length) >>> 0);
    }
    function method_device_neogeo_cart_interface__get_region_ymdelta_base(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_ymdelta_base(runtime, members.m_region_ymd), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ymd, "found"))) {
            return (__t1 = __deref_device_neogeo_cart_interface__get_region_ymdelta_base(runtime, members.m_region_ymd), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_ymd, "base"));
        }
        return 0;
    }
    function __deref_device_neogeo_cart_interface__get_region_ymdelta_base(runtime, p) {
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
    function method_device_neogeo_cart_interface__get_region_ymdelta_size(runtime) {
        const members = runtime.members;
        let __t0;
        if ((__t0 = __deref_device_neogeo_cart_interface__get_region_ymdelta_size(runtime, members.m_region_ymd), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ymd, "found"))) {
            return ((runtime.container(members.m_region_ymd, "bytes")) >>> 0);
        }
        return ((0) >>> 0);
    }
    function __deref_device_neogeo_cart_interface__get_region_ymdelta_size(runtime, p) {
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
    function method_device_neogeo_cart_interface__get_sprites_opt_base(runtime) {
        const members = runtime.members;
        return ((((Number((members.m_sprites_opt).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_sprites_opt_base(runtime, (members.m_sprites_opt ?? 0), 0)) : (0));
    }
    function __addr_device_neogeo_cart_interface__get_sprites_opt_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_neogeo_cart_interface__get_sprites_opt_size(runtime) {
        const members = runtime.members;
        return (((members.m_sprites_opt).length) >>> 0);
    }
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
    }
    function method_neogeo_rom_device__device_start(runtime) {
        const members = runtime.members;
    }
    function method_neogeo_rom_device__device_reset(runtime) {
        const members = runtime.members;
    }
    function method_neogeo_kof98_cart_device__protection_r(runtime, space, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_prot.protection_r"];
        return (((__L0 ? __L0(offset) : ((members.m_prot)?.protection_r?.(offset) ?? 0))) & 0xffff);
    }
    function method_neogeo_kof98_cart_device__protection_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_prot.protection_w"];
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
        (__L0 ? __L0(data) : ((members.m_prot)?.protection_w?.(data) ?? 0));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "rom_r": method_rom_r,
        "get_rom_size": method_get_rom_size,
        "get_rom_base": method_get_rom_base,
        "get_region_rom_base": method_get_region_rom_base,
        "banksel_w": method_banksel_w,
        "ram_r": method_ram_r,
        "ram_w": method_ram_w,
        "protection_r": method_protection_r,
        "protection_w": method_protection_w,
        "addon_r": method_addon_r,
        "get_bank_base": method_get_bank_base,
        "get_special_bank": method_get_special_bank,
        "get_helper": method_get_helper,
        "get_fixed_bank_type": method_get_fixed_bank_type,
        "rom_alloc": method_rom_alloc,
        "get_region_rom_size": method_get_region_rom_size,
        "fixed_alloc": method_fixed_alloc,
        "get_fixed_base": method_get_fixed_base,
        "get_fixed_size": method_get_fixed_size,
        "get_region_fixed_base": method_get_region_fixed_base,
        "get_region_fixed_size": method_get_region_fixed_size,
        "audio_alloc": method_audio_alloc,
        "get_audio_base": method_get_audio_base,
        "get_audio_size": method_get_audio_size,
        "get_region_audio_base": method_get_region_audio_base,
        "get_region_audio_size": method_get_region_audio_size,
        "audiocrypt_alloc": method_audiocrypt_alloc,
        "get_audiocrypt_base": method_get_audiocrypt_base,
        "get_audiocrypt_size": method_get_audiocrypt_size,
        "get_region_audiocrypt_base": method_get_region_audiocrypt_base,
        "get_region_audiocrypt_size": method_get_region_audiocrypt_size,
        "sprites_alloc": method_sprites_alloc,
        "get_sprites_base": method_get_sprites_base,
        "get_sprites_size": method_get_sprites_size,
        "get_region_sprites_base": method_get_region_sprites_base,
        "get_region_sprites_size": method_get_region_sprites_size,
        "ym_alloc": method_ym_alloc,
        "get_ym_base": method_get_ym_base,
        "get_ym_size": method_get_ym_size,
        "get_region_ym_base": method_get_region_ym_base,
        "get_region_ym_size": method_get_region_ym_size,
        "ymdelta_alloc": method_ymdelta_alloc,
        "get_ymdelta_base": method_get_ymdelta_base,
        "get_ymdelta_size": method_get_ymdelta_size,
        "get_region_ymdelta_base": method_get_region_ymdelta_base,
        "get_region_ymdelta_size": method_get_region_ymdelta_size,
        "get_sprites_opt_base": method_get_sprites_opt_base,
        "get_sprites_opt_size": method_get_sprites_opt_size,
        "get_region_mask": method_get_region_mask,
        "optimize_sprites": method_optimize_sprites,
        "device_neogeo_cart_interface::rom_r": method_device_neogeo_cart_interface__rom_r,
        "device_neogeo_cart_interface::banksel_w": method_device_neogeo_cart_interface__banksel_w,
        "device_neogeo_cart_interface::ram_r": method_device_neogeo_cart_interface__ram_r,
        "device_neogeo_cart_interface::ram_w": method_device_neogeo_cart_interface__ram_w,
        "device_neogeo_cart_interface::protection_r": method_device_neogeo_cart_interface__protection_r,
        "device_neogeo_cart_interface::protection_w": method_device_neogeo_cart_interface__protection_w,
        "device_neogeo_cart_interface::addon_r": method_device_neogeo_cart_interface__addon_r,
        "device_neogeo_cart_interface::get_bank_base": method_device_neogeo_cart_interface__get_bank_base,
        "device_neogeo_cart_interface::get_special_bank": method_device_neogeo_cart_interface__get_special_bank,
        "device_neogeo_cart_interface::get_helper": method_device_neogeo_cart_interface__get_helper,
        "device_neogeo_cart_interface::decrypt_all": method_device_neogeo_cart_interface__decrypt_all,
        "device_neogeo_cart_interface::get_fixed_bank_type": method_device_neogeo_cart_interface__get_fixed_bank_type,
        "device_neogeo_cart_interface::rom_alloc": method_device_neogeo_cart_interface__rom_alloc,
        "device_neogeo_cart_interface::get_rom_base": method_device_neogeo_cart_interface__get_rom_base,
        "device_neogeo_cart_interface::get_rom_size": method_device_neogeo_cart_interface__get_rom_size,
        "device_neogeo_cart_interface::get_region_rom_base": method_device_neogeo_cart_interface__get_region_rom_base,
        "device_neogeo_cart_interface::get_region_rom_size": method_device_neogeo_cart_interface__get_region_rom_size,
        "device_neogeo_cart_interface::fixed_alloc": method_device_neogeo_cart_interface__fixed_alloc,
        "device_neogeo_cart_interface::get_fixed_base": method_device_neogeo_cart_interface__get_fixed_base,
        "device_neogeo_cart_interface::get_fixed_size": method_device_neogeo_cart_interface__get_fixed_size,
        "device_neogeo_cart_interface::get_region_fixed_base": method_device_neogeo_cart_interface__get_region_fixed_base,
        "device_neogeo_cart_interface::get_region_fixed_size": method_device_neogeo_cart_interface__get_region_fixed_size,
        "device_neogeo_cart_interface::audio_alloc": method_device_neogeo_cart_interface__audio_alloc,
        "device_neogeo_cart_interface::get_audio_base": method_device_neogeo_cart_interface__get_audio_base,
        "device_neogeo_cart_interface::get_audio_size": method_device_neogeo_cart_interface__get_audio_size,
        "device_neogeo_cart_interface::get_region_audio_base": method_device_neogeo_cart_interface__get_region_audio_base,
        "device_neogeo_cart_interface::get_region_audio_size": method_device_neogeo_cart_interface__get_region_audio_size,
        "device_neogeo_cart_interface::audiocrypt_alloc": method_device_neogeo_cart_interface__audiocrypt_alloc,
        "device_neogeo_cart_interface::get_audiocrypt_base": method_device_neogeo_cart_interface__get_audiocrypt_base,
        "device_neogeo_cart_interface::get_audiocrypt_size": method_device_neogeo_cart_interface__get_audiocrypt_size,
        "device_neogeo_cart_interface::get_region_audiocrypt_base": method_device_neogeo_cart_interface__get_region_audiocrypt_base,
        "device_neogeo_cart_interface::get_region_audiocrypt_size": method_device_neogeo_cart_interface__get_region_audiocrypt_size,
        "device_neogeo_cart_interface::sprites_alloc": method_device_neogeo_cart_interface__sprites_alloc,
        "device_neogeo_cart_interface::get_sprites_base": method_device_neogeo_cart_interface__get_sprites_base,
        "device_neogeo_cart_interface::get_sprites_size": method_device_neogeo_cart_interface__get_sprites_size,
        "device_neogeo_cart_interface::get_region_sprites_base": method_device_neogeo_cart_interface__get_region_sprites_base,
        "device_neogeo_cart_interface::get_region_sprites_size": method_device_neogeo_cart_interface__get_region_sprites_size,
        "device_neogeo_cart_interface::ym_alloc": method_device_neogeo_cart_interface__ym_alloc,
        "device_neogeo_cart_interface::get_ym_base": method_device_neogeo_cart_interface__get_ym_base,
        "device_neogeo_cart_interface::get_ym_size": method_device_neogeo_cart_interface__get_ym_size,
        "device_neogeo_cart_interface::get_region_ym_base": method_device_neogeo_cart_interface__get_region_ym_base,
        "device_neogeo_cart_interface::get_region_ym_size": method_device_neogeo_cart_interface__get_region_ym_size,
        "device_neogeo_cart_interface::ymdelta_alloc": method_device_neogeo_cart_interface__ymdelta_alloc,
        "device_neogeo_cart_interface::get_ymdelta_base": method_device_neogeo_cart_interface__get_ymdelta_base,
        "device_neogeo_cart_interface::get_ymdelta_size": method_device_neogeo_cart_interface__get_ymdelta_size,
        "device_neogeo_cart_interface::get_region_ymdelta_base": method_device_neogeo_cart_interface__get_region_ymdelta_base,
        "device_neogeo_cart_interface::get_region_ymdelta_size": method_device_neogeo_cart_interface__get_region_ymdelta_size,
        "device_neogeo_cart_interface::get_sprites_opt_base": method_device_neogeo_cart_interface__get_sprites_opt_base,
        "device_neogeo_cart_interface::get_sprites_opt_size": method_device_neogeo_cart_interface__get_sprites_opt_size,
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "neogeo_rom_device::device_start": method_neogeo_rom_device__device_start,
        "neogeo_rom_device::device_reset": method_neogeo_rom_device__device_reset,
        "neogeo_kof98_cart_device::protection_r": method_neogeo_kof98_cart_device__protection_r,
        "neogeo_kof98_cart_device::protection_w": method_neogeo_kof98_cart_device__protection_w
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_prot.protection_r", "m_prot.protection_w"];
definition.children[0].definition.compiledMethods = (() => {
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
    function method_decrypt_68k(runtime, cpurom, cpurom_size) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["VECTOR_OF"], __L1 = __l["memcpy"], __L2 = __l["memmove"];
        const h_m_default_rom = members.m_default_rom ?? 0;
        let src = cpurom;
        let src$s = undefined, src$o = 0;
        if (ArrayBuffer.isView(src) || Array.isArray(src))
            src$s = src;
        else if (src !== null && typeof src === 'object' && src.generatedPointer === true && src.path === undefined && src.target === undefined && (ArrayBuffer.isView(src.source) || Array.isArray(src.source))) {
            src$s = src.source;
            src$o = src.offset;
        }
        let dst = (__L0 ? __L0("uint8_t", 2097152) : runtime.macro("VECTOR_OF", "uint8_t", 2097152));
        let i = ((0) | 0);
        let j = ((0) | 0);
        let k = ((0) | 0);
        if ((((members.__static_decrypt_68k_sec__initialised ?? 0)) ? 0 : 1)) {
            members.__static_decrypt_68k_sec = [0, 1048576, 4, 1048580, 1048586, 10, 1048590, 14];
            members.__static_decrypt_68k_sec__initialised = 1;
        }
        let sec = (members.__static_decrypt_68k_sec ?? 0);
        if ((((members.__static_decrypt_68k_pos__initialised ?? 0)) ? 0 : 1)) {
            members.__static_decrypt_68k_pos = [0, 4, 10, 14];
            members.__static_decrypt_68k_pos__initialised = 1;
        }
        let pos = (members.__static_decrypt_68k_pos ?? 0);
        (__L1 ? __L1(__addr_decrypt_68k(runtime, dst, 0), src, 2097152) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, dst, 0), src, 2097152));
        for (i = ((2048) | 0); (((i) < (1048576)) ? 1 : 0); i = ((((i) + (512))) | 0)) {
            for (j = ((0) | 0); (((j) < (256)) ? 1 : 0); j = ((((j) + (16))) | 0)) {
                for (k = ((0) | 0); (((k) < (16)) ? 1 : 0); k = ((((k) + (2))) | 0)) {
                    (__L1 ? __L1(__addr_decrypt_68k(runtime, src, ((((i) + (j))) + (k))), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(sec, runtime.divide(k, 2))), 256)), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, ((((i) + (j))) + (k))), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(sec, runtime.divide(k, 2))), 256)), 2));
                    (__L1 ? __L1(__addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, ((((i) + (j))) + (k)), 256)), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(sec, runtime.divide(k, 2)))), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, ((((i) + (j))) + (k)), 256)), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(sec, runtime.divide(k, 2)))), 2));
                }
                if (((((((i) >= (524288)) ? 1 : 0)) && ((((i) < (786432)) ? 1 : 0))) ? 1 : 0)) {
                    for (k = ((0) | 0); (((k) < (4)) ? 1 : 0); k = ((((k) + (1))) | 0)) {
                        (__L1 ? __L1(__addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k))), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k))), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k))), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k))), 2));
                        (__L1 ? __L1(__addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k)), 256)), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k)), 256)), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k)), 256)), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k)), 256)), 2));
                    }
                }
                else {
                    if ((((i) >= (786432)) ? 1 : 0)) {
                        for (k = ((0) | 0); (((k) < (4)) ? 1 : 0); k = ((((k) + (1))) | 0)) {
                            (__L1 ? __L1(__addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k))), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k)), 256)), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k))), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k)), 256)), 2));
                            (__L1 ? __L1(__addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k)), 256)), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k))), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, __add_decrypt_68k(runtime, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k)), 256)), __addr_decrypt_68k(runtime, dst, __add_decrypt_68k(runtime, ((i) + (j)), runtime.readIndex(pos, k))), 2));
                        }
                    }
                }
            }
            (__L1 ? __L1(__addr_decrypt_68k(runtime, src, ((i) + (0))), __addr_decrypt_68k(runtime, dst, ((i) + (0))), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, ((i) + (0))), __addr_decrypt_68k(runtime, dst, ((i) + (0))), 2));
            (__L1 ? __L1(__addr_decrypt_68k(runtime, src, ((i) + (2))), __addr_decrypt_68k(runtime, dst, ((i) + (1048576))), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, ((i) + (2))), __addr_decrypt_68k(runtime, dst, ((i) + (1048576))), 2));
            (__L1 ? __L1(__addr_decrypt_68k(runtime, src, ((i) + (256))), __addr_decrypt_68k(runtime, dst, ((i) + (256))), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, ((i) + (256))), __addr_decrypt_68k(runtime, dst, ((i) + (256))), 2));
            (__L1 ? __L1(__addr_decrypt_68k(runtime, src, ((i) + (258))), __addr_decrypt_68k(runtime, dst, ((i) + (1048832))), 2) : runtime.macro("memcpy", __addr_decrypt_68k(runtime, src, ((i) + (258))), __addr_decrypt_68k(runtime, dst, ((i) + (1048832))), 2));
        }
        (__L2 ? __L2(__addr_decrypt_68k(runtime, src, 1048576), __addr_decrypt_68k(runtime, src, 2097152), 4194304) : runtime.macro("memmove", __addr_decrypt_68k(runtime, src, 1048576), __addr_decrypt_68k(runtime, src, 2097152), 4194304));
        let mem16 = runtime.packedView(cpurom, false);
        let mem16$s = undefined, mem16$o = 0;
        if (ArrayBuffer.isView(mem16) || Array.isArray(mem16))
            mem16$s = mem16;
        else if (mem16 !== null && typeof mem16 === 'object' && mem16.generatedPointer === true && mem16.path === undefined && mem16.target === undefined && (ArrayBuffer.isView(mem16.source) || Array.isArray(mem16.source))) {
            mem16$s = mem16.source;
            mem16$o = mem16.offset;
        }
        h_m_default_rom[0] = (mem16$s !== undefined ? (mem16$s[mem16$o + (runtime.divide(256, 2))] ?? 0) : runtime.readIndex(mem16, runtime.divide(256, 2)));
        h_m_default_rom[1] = (mem16$s !== undefined ? (mem16$s[mem16$o + (runtime.divide(258, 2))] ?? 0) : runtime.readIndex(mem16, runtime.divide(258, 2)));
    }
    function __add_decrypt_68k(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_decrypt_68k(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_protection_r(runtime, offset) {
        const members = runtime.members;
        const h_m_default_rom = members.m_default_rom ?? 0;
        if (((((members.m_prot_state ?? 0)) === (1)) ? 1 : 0)) {
            if (((offset) ? 0 : 1)) {
                return ((194) & 0xffff);
            }
            else {
                return ((253) & 0xffff);
            }
        }
        if (((((members.m_prot_state ?? 0)) === (2)) ? 1 : 0)) {
            if (((offset) ? 0 : 1)) {
                return ((20037) & 0xffff);
            }
            else {
                return ((20269) & 0xffff);
            }
        }
        if (((offset) ? 0 : 1)) {
            return ((h_m_default_rom[0]) & 0xffff);
        }
        else {
            return ((h_m_default_rom[1]) & 0xffff);
        }
    }
    function method_protection_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        switch (data) {
            case 144:
                {
                    0;
                    members.m_prot_state = ((1) | 0);
                    break;
                }
            case 240:
                {
                    0;
                    members.m_prot_state = ((2) | 0);
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "decrypt_68k": method_decrypt_68k,
        "protection_r": method_protection_r,
        "protection_w": method_protection_w
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethodLinks = ["VECTOR_OF", "memcpy", "memmove"];
export const device = definition;
export default device;
