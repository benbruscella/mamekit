import deviceData from './atari_motion_objects.device.ir.json' with { type: 'json' };
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
        let __t0, __t1, __t2, __t3, __t4;
        const h_m_slipoffset = members.m_slipoffset ?? 0;
        const h_m_activelist = members.m_activelist ?? 0;
        const h_m_reverse = members.m_reverse ?? 0;
        let startband = ((runtime.shiftRight((((((((__t0 = __deref_draw(runtime, cliprect), typeof __t0.top === 'function' ? __t0.top() : typeof __t0.top === 'number' || typeof __t0.top === 'boolean' ? __t0.top : runtime.container(cliprect, "top"))) + ((members.m_yscroll ?? 0)))) - (h_m_slipoffset))) & ((members.m_bitmapymask ?? 0))), (members.m_slipshift ?? 0))) | 0);
        let stopband = ((runtime.shiftRight((((((((__t1 = __deref_draw(runtime, cliprect), typeof __t1.bottom === 'function' ? __t1.bottom() : typeof __t1.bottom === 'number' || typeof __t1.bottom === 'boolean' ? __t1.bottom : runtime.container(cliprect, "bottom"))) + ((members.m_yscroll ?? 0)))) - (h_m_slipoffset))) & ((members.m_bitmapymask ?? 0))), (members.m_slipshift ?? 0))) | 0);
        if ((((startband) > (stopband)) ? 1 : 0)) {
            startband = ((((startband) - (runtime.shiftRight((members.m_bitmapheight ?? 0), (members.m_slipshift ?? 0))))) | 0);
        }
        if (((((members.m_slipshift ?? 0)) === (0)) ? 1 : 0)) {
            stopband = ((startband) | 0);
        }
        for (let band = ((startband) | 0); (((band) <= (stopband)) ? 1 : 0); band = ((((band) + (1))) | 0)) {
            let bandclip = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(cliprect);
            let link = ((0) | 0);
            if (((((members.m_slipshift ?? 0)) !== (0)) ? 1 : 0)) {
                link = ((((runtime.shiftRight(runtime.readIndex((members.m_slipram ?? 0), ((band) & ((members.m_sliprammask ?? 0)))), (__t2 = __deref_draw(runtime, members.m_linkmask), typeof __t2.shift === 'function' ? __t2.shift() : typeof __t2.shift === 'number' || typeof __t2.shift === 'boolean' ? __t2.shift : runtime.container(members.m_linkmask, "shift")))) & ((__t3 = __deref_draw(runtime, members.m_linkmask), typeof __t3.mask === 'function' ? __t3.mask() : typeof __t3.mask === 'number' || typeof __t3.mask === 'boolean' ? __t3.mask : runtime.container(members.m_linkmask, "mask"))))) | 0);
                bandclip.min_y = ((((((((band) << ((members.m_slipshift ?? 0)))) - ((members.m_yscroll ?? 0)))) + (h_m_slipoffset))) & ((members.m_bitmapymask ?? 0)));
                if (((Number(bandclip.min_y) >= Number((__t4 = __deref_draw(runtime, bitmap), typeof __t4.height === 'function' ? __t4.height() : typeof __t4.height === 'number' || typeof __t4.height === 'boolean' ? __t4.height : runtime.container(bitmap, "height")))) ? 1 : 0)) {
                    bandclip.min_y = runtime.subtract(bandclip.min_y, (members.m_bitmapheight ?? 0));
                }
                (__deref_draw(runtime, bandclip).set_height?.(((1) << ((members.m_slipshift ?? 0)))) ?? 0);
                bandclip = runtime.andAssign(bandclip, cliprect);
            }
            method_build_active_list(runtime, link);
            members.m_next_xpos = ((123456) >>> 0);
            if ((runtime.same(h_m_activelist, (members.m_activelast ?? 0)) ? 1 : 0)) {
                continue;
            }
            let first = runtime.packedView(0, false);
            let last = runtime.packedView(0, false);
            let step = ((0) | 0);
            if (h_m_reverse) {
                first = runtime.packedView(__addr_draw(runtime, (members.m_activelast ?? 0), -(4)), false);
                last = runtime.packedView(h_m_activelist, false);
                step = ((-4) | 0);
            }
            else {
                first = runtime.packedView(h_m_activelist, false);
                last = runtime.packedView(__addr_draw(runtime, (members.m_activelast ?? 0), -(4)), false);
                step = ((4) | 0);
            }
            for (let current = first; 1; current = __add_draw(runtime, current, step)) {
                method_render_object(runtime, bitmap, bandclip, current);
                if ((runtime.same(current, last) ? 1 : 0)) {
                    break;
                }
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
    function __deref_draw(runtime, p) {
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
    function method_build_active_list(runtime, link) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8;
        const h_m_activelist = members.m_activelist ?? 0;
        const h_m_split = members.m_split ?? 0;
        const h_m_linked = members.m_linked ?? 0;
        let bankbase = __addr_build_active_list(runtime, method_spriteram(runtime), (((members.m_bank ?? 0)) << ((((members.m_entrybits ?? 0)) + (2)))));
        let bankbase$s = undefined, bankbase$o = 0;
        if (ArrayBuffer.isView(bankbase) || Array.isArray(bankbase))
            bankbase$s = bankbase;
        else if (bankbase !== null && typeof bankbase === 'object' && bankbase.generatedPointer === true && bankbase.path === undefined && bankbase.target === undefined && (ArrayBuffer.isView(bankbase.source) || Array.isArray(bankbase.source))) {
            bankbase$s = bankbase.source;
            bankbase$o = bankbase.offset;
        }
        let current = __addr_build_active_list(runtime, h_m_activelist, 0);
        let visited = [0];
        for (let i = ((0) | 0); ((((((i) < ((members.m_maxperline ?? 0))) ? 1 : 0)) && ((((visited[link] ?? 0)) ? 0 : 1))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let modata = current;
            let modata$s = undefined, modata$o = 0;
            if (ArrayBuffer.isView(modata) || Array.isArray(modata))
                modata$s = modata;
            else if (modata !== null && typeof modata === 'object' && modata.generatedPointer === true && modata.path === undefined && modata.target === undefined && (ArrayBuffer.isView(modata.source) || Array.isArray(modata.source))) {
                modata$s = modata.source;
                modata$o = modata.offset;
            }
            if (((h_m_split) ? 0 : 1)) {
                let srcdata = __addr_build_active_list(runtime, bankbase, ((link) * (4)));
                runtime.pointerStore((__t0 = current, current = __add_build_active_list(runtime, current, 1), __t0), runtime.readIndex(srcdata, 0));
                runtime.pointerStore((__t1 = current, current = __add_build_active_list(runtime, current, 1), __t1), runtime.readIndex(srcdata, 1));
                runtime.pointerStore((__t2 = current, current = __add_build_active_list(runtime, current, 1), __t2), runtime.readIndex(srcdata, 2));
                runtime.pointerStore((__t3 = current, current = __add_build_active_list(runtime, current, 1), __t3), runtime.readIndex(srcdata, 3));
            }
            else {
                let srcdata = __addr_build_active_list(runtime, bankbase, link);
                runtime.pointerStore((__t4 = current, current = __add_build_active_list(runtime, current, 1), __t4), runtime.readIndex(srcdata, ((((0) << ((members.m_entrybits ?? 0)))) >>> 0)));
                runtime.pointerStore((__t5 = current, current = __add_build_active_list(runtime, current, 1), __t5), runtime.readIndex(srcdata, ((((1) << ((members.m_entrybits ?? 0)))) >>> 0)));
                runtime.pointerStore((__t6 = current, current = __add_build_active_list(runtime, current, 1), __t6), runtime.readIndex(srcdata, ((((2) << ((members.m_entrybits ?? 0)))) >>> 0)));
                runtime.pointerStore((__t7 = current, current = __add_build_active_list(runtime, current, 1), __t7), runtime.readIndex(srcdata, ((((3) << ((members.m_entrybits ?? 0)))) >>> 0)));
            }
            visited[link] = 1;
            if (h_m_linked) {
                link = (((__deref_build_active_list(runtime, members.m_linkmask).extract?.(modata) ?? 0)) | 0);
            }
            else {
                link = ((((((link) + (1))) & ((__t8 = __deref_build_active_list(runtime, members.m_linkmask), typeof __t8.mask === 'function' ? __t8.mask() : typeof __t8.mask === 'number' || typeof __t8.mask === 'boolean' ? __t8.mask : runtime.container(members.m_linkmask, "mask"))))) | 0);
            }
        }
        members.m_activelast = runtime.packedView(current, false);
    }
    function __add_build_active_list(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_build_active_list(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_build_active_list(runtime, p) {
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
    function method_render_object(runtime, bitmap, cliprect, entry) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_gfxdecode.gfx"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11;
        const h_m_palettebase = members.m_palettebase ?? 0;
        const h_m_nextneighbor = members.m_nextneighbor ?? 0;
        const h_m_specialvalue = members.m_specialvalue ?? 0;
        const h_m_swapxy = members.m_swapxy ?? 0;
        const h_m_transpen = members.m_transpen ?? 0;
        let rawcode = (((__deref_render_object(runtime, members.m_codemask).extract?.(entry) ?? 0)) | 0);
        let gfx = (__L0 ? __L0(runtime.readIndex((members.m_gfxlookup ?? 0), runtime.shiftRight(rawcode, 8))) : ((members.m_gfxdecode)?.gfx?.(runtime.readIndex((members.m_gfxlookup ?? 0), runtime.shiftRight(rawcode, 8))) ?? 0));
        let gfx$s = undefined, gfx$o = 0;
        if (ArrayBuffer.isView(gfx) || Array.isArray(gfx))
            gfx$s = gfx;
        else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) {
            gfx$s = gfx.source;
            gfx$o = gfx.offset;
        }
        let code = ((runtime.readIndex((members.m_codelookup ?? 0), rawcode)) | 0);
        let color = ((runtime.readIndex((members.m_colorlookup ?? 0), (__deref_render_object(runtime, members.m_colormask).extract?.(entry) ?? 0))) | 0);
        let xpos = (((((__deref_render_object(runtime, members.m_xposmask).extract?.(entry) ?? 0)) + ((members.m_xoffset ?? 0)))) | 0);
        let ypos = (((-(__deref_render_object(runtime, members.m_yposmask).extract?.(entry) ?? 0))) | 0);
        let hflip = (((__deref_render_object(runtime, members.m_hflipmask).extract?.(entry) ?? 0)) | 0);
        let vflip = (((__deref_render_object(runtime, members.m_vflipmask).extract?.(entry) ?? 0)) | 0);
        let width = ((__add_render_object(runtime, (__deref_render_object(runtime, members.m_widthmask).extract?.(entry) ?? 0), 1)) | 0);
        let height = ((__add_render_object(runtime, (__deref_render_object(runtime, members.m_heightmask).extract?.(entry) ?? 0), 1)) | 0);
        let priority = (((__deref_render_object(runtime, members.m_prioritymask).extract?.(entry) ?? 0)) | 0);
        color = ((((((color) * ((__t0 = __deref_render_object(runtime, gfx), typeof __t0.granularity === 'function' ? __t0.granularity() : typeof __t0.granularity === 'number' || typeof __t0.granularity === 'boolean' ? __t0.granularity : runtime.container(gfx, "granularity"))))) | (((priority) << (12))))) | 0);
        color = ((((color) + (h_m_palettebase))) | 0);
        if ((((__deref_render_object(runtime, members.m_absolutemask).extract?.(entry) ?? 0)) ? 0 : 1)) {
            xpos = ((((xpos) - ((members.m_xscroll ?? 0)))) | 0);
            ypos = ((((ypos) - ((members.m_yscroll ?? 0)))) | 0);
        }
        ypos = ((((ypos) - (((height) << ((members.m_tileyshift ?? 0)))))) | 0);
        if (((((members.m_next_xpos ?? 0)) !== (123456)) ? 1 : 0)) {
            xpos = (((members.m_next_xpos ?? 0)) | 0);
        }
        members.m_next_xpos = ((123456) >>> 0);
        if (((Number((__deref_render_object(runtime, members.m_neighbormask).extract?.(entry) ?? 0)) !== Number(0)) ? 1 : 0)) {
            if (((h_m_nextneighbor) ? 0 : 1)) {
                xpos = (((((members.m_last_xpos ?? 0)) + ((members.m_tilewidth ?? 0)))) | 0);
            }
            else {
                members.m_next_xpos = ((((xpos) + ((members.m_tilewidth ?? 0)))) >>> 0);
            }
        }
        members.m_last_xpos = ((xpos) >>> 0);
        xpos = ((((xpos) & ((members.m_bitmapxmask ?? 0)))) | 0);
        ypos = ((((ypos) & ((members.m_bitmapymask ?? 0)))) | 0);
        if (((Number(xpos) >= Number((__t1 = __deref_render_object(runtime, bitmap), typeof __t1.width === 'function' ? __t1.width() : typeof __t1.width === 'number' || typeof __t1.width === 'boolean' ? __t1.width : runtime.container(bitmap, "width")))) ? 1 : 0)) {
            xpos = ((((xpos) - ((members.m_bitmapwidth ?? 0)))) | 0);
        }
        if (((Number(ypos) >= Number((__t2 = __deref_render_object(runtime, bitmap), typeof __t2.height === 'function' ? __t2.height() : typeof __t2.height === 'number' || typeof __t2.height === 'boolean' ? __t2.height : runtime.container(bitmap, "height")))) ? 1 : 0)) {
            ypos = ((((ypos) - ((members.m_bitmapheight ?? 0)))) | 0);
        }
        if ((((((Number((__t3 = __deref_render_object(runtime, members.m_specialmask), typeof __t3.mask === 'function' ? __t3.mask() : typeof __t3.mask === 'number' || typeof __t3.mask === 'boolean' ? __t3.mask : runtime.container(members.m_specialmask, "mask"))) === Number(0)) ? 1 : 0)) || (((Number((__deref_render_object(runtime, members.m_specialmask).extract?.(entry) ?? 0)) !== Number(h_m_specialvalue)) ? 1 : 0))) ? 1 : 0)) {
            let xadv = (((members.m_tilewidth ?? 0)) | 0);
            if (hflip) {
                xpos = ((((xpos) + (((((width) - (1))) << ((members.m_tilexshift ?? 0)))))) | 0);
                xadv = (((-xadv)) | 0);
            }
            let yadv = (((members.m_tileheight ?? 0)) | 0);
            if (vflip) {
                ypos = ((((ypos) + (((((height) - (1))) << ((members.m_tileyshift ?? 0)))))) | 0);
                yadv = (((-yadv)) | 0);
            }
            if (((h_m_swapxy) ? 0 : 1)) {
                for (let y = ((0) | 0), sy = ((ypos) | 0); (((y) < (height)) ? 1 : 0); y = ((((y) + (1))) | 0), sy = ((((sy) + (yadv))) | 0)) {
                    if (((Number(sy) <= Number((((__t4 = __deref_render_object(runtime, cliprect), typeof __t4.top === 'function' ? __t4.top() : typeof __t4.top === 'number' || typeof __t4.top === 'boolean' ? __t4.top : runtime.container(cliprect, "top"))) - ((members.m_tileheight ?? 0))))) ? 1 : 0)) {
                        code = ((((code) + (width))) | 0);
                        continue;
                    }
                    else {
                        if (((Number(sy) > Number((__t5 = __deref_render_object(runtime, cliprect), typeof __t5.bottom === 'function' ? __t5.bottom() : typeof __t5.bottom === 'number' || typeof __t5.bottom === 'boolean' ? __t5.bottom : runtime.container(cliprect, "bottom")))) ? 1 : 0)) {
                            break;
                        }
                    }
                    for (let x = ((0) | 0), sx = ((xpos) | 0); (((x) < (width)) ? 1 : 0); x = ((((x) + (1))) | 0), sx = ((((sx) + (xadv))) | 0), code = ((((code) + (1))) | 0)) {
                        if ((((((Number(sx) <= Number((((-(__t6 = __deref_render_object(runtime, cliprect), typeof __t6.left === 'function' ? __t6.left() : typeof __t6.left === 'number' || typeof __t6.left === 'boolean' ? __t6.left : runtime.container(cliprect, "left")))) - ((members.m_tilewidth ?? 0))))) ? 1 : 0)) || (((Number(sx) > Number((__t7 = __deref_render_object(runtime, cliprect), typeof __t7.right === 'function' ? __t7.right() : typeof __t7.right === 'number' || typeof __t7.right === 'boolean' ? __t7.right : runtime.container(cliprect, "right")))) ? 1 : 0))) ? 1 : 0)) {
                            continue;
                        }
                        (__deref_render_object(runtime, gfx).transpen_raw?.(bitmap, cliprect, code, color, hflip, vflip, sx, sy, h_m_transpen) ?? 0);
                        method_mark_dirty__4(runtime, sx, ((((sx) + ((members.m_tilewidth ?? 0)))) - (1)), sy, ((((sy) + ((members.m_tileheight ?? 0)))) - (1)));
                    }
                }
            }
            else {
                for (let x = ((0) | 0), sx = ((xpos) | 0); (((x) < (width)) ? 1 : 0); x = ((((x) + (1))) | 0), sx = ((((sx) + (xadv))) | 0)) {
                    if (((Number(sx) <= Number((((__t8 = __deref_render_object(runtime, cliprect), typeof __t8.left === 'function' ? __t8.left() : typeof __t8.left === 'number' || typeof __t8.left === 'boolean' ? __t8.left : runtime.container(cliprect, "left"))) - ((members.m_tilewidth ?? 0))))) ? 1 : 0)) {
                        code = ((((code) + (height))) | 0);
                        continue;
                    }
                    else {
                        if (((Number(sx) > Number((__t9 = __deref_render_object(runtime, cliprect), typeof __t9.right === 'function' ? __t9.right() : typeof __t9.right === 'number' || typeof __t9.right === 'boolean' ? __t9.right : runtime.container(cliprect, "right")))) ? 1 : 0)) {
                            break;
                        }
                    }
                    for (let y = ((0) | 0), sy = ((ypos) | 0); (((y) < (height)) ? 1 : 0); y = ((((y) + (1))) | 0), sy = ((((sy) + (yadv))) | 0), code = ((((code) + (1))) | 0)) {
                        if ((((((Number(sy) <= Number((((-(__t10 = __deref_render_object(runtime, cliprect), typeof __t10.top === 'function' ? __t10.top() : typeof __t10.top === 'number' || typeof __t10.top === 'boolean' ? __t10.top : runtime.container(cliprect, "top")))) - ((members.m_tileheight ?? 0))))) ? 1 : 0)) || (((Number(sy) > Number((__t11 = __deref_render_object(runtime, cliprect), typeof __t11.bottom === 'function' ? __t11.bottom() : typeof __t11.bottom === 'number' || typeof __t11.bottom === 'boolean' ? __t11.bottom : runtime.container(cliprect, "bottom")))) ? 1 : 0))) ? 1 : 0)) {
                            continue;
                        }
                        (__deref_render_object(runtime, gfx).transpen_raw?.(bitmap, cliprect, code, color, hflip, vflip, sx, sy, h_m_transpen) ?? 0);
                        method_mark_dirty__4(runtime, sx, ((((sx) + ((members.m_tilewidth ?? 0)))) - (1)), sy, ((((sy) + ((members.m_tileheight ?? 0)))) - (1)));
                    }
                }
            }
        }
    }
    function __add_render_object(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_render_object(runtime, p) {
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
    function method_mark_dirty__4(runtime, left, right, top, bottom) {
        const members = runtime.members;
        (members.m_dirty.dirty?.(((left) - ((members.m_xorigin ?? 0))), ((right) - ((members.m_xorigin ?? 0))), ((top) - ((members.m_yorigin ?? 0))), ((bottom) - ((members.m_yorigin ?? 0)))) ?? 0);
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_gfxdecode.gfx"], __L1 = __l["emu_fatalerror"], __L2 = __l["__throw"], __L3 = __l["screen"], __L4 = __l["screen().time_until_pos"], __L5 = __l["NAME"], __L6 = __l["save_item"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6;
        const h_m_gfxindex = members.m_gfxindex ?? 0;
        const h_m_link_entry = members.m_link_entry ?? 0;
        const h_m_code_entry = members.m_code_entry ?? 0;
        const h_m_color_entry = members.m_color_entry ?? 0;
        const h_m_xpos_entry = members.m_xpos_entry ?? 0;
        const h_m_ypos_entry = members.m_ypos_entry ?? 0;
        const h_m_width_entry = members.m_width_entry ?? 0;
        const h_m_height_entry = members.m_height_entry ?? 0;
        const h_m_hflip_entry = members.m_hflip_entry ?? 0;
        const h_m_vflip_entry = members.m_vflip_entry ?? 0;
        const h_m_priority_entry = members.m_priority_entry ?? 0;
        const h_m_neighbor_entry = members.m_neighbor_entry ?? 0;
        const h_m_absolute_entry = members.m_absolute_entry ?? 0;
        const h_m_bankcount = members.m_bankcount ?? 0;
        const h_m_slipheight = members.m_slipheight ?? 0;
        const h_m_slipramshare = members.m_slipramshare ?? 0;
        method_sprite_device__device_start(runtime);
        let gfx = (__L0 ? __L0(h_m_gfxindex) : ((members.m_gfxdecode)?.gfx?.(h_m_gfxindex) ?? 0));
        let gfx$s = undefined, gfx$o = 0;
        if (ArrayBuffer.isView(gfx) || Array.isArray(gfx))
            gfx$s = gfx;
        else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) {
            gfx$s = gfx.source;
            gfx$o = gfx.offset;
        }
        if (((gfx) ? 0 : 1)) {
            (__L2 ? __L2((__L1 ? __L1("No gfxelement #%d!", h_m_gfxindex) : runtime.macro("emu_fatalerror", "No gfxelement #%d!", h_m_gfxindex))) : runtime.macro("__throw", (__L1 ? __L1("No gfxelement #%d!", h_m_gfxindex) : runtime.macro("emu_fatalerror", "No gfxelement #%d!", h_m_gfxindex))));
        }
        (__deref_device_start(runtime, members.m_linkmask).set?.(h_m_link_entry) ?? 0);
        (__deref_device_start(runtime, members.m_codemask).set?.(h_m_code_entry) ?? 0);
        (__deref_device_start(runtime, members.m_colormask).set?.(h_m_color_entry) ?? 0);
        (__deref_device_start(runtime, members.m_xposmask).set?.(h_m_xpos_entry) ?? 0);
        (__deref_device_start(runtime, members.m_yposmask).set?.(h_m_ypos_entry) ?? 0);
        (__deref_device_start(runtime, members.m_widthmask).set?.(h_m_width_entry) ?? 0);
        (__deref_device_start(runtime, members.m_heightmask).set?.(h_m_height_entry) ?? 0);
        (__deref_device_start(runtime, members.m_hflipmask).set?.(h_m_hflip_entry) ?? 0);
        (__deref_device_start(runtime, members.m_vflipmask).set?.(h_m_vflip_entry) ?? 0);
        (__deref_device_start(runtime, members.m_prioritymask).set?.(h_m_priority_entry) ?? 0);
        (__deref_device_start(runtime, members.m_neighbormask).set?.(h_m_neighbor_entry) ?? 0);
        (__deref_device_start(runtime, members.m_absolutemask).set?.(h_m_absolute_entry) ?? 0);
        members.m_tilewidth = (((__t0 = __deref_device_start(runtime, gfx), typeof __t0.width === 'function' ? __t0.width() : typeof __t0.width === 'number' || typeof __t0.width === 'boolean' ? __t0.width : runtime.container(gfx, "width"))) | 0);
        members.m_tileheight = (((__t1 = __deref_device_start(runtime, gfx), typeof __t1.height === 'function' ? __t1.height() : typeof __t1.height === 'number' || typeof __t1.height === 'boolean' ? __t1.height : runtime.container(gfx, "height"))) | 0);
        members.m_tilexshift = ((method_compute_log(runtime, (members.m_tilewidth ?? 0))) | 0);
        members.m_tileyshift = ((method_compute_log(runtime, (members.m_tileheight ?? 0))) | 0);
        members.m_bitmapwidth = ((method_round_to_powerof2(runtime, (__t2 = __deref_device_start(runtime, members.m_xposmask), typeof __t2.mask === 'function' ? __t2.mask() : typeof __t2.mask === 'number' || typeof __t2.mask === 'boolean' ? __t2.mask : runtime.container(members.m_xposmask, "mask")))) | 0);
        members.m_bitmapheight = ((method_round_to_powerof2(runtime, (__t3 = __deref_device_start(runtime, members.m_yposmask), typeof __t3.mask === 'function' ? __t3.mask() : typeof __t3.mask === 'number' || typeof __t3.mask === 'boolean' ? __t3.mask : runtime.container(members.m_yposmask, "mask")))) | 0);
        members.m_bitmapxmask = (((((members.m_bitmapwidth ?? 0)) - (1))) | 0);
        members.m_bitmapymask = (((((members.m_bitmapheight ?? 0)) - (1))) | 0);
        members.m_entrycount = ((method_round_to_powerof2(runtime, (__t4 = __deref_device_start(runtime, members.m_linkmask), typeof __t4.mask === 'function' ? __t4.mask() : typeof __t4.mask === 'number' || typeof __t4.mask === 'boolean' ? __t4.mask : runtime.container(members.m_linkmask, "mask")))) | 0);
        members.m_entrybits = ((method_compute_log(runtime, (members.m_entrycount ?? 0))) | 0);
        members.m_spriteramsize = ((((h_m_bankcount) * ((members.m_entrycount ?? 0)))) | 0);
        members.m_spriterammask = (((((members.m_spriteramsize ?? 0)) - (1))) | 0);
        members.m_slipshift = (((((((h_m_slipheight) !== (0)) ? 1 : 0)) ? (method_compute_log(runtime, h_m_slipheight)) : (0))) | 0);
        members.m_slipramsize = ((runtime.shiftRight((members.m_bitmapheight ?? 0), (members.m_slipshift ?? 0))) | 0);
        members.m_sliprammask = (((((members.m_slipramsize ?? 0)) - (1))) | 0);
        if (((((members.m_maxperline ?? 0)) === (0)) ? 1 : 0)) {
            members.m_maxperline = ((1024) & 0xffff);
        }
        if ((((members.m_slipram ?? 0)) ? 0 : 1)) {
            members.m_slipram = runtime.packedView(h_m_slipramshare, false);
        }
        let codesize = ((method_round_to_powerof2(runtime, (__t5 = __deref_device_start(runtime, members.m_codemask), typeof __t5.mask === 'function' ? __t5.mask() : typeof __t5.mask === 'number' || typeof __t5.mask === 'boolean' ? __t5.mask : runtime.container(members.m_codemask, "mask")))) | 0);
        (members.m_codelookup = runtime.resize(members.m_codelookup, codesize));
        for (let i = ((0) | 0); (((i) < (codesize)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.writeIndex(runtime.writableMember("m_codelookup"), i, i);
        }
        let colorsize = ((method_round_to_powerof2(runtime, (__t6 = __deref_device_start(runtime, members.m_colormask), typeof __t6.mask === 'function' ? __t6.mask() : typeof __t6.mask === 'number' || typeof __t6.mask === 'boolean' ? __t6.mask : runtime.container(members.m_colormask, "mask")))) | 0);
        (members.m_colorlookup = runtime.resize(members.m_colorlookup, colorsize));
        for (let i = ((0) | 0); (((i) < (colorsize)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.writeIndex(runtime.writableMember("m_colorlookup"), i, i);
        }
        let gfxsize = ((runtime.divide(codesize, 256)) | 0);
        (members.m_gfxlookup = runtime.resize(members.m_gfxlookup, gfxsize));
        for (let i = ((0) | 0); (((i) < (gfxsize)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.writeIndex(runtime.writableMember("m_gfxlookup"), i, h_m_gfxindex);
        }
        (__deref_device_start(runtime, members.m_force_update_timer).adjust?.(((__L4 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(0) ?? 0)) ?? 0);
        (__L6 ? __L6((__L5 ? __L5((members.m_bank ?? 0)) : runtime.macro("NAME", (members.m_bank ?? 0)))) : runtime.macro("save_item", (__L5 ? __L5((members.m_bank ?? 0)) : runtime.macro("NAME", (members.m_bank ?? 0)))));
        (__L6 ? __L6((__L5 ? __L5((members.m_xscroll ?? 0)) : runtime.macro("NAME", (members.m_xscroll ?? 0)))) : runtime.macro("save_item", (__L5 ? __L5((members.m_xscroll ?? 0)) : runtime.macro("NAME", (members.m_xscroll ?? 0)))));
        (__L6 ? __L6((__L5 ? __L5((members.m_yscroll ?? 0)) : runtime.macro("NAME", (members.m_yscroll ?? 0)))) : runtime.macro("save_item", (__L5 ? __L5((members.m_yscroll ?? 0)) : runtime.macro("NAME", (members.m_yscroll ?? 0)))));
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
    function method_sprite_device__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["tag"], __L1 = __l["owner"], __L2 = __l["owner().memshare"], __L3 = __l["NAME"], __L4 = __l["save_item"];
        let __t0;
        let spriteram = ((__L2 ?? globalThis.mamekitMissingCall?.("owner().memshare"))?.((__L0 ? __L0() : runtime.macro("tag"))) ?? 0);
        let spriteram$s = undefined, spriteram$o = 0;
        if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram))
            spriteram$s = spriteram;
        else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) {
            spriteram$s = spriteram.source;
            spriteram$o = spriteram.offset;
        }
        if (((spriteram) ? 1 : 0)) {
            method_set_spriteram(runtime, runtime.packedView((__t0 = __deref_sprite_device__device_start(runtime, spriteram), typeof __t0.ptr === 'function' ? __t0.ptr() : typeof __t0.ptr === 'number' || typeof __t0.ptr === 'boolean' ? __t0.ptr : runtime.container(spriteram, "ptr")), false), runtime.container(spriteram, "bytes"));
            (__L4 ? __L4((__L3 ? __L3((members.m_buffer ?? 0)) : runtime.macro("NAME", (members.m_buffer ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_buffer ?? 0)) : runtime.macro("NAME", (members.m_buffer ?? 0)))));
        }
    }
    function __deref_sprite_device__device_start(runtime, p) {
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
    function method_set_spriteram(runtime, base, bytes) {
        const members = runtime.members;
        members.m_spriteram = runtime.packedView(base, false);
        members.m_spriteram_bytes = ((bytes) | 0);
        (members.m_buffer = runtime.resize(members.m_buffer, runtime.divide((members.m_spriteram_bytes ?? 0), 2)));
    }
    function method_compute_log(runtime, value) {
        const members = runtime.members;
        let log = ((0) | 0);
        if ((((value) === (0)) ? 1 : 0)) {
            return ((-1) | 0);
        }
        while (((((value) & (1))) ? 0 : 1)) {
            log = ((((log) + (1))) | 0);
            value = ((((value) >> (1))) | 0);
        }
        if ((((value) !== (1)) ? 1 : 0)) {
            return ((-1) | 0);
        }
        return ((log) | 0);
    }
    function method_round_to_powerof2(runtime, value) {
        const members = runtime.members;
        let log = ((0) | 0);
        if ((((value) === (0)) ? 1 : 0)) {
            return ((1) | 0);
        }
        while (((Number((value = ((((value) >> (1))) | 0))) !== Number(0)) ? 1 : 0)) {
            log = ((((log) + (1))) | 0);
        }
        return ((((1) << (((log) + (1))))) | 0);
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
    function method_apply_stain(runtime, bitmap, pf, mo, x, y) {
        const members = runtime.members;
        let __t0;
        let START_MARKER = ((16386) & 0xffff);
        let END_MARKER = ((16388) & 0xffff);
        let offnext = ((0) ? 1 : 0);
        for (; ((Number(x) < Number((__t0 = __deref_apply_stain(runtime, bitmap), typeof __t0.width === 'function' ? __t0.width() : typeof __t0.width === 'number' || typeof __t0.width === 'boolean' ? __t0.width : runtime.container(bitmap, "width")))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(pf, x, ((runtime.readIndex(pf, x)) | (1024)));
            if ((((offnext) && ((((((Number(runtime.readIndex(mo, x)) === Number(65535)) ? 1 : 0)) || (((Number(((runtime.readIndex(mo, x)) & (START_MARKER))) !== Number(START_MARKER)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                break;
            }
            offnext = (((((((Number(runtime.readIndex(mo, x)) !== Number(65535)) ? 1 : 0)) && (((Number(((runtime.readIndex(mo, x)) & (END_MARKER))) === Number(END_MARKER)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        }
    }
    function __deref_apply_stain(runtime, p) {
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
    function method_force_update(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().update_partial"], __L2 = __l["screen().visible_area"], __L3 = __l["screen().time_until_pos"];
        let __t0;
        if ((((param) > (0)) ? 1 : 0)) {
            ((__L1 ?? globalThis.mamekitMissingCall?.("screen().update_partial"))?.(((param) - (1))) ?? 0);
        }
        param = ((((param) + (64))) | 0);
        if (((Number(param) >= Number((__t0 = __deref_force_update(runtime, ((__L2 ?? globalThis.mamekitMissingCall?.("screen().visible_area"))?.() ?? 0)), typeof __t0.bottom === 'function' ? (__t0.bottom() ?? 0) : runtime.container(((__L2 ?? globalThis.mamekitMissingCall?.("screen().visible_area"))?.() ?? 0), "bottom")))) ? 1 : 0)) {
            param = ((0) | 0);
        }
        (__deref_force_update(runtime, members.m_force_update_timer).adjust?.(((__L3 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(param) ?? 0), param) ?? 0);
    }
    function __deref_force_update(runtime, p) {
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
    function method_set_gfxdecode(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_gfxdecode.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_gfxdecode)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_set_config(runtime, config) {
        const members = runtime.members;
        {
            const __base = config;
            members.m_gfxindex = ((__base.m_gfxindex) & 0xff);
            members.m_bankcount = ((__base.m_bankcount) & 0xff);
            members.m_linked = ((__base.m_linked) ? 1 : 0);
            members.m_split = ((__base.m_split) ? 1 : 0);
            members.m_reverse = ((__base.m_reverse) ? 1 : 0);
            members.m_swapxy = ((__base.m_swapxy) ? 1 : 0);
            members.m_nextneighbor = ((__base.m_nextneighbor) ? 1 : 0);
            members.m_slipheight = ((__base.m_slipheight) & 0xffff);
            members.m_slipoffset = ((__base.m_slipoffset) & 0xff);
            members.m_maxperline = ((__base.m_maxperline) & 0xffff);
            members.m_palettebase = ((__base.m_palettebase) & 0xffff);
            members.m_transpen = ((__base.m_transpen) & 0xff);
            runtime.copyStruct(members.m_link_entry, __base.m_link_entry);
            members.m_code_entry = __base.m_code_entry;
            members.m_color_entry = __base.m_color_entry;
            runtime.copyStruct(members.m_xpos_entry, __base.m_xpos_entry);
            runtime.copyStruct(members.m_ypos_entry, __base.m_ypos_entry);
            runtime.copyStruct(members.m_width_entry, __base.m_width_entry);
            runtime.copyStruct(members.m_height_entry, __base.m_height_entry);
            runtime.copyStruct(members.m_hflip_entry, __base.m_hflip_entry);
            runtime.copyStruct(members.m_vflip_entry, __base.m_vflip_entry);
            runtime.copyStruct(members.m_priority_entry, __base.m_priority_entry);
            runtime.copyStruct(members.m_neighbor_entry, __base.m_neighbor_entry);
            runtime.copyStruct(members.m_absolute_entry, __base.m_absolute_entry);
            runtime.copyStruct(members.m_special_entry, __base.m_special_entry);
            members.m_specialvalue = ((__base.m_specialvalue) & 0xffff);
        }
    }
    function method_set_xoffset(runtime, xoffset) {
        const members = runtime.members;
        members.m_xoffset = ((xoffset) | 0);
    }
    function method_bank(runtime) {
        const members = runtime.members;
        return (((members.m_bank ?? 0)) | 0);
    }
    function method_xscroll(runtime) {
        const members = runtime.members;
        return (((members.m_xscroll ?? 0)) | 0);
    }
    function method_yscroll(runtime) {
        const members = runtime.members;
        return (((members.m_yscroll ?? 0)) | 0);
    }
    function method_code_lookup(runtime) {
        const members = runtime.members;
        return (members.m_codelookup ?? 0);
    }
    function method_color_lookup(runtime) {
        const members = runtime.members;
        return (members.m_colorlookup ?? 0);
    }
    function method_gfx_lookup(runtime) {
        const members = runtime.members;
        return (members.m_gfxlookup ?? 0);
    }
    function method_set_bank(runtime, bank) {
        const members = runtime.members;
        members.m_bank = ((bank) >>> 0);
    }
    function method_set_xscroll(runtime, xscroll) {
        const members = runtime.members;
        members.m_xscroll = ((((xscroll) & ((members.m_bitmapxmask ?? 0)))) >>> 0);
    }
    function method_set_yscroll(runtime, yscroll) {
        const members = runtime.members;
        members.m_yscroll = ((((yscroll) & ((members.m_bitmapymask ?? 0)))) >>> 0);
    }
    function method_set_slipram(runtime, ram) {
        const members = runtime.members;
        members.m_slipram = runtime.packedView(ram, false);
    }
    function method_slipram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_slipram ?? 0), offset);
    }
    function method_atari_motion_objects_device__set_gfxdecode(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_gfxdecode.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_gfxdecode)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_atari_motion_objects_device__set_config(runtime, config) {
        const members = runtime.members;
        {
            const __base = config;
            members.m_gfxindex = ((__base.m_gfxindex) & 0xff);
            members.m_bankcount = ((__base.m_bankcount) & 0xff);
            members.m_linked = ((__base.m_linked) ? 1 : 0);
            members.m_split = ((__base.m_split) ? 1 : 0);
            members.m_reverse = ((__base.m_reverse) ? 1 : 0);
            members.m_swapxy = ((__base.m_swapxy) ? 1 : 0);
            members.m_nextneighbor = ((__base.m_nextneighbor) ? 1 : 0);
            members.m_slipheight = ((__base.m_slipheight) & 0xffff);
            members.m_slipoffset = ((__base.m_slipoffset) & 0xff);
            members.m_maxperline = ((__base.m_maxperline) & 0xffff);
            members.m_palettebase = ((__base.m_palettebase) & 0xffff);
            members.m_transpen = ((__base.m_transpen) & 0xff);
            runtime.copyStruct(members.m_link_entry, __base.m_link_entry);
            members.m_code_entry = __base.m_code_entry;
            members.m_color_entry = __base.m_color_entry;
            runtime.copyStruct(members.m_xpos_entry, __base.m_xpos_entry);
            runtime.copyStruct(members.m_ypos_entry, __base.m_ypos_entry);
            runtime.copyStruct(members.m_width_entry, __base.m_width_entry);
            runtime.copyStruct(members.m_height_entry, __base.m_height_entry);
            runtime.copyStruct(members.m_hflip_entry, __base.m_hflip_entry);
            runtime.copyStruct(members.m_vflip_entry, __base.m_vflip_entry);
            runtime.copyStruct(members.m_priority_entry, __base.m_priority_entry);
            runtime.copyStruct(members.m_neighbor_entry, __base.m_neighbor_entry);
            runtime.copyStruct(members.m_absolute_entry, __base.m_absolute_entry);
            runtime.copyStruct(members.m_special_entry, __base.m_special_entry);
            members.m_specialvalue = ((__base.m_specialvalue) & 0xffff);
        }
    }
    function method_atari_motion_objects_device__set_xoffset(runtime, xoffset) {
        const members = runtime.members;
        members.m_xoffset = ((xoffset) | 0);
    }
    function method_atari_motion_objects_device__bank(runtime) {
        const members = runtime.members;
        return (((members.m_bank ?? 0)) | 0);
    }
    function method_atari_motion_objects_device__xscroll(runtime) {
        const members = runtime.members;
        return (((members.m_xscroll ?? 0)) | 0);
    }
    function method_atari_motion_objects_device__yscroll(runtime) {
        const members = runtime.members;
        return (((members.m_yscroll ?? 0)) | 0);
    }
    function method_atari_motion_objects_device__code_lookup(runtime) {
        const members = runtime.members;
        return (members.m_codelookup ?? 0);
    }
    function method_atari_motion_objects_device__color_lookup(runtime) {
        const members = runtime.members;
        return (members.m_colorlookup ?? 0);
    }
    function method_atari_motion_objects_device__gfx_lookup(runtime) {
        const members = runtime.members;
        return (members.m_gfxlookup ?? 0);
    }
    function method_atari_motion_objects_device__set_bank(runtime, bank) {
        const members = runtime.members;
        members.m_bank = ((bank) >>> 0);
    }
    function method_atari_motion_objects_device__set_xscroll(runtime, xscroll) {
        const members = runtime.members;
        members.m_xscroll = ((((xscroll) & ((members.m_bitmapxmask ?? 0)))) >>> 0);
    }
    function method_atari_motion_objects_device__set_yscroll(runtime, yscroll) {
        const members = runtime.members;
        members.m_yscroll = ((((yscroll) & ((members.m_bitmapymask ?? 0)))) >>> 0);
    }
    function method_atari_motion_objects_device__set_slipram(runtime, ram) {
        const members = runtime.members;
        members.m_slipram = runtime.packedView(ram, false);
    }
    function method_atari_motion_objects_device__slipram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_slipram ?? 0), offset);
    }
    function method_slipram_(runtime, offset, __assigned) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_slipram"), offset, ((__assigned) & 0xffff));
        return runtime.readIndex((members.m_slipram ?? 0), offset);
    }
    function method_atari_motion_objects_device__slipram_(runtime, offset, __assigned) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_slipram"), offset, ((__assigned) & 0xffff));
        return runtime.readIndex((members.m_slipram ?? 0), offset);
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
        "build_active_list": method_build_active_list,
        "render_object": method_render_object,
        "mark_dirty__4": method_mark_dirty__4,
        "device_start": method_device_start,
        "sprite_device::device_start": method_sprite_device__device_start,
        "set_spriteram": method_set_spriteram,
        "compute_log": method_compute_log,
        "round_to_powerof2": method_round_to_powerof2,
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
        "apply_stain": method_apply_stain,
        "force_update": method_force_update,
        "set_gfxdecode": method_set_gfxdecode,
        "set_config": method_set_config,
        "set_xoffset": method_set_xoffset,
        "bank": method_bank,
        "xscroll": method_xscroll,
        "yscroll": method_yscroll,
        "code_lookup": method_code_lookup,
        "color_lookup": method_color_lookup,
        "gfx_lookup": method_gfx_lookup,
        "set_bank": method_set_bank,
        "set_xscroll": method_set_xscroll,
        "set_yscroll": method_set_yscroll,
        "set_slipram": method_set_slipram,
        "slipram": method_slipram,
        "atari_motion_objects_device::set_gfxdecode": method_atari_motion_objects_device__set_gfxdecode,
        "atari_motion_objects_device::set_config": method_atari_motion_objects_device__set_config,
        "atari_motion_objects_device::set_xoffset": method_atari_motion_objects_device__set_xoffset,
        "atari_motion_objects_device::bank": method_atari_motion_objects_device__bank,
        "atari_motion_objects_device::xscroll": method_atari_motion_objects_device__xscroll,
        "atari_motion_objects_device::yscroll": method_atari_motion_objects_device__yscroll,
        "atari_motion_objects_device::code_lookup": method_atari_motion_objects_device__code_lookup,
        "atari_motion_objects_device::color_lookup": method_atari_motion_objects_device__color_lookup,
        "atari_motion_objects_device::gfx_lookup": method_atari_motion_objects_device__gfx_lookup,
        "atari_motion_objects_device::set_bank": method_atari_motion_objects_device__set_bank,
        "atari_motion_objects_device::set_xscroll": method_atari_motion_objects_device__set_xscroll,
        "atari_motion_objects_device::set_yscroll": method_atari_motion_objects_device__set_yscroll,
        "atari_motion_objects_device::set_slipram": method_atari_motion_objects_device__set_slipram,
        "atari_motion_objects_device::slipram": method_atari_motion_objects_device__slipram,
        "slipram=": method_slipram_,
        "atari_motion_objects_device::slipram=": method_atari_motion_objects_device__slipram_,
        "iterate_dirty_rects__1": method_iterate_dirty_rects__1,
        "iterate_dirty_rects__2": method_iterate_dirty_rects__2,
        "clear__1__lambda0": method_clear__1__lambda0
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "__throw", "bitmap_ind16", "emu_fatalerror", "m_gfxdecode.gfx", "m_gfxdecode.set_tag", "owner", "owner().memshare", "save_item", "screen", "screen().time_until_pos", "screen().update_partial", "screen().visible_area", "std::forward", "tag"];
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
        "__construct": method___construct,
        "dirty__1": method_dirty__1,
        "clean__1": method_clean__1,
        "iterate_dirty_rects__1": method_iterate_dirty_rects__1
    };
    return __methodTable;
})();
definition.allocations["sparse_dirty_bitmap"].compiledMethodLinks = ["rectangle", "std::forward"];
definition.allocations["sprite_parameter"].compiledMethods = (() => {
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
    function method_extract(runtime, data) {
        const members = runtime.members;
        return ((((runtime.shiftRight(runtime.readIndex(data, (members.m_word ?? 0)), (members.m_shift ?? 0))) & ((members.m_mask ?? 0)))) & 0xffff);
    }
    function method_shift(runtime) {
        const members = runtime.members;
        return (((members.m_shift ?? 0)) & 0xffff);
    }
    function method_mask(runtime) {
        const members = runtime.members;
        return (((members.m_mask ?? 0)) & 0xffff);
    }
    function method_atari_motion_objects_device__sprite_parameter__set(runtime, input) {
        const members = runtime.members;
        return runtime.invoke("set", input.data);
    }
    function method_atari_motion_objects_device__sprite_parameter__extract(runtime, data) {
        const members = runtime.members;
        return ((((runtime.shiftRight(runtime.readIndex(data, (members.m_word ?? 0)), (members.m_shift ?? 0))) & ((members.m_mask ?? 0)))) & 0xffff);
    }
    function method_atari_motion_objects_device__sprite_parameter__shift(runtime) {
        const members = runtime.members;
        return (((members.m_shift ?? 0)) & 0xffff);
    }
    function method_atari_motion_objects_device__sprite_parameter__mask(runtime) {
        const members = runtime.members;
        return (((members.m_mask ?? 0)) & 0xffff);
    }
    function method___construct(runtime) {
        const members = runtime.members;
        members.m_word = ((0) & 0xffff);
        members.m_shift = ((0) & 0xffff);
        members.m_mask = ((0) & 0xffff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "extract": method_extract,
        "shift": method_shift,
        "mask": method_mask,
        "atari_motion_objects_device::sprite_parameter::set": method_atari_motion_objects_device__sprite_parameter__set,
        "atari_motion_objects_device::sprite_parameter::extract": method_atari_motion_objects_device__sprite_parameter__extract,
        "atari_motion_objects_device::sprite_parameter::shift": method_atari_motion_objects_device__sprite_parameter__shift,
        "atari_motion_objects_device::sprite_parameter::mask": method_atari_motion_objects_device__sprite_parameter__mask,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["dual_sprite_parameter"].compiledMethods = (() => {
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
    function method_set(runtime, input) {
        const members = runtime.members;
        let __t0;
        if ((((__deref_set(runtime, members.m_lower).set?.(input.data_lower) ?? 0)) ? 0 : 1)) {
            return 0;
        }
        if ((((__deref_set(runtime, members.m_upper).set?.(input.data_upper) ?? 0)) ? 0 : 1)) {
            return 0;
        }
        let temp = (((__t0 = __deref_set(runtime, members.m_lower), typeof __t0.mask === 'function' ? __t0.mask() : typeof __t0.mask === 'number' || typeof __t0.mask === 'boolean' ? __t0.mask : runtime.container(members.m_lower, "mask"))) & 0xffff);
        members.m_uppershift = ((0) & 0xffff);
        while ((((temp) !== (0)) ? 1 : 0)) {
            members.m_uppershift = ((((members.m_uppershift) + (1))) & 0xffff);
            temp = ((((temp) >>> (1))) & 0xffff);
        }
        return 1;
    }
    function __deref_set(runtime, p) {
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
    function method_extract(runtime, data) {
        const members = runtime.members;
        return (((((__deref_extract(runtime, members.m_lower).extract?.(data) ?? 0)) | ((((__deref_extract(runtime, members.m_upper).extract?.(data) ?? 0)) << ((members.m_uppershift ?? 0)))))) >>> 0);
    }
    function __deref_extract(runtime, p) {
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
    function method_mask(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        return (((((__t0 = __deref_mask(runtime, members.m_lower), typeof __t0.mask === 'function' ? __t0.mask() : typeof __t0.mask === 'number' || typeof __t0.mask === 'boolean' ? __t0.mask : runtime.container(members.m_lower, "mask"))) | ((((__t1 = __deref_mask(runtime, members.m_upper), typeof __t1.mask === 'function' ? __t1.mask() : typeof __t1.mask === 'number' || typeof __t1.mask === 'boolean' ? __t1.mask : runtime.container(members.m_upper, "mask"))) << ((members.m_uppershift ?? 0)))))) >>> 0);
    }
    function __deref_mask(runtime, p) {
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
    function method_atari_motion_objects_device__dual_sprite_parameter__extract(runtime, data) {
        const members = runtime.members;
        return (((((__deref_atari_motion_objects_device__dual_sprite_parameter__extract(runtime, members.m_lower).extract?.(data) ?? 0)) | ((((__deref_atari_motion_objects_device__dual_sprite_parameter__extract(runtime, members.m_upper).extract?.(data) ?? 0)) << ((members.m_uppershift ?? 0)))))) >>> 0);
    }
    function __deref_atari_motion_objects_device__dual_sprite_parameter__extract(runtime, p) {
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
    function method_atari_motion_objects_device__dual_sprite_parameter__mask(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        return (((((__t0 = __deref_atari_motion_objects_device__dual_sprite_parameter__mask(runtime, members.m_lower), typeof __t0.mask === 'function' ? __t0.mask() : typeof __t0.mask === 'number' || typeof __t0.mask === 'boolean' ? __t0.mask : runtime.container(members.m_lower, "mask"))) | ((((__t1 = __deref_atari_motion_objects_device__dual_sprite_parameter__mask(runtime, members.m_upper), typeof __t1.mask === 'function' ? __t1.mask() : typeof __t1.mask === 'number' || typeof __t1.mask === 'boolean' ? __t1.mask : runtime.container(members.m_upper, "mask"))) << ((members.m_uppershift ?? 0)))))) >>> 0);
    }
    function __deref_atari_motion_objects_device__dual_sprite_parameter__mask(runtime, p) {
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
    function method___construct(runtime) {
        const members = runtime.members;
        members.m_uppershift = ((0) & 0xffff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set": method_set,
        "extract": method_extract,
        "mask": method_mask,
        "atari_motion_objects_device::dual_sprite_parameter::extract": method_atari_motion_objects_device__dual_sprite_parameter__extract,
        "atari_motion_objects_device::dual_sprite_parameter::mask": method_atari_motion_objects_device__dual_sprite_parameter__mask,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["dual_sprite_parameter"].allocations["sprite_parameter"].compiledMethods = (() => {
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
    function method_extract(runtime, data) {
        const members = runtime.members;
        return ((((runtime.shiftRight(runtime.readIndex(data, (members.m_word ?? 0)), (members.m_shift ?? 0))) & ((members.m_mask ?? 0)))) & 0xffff);
    }
    function method_shift(runtime) {
        const members = runtime.members;
        return (((members.m_shift ?? 0)) & 0xffff);
    }
    function method_mask(runtime) {
        const members = runtime.members;
        return (((members.m_mask ?? 0)) & 0xffff);
    }
    function method_atari_motion_objects_device__sprite_parameter__set(runtime, input) {
        const members = runtime.members;
        return runtime.invoke("set", input.data);
    }
    function method_atari_motion_objects_device__sprite_parameter__extract(runtime, data) {
        const members = runtime.members;
        return ((((runtime.shiftRight(runtime.readIndex(data, (members.m_word ?? 0)), (members.m_shift ?? 0))) & ((members.m_mask ?? 0)))) & 0xffff);
    }
    function method_atari_motion_objects_device__sprite_parameter__shift(runtime) {
        const members = runtime.members;
        return (((members.m_shift ?? 0)) & 0xffff);
    }
    function method_atari_motion_objects_device__sprite_parameter__mask(runtime) {
        const members = runtime.members;
        return (((members.m_mask ?? 0)) & 0xffff);
    }
    function method___construct(runtime) {
        const members = runtime.members;
        members.m_word = ((0) & 0xffff);
        members.m_shift = ((0) & 0xffff);
        members.m_mask = ((0) & 0xffff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "extract": method_extract,
        "shift": method_shift,
        "mask": method_mask,
        "atari_motion_objects_device::sprite_parameter::set": method_atari_motion_objects_device__sprite_parameter__set,
        "atari_motion_objects_device::sprite_parameter::extract": method_atari_motion_objects_device__sprite_parameter__extract,
        "atari_motion_objects_device::sprite_parameter::shift": method_atari_motion_objects_device__sprite_parameter__shift,
        "atari_motion_objects_device::sprite_parameter::mask": method_atari_motion_objects_device__sprite_parameter__mask,
        "__construct": method___construct
    };
    return __methodTable;
})();
export const device = definition;
export default device;
