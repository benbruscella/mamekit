import deviceData from './segaic16vid.device.ir.json' with { type: 'json' };
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
    function method_tilemap_16b_fill_latch(runtime, i, latched_pageselect, latched_yscroll, latched_xscroll, textram) {
        const members = runtime.members;
        runtime.writeIndex(latched_pageselect, i, runtime.readIndex(textram, ((runtime.divide(3712, 2)) + (i))));
        runtime.writeIndex(latched_yscroll, i, runtime.readIndex(textram, ((runtime.divide(3728, 2)) + (i))));
        runtime.writeIndex(latched_xscroll, i, runtime.readIndex(textram, ((runtime.divide(3736, 2)) + (i))));
    }
    function method_tilemap_draw(runtime, screen, bitmap, cliprect, which, map, priority, priority_mark) {
        const members = runtime.members;
        const h_m_bg_tilemap = members.m_bg_tilemap ?? 0;
        let info = __addr_tilemap_draw(runtime, h_m_bg_tilemap, which);
        let __pointee_info = __deref_tilemap_draw(runtime, info);
        if (((Number(map) === Number(2)) ? 1 : 0)) {
            (__deref_tilemap_draw(runtime, __pointee_info.textmap).draw?.(screen, bitmap, cliprect, priority, priority_mark) ?? 0);
        }
        else {
            __deref_tilemap_draw(runtime, __pointee_info.draw_layer)(screen, info, bitmap, cliprect, map, priority, priority_mark);
        }
    }
    function __addr_tilemap_draw(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
    function method_tileram_r(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_tileram ?? 0), offset)) & 0xffff);
    }
    function method_tileram_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
        const h_m_bg_tilemap = members.m_bg_tilemap ?? 0;
        runtime.combineData(__addr_tileram_w(runtime, (members.m_tileram ?? 0), offset), data, mem_mask);
        (__deref_tileram_w(runtime, h_m_bg_tilemap[0].tilemaps[runtime.divide(offset, 2048)]).mark_tile_dirty?.(((offset) % (2048))) ?? 0);
    }
    function __addr_tileram_w(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_tileram_w(runtime, p) {
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
    function method_textram_r(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_textram ?? 0), offset)) & 0xffff);
    }
    function method_textram_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().vpos"], __L2 = __l["screen().update_partial"];
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
        const h_m_bg_tilemap = members.m_bg_tilemap ?? 0;
        if (((Number(offset) >= Number(runtime.divide(3712, 2))) ? 1 : 0)) {
            ((__L2 ?? globalThis.mamekitMissingCall?.("screen().update_partial"))?.(((__L1 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) ?? 0);
        }
        runtime.combineData(__addr_textram_w(runtime, (members.m_textram ?? 0), offset), data, mem_mask);
        (__deref_textram_w(runtime, h_m_bg_tilemap[0].textmap).mark_tile_dirty?.(offset) ?? 0);
    }
    function __addr_textram_w(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_textram_w(runtime, p) {
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
    function method_rotate_draw(runtime, which, bitmap, cliprect, priority_bitmap, srcbitmap) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4;
        const h_m_rotate = members.m_rotate ?? 0;
        let info = __addr_rotate_draw(runtime, h_m_rotate, which);
        let __pointee_info = __deref_rotate_draw(runtime, info);
        let currx = ((((((runtime.readIndex(__pointee_info.buffer, 1008)) << (16))) | (runtime.readIndex(__pointee_info.buffer, 1009)))) | 0);
        let curry = ((((((runtime.readIndex(__pointee_info.buffer, 1010)) << (16))) | (runtime.readIndex(__pointee_info.buffer, 1011)))) | 0);
        let dyy = ((((((runtime.readIndex(__pointee_info.buffer, 1012)) << (16))) | (runtime.readIndex(__pointee_info.buffer, 1013)))) | 0);
        let dxx = ((((((runtime.readIndex(__pointee_info.buffer, 1014)) << (16))) | (runtime.readIndex(__pointee_info.buffer, 1015)))) | 0);
        let dxy = ((((((runtime.readIndex(__pointee_info.buffer, 1016)) << (16))) | (runtime.readIndex(__pointee_info.buffer, 1017)))) | 0);
        let dyx = ((((((runtime.readIndex(__pointee_info.buffer, 1018)) << (16))) | (runtime.readIndex(__pointee_info.buffer, 1019)))) | 0);
        currx = ((((currx) + (__add_rotate_draw(runtime, ((dxx) * (__add_rotate_draw(runtime, cliprect.min_x, 27))), ((dxy) * (cliprect.min_y)))))) | 0);
        curry = ((((curry) + (__add_rotate_draw(runtime, ((dyx) * (__add_rotate_draw(runtime, cliprect.min_x, 27))), ((dyy) * (cliprect.min_y)))))) | 0);
        for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            let dest = bitmap["pix&"](y);
            let src = srcbitmap["pix&"](0);
            let src$s = undefined, src$o = 0;
            if (ArrayBuffer.isView(src) || Array.isArray(src))
                src$s = src;
            else if (src !== null && typeof src === 'object' && src.generatedPointer === true && src.path === undefined && src.target === undefined && (ArrayBuffer.isView(src.source) || Array.isArray(src.source))) {
                src$s = src.source;
                src$o = src.offset;
            }
            let pri = priority_bitmap["pix&"](y);
            let tx = ((currx) | 0);
            let ty = ((curry) | 0);
            for (let x = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                let sx = ((((runtime.shiftRight(tx, 14)) & (511))) | 0);
                let sy = ((((runtime.shiftRight(ty, 14)) & (511))) | 0);
                let pix = (((src$s !== undefined ? (src$s[src$o + (((((sy) * ((__t0 = __deref_rotate_draw(runtime, srcbitmap), typeof __t0.rowpixels === 'function' ? __t0.rowpixels() : typeof __t0.rowpixels === 'number' || typeof __t0.rowpixels === 'boolean' ? __t0.rowpixels : runtime.container(srcbitmap, "rowpixels"))))) + (sx)))] ?? 0) : runtime.readIndex(src, ((((sy) * ((__t0 = __deref_rotate_draw(runtime, srcbitmap), typeof __t0.rowpixels === 'function' ? __t0.rowpixels() : typeof __t0.rowpixels === 'number' || typeof __t0.rowpixels === 'boolean' ? __t0.rowpixels : runtime.container(srcbitmap, "rowpixels"))))) + (sx))))) | 0);
                if ((((pix) !== (65535)) ? 1 : 0)) {
                    runtime.pointerStore((__t1 = dest, dest = __add_rotate_draw(runtime, dest, 1), __t1), ((((((((pix) & (511))) | (((runtime.shiftRight(pix, 6)) & (512))))) | (((runtime.shiftRight(pix, 3)) & (3072))))) | (4096)));
                    runtime.pointerStore((__t2 = pri, pri = __add_rotate_draw(runtime, pri, 1), __t2), ((runtime.shiftRight(pix, 8)) | (1)));
                }
                else {
                    runtime.pointerStore((__t3 = dest, dest = __add_rotate_draw(runtime, dest, 1), __t3), ((__pointee_info.colorbase) + (sy)));
                    runtime.pointerStore((__t4 = pri, pri = __add_rotate_draw(runtime, pri, 1), __t4), 255);
                }
                tx = ((((tx) + (dxx))) | 0);
                ty = ((((ty) + (dyx))) | 0);
            }
            currx = ((((currx) + (dxy))) | 0);
            curry = ((((curry) + (dyy))) | 0);
        }
    }
    function __add_rotate_draw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_rotate_draw(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_rotate_draw(runtime, p) {
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
    function method_rotate_control_r(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_rotate = members.m_rotate ?? 0;
        let info = __addr_rotate_control_r(runtime, h_m_rotate, 0);
        let __pointee_info = __deref_rotate_control_r(runtime, info);
        if (__pointee_info.buffer) {
            let src = runtime.packedView(__pointee_info.rotateram, 'u32');
            let dst = runtime.packedView(__pointee_info.buffer, 'u32');
            for (let i = ((0) | 0); ((Number(i) < Number(runtime.divide(__pointee_info.ramsize, 4))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let temp = ((__deref_rotate_control_r(runtime, src)) >>> 0);
                runtime.pointerStore((__t0 = src, src = __add_rotate_control_r(runtime, src, 1), __t0), __deref_rotate_control_r(runtime, dst));
                runtime.pointerStore((__t1 = dst, dst = __add_rotate_control_r(runtime, dst, 1), __t1), temp);
            }
        }
        return ((65535) & 0xffff);
    }
    function __add_rotate_control_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_rotate_control_r(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_rotate_control_r(runtime, p) {
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
    function method_tilemap_16a_tile_info(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        let __t0;
        let info = (__t0 = __deref_tilemap_16a_tile_info(runtime, tilemap), typeof __t0.user_data === 'function' ? __t0.user_data() : typeof __t0.user_data === 'number' || typeof __t0.user_data === 'boolean' ? __t0.user_data : runtime.container(tilemap, "user_data"));
        let info$s = undefined, info$o = 0;
        if (ArrayBuffer.isView(info) || Array.isArray(info))
            info$s = info;
        else if (info !== null && typeof info === 'object' && info.generatedPointer === true && info.path === undefined && info.target === undefined && (ArrayBuffer.isView(info.source) || Array.isArray(info.source))) {
            info$s = info.source;
            info$o = info.offset;
        }
        let data = ((runtime.readIndex(__deref_tilemap_16a_tile_info(runtime, info).rambase, tile_index)) & 0xffff);
        let code = ((((((((data) >>> (1))) & (4096))) | (((data) & (4095))))) | 0);
        let color = ((((((data) >>> (5))) & (127))) | 0);
        (__deref_tilemap_16a_tile_info(runtime, tileinfo).set?.(0, code, color, 0) ?? 0);
        tileinfo.category = ((((data) >>> (12))) & (1));
    }
    function __deref_tilemap_16a_tile_info(runtime, p) {
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
    function method_tilemap_16a_text_info(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        let __t0;
        let info = (__t0 = __deref_tilemap_16a_text_info(runtime, tilemap), typeof __t0.user_data === 'function' ? __t0.user_data() : typeof __t0.user_data === 'number' || typeof __t0.user_data === 'boolean' ? __t0.user_data : runtime.container(tilemap, "user_data"));
        let info$s = undefined, info$o = 0;
        if (ArrayBuffer.isView(info) || Array.isArray(info))
            info$s = info;
        else if (info !== null && typeof info === 'object' && info.generatedPointer === true && info.path === undefined && info.target === undefined && (ArrayBuffer.isView(info.source) || Array.isArray(info.source))) {
            info$s = info.source;
            info$o = info.offset;
        }
        let data = ((runtime.readIndex(__deref_tilemap_16a_text_info(runtime, info).rambase, tile_index)) & 0xffff);
        let color = ((((((data) >>> (8))) & (7))) | 0);
        let code = ((((data) & (255))) | 0);
        (__deref_tilemap_16a_text_info(runtime, tileinfo).set?.(0, code, color, 0) ?? 0);
        tileinfo.category = ((((data) >>> (11))) & (1));
    }
    function __deref_tilemap_16a_text_info(runtime, p) {
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
    function method_tilemap_16b_tile_info(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        let __t0;
        let info = (__t0 = __deref_tilemap_16b_tile_info(runtime, tilemap), typeof __t0.user_data === 'function' ? __t0.user_data() : typeof __t0.user_data === 'number' || typeof __t0.user_data === 'boolean' ? __t0.user_data : runtime.container(tilemap, "user_data"));
        let info$s = undefined, info$o = 0;
        if (ArrayBuffer.isView(info) || Array.isArray(info))
            info$s = info;
        else if (info !== null && typeof info === 'object' && info.generatedPointer === true && info.path === undefined && info.target === undefined && (ArrayBuffer.isView(info.source) || Array.isArray(info.source))) {
            info$s = info.source;
            info$o = info.offset;
        }
        let data = ((runtime.readIndex(__deref_tilemap_16b_tile_info(runtime, info).rambase, tile_index)) & 0xffff);
        let color = ((((((data) >>> (6))) & (127))) | 0);
        let code = ((((data) & (8191))) | 0);
        code = ((__add_tilemap_16b_tile_info(runtime, ((runtime.readIndex(__deref_tilemap_16b_tile_info(runtime, info).bank, runtime.divide(code, __deref_tilemap_16b_tile_info(runtime, info).banksize))) * (__deref_tilemap_16b_tile_info(runtime, info).banksize)), ((code) % (__deref_tilemap_16b_tile_info(runtime, info).banksize)))) | 0);
        (__deref_tilemap_16b_tile_info(runtime, tileinfo).set?.(0, code, color, 0) ?? 0);
        tileinfo.category = ((((data) >>> (15))) & (1));
    }
    function __add_tilemap_16b_tile_info(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_tilemap_16b_tile_info(runtime, p) {
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
    function method_tilemap_16b_text_info(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        let __t0;
        let info = (__t0 = __deref_tilemap_16b_text_info(runtime, tilemap), typeof __t0.user_data === 'function' ? __t0.user_data() : typeof __t0.user_data === 'number' || typeof __t0.user_data === 'boolean' ? __t0.user_data : runtime.container(tilemap, "user_data"));
        let info$s = undefined, info$o = 0;
        if (ArrayBuffer.isView(info) || Array.isArray(info))
            info$s = info;
        else if (info !== null && typeof info === 'object' && info.generatedPointer === true && info.path === undefined && info.target === undefined && (ArrayBuffer.isView(info.source) || Array.isArray(info.source))) {
            info$s = info.source;
            info$o = info.offset;
        }
        let data = ((runtime.readIndex(__deref_tilemap_16b_text_info(runtime, info).rambase, tile_index)) & 0xffff);
        let bank = ((runtime.readIndex(__deref_tilemap_16b_text_info(runtime, info).bank, 0)) | 0);
        let color = ((((((data) >>> (9))) & (7))) | 0);
        let code = ((((data) & (511))) | 0);
        (__deref_tilemap_16b_text_info(runtime, tileinfo).set?.(0, ((((bank) * (__deref_tilemap_16b_text_info(runtime, info).banksize))) + (code)), color, 0) ?? 0);
        tileinfo.category = ((((data) >>> (15))) & (1));
    }
    function __deref_tilemap_16b_text_info(runtime, p) {
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
    function method_tilemap_16b_alt_tile_info(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        let __t0;
        let info = (__t0 = __deref_tilemap_16b_alt_tile_info(runtime, tilemap), typeof __t0.user_data === 'function' ? __t0.user_data() : typeof __t0.user_data === 'number' || typeof __t0.user_data === 'boolean' ? __t0.user_data : runtime.container(tilemap, "user_data"));
        let info$s = undefined, info$o = 0;
        if (ArrayBuffer.isView(info) || Array.isArray(info))
            info$s = info;
        else if (info !== null && typeof info === 'object' && info.generatedPointer === true && info.path === undefined && info.target === undefined && (ArrayBuffer.isView(info.source) || Array.isArray(info.source))) {
            info$s = info.source;
            info$o = info.offset;
        }
        let data = ((runtime.readIndex(__deref_tilemap_16b_alt_tile_info(runtime, info).rambase, tile_index)) & 0xffff);
        let color = ((((((data) >>> (5))) & (127))) | 0);
        let code = ((((data) & (8191))) | 0);
        code = ((__add_tilemap_16b_alt_tile_info(runtime, ((runtime.readIndex(__deref_tilemap_16b_alt_tile_info(runtime, info).bank, runtime.divide(code, __deref_tilemap_16b_alt_tile_info(runtime, info).banksize))) * (__deref_tilemap_16b_alt_tile_info(runtime, info).banksize)), ((code) % (__deref_tilemap_16b_alt_tile_info(runtime, info).banksize)))) | 0);
        (__deref_tilemap_16b_alt_tile_info(runtime, tileinfo).set?.(0, code, color, 0) ?? 0);
        tileinfo.category = ((((data) >>> (15))) & (1));
    }
    function __add_tilemap_16b_alt_tile_info(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_tilemap_16b_alt_tile_info(runtime, p) {
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
    function method_tilemap_16b_alt_text_info(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        let __t0;
        let info = (__t0 = __deref_tilemap_16b_alt_text_info(runtime, tilemap), typeof __t0.user_data === 'function' ? __t0.user_data() : typeof __t0.user_data === 'number' || typeof __t0.user_data === 'boolean' ? __t0.user_data : runtime.container(tilemap, "user_data"));
        let info$s = undefined, info$o = 0;
        if (ArrayBuffer.isView(info) || Array.isArray(info))
            info$s = info;
        else if (info !== null && typeof info === 'object' && info.generatedPointer === true && info.path === undefined && info.target === undefined && (ArrayBuffer.isView(info.source) || Array.isArray(info.source))) {
            info$s = info.source;
            info$o = info.offset;
        }
        let data = ((runtime.readIndex(__deref_tilemap_16b_alt_text_info(runtime, info).rambase, tile_index)) & 0xffff);
        let bank = ((runtime.readIndex(__deref_tilemap_16b_alt_text_info(runtime, info).bank, 0)) | 0);
        let color = ((((((data) >>> (8))) & (7))) | 0);
        let code = ((((data) & (255))) | 0);
        (__deref_tilemap_16b_alt_text_info(runtime, tileinfo).set?.(0, ((((bank) * (__deref_tilemap_16b_alt_text_info(runtime, info).banksize))) + (code)), color, 0) ?? 0);
        tileinfo.category = ((((data) >>> (15))) & (1));
    }
    function __deref_tilemap_16b_alt_text_info(runtime, p) {
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
    function method_tilemap_16b_latch_values(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pagelatch_cb"], __L1 = __l["screen"], __L2 = __l["screen().time_until_pos"];
        const h_m_bg_tilemap = members.m_bg_tilemap ?? 0;
        let info = __addr_tilemap_16b_latch_values(runtime, h_m_bg_tilemap, param);
        let __pointee_info = __deref_tilemap_16b_latch_values(runtime, info);
        let textram = __pointee_info.textram;
        let textram$s = undefined, textram$o = 0;
        if (ArrayBuffer.isView(textram) || Array.isArray(textram))
            textram$s = textram;
        else if (textram !== null && typeof textram === 'object' && textram.generatedPointer === true && textram.path === undefined && textram.target === undefined && (ArrayBuffer.isView(textram.source) || Array.isArray(textram.source))) {
            textram$s = textram.source;
            textram$o = textram.offset;
        }
        let i = ((0) | 0);
        for (i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (__L0 ? __L0(({ generatedLValue: true, get: () => i, set: (value) => { i = ((value) | 0); } }), ({ generatedLValue: true, get: () => __pointee_info.latched_pageselect, set: (value) => { __pointee_info.latched_pageselect = ((value) & 0xffff); }, address: () => runtime.fieldAddress(info, "latched_pageselect") }), ({ generatedLValue: true, get: () => __pointee_info.latched_yscroll, set: (value) => { __pointee_info.latched_yscroll = ((value) & 0xffff); }, address: () => runtime.fieldAddress(info, "latched_yscroll") }), ({ generatedLValue: true, get: () => __pointee_info.latched_xscroll, set: (value) => { __pointee_info.latched_xscroll = ((value) & 0xffff); }, address: () => runtime.fieldAddress(info, "latched_xscroll") }), ({ generatedLValue: true, get: () => textram, set: (value) => { textram = value; } })) : runtime.macro("m_pagelatch_cb", ({ generatedLValue: true, get: () => i, set: (value) => { i = ((value) | 0); } }), ({ generatedLValue: true, get: () => __pointee_info.latched_pageselect, set: (value) => { __pointee_info.latched_pageselect = ((value) & 0xffff); }, address: () => runtime.fieldAddress(info, "latched_pageselect") }), ({ generatedLValue: true, get: () => __pointee_info.latched_yscroll, set: (value) => { __pointee_info.latched_yscroll = ((value) & 0xffff); }, address: () => runtime.fieldAddress(info, "latched_yscroll") }), ({ generatedLValue: true, get: () => __pointee_info.latched_xscroll, set: (value) => { __pointee_info.latched_xscroll = ((value) & 0xffff); }, address: () => runtime.fieldAddress(info, "latched_xscroll") }), ({ generatedLValue: true, get: () => textram, set: (value) => { textram = value; } })));
        }
        (__deref_tilemap_16b_latch_values(runtime, __pointee_info.latch_timer).adjust?.(((__L2 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(261) ?? 0), param) ?? 0);
    }
    function __addr_tilemap_16b_latch_values(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_tilemap_16b_latch_values(runtime, p) {
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
    function method_tilemap_16a_draw_layer(runtime, screen, info, bitmap, cliprect, which, flags, priority) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["osd_printf_debug"], __L1 = __l["rectangle"];
        let textram = __deref_tilemap_16a_draw_layer(runtime, info).textram;
        let textram$s = undefined, textram$o = 0;
        if (ArrayBuffer.isView(textram) || Array.isArray(textram))
            textram$s = textram;
        else if (textram !== null && typeof textram === 'object' && textram.generatedPointer === true && textram.path === undefined && textram.target === undefined && (ArrayBuffer.isView(textram.source) || Array.isArray(textram.source))) {
            textram$s = textram.source;
            textram$o = textram.offset;
        }
        let xscroll = (((((textram$s !== undefined ? (textram$s[textram$o + (((runtime.divide(4088, 2)) + (which)))] ?? 0) : runtime.readIndex(textram, ((runtime.divide(4088, 2)) + (which))))) & (511))) & 0xffff);
        let yscroll = (((((textram$s !== undefined ? (textram$s[textram$o + (((runtime.divide(3876, 2)) + (which)))] ?? 0) : runtime.readIndex(textram, ((runtime.divide(3876, 2)) + (which))))) & (255))) & 0xffff);
        let pages = (((textram$s !== undefined ? (textram$s[textram$o + (((((__deref_tilemap_16a_draw_layer(runtime, info).flip) ? (runtime.divide(3726, 2)) : (runtime.divide(3742, 2)))) - (which)))] ?? 0) : runtime.readIndex(textram, ((((__deref_tilemap_16a_draw_layer(runtime, info).flip) ? (runtime.divide(3726, 2)) : (runtime.divide(3742, 2)))) - (which))))) & 0xffff);
        let x = ((0) | 0);
        let y = ((0) | 0);
        pages = ((((((((pages) >>> (4))) & (1799))) | (((((pages) << (4))) & (28784))))) & 0xffff);
        if (((Number(__deref_tilemap_16a_draw_layer(runtime, info).numpages) === Number(4)) ? 1 : 0)) {
            pages = ((((pages) & (13107))) & 0xffff);
        }
        if ((((__deref_tilemap_16a_draw_layer(runtime, info).colscroll) && (__deref_tilemap_16a_draw_layer(runtime, info).rowscroll)) ? 1 : 0)) {
            if (0) {
                (__L0 ? __L0("Column AND row scroll\n") : runtime.macro("osd_printf_debug", "Column AND row scroll\n"));
            }
            for (y = ((((cliprect.min_y) & (-8))) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (8))) | 0)) {
                let rowscrollindex = ((runtime.divide(((__deref_tilemap_16a_draw_layer(runtime, info).flip) ? (((216) - (y))) : (y)), 8)) | 0);
                let rowcolclip = (__L1 ? __L1() : runtime.macro("rectangle"));
                rowcolclip.min_y = ((((Number(y) < Number(cliprect.min_y)) ? 1 : 0)) ? (cliprect.min_y) : (y));
                rowcolclip.max_y = ((((Number(((y) + (7))) > Number(cliprect.max_y)) ? 1 : 0)) ? (cliprect.max_y) : (((y) + (7))));
                for (x = ((((cliprect.min_x) & (-16))) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (16))) | 0)) {
                    let effxscroll = ((0) & 0xffff);
                    let effyscroll = ((0) & 0xffff);
                    rowcolclip.min_x = ((((Number(x) < Number(cliprect.min_x)) ? 1 : 0)) ? (cliprect.min_x) : (x));
                    rowcolclip.max_x = ((((Number(((x) + (15))) > Number(cliprect.max_x)) ? 1 : 0)) ? (cliprect.max_x) : (((x) + (15))));
                    effxscroll = (((((textram$s !== undefined ? (textram$s[textram$o + (((__add_tilemap_16a_draw_layer(runtime, runtime.divide(3968, 2), ((rowscrollindex) * (2)))) + (which)))] ?? 0) : runtime.readIndex(textram, ((__add_tilemap_16a_draw_layer(runtime, runtime.divide(3968, 2), ((rowscrollindex) * (2)))) + (which))))) & (511))) & 0xffff);
                    effyscroll = (((((textram$s !== undefined ? (textram$s[textram$o + (((__add_tilemap_16a_draw_layer(runtime, runtime.divide(3888, 2), ((runtime.divide(x, 16)) * (2)))) + (which)))] ?? 0) : runtime.readIndex(textram, ((__add_tilemap_16a_draw_layer(runtime, runtime.divide(3888, 2), ((runtime.divide(x, 16)) * (2)))) + (which))))) & (255))) & 0xffff);
                    if (__deref_tilemap_16a_draw_layer(runtime, info).flip) {
                        effxscroll = ((((effxscroll) + (17))) & 0xffff);
                    }
                    effxscroll = ((((__add_tilemap_16a_draw_layer(runtime, ((200) - (effxscroll)), __deref_tilemap_16a_draw_layer(runtime, info).xoffs)) & (1023))) & 0xffff);
                    effyscroll = ((((effyscroll) & (511))) & 0xffff);
                    method_draw_virtual_tilemap(runtime, screen, info, bitmap, rowcolclip, pages, effxscroll, effyscroll, flags, priority);
                }
            }
        }
        else {
            if (__deref_tilemap_16a_draw_layer(runtime, info).colscroll) {
                if (0) {
                    (__L0 ? __L0("Column scroll\n") : runtime.macro("osd_printf_debug", "Column scroll\n"));
                }
                for (x = ((((cliprect.min_x) & (-16))) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (16))) | 0)) {
                    let colclip = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(cliprect);
                    let effxscroll = ((0) & 0xffff);
                    let effyscroll = ((0) & 0xffff);
                    colclip.min_x = ((((Number(x) < Number(cliprect.min_x)) ? 1 : 0)) ? (cliprect.min_x) : (x));
                    colclip.max_x = ((((Number(((x) + (15))) > Number(cliprect.max_x)) ? 1 : 0)) ? (cliprect.max_x) : (((x) + (15))));
                    effxscroll = ((xscroll) & 0xffff);
                    effyscroll = (((((textram$s !== undefined ? (textram$s[textram$o + (((__add_tilemap_16a_draw_layer(runtime, runtime.divide(3888, 2), ((runtime.divide(x, 16)) * (2)))) + (which)))] ?? 0) : runtime.readIndex(textram, ((__add_tilemap_16a_draw_layer(runtime, runtime.divide(3888, 2), ((runtime.divide(x, 16)) * (2)))) + (which))))) & (255))) & 0xffff);
                    if (__deref_tilemap_16a_draw_layer(runtime, info).flip) {
                        effxscroll = ((((effxscroll) + (17))) & 0xffff);
                    }
                    effxscroll = ((((__add_tilemap_16a_draw_layer(runtime, ((200) - (effxscroll)), __deref_tilemap_16a_draw_layer(runtime, info).xoffs)) & (1023))) & 0xffff);
                    effyscroll = ((((effyscroll) & (511))) & 0xffff);
                    method_draw_virtual_tilemap(runtime, screen, info, bitmap, colclip, pages, effxscroll, effyscroll, flags, priority);
                }
            }
            else {
                if (__deref_tilemap_16a_draw_layer(runtime, info).rowscroll) {
                    if (0) {
                        (__L0 ? __L0("Row scroll\n") : runtime.macro("osd_printf_debug", "Row scroll\n"));
                    }
                    for (y = ((((cliprect.min_y) & (-8))) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (8))) | 0)) {
                        let rowscrollindex = ((runtime.divide(((__deref_tilemap_16a_draw_layer(runtime, info).flip) ? (((216) - (y))) : (y)), 8)) | 0);
                        let rowclip = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(cliprect);
                        let effxscroll = ((0) & 0xffff);
                        let effyscroll = ((0) & 0xffff);
                        rowclip.min_y = ((((Number(y) < Number(cliprect.min_y)) ? 1 : 0)) ? (cliprect.min_y) : (y));
                        rowclip.max_y = ((((Number(((y) + (7))) > Number(cliprect.max_y)) ? 1 : 0)) ? (cliprect.max_y) : (((y) + (7))));
                        effxscroll = (((((textram$s !== undefined ? (textram$s[textram$o + (((__add_tilemap_16a_draw_layer(runtime, runtime.divide(3968, 2), ((rowscrollindex) * (2)))) + (which)))] ?? 0) : runtime.readIndex(textram, ((__add_tilemap_16a_draw_layer(runtime, runtime.divide(3968, 2), ((rowscrollindex) * (2)))) + (which))))) & (511))) & 0xffff);
                        effyscroll = ((yscroll) & 0xffff);
                        if (__deref_tilemap_16a_draw_layer(runtime, info).flip) {
                            effxscroll = ((((effxscroll) + (17))) & 0xffff);
                        }
                        effxscroll = ((((__add_tilemap_16a_draw_layer(runtime, ((200) - (effxscroll)), __deref_tilemap_16a_draw_layer(runtime, info).xoffs)) & (1023))) & 0xffff);
                        effyscroll = ((((effyscroll) & (511))) & 0xffff);
                        method_draw_virtual_tilemap(runtime, screen, info, bitmap, rowclip, pages, effxscroll, effyscroll, flags, priority);
                    }
                }
                else {
                    if (__deref_tilemap_16a_draw_layer(runtime, info).flip) {
                        xscroll = ((((xscroll) + (17))) & 0xffff);
                    }
                    xscroll = ((((__add_tilemap_16a_draw_layer(runtime, ((200) - (xscroll)), __deref_tilemap_16a_draw_layer(runtime, info).xoffs)) & (1023))) & 0xffff);
                    yscroll = ((((yscroll) & (511))) & 0xffff);
                    method_draw_virtual_tilemap(runtime, screen, info, bitmap, cliprect, pages, xscroll, yscroll, flags, priority);
                }
            }
        }
    }
    function __add_tilemap_16a_draw_layer(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_tilemap_16a_draw_layer(runtime, p) {
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
    function method_draw_virtual_tilemap(runtime, screen, info, bitmap, cliprect, pages, xscroll, yscroll, flags, priority) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rectangle"];
        let __t0, __t1;
        pages = ((pages) & 0xffff);
        xscroll = ((xscroll) & 0xffff);
        yscroll = ((yscroll) & 0xffff);
        let leftmin = ((-1) | 0);
        let leftmax = ((-1) | 0);
        let rightmin = ((-1) | 0);
        let rightmax = ((-1) | 0);
        let topmin = ((-1) | 0);
        let topmax = ((-1) | 0);
        let bottommin = ((-1) | 0);
        let bottommax = ((-1) | 0);
        let pageclip = (__L0 ? __L0() : runtime.macro("rectangle"));
        let page = ((0) | 0);
        if (__deref_draw_virtual_tilemap(runtime, info).flip) {
            pages = ((((((pages) >>> (3)) & 1) << 15 | (((pages) >>> (2)) & 1) << 14 | (((pages) >>> (1)) & 1) << 13 | (((pages) >>> (0)) & 1) << 12 | (((pages) >>> (7)) & 1) << 11 | (((pages) >>> (6)) & 1) << 10 | (((pages) >>> (5)) & 1) << 9 | (((pages) >>> (4)) & 1) << 8 | (((pages) >>> (11)) & 1) << 7 | (((pages) >>> (10)) & 1) << 6 | (((pages) >>> (9)) & 1) << 5 | (((pages) >>> (8)) & 1) << 4 | (((pages) >>> (15)) & 1) << 3 | (((pages) >>> (14)) & 1) << 2 | (((pages) >>> (13)) & 1) << 1 | (((pages) >>> (12)) & 1) << 0)) & 0xffff);
        }
        let width = ((__add_draw_virtual_tilemap(runtime, (__t0 = __deref_draw_virtual_tilemap(runtime, screen), typeof __t0.visible_area === 'function' ? __t0.visible_area() : typeof __t0.visible_area === 'number' || typeof __t0.visible_area === 'boolean' ? __t0.visible_area : runtime.container(screen, "visible_area")).max_x, 1)) | 0);
        let height = ((__add_draw_virtual_tilemap(runtime, (__t1 = __deref_draw_virtual_tilemap(runtime, screen), typeof __t1.visible_area === 'function' ? __t1.visible_area() : typeof __t1.visible_area === 'number' || typeof __t1.visible_area === 'boolean' ? __t1.visible_area : runtime.container(screen, "visible_area")).max_y, 1)) | 0);
        if (((Number(xscroll) < Number(((512) - (width)))) ? 1 : 0)) {
            leftmin = ((0) | 0);
            leftmax = ((((width) - (1))) | 0);
            rightmin = ((-1) | 0);
        }
        else {
            if (((Number(xscroll) < Number(512)) ? 1 : 0)) {
                leftmin = ((0) | 0);
                leftmax = ((((((512) - (xscroll))) - (1))) | 0);
                rightmin = ((((leftmax) + (1))) | 0);
                rightmax = ((((width) - (1))) | 0);
            }
            else {
                if (((Number(xscroll) < Number(((1024) - (width)))) ? 1 : 0)) {
                    rightmin = ((0) | 0);
                    rightmax = ((((width) - (1))) | 0);
                    leftmin = ((-1) | 0);
                }
                else {
                    rightmin = ((0) | 0);
                    rightmax = ((((((1024) - (xscroll))) - (1))) | 0);
                    leftmin = ((((rightmax) + (1))) | 0);
                    leftmax = ((((width) - (1))) | 0);
                }
            }
        }
        if (((Number(yscroll) < Number(((256) - (height)))) ? 1 : 0)) {
            topmin = ((0) | 0);
            topmax = ((((height) - (1))) | 0);
            bottommin = ((-1) | 0);
        }
        else {
            if (((Number(yscroll) < Number(256)) ? 1 : 0)) {
                topmin = ((0) | 0);
                topmax = ((((((256) - (yscroll))) - (1))) | 0);
                bottommin = ((((topmax) + (1))) | 0);
                bottommax = ((((height) - (1))) | 0);
            }
            else {
                if (((Number(yscroll) < Number(((512) - (height)))) ? 1 : 0)) {
                    bottommin = ((0) | 0);
                    bottommax = ((((height) - (1))) | 0);
                    topmin = ((-1) | 0);
                }
                else {
                    bottommin = ((0) | 0);
                    bottommax = ((((((512) - (yscroll))) - (1))) | 0);
                    topmin = ((((bottommax) + (1))) | 0);
                    topmax = ((((height) - (1))) | 0);
                }
            }
        }
        if (__deref_draw_virtual_tilemap(runtime, info).flip) {
            let temp = ((0) | 0);
            if (((Number(bottommin) !== Number(-1)) ? 1 : 0)) {
                bottommin = ((((((height) - (1))) - (bottommin))) | 0);
            }
            if (((Number(bottommax) !== Number(-1)) ? 1 : 0)) {
                bottommax = ((((((height) - (1))) - (bottommax))) | 0);
            }
            if (((Number(topmin) !== Number(-1)) ? 1 : 0)) {
                topmin = ((((((height) - (1))) - (topmin))) | 0);
            }
            if (((Number(topmax) !== Number(-1)) ? 1 : 0)) {
                topmax = ((((((height) - (1))) - (topmax))) | 0);
            }
            temp = ((bottommin) | 0);
            bottommin = ((topmax) | 0);
            topmax = ((temp) | 0);
            temp = ((bottommax) | 0);
            bottommax = ((topmin) | 0);
            topmin = ((temp) | 0);
            if (((Number(leftmin) !== Number(-1)) ? 1 : 0)) {
                leftmin = ((((((width) - (1))) - (leftmin))) | 0);
            }
            if (((Number(leftmax) !== Number(-1)) ? 1 : 0)) {
                leftmax = ((((((width) - (1))) - (leftmax))) | 0);
            }
            if (((Number(rightmin) !== Number(-1)) ? 1 : 0)) {
                rightmin = ((((((width) - (1))) - (rightmin))) | 0);
            }
            if (((Number(rightmax) !== Number(-1)) ? 1 : 0)) {
                rightmax = ((((((width) - (1))) - (rightmax))) | 0);
            }
            temp = ((leftmin) | 0);
            leftmin = ((rightmax) | 0);
            rightmax = ((temp) | 0);
            temp = ((leftmax) | 0);
            leftmax = ((rightmin) | 0);
            rightmin = ((temp) | 0);
        }
        if ((((((Number(leftmin) !== Number(-1)) ? 1 : 0)) && (((Number(topmin) !== Number(-1)) ? 1 : 0))) ? 1 : 0)) {
            pageclip.min_x = ((((Number(leftmin) < Number(cliprect.min_x)) ? 1 : 0)) ? (cliprect.min_x) : (leftmin));
            pageclip.max_x = ((((Number(leftmax) > Number(cliprect.max_x)) ? 1 : 0)) ? (cliprect.max_x) : (leftmax));
            pageclip.min_y = ((((Number(topmin) < Number(cliprect.min_y)) ? 1 : 0)) ? (cliprect.min_y) : (topmin));
            pageclip.max_y = ((((Number(topmax) > Number(cliprect.max_y)) ? 1 : 0)) ? (cliprect.max_y) : (topmax));
            if ((((((Number(pageclip.min_x) <= Number(pageclip.max_x)) ? 1 : 0)) && (((Number(pageclip.min_y) <= Number(pageclip.max_y)) ? 1 : 0))) ? 1 : 0)) {
                page = ((((((pages) >>> (0))) & (15))) | 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).set_scrollx?.(0, xscroll) ?? 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).set_scrolly?.(0, yscroll) ?? 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).draw?.(screen, bitmap, pageclip, flags, priority) ?? 0);
            }
        }
        if ((((((Number(rightmin) !== Number(-1)) ? 1 : 0)) && (((Number(topmin) !== Number(-1)) ? 1 : 0))) ? 1 : 0)) {
            pageclip.min_x = ((((Number(rightmin) < Number(cliprect.min_x)) ? 1 : 0)) ? (cliprect.min_x) : (rightmin));
            pageclip.max_x = ((((Number(rightmax) > Number(cliprect.max_x)) ? 1 : 0)) ? (cliprect.max_x) : (rightmax));
            pageclip.min_y = ((((Number(topmin) < Number(cliprect.min_y)) ? 1 : 0)) ? (cliprect.min_y) : (topmin));
            pageclip.max_y = ((((Number(topmax) > Number(cliprect.max_y)) ? 1 : 0)) ? (cliprect.max_y) : (topmax));
            if ((((((Number(pageclip.min_x) <= Number(pageclip.max_x)) ? 1 : 0)) && (((Number(pageclip.min_y) <= Number(pageclip.max_y)) ? 1 : 0))) ? 1 : 0)) {
                page = ((((((pages) >>> (4))) & (15))) | 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).set_scrollx?.(0, xscroll) ?? 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).set_scrolly?.(0, yscroll) ?? 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).draw?.(screen, bitmap, pageclip, flags, priority) ?? 0);
            }
        }
        if ((((((Number(leftmin) !== Number(-1)) ? 1 : 0)) && (((Number(bottommin) !== Number(-1)) ? 1 : 0))) ? 1 : 0)) {
            pageclip.min_x = ((((Number(leftmin) < Number(cliprect.min_x)) ? 1 : 0)) ? (cliprect.min_x) : (leftmin));
            pageclip.max_x = ((((Number(leftmax) > Number(cliprect.max_x)) ? 1 : 0)) ? (cliprect.max_x) : (leftmax));
            pageclip.min_y = ((((Number(bottommin) < Number(cliprect.min_y)) ? 1 : 0)) ? (cliprect.min_y) : (bottommin));
            pageclip.max_y = ((((Number(bottommax) > Number(cliprect.max_y)) ? 1 : 0)) ? (cliprect.max_y) : (bottommax));
            if ((((((Number(pageclip.min_x) <= Number(pageclip.max_x)) ? 1 : 0)) && (((Number(pageclip.min_y) <= Number(pageclip.max_y)) ? 1 : 0))) ? 1 : 0)) {
                page = ((((((pages) >>> (8))) & (15))) | 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).set_scrollx?.(0, xscroll) ?? 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).set_scrolly?.(0, yscroll) ?? 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).draw?.(screen, bitmap, pageclip, flags, priority) ?? 0);
            }
        }
        if ((((((Number(rightmin) !== Number(-1)) ? 1 : 0)) && (((Number(bottommin) !== Number(-1)) ? 1 : 0))) ? 1 : 0)) {
            pageclip.min_x = ((((Number(rightmin) < Number(cliprect.min_x)) ? 1 : 0)) ? (cliprect.min_x) : (rightmin));
            pageclip.max_x = ((((Number(rightmax) > Number(cliprect.max_x)) ? 1 : 0)) ? (cliprect.max_x) : (rightmax));
            pageclip.min_y = ((((Number(bottommin) < Number(cliprect.min_y)) ? 1 : 0)) ? (cliprect.min_y) : (bottommin));
            pageclip.max_y = ((((Number(bottommax) > Number(cliprect.max_y)) ? 1 : 0)) ? (cliprect.max_y) : (bottommax));
            if ((((((Number(pageclip.min_x) <= Number(pageclip.max_x)) ? 1 : 0)) && (((Number(pageclip.min_y) <= Number(pageclip.max_y)) ? 1 : 0))) ? 1 : 0)) {
                page = ((((((pages) >>> (12))) & (15))) | 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).set_scrollx?.(0, xscroll) ?? 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).set_scrolly?.(0, yscroll) ?? 0);
                (__deref_draw_virtual_tilemap(runtime, runtime.readIndex(__deref_draw_virtual_tilemap(runtime, info).tilemaps, page)).draw?.(screen, bitmap, pageclip, flags, priority) ?? 0);
            }
        }
    }
    function __add_draw_virtual_tilemap(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_draw_virtual_tilemap(runtime, p) {
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
    function method_tilemap_16b_draw_layer(runtime, screen, info, bitmap, cliprect, which, flags, priority) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["osd_printf_debug"], __L1 = __l["rectangle"];
        let textram = __deref_tilemap_16b_draw_layer(runtime, info).textram;
        let textram$s = undefined, textram$o = 0;
        if (ArrayBuffer.isView(textram) || Array.isArray(textram))
            textram$s = textram;
        else if (textram !== null && typeof textram === 'object' && textram.generatedPointer === true && textram.path === undefined && textram.target === undefined && (ArrayBuffer.isView(textram.source) || Array.isArray(textram.source))) {
            textram$s = textram.source;
            textram$o = textram.offset;
        }
        let xscroll = ((0) & 0xffff);
        let yscroll = ((0) & 0xffff);
        let pages = ((0) & 0xffff);
        let x = ((0) | 0);
        let y = ((0) | 0);
        xscroll = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_xscroll, which)) & 0xffff);
        yscroll = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_yscroll, which)) & 0xffff);
        pages = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_pageselect, which)) & 0xffff);
        if (((yscroll) & (32768))) {
            if (0) {
                (__L0 ? __L0("Column AND row scroll\n") : runtime.macro("osd_printf_debug", "Column AND row scroll\n"));
            }
            for (y = ((((cliprect.min_y) & (-8))) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (8))) | 0)) {
                let rowscrollindex = ((runtime.divide(((__deref_tilemap_16b_draw_layer(runtime, info).flip) ? (((216) - (y))) : (y)), 8)) | 0);
                let rowcolclip = (__L1 ? __L1() : runtime.macro("rectangle"));
                rowcolclip.min_y = ((((Number(y) < Number(cliprect.min_y)) ? 1 : 0)) ? (cliprect.min_y) : (y));
                rowcolclip.max_y = ((((Number(((y) + (7))) > Number(cliprect.max_y)) ? 1 : 0)) ? (cliprect.max_y) : (((y) + (7))));
                for (x = ((((((__add_tilemap_16b_draw_layer(runtime, cliprect.min_x, 8)) & (-16))) - (8))) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (16))) | 0)) {
                    let effxscroll = ((0) & 0xffff);
                    let effyscroll = ((0) & 0xffff);
                    let rowscroll = ((0) & 0xffff);
                    let effpages = ((pages) & 0xffff);
                    rowcolclip.min_x = ((((Number(x) < Number(cliprect.min_x)) ? 1 : 0)) ? (cliprect.min_x) : (x));
                    rowcolclip.max_x = ((((Number(((x) + (15))) > Number(cliprect.max_x)) ? 1 : 0)) ? (cliprect.max_x) : (((x) + (15))));
                    rowscroll = (((textram$s !== undefined ? (textram$s[textram$o + (((__add_tilemap_16b_draw_layer(runtime, runtime.divide(3968, 2), ((runtime.divide(64, 2)) * (which)))) + (rowscrollindex)))] ?? 0) : runtime.readIndex(textram, ((__add_tilemap_16b_draw_layer(runtime, runtime.divide(3968, 2), ((runtime.divide(64, 2)) * (which)))) + (rowscrollindex))))) & 0xffff);
                    effxscroll = ((((((xscroll) & (32768))) ? (rowscroll) : (xscroll))) & 0xffff);
                    effyscroll = (((textram$s !== undefined ? (textram$s[textram$o + (__add_tilemap_16b_draw_layer(runtime, __add_tilemap_16b_draw_layer(runtime, runtime.divide(3862, 2), ((runtime.divide(64, 2)) * (which))), runtime.divide(((x) + (8)), 16)))] ?? 0) : runtime.readIndex(textram, __add_tilemap_16b_draw_layer(runtime, __add_tilemap_16b_draw_layer(runtime, runtime.divide(3862, 2), ((runtime.divide(64, 2)) * (which))), runtime.divide(((x) + (8)), 16))))) & 0xffff);
                    if (((rowscroll) & (32768))) {
                        effxscroll = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_xscroll, ((which) + (2)))) & 0xffff);
                        effyscroll = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_yscroll, ((which) + (2)))) & 0xffff);
                        effpages = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_pageselect, ((which) + (2)))) & 0xffff);
                    }
                    effxscroll = ((((__add_tilemap_16b_draw_layer(runtime, ((192) - (effxscroll)), __deref_tilemap_16b_draw_layer(runtime, info).xoffs)) & (1023))) & 0xffff);
                    effyscroll = ((((effyscroll) & (511))) & 0xffff);
                    method_draw_virtual_tilemap(runtime, screen, info, bitmap, rowcolclip, effpages, effxscroll, effyscroll, flags, priority);
                }
            }
        }
        else {
            if (0) {
                (__L0 ? __L0("Row scroll\n") : runtime.macro("osd_printf_debug", "Row scroll\n"));
            }
            for (y = ((((cliprect.min_y) & (-8))) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (8))) | 0)) {
                let rowscrollindex = ((runtime.divide(((__deref_tilemap_16b_draw_layer(runtime, info).flip) ? (((216) - (y))) : (y)), 8)) | 0);
                let rowclip = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(cliprect);
                let effxscroll = ((0) & 0xffff);
                let effyscroll = ((0) & 0xffff);
                let rowscroll = ((0) & 0xffff);
                let effpages = ((pages) & 0xffff);
                rowclip.min_y = ((((Number(y) < Number(cliprect.min_y)) ? 1 : 0)) ? (cliprect.min_y) : (y));
                rowclip.max_y = ((((Number(((y) + (7))) > Number(cliprect.max_y)) ? 1 : 0)) ? (cliprect.max_y) : (((y) + (7))));
                rowscroll = (((textram$s !== undefined ? (textram$s[textram$o + (((__add_tilemap_16b_draw_layer(runtime, runtime.divide(3968, 2), ((runtime.divide(64, 2)) * (which)))) + (rowscrollindex)))] ?? 0) : runtime.readIndex(textram, ((__add_tilemap_16b_draw_layer(runtime, runtime.divide(3968, 2), ((runtime.divide(64, 2)) * (which)))) + (rowscrollindex))))) & 0xffff);
                effxscroll = ((((((xscroll) & (32768))) ? (rowscroll) : (xscroll))) & 0xffff);
                effyscroll = ((yscroll) & 0xffff);
                if (((rowscroll) & (32768))) {
                    effxscroll = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_xscroll, ((which) + (2)))) & 0xffff);
                    effyscroll = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_yscroll, ((which) + (2)))) & 0xffff);
                    effpages = ((runtime.readIndex(__deref_tilemap_16b_draw_layer(runtime, info).latched_pageselect, ((which) + (2)))) & 0xffff);
                }
                effxscroll = ((((__add_tilemap_16b_draw_layer(runtime, ((192) - (effxscroll)), __deref_tilemap_16b_draw_layer(runtime, info).xoffs)) & (1023))) & 0xffff);
                effyscroll = ((((effyscroll) & (511))) & 0xffff);
                method_draw_virtual_tilemap(runtime, screen, info, bitmap, rowclip, effpages, effxscroll, effyscroll, flags, priority);
            }
        }
    }
    function __add_tilemap_16b_draw_layer(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_tilemap_16b_draw_layer(runtime, p) {
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
        "tilemap_16b_fill_latch": method_tilemap_16b_fill_latch,
        "tilemap_draw": method_tilemap_draw,
        "tileram_r": method_tileram_r,
        "tileram_w": method_tileram_w,
        "textram_r": method_textram_r,
        "textram_w": method_textram_w,
        "rotate_draw": method_rotate_draw,
        "rotate_control_r": method_rotate_control_r,
        "tilemap_16a_tile_info": method_tilemap_16a_tile_info,
        "tilemap_16a_text_info": method_tilemap_16a_text_info,
        "tilemap_16b_tile_info": method_tilemap_16b_tile_info,
        "tilemap_16b_text_info": method_tilemap_16b_text_info,
        "tilemap_16b_alt_tile_info": method_tilemap_16b_alt_tile_info,
        "tilemap_16b_alt_text_info": method_tilemap_16b_alt_text_info,
        "tilemap_16b_latch_values": method_tilemap_16b_latch_values,
        "tilemap_16a_draw_layer": method_tilemap_16a_draw_layer,
        "draw_virtual_tilemap": method_draw_virtual_tilemap,
        "tilemap_16b_draw_layer": method_tilemap_16b_draw_layer
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_pagelatch_cb", "osd_printf_debug", "rectangle", "screen", "screen().time_until_pos", "screen().update_partial", "screen().vpos"];
export const device = definition;
export default device;
