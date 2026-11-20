import deviceData from './k052109.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [1, 1, 32, 256];
    function method_device_reset(runtime) {
        const members = runtime.members;
        const h_m_charrombank = members.m_charrombank ?? 0;
        const h_m_charrombank_2 = members.m_charrombank_2 ?? 0;
        members.m_rmrd_line = ((0) | 0);
        members.m_has_extra_video_ram = ((0) & 0xff);
        for (let offset = 7168; (((offset) <= (7936)) ? 1 : 0); offset = ((offset) + (128))) {
            method_write(runtime, offset, 0);
        }
        for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_charrombank[i] = 0;
            h_m_charrombank_2[i] = 0;
        }
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_nmi_handler"], __L1 = __l["m_firq_handler"], __L2 = __l["m_irq_handler"];
        let __t0, __t1, __t2, __t3, __t4;
        data = ((data) & 0xff);
        const h_m_tilemap = members.m_tilemap ?? 0;
        const h_m_charrombank = members.m_charrombank ?? 0;
        const h_m_charrombank_2 = members.m_charrombank_2 ?? 0;
        if (((Number(((offset) & (8191))) < Number(6144)) ? 1 : 0)) {
            if ((((offset) >= (16384)) ? 1 : 0)) {
                members.m_has_extra_video_ram = ((1) & 0xff);
            }
            ((__t0 = members.m_ram) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_ram"), offset, data));
            (__deref_write(runtime, h_m_tilemap[runtime.shiftRight(((offset) & (6144)), 11)]).mark_tile_dirty?.(((offset) & (2047))) ?? 0);
        }
        else {
            ((__t1 = members.m_ram) && ArrayBuffer.isView(__t1) ? (__t1[offset] = data) : runtime.writeIndex(runtime.writableMember("m_ram"), offset, data));
            if (((((((offset) >= (6156)) ? 1 : 0)) && ((((offset) < (6196)) ? 1 : 0))) ? 1 : 0)) {
            }
            else {
                if (((((((offset) >= (6656)) ? 1 : 0)) && ((((offset) < (7168)) ? 1 : 0))) ? 1 : 0)) {
                }
                else {
                    if ((((offset) === (7168)) ? 1 : 0)) {
                        members.m_addrmap = ((data) & 0xff);
                    }
                    else {
                        if ((((offset) === (7296)) ? 1 : 0)) {
                            if (((((members.m_scrollctrl ?? 0)) !== (data)) ? 1 : 0)) {
                                members.m_scrollctrl = ((data) & 0xff);
                            }
                        }
                        else {
                            if ((((offset) === (7424)) ? 1 : 0)) {
                                if (((((((~data)) & ((members.m_irq_control ?? 0)))) >>> (0)) & 1)) {
                                    (__L0 ? __L0(Number(0)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(0) : runtime.invoke("m_nmi_handler", 0));
                                }
                                if (((((((~data)) & ((members.m_irq_control ?? 0)))) >>> (1)) & 1)) {
                                    (__L1 ? __L1(Number(0)) : typeof members.m_firq_handler === 'function' ? members.m_firq_handler(0) : runtime.invoke("m_firq_handler", 0));
                                }
                                if (((((((~data)) & ((members.m_irq_control ?? 0)))) >>> (2)) & 1)) {
                                    (__L2 ? __L2(Number(0)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(0) : runtime.invoke("m_irq_handler", 0));
                                }
                                members.m_irq_control = ((data) & 0xff);
                            }
                            else {
                                if ((((offset) === (7552)) ? 1 : 0)) {
                                    let dirty = ((0) | 0);
                                    if (((Number(h_m_charrombank[0]) !== Number(((data) & (15)))) ? 1 : 0)) {
                                        dirty = ((((dirty) | (1))) | 0);
                                    }
                                    if (((Number(h_m_charrombank[1]) !== Number(((((data) >>> (4))) & (15)))) ? 1 : 0)) {
                                        dirty = ((((dirty) | (2))) | 0);
                                    }
                                    if (dirty) {
                                        h_m_charrombank[0] = ((data) & (15));
                                        h_m_charrombank[1] = ((((data) >>> (4))) & (15));
                                        for (let i = ((0) | 0); (((i) < (6144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                            let bank = ((runtime.shiftRight((((__t2 = (members.m_ram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[i] ?? 0) : runtime.readIndex(__t2, i))) & (12)), 2)) | 0);
                                            if ((((((((((bank) === (0)) ? 1 : 0)) && (((dirty) & (1)))) ? 1 : 0)) || (((((((bank) === (1)) ? 1 : 0)) && (((dirty) & (2)))) ? 1 : 0))) ? 1 : 0)) {
                                                (__deref_write(runtime, h_m_tilemap[runtime.shiftRight(((i) & (6144)), 11)]).mark_tile_dirty?.(((i) & (2047))) ?? 0);
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (((((((offset) === (7680)) ? 1 : 0)) || ((((offset) === (15872)) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_romsubbank = ((data) & 0xff);
                                    }
                                    else {
                                        if ((((offset) === (7808)) ? 1 : 0)) {
                                            if (((Number((((members.m_tileflip_enable ?? 0)) & (6))) !== Number(((data) & (6)))) ? 1 : 0)) {
                                                for (let i = ((0) | 0); (((i) < (3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                                    (__t3 = __deref_write(runtime, h_m_tilemap[i]), typeof __t3.mark_all_dirty === 'function' ? (__t3.mark_all_dirty() ?? 0) : runtime.container(h_m_tilemap[i], "mark_all_dirty"));
                                                }
                                            }
                                            members.m_tileflip_enable = ((((data) & (7))) & 0xff);
                                            runtime.invoke("tileflip_reset");
                                        }
                                        else {
                                            if ((((offset) === (7936)) ? 1 : 0)) {
                                                let dirty = ((0) | 0);
                                                if (((Number(h_m_charrombank[2]) !== Number(((data) & (15)))) ? 1 : 0)) {
                                                    dirty = ((((dirty) | (1))) | 0);
                                                }
                                                if (((Number(h_m_charrombank[3]) !== Number(((((data) >>> (4))) & (15)))) ? 1 : 0)) {
                                                    dirty = ((((dirty) | (2))) | 0);
                                                }
                                                if (dirty) {
                                                    h_m_charrombank[2] = ((data) & (15));
                                                    h_m_charrombank[3] = ((((data) >>> (4))) & (15));
                                                    for (let i = ((0) | 0); (((i) < (6144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                                        let bank = ((runtime.shiftRight((((__t4 = (members.m_ram ?? 0), ArrayBuffer.isView(__t4) ? (__t4[i] ?? 0) : runtime.readIndex(__t4, i))) & (12)), 2)) | 0);
                                                        if ((((((((((bank) === (2)) ? 1 : 0)) && (((dirty) & (1)))) ? 1 : 0)) || (((((((bank) === (3)) ? 1 : 0)) && (((dirty) & (2)))) ? 1 : 0))) ? 1 : 0)) {
                                                            (__deref_write(runtime, h_m_tilemap[runtime.shiftRight(((i) & (6144)), 11)]).mark_tile_dirty?.(((i) & (2047))) ?? 0);
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                if (((((((offset) >= (14348)) ? 1 : 0)) && ((((offset) < (14388)) ? 1 : 0))) ? 1 : 0)) {
                                                }
                                                else {
                                                    if (((((((offset) >= (14848)) ? 1 : 0)) && ((((offset) < (15360)) ? 1 : 0))) ? 1 : 0)) {
                                                    }
                                                    else {
                                                        if ((((offset) === (15744)) ? 1 : 0)) {
                                                            h_m_charrombank_2[0] = ((data) & (15));
                                                            h_m_charrombank_2[1] = ((((data) >>> (4))) & (15));
                                                        }
                                                        else {
                                                            if ((((offset) === (16128)) ? 1 : 0)) {
                                                                h_m_charrombank_2[2] = ((data) & (15));
                                                                h_m_charrombank_2[3] = ((((data) >>> (4))) & (15));
                                                            }
                                                            else {
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    function __deref_write(runtime, p) {
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
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_k052109_cb"];
        let __t0;
        const h_m_charrombank = members.m_charrombank ?? 0;
        const h_m_charrombank_2 = members.m_charrombank_2 ?? 0;
        const h_m_char_rom = members.m_char_rom ?? 0;
        if (((Number((members.m_rmrd_line ?? 0)) === Number(0)) ? 1 : 0)) {
            if (((Number(((offset) & (8191))) >= Number(6144)) ? 1 : 0)) {
                if (((((((offset) >= (6156)) ? 1 : 0)) && ((((offset) < (6196)) ? 1 : 0))) ? 1 : 0)) {
                }
                else {
                    if (((((((offset) >= (6656)) ? 1 : 0)) && ((((offset) < (7168)) ? 1 : 0))) ? 1 : 0)) {
                    }
                    else {
                        if ((((offset) === (7424)) ? 1 : 0)) {
                        }
                        else {
                            if (((((((offset) >= (14348)) ? 1 : 0)) && ((((offset) < (14388)) ? 1 : 0))) ? 1 : 0)) {
                            }
                            else {
                                if (((((((offset) >= (14848)) ? 1 : 0)) && ((((offset) < (15360)) ? 1 : 0))) ? 1 : 0)) {
                                }
                                else {
                                }
                            }
                        }
                    }
                }
            }
            return (((__t0 = (members.m_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
        }
        else {
            let code = ((runtime.shiftRight(((offset) & (8191)), 5)) | 0);
            let color = (((members.m_romsubbank ?? 0)) | 0);
            let flags = ((0) | 0);
            let priority = ((0) | 0);
            let bank = ((((h_m_charrombank[runtime.shiftRight(((color) & (12)), 2)]) >>> (2))) | 0);
            let addr = ((0) | 0);
            bank = ((((bank) | (((h_m_charrombank_2[runtime.shiftRight(((color) & (12)), 2)]) >>> (2))))) | 0);
            if ((members.m_has_extra_video_ram ?? 0)) {
                code = ((((code) | (((color) << (8))))) | 0);
            }
            else {
                (__L0 ? __L0(0, ({ generatedLValue: true, get: () => bank, set: (value) => { bank = ((value) | 0); } }), ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => flags, set: (value) => { flags = ((value) | 0); } }), ({ generatedLValue: true, get: () => priority, set: (value) => { priority = ((value) | 0); } })) : runtime.macro("m_k052109_cb", 0, ({ generatedLValue: true, get: () => bank, set: (value) => { bank = ((value) | 0); } }), ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => flags, set: (value) => { flags = ((value) | 0); } }), ({ generatedLValue: true, get: () => priority, set: (value) => { priority = ((value) | 0); } })));
            }
            addr = ((__add_read(runtime, ((code) << (5)), ((offset) & (31)))) | 0);
            addr = ((((addr) & (runtime.subtract((members.m_char_rom).length, 1)))) | 0);
            return ((runtime.readIndex(h_m_char_rom, addr)) & 0xff);
        }
    }
    function __add_read(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_update_scroll(runtime) {
        const members = runtime.members;
        const h_m_tilemap = members.m_tilemap ?? 0;
        for (let tmap = ((0) | 0); (((tmap) < (2)) ? 1 : 0); tmap = ((((tmap) + (1))) | 0)) {
            let scrollctrl = (((((((members.m_scrollctrl ?? 0)) >>> (((tmap) * (3))))) & (7))) & 0xff);
            let rows = (((__mame_table_0[(((((scrollctrl) & (3))) % 4) + 4) % 4] ?? 0)) | 0);
            let cols = (((((((scrollctrl) >>> (2)) & 1)) ? (64) : (1))) | 0);
            let tmap_mask = ((((tmap) ? (8192) : (0))) | 0);
            let scrollram_y = __addr_update_scroll(runtime, (members.m_ram ?? 0), ((6144) | (tmap_mask)));
            let scrollram_y$s = undefined, scrollram_y$o = 0;
            if (ArrayBuffer.isView(scrollram_y) || Array.isArray(scrollram_y))
                scrollram_y$s = scrollram_y;
            else if (scrollram_y !== null && typeof scrollram_y === 'object' && scrollram_y.generatedPointer === true && scrollram_y.path === undefined && scrollram_y.target === undefined && (ArrayBuffer.isView(scrollram_y.source) || Array.isArray(scrollram_y.source))) {
                scrollram_y$s = scrollram_y.source;
                scrollram_y$o = scrollram_y.offset;
            }
            let scrollram_x = __addr_update_scroll(runtime, (members.m_ram ?? 0), ((6656) | (tmap_mask)));
            let scrollram_x$s = undefined, scrollram_x$o = 0;
            if (ArrayBuffer.isView(scrollram_x) || Array.isArray(scrollram_x))
                scrollram_x$s = scrollram_x;
            else if (scrollram_x !== null && typeof scrollram_x === 'object' && scrollram_x.generatedPointer === true && scrollram_x.path === undefined && scrollram_x.target === undefined && (ArrayBuffer.isView(scrollram_x.source) || Array.isArray(scrollram_x.source))) {
                scrollram_x$s = scrollram_x.source;
                scrollram_x$o = scrollram_x.offset;
            }
            let t = ((((tmap) + (1))) | 0);
            if (((((((rows) === (1)) ? 1 : 0)) && ((((cols) === (1)) ? 1 : 0))) ? 1 : 0)) {
                (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scroll_rows?.(1) ?? 0);
                (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scroll_cols?.(1) ?? 0);
                let xscroll = ((__add_update_scroll(runtime, (scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (0)] ?? 0) : runtime.readIndex(scrollram_x, 0)), ((256) * ((scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (1)] ?? 0) : runtime.readIndex(scrollram_x, 1)))))) | 0);
                let yscroll = (((scrollram_y$s !== undefined ? (scrollram_y$s[scrollram_y$o + (12)] ?? 0) : runtime.readIndex(scrollram_y, 12))) | 0);
                (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scrollx?.(0, xscroll) ?? 0);
                (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scrolly?.(0, yscroll) ?? 0);
            }
            else {
                if ((((cols) === (1)) ? 1 : 0)) {
                    (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scroll_rows?.(256) ?? 0);
                    (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scroll_cols?.(1) ?? 0);
                    let yscroll = (((scrollram_y$s !== undefined ? (scrollram_y$s[scrollram_y$o + (12)] ?? 0) : runtime.readIndex(scrollram_y, 12))) | 0);
                    (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scrolly?.(0, yscroll) ?? 0);
                    let offs_mask = (((((((rows) === (256)) ? 1 : 0)) ? (255) : (248))) | 0);
                    for (let offs = ((0) | 0); (((offs) < (256)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
                        let xscroll = ((__add_update_scroll(runtime, (scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (((2) * (((offs) & (offs_mask)))))] ?? 0) : runtime.readIndex(scrollram_x, ((2) * (((offs) & (offs_mask)))))), ((256) * ((scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (__add_update_scroll(runtime, ((2) * (((offs) & (offs_mask)))), 1))] ?? 0) : runtime.readIndex(scrollram_x, __add_update_scroll(runtime, ((2) * (((offs) & (offs_mask)))), 1))))))) | 0);
                        (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scrollx?.(((((offs) + (yscroll))) & (255)), xscroll) ?? 0);
                    }
                }
                else {
                    if ((((rows) === (1)) ? 1 : 0)) {
                        (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scroll_rows?.(1) ?? 0);
                        (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scroll_cols?.(64) ?? 0);
                        let xscroll = ((__add_update_scroll(runtime, (scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (0)] ?? 0) : runtime.readIndex(scrollram_x, 0)), ((256) * ((scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (1)] ?? 0) : runtime.readIndex(scrollram_x, 1)))))) | 0);
                        (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scrollx?.(0, xscroll) ?? 0);
                        xscroll = ((((xscroll) / (8))) | 0);
                        for (let offs = ((0) | 0); (((offs) < (64)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
                            let yscroll = (((scrollram_y$s !== undefined ? (scrollram_y$s[scrollram_y$o + (offs)] ?? 0) : runtime.readIndex(scrollram_y, offs))) | 0);
                            (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scrolly?.(((((offs) + (xscroll))) & (63)), yscroll) ?? 0);
                        }
                    }
                    else {
                        (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scroll_rows?.(rows) ?? 0);
                        (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scroll_cols?.(64) ?? 0);
                        let offs_step = (((((((rows) === (256)) ? 1 : 0)) ? (2) : (16))) | 0);
                        for (let offs = ((0) | 0); (((offs) < (rows)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
                            let xscroll = ((__add_update_scroll(runtime, (scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (((offs_step) * (offs)))] ?? 0) : runtime.readIndex(scrollram_x, ((offs_step) * (offs)))), ((256) * ((scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (__add_update_scroll(runtime, ((offs_step) * (offs)), 1))] ?? 0) : runtime.readIndex(scrollram_x, __add_update_scroll(runtime, ((offs_step) * (offs)), 1))))))) | 0);
                            (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scrollx?.(offs, xscroll) ?? 0);
                        }
                        for (let offs = ((0) | 0); (((offs) < (64)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
                            let yscroll = (((scrollram_y$s !== undefined ? (scrollram_y$s[scrollram_y$o + (offs)] ?? 0) : runtime.readIndex(scrollram_y, offs))) | 0);
                            (__deref_update_scroll(runtime, h_m_tilemap[t]).set_scrolly?.(offs, yscroll) ?? 0);
                        }
                    }
                }
            }
        }
    }
    function __add_update_scroll(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_update_scroll(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_update_scroll(runtime, p) {
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
    function method_tilemap_draw(runtime, screen, bitmap, cliprect, tmap_num, flags = 0, priority = 0, priority_mask = 255) {
        const members = runtime.members;
        priority = ((priority) & 0xff);
        priority_mask = ((priority_mask) & 0xff);
        const h_m_tilemap = members.m_tilemap ?? 0;
        (__deref_tilemap_draw(runtime, h_m_tilemap[tmap_num]).draw?.(screen, bitmap, cliprect, flags, priority, priority_mask) ?? 0);
    }
    function __deref_tilemap_draw(runtime, p) {
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
    function method_mark_tilemap_dirty(runtime, tmap_num) {
        const members = runtime.members;
        let __t0;
        tmap_num = ((tmap_num) & 0xff);
        const h_m_tilemap = members.m_tilemap ?? 0;
        (__t0 = __deref_mark_tilemap_dirty(runtime, h_m_tilemap[tmap_num]), typeof __t0.mark_all_dirty === 'function' ? (__t0.mark_all_dirty() ?? 0) : runtime.container(h_m_tilemap[tmap_num], "mark_all_dirty"));
    }
    function __deref_mark_tilemap_dirty(runtime, p) {
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
    function method_firq_scanline(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_firq_handler"], __L1 = __l["screen"], __L2 = __l["screen().vpos"], __L3 = __l["screen().time_until_pos"];
        if (((((members.m_irq_control ?? 0)) >>> (1)) & 1)) {
            (__L0 ? __L0(Number(1)) : typeof members.m_firq_handler === 'function' ? members.m_firq_handler(1) : runtime.invoke("m_firq_handler", 1));
        }
        (__deref_firq_scanline(runtime, members.m_firq_scanline).adjust?.(((__L3 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(__add_firq_scanline(runtime, ((__L2 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0), 2)) ?? 0)) ?? 0);
    }
    function __add_firq_scanline(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_firq_scanline(runtime, p) {
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
    function method_nmi_scanline(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_nmi_handler"], __L1 = __l["screen"], __L2 = __l["screen().vpos"], __L3 = __l["screen().time_until_pos"];
        if (((((members.m_irq_control ?? 0)) >>> (0)) & 1)) {
            (__L0 ? __L0(Number(1)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(1) : runtime.invoke("m_nmi_handler", 1));
        }
        (__deref_nmi_scanline(runtime, members.m_nmi_scanline).adjust?.(((__L3 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(__add_nmi_scanline(runtime, ((__L2 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0), 32)) ?? 0)) ?? 0);
    }
    function __add_nmi_scanline(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_nmi_scanline(runtime, p) {
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
    function method_get_tile_info0(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        runtime.invoke("get_tile_info", tileinfo, tile_index, 0, (members.m_colorram_F ?? 0), (members.m_videoram_F ?? 0), (members.m_videoram2_F ?? 0));
    }
    function method_get_tile_info1(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        runtime.invoke("get_tile_info", tileinfo, tile_index, 1, (members.m_colorram_A ?? 0), (members.m_videoram_A ?? 0), (members.m_videoram2_A ?? 0));
    }
    function method_get_tile_info2(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        runtime.invoke("get_tile_info", tileinfo, tile_index, 2, (members.m_colorram_B ?? 0), (members.m_videoram_B ?? 0), (members.m_videoram2_B ?? 0));
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
    function method_set_rmrd_line(runtime, state) {
        const members = runtime.members;
        members.m_rmrd_line = ((state) | 0);
    }
    function method_get_rmrd_line(runtime) {
        const members = runtime.members;
        return (((members.m_rmrd_line ?? 0)) | 0);
    }
    function method_k052109_device__irq_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k052109_device__irq_handler(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function __deref_k052109_device__irq_handler(runtime, p) {
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
    function method_k052109_device__nmi_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k052109_device__nmi_handler(runtime, members.m_nmi_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_nmi_handler, "bind"));
    }
    function __deref_k052109_device__nmi_handler(runtime, p) {
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
    function method_k052109_device__set_rmrd_line(runtime, state) {
        const members = runtime.members;
        members.m_rmrd_line = ((state) | 0);
    }
    function method_k052109_device__get_rmrd_line(runtime) {
        const members = runtime.members;
        return (((members.m_rmrd_line ?? 0)) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_reset": method_device_reset,
        "write": method_write,
        "read": method_read,
        "update_scroll": method_update_scroll,
        "tilemap_draw": method_tilemap_draw,
        "mark_tilemap_dirty": method_mark_tilemap_dirty,
        "firq_scanline": method_firq_scanline,
        "nmi_scanline": method_nmi_scanline,
        "get_tile_info0": method_get_tile_info0,
        "get_tile_info1": method_get_tile_info1,
        "get_tile_info2": method_get_tile_info2,
        "irq_handler": method_irq_handler,
        "nmi_handler": method_nmi_handler,
        "set_rmrd_line": method_set_rmrd_line,
        "get_rmrd_line": method_get_rmrd_line,
        "k052109_device::irq_handler": method_k052109_device__irq_handler,
        "k052109_device::nmi_handler": method_k052109_device__nmi_handler,
        "k052109_device::set_rmrd_line": method_k052109_device__set_rmrd_line,
        "k052109_device::get_rmrd_line": method_k052109_device__get_rmrd_line
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_firq_handler", "m_irq_handler", "m_k052109_cb", "m_nmi_handler", "screen", "screen().time_until_pos", "screen().vpos"];
export const device = definition;
export default device;
