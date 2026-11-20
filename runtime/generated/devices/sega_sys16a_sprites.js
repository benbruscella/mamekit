import deviceData from './sega_sys16a_sprites.device.ir.json' with { type: 'json' };
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
    function method_xorigin(runtime) {
        const members = runtime.members;
        return (((members.m_xorigin ?? 0)) | 0);
    }
    function method_yorigin(runtime) {
        const members = runtime.members;
        return (((members.m_yorigin ?? 0)) | 0);
    }
    function method_bitmap(runtime) {
        const members = runtime.members;
        return (members.m_bitmap ?? 0);
    }
    function method_spriteram(runtime) {
        const members = runtime.members;
        return (members.m_spriteram ?? 0);
    }
    function method_spriteram_bytes(runtime) {
        const members = runtime.members;
        return (((members.m_spriteram_bytes ?? 0)) >>> 0);
    }
    function method_spriteram_elements(runtime) {
        const members = runtime.members;
        return ((runtime.divide((members.m_spriteram_bytes ?? 0), 2)) >>> 0);
    }
    function method_buffer(runtime) {
        const members = runtime.members;
        return __addr_buffer(runtime, (members.m_buffer ?? 0), 0);
    }
    function __addr_buffer(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_set_xorigin(runtime, xorigin) {
        const members = runtime.members;
        members.m_xorigin = ((xorigin) | 0);
    }
    function method_set_yorigin(runtime, yorigin) {
        const members = runtime.members;
        members.m_yorigin = ((yorigin) | 0);
    }
    function method_draw_async(runtime, cliprect, clearit = 1) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["bitmap_ind16"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11;
        if ((((((Number((__t0 = __deref_draw_async(runtime, cliprect), typeof __t0.right === 'function' ? __t0.right() : typeof __t0.right === 'number' || typeof __t0.right === 'boolean' ? __t0.right : runtime.container(cliprect, "right"))) >= Number((__t1 = (members.m_bitmap), typeof __t1.width === 'function' ? __t1.width() : typeof __t1.width === 'number' || typeof __t1.width === 'boolean' ? __t1.width : runtime.container(members.m_bitmap, "width")))) ? 1 : 0)) || (((Number((__t2 = __deref_draw_async(runtime, cliprect), typeof __t2.bottom === 'function' ? __t2.bottom() : typeof __t2.bottom === 'number' || typeof __t2.bottom === 'boolean' ? __t2.bottom : runtime.container(cliprect, "bottom"))) >= Number((__t3 = (members.m_bitmap), typeof __t3.height === 'function' ? __t3.height() : typeof __t3.height === 'number' || typeof __t3.height === 'boolean' ? __t3.height : runtime.container(members.m_bitmap, "height")))) ? 1 : 0))) ? 1 : 0)) {
            let new_width = ((cppMax(+(__add_draw_async(runtime, (__t4 = __deref_draw_async(runtime, cliprect), typeof __t4.right === 'function' ? __t4.right() : typeof __t4.right === 'number' || typeof __t4.right === 'boolean' ? __t4.right : runtime.container(cliprect, "right")), 1)), +((__t5 = (members.m_bitmap), typeof __t5.width === 'function' ? __t5.width() : typeof __t5.width === 'number' || typeof __t5.width === 'boolean' ? __t5.width : runtime.container(members.m_bitmap, "width"))))) | 0);
            let new_height = ((cppMax(+(__add_draw_async(runtime, (__t6 = __deref_draw_async(runtime, cliprect), typeof __t6.bottom === 'function' ? __t6.bottom() : typeof __t6.bottom === 'number' || typeof __t6.bottom === 'boolean' ? __t6.bottom : runtime.container(cliprect, "bottom")), 1)), +((__t7 = (members.m_bitmap), typeof __t7.height === 'function' ? __t7.height() : typeof __t7.height === 'number' || typeof __t7.height === 'boolean' ? __t7.height : runtime.container(members.m_bitmap, "height"))))) | 0);
            ((members.m_bitmap).resize?.(new_width, new_height, 16, 16) ?? 0);
            (members.m_dirty = runtime.resize(members.m_dirty, new_width, new_height));
        }
        if (clearit) {
            method_clear__1(runtime, cliprect);
        }
        let wrapped = (__L0 ? __L0(__addr_draw_async(runtime, __addr_draw_async(runtime, (members.m_bitmap ?? 0)["pix&"](0), -((members.m_xorigin ?? 0))), -((((members.m_yorigin ?? 0)) * ((__t8 = (members.m_bitmap), typeof __t8.rowpixels === 'function' ? __t8.rowpixels() : typeof __t8.rowpixels === 'number' || typeof __t8.rowpixels === 'boolean' ? __t8.rowpixels : runtime.container(members.m_bitmap, "rowpixels")))))), __add_draw_async(runtime, (((members.m_xorigin ?? 0)) + ((__t9 = __deref_draw_async(runtime, cliprect), typeof __t9.right === 'function' ? __t9.right() : typeof __t9.right === 'number' || typeof __t9.right === 'boolean' ? __t9.right : runtime.container(cliprect, "right")))), 1), __add_draw_async(runtime, (((members.m_yorigin ?? 0)) + ((__t10 = __deref_draw_async(runtime, cliprect), typeof __t10.bottom === 'function' ? __t10.bottom() : typeof __t10.bottom === 'number' || typeof __t10.bottom === 'boolean' ? __t10.bottom : runtime.container(cliprect, "bottom")))), 1), (__t11 = (members.m_bitmap), typeof __t11.rowpixels === 'function' ? __t11.rowpixels() : typeof __t11.rowpixels === 'number' || typeof __t11.rowpixels === 'boolean' ? __t11.rowpixels : runtime.container(members.m_bitmap, "rowpixels"))) : runtime.macro("bitmap_ind16", __addr_draw_async(runtime, __addr_draw_async(runtime, (members.m_bitmap ?? 0)["pix&"](0), -((members.m_xorigin ?? 0))), -((((members.m_yorigin ?? 0)) * ((__t8 = (members.m_bitmap), typeof __t8.rowpixels === 'function' ? __t8.rowpixels() : typeof __t8.rowpixels === 'number' || typeof __t8.rowpixels === 'boolean' ? __t8.rowpixels : runtime.container(members.m_bitmap, "rowpixels")))))), __add_draw_async(runtime, (((members.m_xorigin ?? 0)) + ((__t9 = __deref_draw_async(runtime, cliprect), typeof __t9.right === 'function' ? __t9.right() : typeof __t9.right === 'number' || typeof __t9.right === 'boolean' ? __t9.right : runtime.container(cliprect, "right")))), 1), __add_draw_async(runtime, (((members.m_yorigin ?? 0)) + ((__t10 = __deref_draw_async(runtime, cliprect), typeof __t10.bottom === 'function' ? __t10.bottom() : typeof __t10.bottom === 'number' || typeof __t10.bottom === 'boolean' ? __t10.bottom : runtime.container(cliprect, "bottom")))), 1), (__t11 = (members.m_bitmap), typeof __t11.rowpixels === 'function' ? __t11.rowpixels() : typeof __t11.rowpixels === 'number' || typeof __t11.rowpixels === 'boolean' ? __t11.rowpixels : runtime.container(members.m_bitmap, "rowpixels"))));
        let adjusted = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(cliprect);
        (__deref_draw_async(runtime, adjusted).offset?.((members.m_xorigin ?? 0), (members.m_yorigin ?? 0)) ?? 0);
        method_draw(runtime, wrapped, adjusted);
    }
    function __add_draw_async(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_draw_async(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_draw_async(runtime, p) {
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
    function method_clear__1(runtime, cliprect) {
        const members = runtime.members;
        (members.m_dirty.iterate_dirty_rects?.(cliprect, ((rect) => {
            ((members.m_bitmap).fill?.(-1, rect) ?? 0);
        })) ?? 0);
        (members.m_dirty.clean?.(cliprect) ?? 0);
    }
    function method_draw(runtime, bitmap, cliprect) {
        const members = runtime.members;
        const h_m_bank = members.m_bank ?? 0;
        let spritebase = __addr_draw(runtime, (members.m_sprite_region_ptr ?? 0), 0);
        let spritebase$s = undefined, spritebase$o = 0;
        if (ArrayBuffer.isView(spritebase) || Array.isArray(spritebase))
            spritebase$s = spritebase;
        else if (spritebase !== null && typeof spritebase === 'object' && spritebase.generatedPointer === true && spritebase.path === undefined && spritebase.target === undefined && (ArrayBuffer.isView(spritebase.source) || Array.isArray(spritebase.source))) {
            spritebase$s = spritebase.source;
            spritebase$o = spritebase.offset;
        }
        let numbanks = ((runtime.divide(runtime.container(members.m_sprite_region_ptr, "bytes"), 65536)) & 0xff);
        let ramend = __add_draw(runtime, method_spriteram(runtime), method_spriteram_elements(runtime));
        let ramend$s = undefined, ramend$o = 0;
        if (ArrayBuffer.isView(ramend) || Array.isArray(ramend))
            ramend$s = ramend;
        else if (ramend !== null && typeof ramend === 'object' && ramend.generatedPointer === true && ramend.path === undefined && ramend.target === undefined && (ArrayBuffer.isView(ramend.source) || Array.isArray(ramend.source))) {
            ramend$s = ramend.source;
            ramend$o = ramend.offset;
        }
        for (let data = method_spriteram(runtime); ((runtime.pointerOffset(data) < runtime.pointerOffset(ramend)) ? 1 : 0); data = __add_draw(runtime, data, 8)) {
            let bottom = ((runtime.shiftRight(runtime.readIndex(data, 0), 8)) | 0);
            if ((((bottom) > (240)) ? 1 : 0)) {
                break;
            }
            let top = ((((runtime.readIndex(data, 0)) & (255))) | 0);
            let xpos = ((((runtime.readIndex(data, 1)) & (511))) | 0);
            let pitch = ((((runtime.readIndex(data, 2)) << 16 >> 16)) | 0);
            let addr = ((runtime.readIndex(data, 3)) & 0xffff);
            let colpri = ((((((((runtime.shiftRight(runtime.readIndex(data, 4), 8)) & (63))) << (4))) | (((((runtime.shiftRight(runtime.readIndex(data, 4), 0)) & (3))) << (10))))) | 0);
            let bank = ((h_m_bank[((runtime.shiftRight(runtime.readIndex(data, 4), 4)) & (7))]) | 0);
            runtime.writeIndex(data, 7, addr);
            if (((((((top) >= (bottom)) ? 1 : 0)) || ((((bank) === (255)) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            if (numbanks) {
                bank = ((((bank) % (numbanks))) | 0);
            }
            let spritedata = __addr_draw(runtime, spritebase, ((32768) * (bank)));
            let spritedata$s = undefined, spritedata$o = 0;
            if (ArrayBuffer.isView(spritedata) || Array.isArray(spritedata))
                spritedata$s = spritedata;
            else if (spritedata !== null && typeof spritedata === 'object' && spritedata.generatedPointer === true && spritedata.path === undefined && spritedata.target === undefined && (ArrayBuffer.isView(spritedata.source) || Array.isArray(spritedata.source))) {
                spritedata$s = spritedata.source;
                spritedata$o = spritedata.offset;
            }
            let xdelta = ((1) | 0);
            if ((members.m_flip ?? 0)) {
                let temp = ((top) | 0);
                top = ((((224) - (bottom))) | 0);
                bottom = ((((224) - (temp))) | 0);
                xpos = ((((320) - (xpos))) | 0);
                xdelta = ((-1) | 0);
                method_set_origin(runtime, (members.m_xoffs_flipped ?? 0), (members.m_yoffs_flipped ?? 0));
            }
            else {
                method_set_origin(runtime, (members.m_xoffs ?? 0), (members.m_yoffs ?? 0));
            }
            let minx = ((xpos) | 0);
            let maxx = ((xpos) | 0);
            let miny = ((__add_draw(runtime, cliprect.max_y, 1)) | 0);
            let maxy = ((runtime.subtract(cliprect.min_y, 1)) | 0);
            for (let y = ((top) | 0); (((y) < (bottom)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                addr = ((((addr) + (pitch))) & 0xffff);
                if ((((((Number(y) >= Number(cliprect.min_y)) ? 1 : 0)) && (((Number(y) <= Number(cliprect.max_y)) ? 1 : 0))) ? 1 : 0)) {
                    let dest = bitmap["pix&"](y);
                    let dest$s = undefined, dest$o = 0;
                    if (ArrayBuffer.isView(dest) || Array.isArray(dest))
                        dest$s = dest;
                    else if (dest !== null && typeof dest === 'object' && dest.generatedPointer === true && dest.path === undefined && dest.target === undefined && (ArrayBuffer.isView(dest.source) || Array.isArray(dest.source))) {
                        dest$s = dest.source;
                        dest$o = dest.offset;
                    }
                    let x = ((0) | 0);
                    if (((((addr) & (32768))) ? 0 : 1)) {
                        runtime.writeIndex(data, 7, ((addr) - (1)));
                        for (x = ((xpos) | 0); ((Number(((((xpos) - (x))) & (511))) !== Number(1)) ? 1 : 0);) {
                            let pixels = (((spritedata$s !== undefined ? (spritedata$s[spritedata$o + ((((runtime.writeIndex(data, 7, ((runtime.readIndex(data, 7)) + (1))))) & (32767)))] ?? 0) : runtime.readIndex(spritedata, (((runtime.writeIndex(data, 7, ((runtime.readIndex(data, 7)) + (1))))) & (32767))))) & 0xffff);
                            let pix = ((0) | 0);
                            pix = ((((((pixels) >>> (12))) & (15))) | 0);
                            if ((((((((((((Number(x) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(x) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (15)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dest, x, ((colpri) | (pix)));
                            }
                            x = ((((x) + (xdelta))) | 0);
                            pix = ((((((pixels) >>> (8))) & (15))) | 0);
                            if ((((((((((((Number(x) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(x) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (15)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dest, x, ((colpri) | (pix)));
                            }
                            x = ((((x) + (xdelta))) | 0);
                            pix = ((((((pixels) >>> (4))) & (15))) | 0);
                            if ((((((((((((Number(x) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(x) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (15)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dest, x, ((colpri) | (pix)));
                            }
                            x = ((((x) + (xdelta))) | 0);
                            pix = ((((((pixels) >>> (0))) & (15))) | 0);
                            if ((((((((((((Number(x) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(x) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (15)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dest, x, ((colpri) | (pix)));
                            }
                            x = ((((x) + (xdelta))) | 0);
                            if ((((pix) === (15)) ? 1 : 0)) {
                                break;
                            }
                        }
                    }
                    else {
                        runtime.writeIndex(data, 7, ((addr) + (1)));
                        for (x = ((xpos) | 0); ((Number(((((xpos) - (x))) & (511))) !== Number(1)) ? 1 : 0);) {
                            let pixels = (((spritedata$s !== undefined ? (spritedata$s[spritedata$o + ((((runtime.writeIndex(data, 7, ((runtime.readIndex(data, 7)) - (1))))) & (32767)))] ?? 0) : runtime.readIndex(spritedata, (((runtime.writeIndex(data, 7, ((runtime.readIndex(data, 7)) - (1))))) & (32767))))) & 0xffff);
                            let pix = ((0) | 0);
                            pix = ((((((pixels) >>> (0))) & (15))) | 0);
                            if ((((((((((((Number(x) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(x) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (15)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dest, x, ((colpri) | (pix)));
                            }
                            x = ((((x) + (xdelta))) | 0);
                            pix = ((((((pixels) >>> (4))) & (15))) | 0);
                            if ((((((((((((Number(x) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(x) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (15)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dest, x, ((colpri) | (pix)));
                            }
                            x = ((((x) + (xdelta))) | 0);
                            pix = ((((((pixels) >>> (8))) & (15))) | 0);
                            if ((((((((((((Number(x) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(x) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (15)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dest, x, ((colpri) | (pix)));
                            }
                            x = ((((x) + (xdelta))) | 0);
                            pix = ((((((pixels) >>> (12))) & (15))) | 0);
                            if ((((((((((((Number(x) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(x) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((pix) !== (15)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dest, x, ((colpri) | (pix)));
                            }
                            x = ((((x) + (xdelta))) | 0);
                            if ((((pix) === (15)) ? 1 : 0)) {
                                break;
                            }
                        }
                    }
                    if ((((x) > (maxx)) ? 1 : 0)) {
                        maxx = ((x) | 0);
                    }
                    if ((((x) < (minx)) ? 1 : 0)) {
                        minx = ((x) | 0);
                    }
                    if ((((y) < (miny)) ? 1 : 0)) {
                        miny = ((y) | 0);
                    }
                    maxy = ((y) | 0);
                }
            }
            if (((((((minx) <= (maxx)) ? 1 : 0)) && ((((miny) <= (maxy)) ? 1 : 0))) ? 1 : 0)) {
                method_mark_dirty__4(runtime, minx, maxx, miny, maxy);
            }
        }
    }
    function __add_draw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_draw(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_set_origin(runtime, xorigin = 0, yorigin = 0) {
        const members = runtime.members;
        members.m_xorigin = ((xorigin) | 0);
        members.m_yorigin = ((yorigin) | 0);
    }
    function method_mark_dirty__4(runtime, left, right, top, bottom) {
        const members = runtime.members;
        (members.m_dirty.dirty?.(((left) - ((members.m_xorigin ?? 0))), ((right) - ((members.m_xorigin ?? 0))), ((top) - ((members.m_yorigin ?? 0))), ((bottom) - ((members.m_yorigin ?? 0)))) ?? 0);
    }
    function method_sprite_device__xorigin(runtime) {
        const members = runtime.members;
        return (((members.m_xorigin ?? 0)) | 0);
    }
    function method_sprite_device__yorigin(runtime) {
        const members = runtime.members;
        return (((members.m_yorigin ?? 0)) | 0);
    }
    function method_sprite_device__bitmap(runtime) {
        const members = runtime.members;
        return (members.m_bitmap ?? 0);
    }
    function method_sprite_device__iterate_dirty_rects(runtime, action) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        (members.m_dirty.iterate_dirty_rects?.((__L0 ? __L0(action) : runtime.macro("std::forward", action))) ?? 0);
    }
    function method_sprite_device__spriteram(runtime) {
        const members = runtime.members;
        return (members.m_spriteram ?? 0);
    }
    function method_sprite_device__spriteram_bytes(runtime) {
        const members = runtime.members;
        return (((members.m_spriteram_bytes ?? 0)) >>> 0);
    }
    function method_sprite_device__spriteram_elements(runtime) {
        const members = runtime.members;
        return ((runtime.divide((members.m_spriteram_bytes ?? 0), 2)) >>> 0);
    }
    function method_sprite_device__buffer(runtime) {
        const members = runtime.members;
        return __addr_sprite_device__buffer(runtime, (members.m_buffer ?? 0), 0);
    }
    function __addr_sprite_device__buffer(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_sprite_device__set_xorigin(runtime, xorigin) {
        const members = runtime.members;
        members.m_xorigin = ((xorigin) | 0);
    }
    function method_sprite_device__set_yorigin(runtime, yorigin) {
        const members = runtime.members;
        members.m_yorigin = ((yorigin) | 0);
    }
    function method_sprite_device__draw_async(runtime, cliprect, clearit = 1) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["bitmap_ind16"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11;
        if ((((((Number((__t0 = __deref_sprite_device__draw_async(runtime, cliprect), typeof __t0.right === 'function' ? __t0.right() : typeof __t0.right === 'number' || typeof __t0.right === 'boolean' ? __t0.right : runtime.container(cliprect, "right"))) >= Number((__t1 = (members.m_bitmap), typeof __t1.width === 'function' ? __t1.width() : typeof __t1.width === 'number' || typeof __t1.width === 'boolean' ? __t1.width : runtime.container(members.m_bitmap, "width")))) ? 1 : 0)) || (((Number((__t2 = __deref_sprite_device__draw_async(runtime, cliprect), typeof __t2.bottom === 'function' ? __t2.bottom() : typeof __t2.bottom === 'number' || typeof __t2.bottom === 'boolean' ? __t2.bottom : runtime.container(cliprect, "bottom"))) >= Number((__t3 = (members.m_bitmap), typeof __t3.height === 'function' ? __t3.height() : typeof __t3.height === 'number' || typeof __t3.height === 'boolean' ? __t3.height : runtime.container(members.m_bitmap, "height")))) ? 1 : 0))) ? 1 : 0)) {
            let new_width = ((cppMax(+(__add_sprite_device__draw_async(runtime, (__t4 = __deref_sprite_device__draw_async(runtime, cliprect), typeof __t4.right === 'function' ? __t4.right() : typeof __t4.right === 'number' || typeof __t4.right === 'boolean' ? __t4.right : runtime.container(cliprect, "right")), 1)), +((__t5 = (members.m_bitmap), typeof __t5.width === 'function' ? __t5.width() : typeof __t5.width === 'number' || typeof __t5.width === 'boolean' ? __t5.width : runtime.container(members.m_bitmap, "width"))))) | 0);
            let new_height = ((cppMax(+(__add_sprite_device__draw_async(runtime, (__t6 = __deref_sprite_device__draw_async(runtime, cliprect), typeof __t6.bottom === 'function' ? __t6.bottom() : typeof __t6.bottom === 'number' || typeof __t6.bottom === 'boolean' ? __t6.bottom : runtime.container(cliprect, "bottom")), 1)), +((__t7 = (members.m_bitmap), typeof __t7.height === 'function' ? __t7.height() : typeof __t7.height === 'number' || typeof __t7.height === 'boolean' ? __t7.height : runtime.container(members.m_bitmap, "height"))))) | 0);
            ((members.m_bitmap).resize?.(new_width, new_height, 16, 16) ?? 0);
            (members.m_dirty = runtime.resize(members.m_dirty, new_width, new_height));
        }
        if (clearit) {
            method_clear__1(runtime, cliprect);
        }
        let wrapped = (__L0 ? __L0(__addr_sprite_device__draw_async(runtime, __addr_sprite_device__draw_async(runtime, (members.m_bitmap ?? 0)["pix&"](0), -((members.m_xorigin ?? 0))), -((((members.m_yorigin ?? 0)) * ((__t8 = (members.m_bitmap), typeof __t8.rowpixels === 'function' ? __t8.rowpixels() : typeof __t8.rowpixels === 'number' || typeof __t8.rowpixels === 'boolean' ? __t8.rowpixels : runtime.container(members.m_bitmap, "rowpixels")))))), __add_sprite_device__draw_async(runtime, (((members.m_xorigin ?? 0)) + ((__t9 = __deref_sprite_device__draw_async(runtime, cliprect), typeof __t9.right === 'function' ? __t9.right() : typeof __t9.right === 'number' || typeof __t9.right === 'boolean' ? __t9.right : runtime.container(cliprect, "right")))), 1), __add_sprite_device__draw_async(runtime, (((members.m_yorigin ?? 0)) + ((__t10 = __deref_sprite_device__draw_async(runtime, cliprect), typeof __t10.bottom === 'function' ? __t10.bottom() : typeof __t10.bottom === 'number' || typeof __t10.bottom === 'boolean' ? __t10.bottom : runtime.container(cliprect, "bottom")))), 1), (__t11 = (members.m_bitmap), typeof __t11.rowpixels === 'function' ? __t11.rowpixels() : typeof __t11.rowpixels === 'number' || typeof __t11.rowpixels === 'boolean' ? __t11.rowpixels : runtime.container(members.m_bitmap, "rowpixels"))) : runtime.macro("bitmap_ind16", __addr_sprite_device__draw_async(runtime, __addr_sprite_device__draw_async(runtime, (members.m_bitmap ?? 0)["pix&"](0), -((members.m_xorigin ?? 0))), -((((members.m_yorigin ?? 0)) * ((__t8 = (members.m_bitmap), typeof __t8.rowpixels === 'function' ? __t8.rowpixels() : typeof __t8.rowpixels === 'number' || typeof __t8.rowpixels === 'boolean' ? __t8.rowpixels : runtime.container(members.m_bitmap, "rowpixels")))))), __add_sprite_device__draw_async(runtime, (((members.m_xorigin ?? 0)) + ((__t9 = __deref_sprite_device__draw_async(runtime, cliprect), typeof __t9.right === 'function' ? __t9.right() : typeof __t9.right === 'number' || typeof __t9.right === 'boolean' ? __t9.right : runtime.container(cliprect, "right")))), 1), __add_sprite_device__draw_async(runtime, (((members.m_yorigin ?? 0)) + ((__t10 = __deref_sprite_device__draw_async(runtime, cliprect), typeof __t10.bottom === 'function' ? __t10.bottom() : typeof __t10.bottom === 'number' || typeof __t10.bottom === 'boolean' ? __t10.bottom : runtime.container(cliprect, "bottom")))), 1), (__t11 = (members.m_bitmap), typeof __t11.rowpixels === 'function' ? __t11.rowpixels() : typeof __t11.rowpixels === 'number' || typeof __t11.rowpixels === 'boolean' ? __t11.rowpixels : runtime.container(members.m_bitmap, "rowpixels"))));
        let adjusted = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(cliprect);
        (__deref_sprite_device__draw_async(runtime, adjusted).offset?.((members.m_xorigin ?? 0), (members.m_yorigin ?? 0)) ?? 0);
        method_draw(runtime, wrapped, adjusted);
    }
    function __add_sprite_device__draw_async(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_sprite_device__draw_async(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_sprite_device__draw_async(runtime, p) {
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
    function method_set_flip(runtime, flip) {
        const members = runtime.members;
        members.m_flip = ((flip) ? 1 : 0);
    }
    function method_sega_16bit_sprite_device__set_flip(runtime, flip) {
        const members = runtime.members;
        members.m_flip = ((flip) ? 1 : 0);
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
    function method_iterate_dirty_rects__1(runtime, action) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        (members.m_dirty.iterate_dirty_rects?.((__L0 ? __L0(action) : runtime.macro("std::forward", action))) ?? 0);
    }
    function method_iterate_dirty_rects__2(runtime, cliprect, action) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        (members.m_dirty.iterate_dirty_rects?.(cliprect, (__L0 ? __L0(action) : runtime.macro("std::forward", action))) ?? 0);
    }
    function method_clear__1__lambda0(runtime, rect) {
        const members = runtime.members;
        ((members.m_bitmap).fill?.(-1, rect) ?? 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "xorigin": method_xorigin,
        "yorigin": method_yorigin,
        "bitmap": method_bitmap,
        "spriteram": method_spriteram,
        "spriteram_bytes": method_spriteram_bytes,
        "spriteram_elements": method_spriteram_elements,
        "buffer": method_buffer,
        "set_xorigin": method_set_xorigin,
        "set_yorigin": method_set_yorigin,
        "draw_async": method_draw_async,
        "clear__1": method_clear__1,
        "draw": method_draw,
        "set_origin": method_set_origin,
        "mark_dirty__4": method_mark_dirty__4,
        "sprite_device::xorigin": method_sprite_device__xorigin,
        "sprite_device::yorigin": method_sprite_device__yorigin,
        "sprite_device::bitmap": method_sprite_device__bitmap,
        "sprite_device::iterate_dirty_rects": method_sprite_device__iterate_dirty_rects,
        "sprite_device::spriteram": method_sprite_device__spriteram,
        "sprite_device::spriteram_bytes": method_sprite_device__spriteram_bytes,
        "sprite_device::spriteram_elements": method_sprite_device__spriteram_elements,
        "sprite_device::buffer": method_sprite_device__buffer,
        "sprite_device::set_xorigin": method_sprite_device__set_xorigin,
        "sprite_device::set_yorigin": method_sprite_device__set_yorigin,
        "sprite_device::draw_async": method_sprite_device__draw_async,
        "set_flip": method_set_flip,
        "sega_16bit_sprite_device::set_flip": method_sega_16bit_sprite_device__set_flip,
        "tilemap_16a_draw_layer": method_tilemap_16a_draw_layer,
        "draw_virtual_tilemap": method_draw_virtual_tilemap,
        "tilemap_16b_draw_layer": method_tilemap_16b_draw_layer,
        "iterate_dirty_rects__1": method_iterate_dirty_rects__1,
        "iterate_dirty_rects__2": method_iterate_dirty_rects__2,
        "clear__1__lambda0": method_clear__1__lambda0
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["bitmap_ind16", "osd_printf_debug", "rectangle", "std::forward"];
definition.allocations["sparse_dirty_bitmap"].compiledMethods = (() => {
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
    function method_dirty_all(runtime) {
        const members = runtime.members;
        method_dirty__4(runtime, 0, (((members.m_width ?? 0)) - (1)), 0, (((members.m_height ?? 0)) - (1)));
    }
    function method_dirty__4(runtime, left, right, top, bottom) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rectangle"];
        ((members.m_bitmap).fill?.(1, (__L0 ? __L0(runtime.shiftRight(left, (members.m_granularity ?? 0)), runtime.shiftRight(right, (members.m_granularity ?? 0)), runtime.shiftRight(top, (members.m_granularity ?? 0)), runtime.shiftRight(bottom, (members.m_granularity ?? 0))) : runtime.macro("rectangle", runtime.shiftRight(left, (members.m_granularity ?? 0)), runtime.shiftRight(right, (members.m_granularity ?? 0)), runtime.shiftRight(top, (members.m_granularity ?? 0)), runtime.shiftRight(bottom, (members.m_granularity ?? 0))))) ?? 0);
        method_invalidate_rect_list(runtime);
    }
    function method_invalidate_rect_list(runtime) {
        const members = runtime.members;
        (__deref_invalidate_rect_list(runtime, members.m_rect_list_bounds).set?.(0, -1, 0, -1) ?? 0);
    }
    function __deref_invalidate_rect_list(runtime, p) {
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
    function method_clean_all(runtime) {
        const members = runtime.members;
        method_clean__4(runtime, 0, (((members.m_width ?? 0)) - (1)), 0, (((members.m_height ?? 0)) - (1)));
    }
    function method_clean__4(runtime, left, right, top, bottom) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rectangle"];
        let round = ((((((1) << ((members.m_granularity ?? 0)))) - (1))) | 0);
        if (((Number(right) >= Number((((members.m_width ?? 0)) - (1)))) ? 1 : 0)) {
            right = (((((members.m_width ?? 0)) + (round))) | 0);
        }
        if (((Number(bottom) >= Number((((members.m_height ?? 0)) - (1)))) ? 1 : 0)) {
            bottom = (((((members.m_height ?? 0)) + (round))) | 0);
        }
        let rect = (__L0 ? __L0(runtime.shiftRight(((left) + (round)), (members.m_granularity ?? 0)), runtime.shiftRight(((right) - (round)), (members.m_granularity ?? 0)), runtime.shiftRight(((top) + (round)), (members.m_granularity ?? 0)), runtime.shiftRight(((bottom) - (round)), (members.m_granularity ?? 0))) : runtime.macro("rectangle", runtime.shiftRight(((left) + (round)), (members.m_granularity ?? 0)), runtime.shiftRight(((right) - (round)), (members.m_granularity ?? 0)), runtime.shiftRight(((top) + (round)), (members.m_granularity ?? 0)), runtime.shiftRight(((bottom) - (round)), (members.m_granularity ?? 0))));
        ((members.m_bitmap).fill?.(0, rect) ?? 0);
        method_invalidate_rect_list(runtime);
    }
    function method_resize(runtime, width, height) {
        const members = runtime.members;
        members.m_width = ((width) | 0);
        members.m_height = ((height) | 0);
        let round = ((((((1) << ((members.m_granularity ?? 0)))) - (1))) | 0);
        (members.m_bitmap = runtime.resize(members.m_bitmap, runtime.shiftRight(((width) + (round)), (members.m_granularity ?? 0)), runtime.shiftRight(((height) + (round)), (members.m_granularity ?? 0))));
        method_dirty_all(runtime);
    }
    function method_calculate_rect_list(runtime, cliprect) {
        const members = runtime.members;
        let __t0;
        if ((runtime.same((members.m_rect_list_bounds ?? 0), cliprect) ? 1 : 0)) {
            return;
        }
        (__t0 = (members.m_rect_list), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(members.m_rect_list, "clear"));
        let sx = ((runtime.shiftRight(cliprect.min_x, (members.m_granularity ?? 0))) | 0);
        let ex = ((runtime.shiftRight(cliprect.max_x, (members.m_granularity ?? 0))) | 0);
        let sy = ((runtime.shiftRight(cliprect.min_y, (members.m_granularity ?? 0))) | 0);
        let ey = ((runtime.shiftRight(cliprect.max_y, (members.m_granularity ?? 0))) | 0);
        let tilesize = ((((1) << ((members.m_granularity ?? 0)))) | 0);
        for (let y = ((sy) | 0); (((y) <= (ey)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            let dirtybase = (members.m_bitmap ?? 0)["pix&"](y);
            let dirtybase$s = undefined, dirtybase$o = 0;
            if (ArrayBuffer.isView(dirtybase) || Array.isArray(dirtybase))
                dirtybase$s = dirtybase;
            else if (dirtybase !== null && typeof dirtybase === 'object' && dirtybase.generatedPointer === true && dirtybase.path === undefined && dirtybase.target === undefined && (ArrayBuffer.isView(dirtybase.source) || Array.isArray(dirtybase.source))) {
                dirtybase$s = dirtybase.source;
                dirtybase$o = dirtybase.offset;
            }
            let currect = 0;
            for (let x = ((sx) | 0); (((x) <= (ex)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                if ((((dirtybase$s !== undefined ? (dirtybase$s[dirtybase$o + (x)] ?? 0) : runtime.readIndex(dirtybase, x))) ? 0 : 1)) {
                    if (currect) {
                        runtime.pointerStore(currect, ((runtime.readIndex(currect, 0)) & (cliprect)));
                    }
                    currect = 0;
                    continue;
                }
                if (((currect) ? 0 : 1)) {
                    let min_x = ((((x) << ((members.m_granularity ?? 0)))) | 0);
                    let min_y = ((((y) << ((members.m_granularity ?? 0)))) | 0);
                    currect = (members.m_rect_list).emplace_back(min_x, ((((min_x) + (tilesize))) - (1)), min_y, ((((min_y) + (tilesize))) - (1)));
                }
                else {
                    __deref_calculate_rect_list(runtime, currect).max_x = __add_calculate_rect_list(runtime, __deref_calculate_rect_list(runtime, currect).max_x, tilesize);
                }
            }
            if (currect) {
                runtime.pointerStore(currect, ((runtime.readIndex(currect, 0)) & (cliprect)));
            }
        }
        members.m_rect_list_bounds = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(cliprect);
    }
    function __add_calculate_rect_list(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_calculate_rect_list(runtime, p) {
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
    function method_sparse_dirty_bitmap__dirty(runtime, rect) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        method_dirty__4(runtime, (__t0 = __deref_sparse_dirty_bitmap__dirty(runtime, rect), typeof __t0.left === 'function' ? __t0.left() : typeof __t0.left === 'number' || typeof __t0.left === 'boolean' ? __t0.left : runtime.container(rect, "left")), (__t1 = __deref_sparse_dirty_bitmap__dirty(runtime, rect), typeof __t1.right === 'function' ? __t1.right() : typeof __t1.right === 'number' || typeof __t1.right === 'boolean' ? __t1.right : runtime.container(rect, "right")), (__t2 = __deref_sparse_dirty_bitmap__dirty(runtime, rect), typeof __t2.top === 'function' ? __t2.top() : typeof __t2.top === 'number' || typeof __t2.top === 'boolean' ? __t2.top : runtime.container(rect, "top")), (__t3 = __deref_sparse_dirty_bitmap__dirty(runtime, rect), typeof __t3.bottom === 'function' ? __t3.bottom() : typeof __t3.bottom === 'number' || typeof __t3.bottom === 'boolean' ? __t3.bottom : runtime.container(rect, "bottom")));
    }
    function __deref_sparse_dirty_bitmap__dirty(runtime, p) {
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
    function method_sparse_dirty_bitmap__dirty_all(runtime) {
        const members = runtime.members;
        method_dirty__4(runtime, 0, (((members.m_width ?? 0)) - (1)), 0, (((members.m_height ?? 0)) - (1)));
    }
    function method_sparse_dirty_bitmap__clean(runtime, rect) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        method_clean__4(runtime, (__t0 = __deref_sparse_dirty_bitmap__clean(runtime, rect), typeof __t0.left === 'function' ? __t0.left() : typeof __t0.left === 'number' || typeof __t0.left === 'boolean' ? __t0.left : runtime.container(rect, "left")), (__t1 = __deref_sparse_dirty_bitmap__clean(runtime, rect), typeof __t1.right === 'function' ? __t1.right() : typeof __t1.right === 'number' || typeof __t1.right === 'boolean' ? __t1.right : runtime.container(rect, "right")), (__t2 = __deref_sparse_dirty_bitmap__clean(runtime, rect), typeof __t2.top === 'function' ? __t2.top() : typeof __t2.top === 'number' || typeof __t2.top === 'boolean' ? __t2.top : runtime.container(rect, "top")), (__t3 = __deref_sparse_dirty_bitmap__clean(runtime, rect), typeof __t3.bottom === 'function' ? __t3.bottom() : typeof __t3.bottom === 'number' || typeof __t3.bottom === 'boolean' ? __t3.bottom : runtime.container(rect, "bottom")));
    }
    function __deref_sparse_dirty_bitmap__clean(runtime, p) {
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
    function method_sparse_dirty_bitmap__clean_all(runtime) {
        const members = runtime.members;
        method_clean__4(runtime, 0, (((members.m_width ?? 0)) - (1)), 0, (((members.m_height ?? 0)) - (1)));
    }
    function method_sparse_dirty_bitmap__iterate_dirty_rects(runtime, action) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rectangle"], __L1 = __l["std::forward"];
        method_iterate_dirty_rects__2(runtime, (__L0 ? __L0(0, (((members.m_width ?? 0)) - (1)), 0, (((members.m_height ?? 0)) - (1))) : runtime.macro("rectangle", 0, (((members.m_width ?? 0)) - (1)), 0, (((members.m_height ?? 0)) - (1)))), (__L1 ? __L1(action) : runtime.macro("std::forward", action)));
    }
    function method_iterate_dirty_rects__2(runtime, cliprect, action) {
        const members = runtime.members;
        const h_m_rect_list = members.m_rect_list ?? 0;
        method_calculate_rect_list(runtime, cliprect);
        for (let __range0 = h_m_rect_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (typeof action === 'function' ? action(__range0_item) : runtime.macro("action", __range0_item));
        }
    }
    function method_sparse_dirty_bitmap__invalidate_rect_list(runtime) {
        const members = runtime.members;
        (__deref_sparse_dirty_bitmap__invalidate_rect_list(runtime, members.m_rect_list_bounds).set?.(0, -1, 0, -1) ?? 0);
    }
    function __deref_sparse_dirty_bitmap__invalidate_rect_list(runtime, p) {
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
    function method_tilemap_16b_reset(runtime, screen, info) {
        const members = runtime.members;
        (__deref_tilemap_16b_reset(runtime, __deref_tilemap_16b_reset(runtime, info).latch_timer).adjust?.((__deref_tilemap_16b_reset(runtime, screen).time_until_pos?.(261) ?? 0), __deref_tilemap_16b_reset(runtime, info).index) ?? 0);
    }
    function __deref_tilemap_16b_reset(runtime, p) {
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
    function method___construct(runtime, granularity = 3) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rectangle"];
        members.m_width = ((0) | 0);
        members.m_height = ((0) | 0);
        members.m_granularity = ((granularity) | 0);
        members.m_rect_list_bounds = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)((__L0 ? __L0(0, -1, 0, -1) : runtime.macro("rectangle", 0, -1, 0, -1)));
    }
    function method_dirty__1(runtime, rect) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        method_dirty__4(runtime, (__t0 = __deref_dirty__1(runtime, rect), typeof __t0.left === 'function' ? __t0.left() : typeof __t0.left === 'number' || typeof __t0.left === 'boolean' ? __t0.left : runtime.container(rect, "left")), (__t1 = __deref_dirty__1(runtime, rect), typeof __t1.right === 'function' ? __t1.right() : typeof __t1.right === 'number' || typeof __t1.right === 'boolean' ? __t1.right : runtime.container(rect, "right")), (__t2 = __deref_dirty__1(runtime, rect), typeof __t2.top === 'function' ? __t2.top() : typeof __t2.top === 'number' || typeof __t2.top === 'boolean' ? __t2.top : runtime.container(rect, "top")), (__t3 = __deref_dirty__1(runtime, rect), typeof __t3.bottom === 'function' ? __t3.bottom() : typeof __t3.bottom === 'number' || typeof __t3.bottom === 'boolean' ? __t3.bottom : runtime.container(rect, "bottom")));
    }
    function __deref_dirty__1(runtime, p) {
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
    function method_clean__1(runtime, rect) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        method_clean__4(runtime, (__t0 = __deref_clean__1(runtime, rect), typeof __t0.left === 'function' ? __t0.left() : typeof __t0.left === 'number' || typeof __t0.left === 'boolean' ? __t0.left : runtime.container(rect, "left")), (__t1 = __deref_clean__1(runtime, rect), typeof __t1.right === 'function' ? __t1.right() : typeof __t1.right === 'number' || typeof __t1.right === 'boolean' ? __t1.right : runtime.container(rect, "right")), (__t2 = __deref_clean__1(runtime, rect), typeof __t2.top === 'function' ? __t2.top() : typeof __t2.top === 'number' || typeof __t2.top === 'boolean' ? __t2.top : runtime.container(rect, "top")), (__t3 = __deref_clean__1(runtime, rect), typeof __t3.bottom === 'function' ? __t3.bottom() : typeof __t3.bottom === 'number' || typeof __t3.bottom === 'boolean' ? __t3.bottom : runtime.container(rect, "bottom")));
    }
    function __deref_clean__1(runtime, p) {
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
    function method_iterate_dirty_rects__1(runtime, action) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rectangle"], __L1 = __l["std::forward"];
        method_iterate_dirty_rects__2(runtime, (__L0 ? __L0(0, (((members.m_width ?? 0)) - (1)), 0, (((members.m_height ?? 0)) - (1))) : runtime.macro("rectangle", 0, (((members.m_width ?? 0)) - (1)), 0, (((members.m_height ?? 0)) - (1)))), (__L1 ? __L1(action) : runtime.macro("std::forward", action)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "dirty_all": method_dirty_all,
        "dirty__4": method_dirty__4,
        "invalidate_rect_list": method_invalidate_rect_list,
        "clean_all": method_clean_all,
        "clean__4": method_clean__4,
        "resize": method_resize,
        "calculate_rect_list": method_calculate_rect_list,
        "sparse_dirty_bitmap::dirty": method_sparse_dirty_bitmap__dirty,
        "sparse_dirty_bitmap::dirty_all": method_sparse_dirty_bitmap__dirty_all,
        "sparse_dirty_bitmap::clean": method_sparse_dirty_bitmap__clean,
        "sparse_dirty_bitmap::clean_all": method_sparse_dirty_bitmap__clean_all,
        "sparse_dirty_bitmap::iterate_dirty_rects": method_sparse_dirty_bitmap__iterate_dirty_rects,
        "iterate_dirty_rects__2": method_iterate_dirty_rects__2,
        "sparse_dirty_bitmap::invalidate_rect_list": method_sparse_dirty_bitmap__invalidate_rect_list,
        "tilemap_16a_draw_layer": method_tilemap_16a_draw_layer,
        "draw_virtual_tilemap": method_draw_virtual_tilemap,
        "tilemap_16b_draw_layer": method_tilemap_16b_draw_layer,
        "tilemap_16b_reset": method_tilemap_16b_reset,
        "__construct": method___construct,
        "dirty__1": method_dirty__1,
        "clean__1": method_clean__1,
        "iterate_dirty_rects__1": method_iterate_dirty_rects__1
    };
    return __methodTable;
})();
definition.allocations["sparse_dirty_bitmap"].compiledMethodLinks = ["osd_printf_debug", "rectangle", "std::forward"];
export const device = definition;
export default device;
