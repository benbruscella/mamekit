import deviceData from './williams_blitter_sc1.device.ir.json' with { type: 'json' };
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
        const __L0 = __l["NAME"], __L1 = __l["save_item"];
        let __t0, __t1;
        if ((((members.__static_device_start_dummy_table__initialised ?? 0)) ? 0 : 1)) {
            members.__static_device_start_dummy_table = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            members.__static_device_start_dummy_table__initialised = 1;
        }
        let dummy_table = (members.__static_device_start_dummy_table ?? 0);
        members.m_window_enable = ((0) & 0xff);
        members.m_remap = (members.m_remap_lookup ?? 0);
        for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let table = (((__t0 = __deref_device_start(runtime, members.m_proms), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_proms, "found"))) ? (__addr_device_start(runtime, (members.m_proms ?? 0), ((((i) & (127))) * (16)))) : (dummy_table));
            let table$s = undefined, table$o = 0;
            if (ArrayBuffer.isView(table) || Array.isArray(table))
                table$s = table;
            else if (table !== null && typeof table === 'object' && table.generatedPointer === true && table.path === undefined && table.target === undefined && (ArrayBuffer.isView(table.source) || Array.isArray(table.source))) {
                table$s = table.source;
                table$o = table.offset;
            }
            for (let j = ((0) | 0); (((j) < (256)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                ((__t1 = members.m_remap_lookup) && ArrayBuffer.isView(__t1) ? (__t1[((((i) * (256))) + (j))] = (((((table$s !== undefined ? (table$s[table$o + (runtime.shiftRight(j, 4))] ?? 0) : runtime.readIndex(table, runtime.shiftRight(j, 4)))) << (4))) | ((table$s !== undefined ? (table$s[table$o + (((j) & (15)))] ?? 0) : runtime.readIndex(table, ((j) & (15))))))) : runtime.writeIndex(runtime.writableMember("m_remap_lookup"), ((((i) * (256))) + (j)), (((((table$s !== undefined ? (table$s[table$o + (runtime.shiftRight(j, 4))] ?? 0) : runtime.readIndex(table, runtime.shiftRight(j, 4)))) << (4))) | ((table$s !== undefined ? (table$s[table$o + (((j) & (15)))] ?? 0) : runtime.readIndex(table, ((j) & (15))))))));
            }
        }
        (__L1 ? __L1((__L0 ? __L0((members.m_window_enable ?? 0)) : runtime.macro("NAME", (members.m_window_enable ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_window_enable ?? 0)) : runtime.macro("NAME", (members.m_window_enable ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_control ?? 0)) : runtime.macro("NAME", (members.m_control ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_control ?? 0)) : runtime.macro("NAME", (members.m_control ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_no_even ?? 0)) : runtime.macro("NAME", (members.m_no_even ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_no_even ?? 0)) : runtime.macro("NAME", (members.m_no_even ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_no_odd ?? 0)) : runtime.macro("NAME", (members.m_no_odd ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_no_odd ?? 0)) : runtime.macro("NAME", (members.m_no_odd ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_solid ?? 0)) : runtime.macro("NAME", (members.m_solid ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_solid ?? 0)) : runtime.macro("NAME", (members.m_solid ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_fg_only ?? 0)) : runtime.macro("NAME", (members.m_fg_only ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_fg_only ?? 0)) : runtime.macro("NAME", (members.m_fg_only ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_solid_color ?? 0)) : runtime.macro("NAME", (members.m_solid_color ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_solid_color ?? 0)) : runtime.macro("NAME", (members.m_solid_color ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_sstart ?? 0)) : runtime.macro("NAME", (members.m_sstart ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_sstart ?? 0)) : runtime.macro("NAME", (members.m_sstart ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_dstart ?? 0)) : runtime.macro("NAME", (members.m_dstart ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_dstart ?? 0)) : runtime.macro("NAME", (members.m_dstart ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_width ?? 0)) : runtime.macro("NAME", (members.m_width ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_width ?? 0)) : runtime.macro("NAME", (members.m_width ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_height ?? 0)) : runtime.macro("NAME", (members.m_height ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_height ?? 0)) : runtime.macro("NAME", (members.m_height ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_remap_index ?? 0)) : runtime.macro("NAME", (members.m_remap_index ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_remap_index ?? 0)) : runtime.macro("NAME", (members.m_remap_index ?? 0)))));
    }
    function __addr_device_start(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
    function method_control_w(runtime, space, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cpu.adjust_icount"];
        data = ((data) & 0xff);
        members.m_control = ((data) & 0xff);
        members.m_no_even = (((((data) >>> (7)) & 1)) ? 1 : 0);
        members.m_no_odd = (((((data) >>> (6)) & 1)) ? 1 : 0);
        members.m_solid = (((((data) >>> (4)) & 1)) ? 1 : 0);
        members.m_fg_only = (((((data) >>> (3)) & 1)) ? 1 : 0);
        let w = (((((members.m_width ?? 0)) ^ ((members.m_size_xor ?? 0)))) | 0);
        let h = (((((members.m_height ?? 0)) ^ ((members.m_size_xor ?? 0)))) | 0);
        if ((((w) === (0)) ? 1 : 0)) {
            w = ((1) | 0);
        }
        if ((((h) === (0)) ? 1 : 0)) {
            h = ((1) | 0);
        }
        let accesses = ((method_blit_core(runtime, space, w, h)) | 0);
        let estimated_clocks_at_4MHz = ((4) | 0);
        if (((((members.m_control ?? 0)) >>> (2)) & 1)) {
            estimated_clocks_at_4MHz = ((((estimated_clocks_at_4MHz) + (((4) * (((accesses) + (2))))))) | 0);
        }
        else {
            estimated_clocks_at_4MHz = ((((estimated_clocks_at_4MHz) + (((2) * (((accesses) + (3))))))) | 0);
        }
        (__L0 ? __L0((-runtime.divide(((estimated_clocks_at_4MHz) + (3)), 4))) : ((members.m_cpu)?.adjust_icount?.((-runtime.divide(((estimated_clocks_at_4MHz) + (3)), 4))) ?? 0));
        0;
    }
    function method_blit_core(runtime, space, w, h) {
        const members = runtime.members;
        let dst_stride_256 = ((((((members.m_control ?? 0)) >>> (1)) & 1)) ? 1 : 0);
        let src_stride_256 = ((((((members.m_control ?? 0)) >>> (0)) & 1)) ? 1 : 0);
        let sxadv = ((((src_stride_256) ? (256) : (1))) | 0);
        let syadv = ((((src_stride_256) ? (1) : (w))) | 0);
        let dxadv = ((((dst_stride_256) ? (256) : (1))) | 0);
        let dyadv = ((((dst_stride_256) ? (1) : (w))) | 0);
        let accesses = ((0) | 0);
        let pixdata = ((0) | 0);
        let shift = ((((((members.m_control ?? 0)) >>> (5)) & 1)) ? 1 : 0);
        let sstart = (((members.m_sstart ?? 0)) & 0xffff);
        let dstart = (((members.m_dstart ?? 0)) & 0xffff);
        for (let y = ((0) | 0); (((y) < (h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            let source = ((sstart) & 0xffff);
            let dest = ((dstart) & 0xffff);
            for (let x = ((0) | 0); (((x) < (w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                let rawval = ((runtime.readIndex((members.m_remap ?? 0), (__deref_blit_core(runtime, space).read_byte?.(source) ?? 0))) & 0xff);
                if (shift) {
                    pixdata = ((((((pixdata) << (8))) | (rawval))) | 0);
                    method_blit_pixel(runtime, space, dest, ((runtime.shiftRight(pixdata, 4)) & (255)));
                }
                else {
                    method_blit_pixel(runtime, space, dest, rawval);
                }
                accesses = ((((accesses) + (2))) | 0);
                source = ((((source) + (sxadv))) & 0xffff);
                dest = ((((dest) + (dxadv))) & 0xffff);
            }
            if (dst_stride_256) {
                dstart = ((((((dstart) & (65280))) | (((((dstart) + (dyadv))) & (255))))) & 0xffff);
            }
            else {
                dstart = ((((dstart) + (dyadv))) & 0xffff);
            }
            if (src_stride_256) {
                sstart = ((((((sstart) & (65280))) | (((((sstart) + (syadv))) & (255))))) & 0xffff);
            }
            else {
                sstart = ((((sstart) + (syadv))) & 0xffff);
            }
        }
        return ((accesses) | 0);
    }
    function __deref_blit_core(runtime, p) {
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
    function method_blit_pixel(runtime, space, dstaddr, srcdata) {
        const members = runtime.members;
        const h_m_vram = members.m_vram ?? 0;
        let curpix = (((((((dstaddr) < (49152)) ? 1 : 0)) ? (runtime.readIndex(h_m_vram, dstaddr)) : ((__deref_blit_pixel(runtime, space).read_byte?.(dstaddr) ?? 0)))) | 0);
        let keepmask = ((255) & 0xff);
        if (((((members.m_fg_only ?? 0)) && (((((srcdata) & (240))) ? 0 : 1))) ? 1 : 0)) {
            if ((members.m_no_even ?? 0)) {
                keepmask = ((((keepmask) & (15))) & 0xff);
            }
        }
        else {
            if ((((members.m_no_even ?? 0)) ? 0 : 1)) {
                keepmask = ((((keepmask) & (15))) & 0xff);
            }
        }
        if (((((members.m_fg_only ?? 0)) && (((((srcdata) & (15))) ? 0 : 1))) ? 1 : 0)) {
            if ((members.m_no_odd ?? 0)) {
                keepmask = ((((keepmask) & (240))) & 0xff);
            }
        }
        else {
            if ((((members.m_no_odd ?? 0)) ? 0 : 1)) {
                keepmask = ((((keepmask) & (240))) & 0xff);
            }
        }
        curpix = ((((curpix) & (keepmask))) | 0);
        if ((members.m_solid ?? 0)) {
            curpix = ((((curpix) | ((((members.m_solid_color ?? 0)) & ((~keepmask)))))) | 0);
        }
        else {
            curpix = ((((curpix) | (((srcdata) & ((~keepmask)))))) | 0);
        }
        if ((((((((((members.m_window_enable ?? 0)) ? 0 : 1)) || ((((dstaddr) < ((members.m_clip_address ?? 0))) ? 1 : 0))) ? 1 : 0)) || ((((dstaddr) >= (49152)) ? 1 : 0))) ? 1 : 0)) {
            (__deref_blit_pixel(runtime, space).write_byte?.(dstaddr, curpix) ?? 0);
        }
    }
    function __deref_blit_pixel(runtime, p) {
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
    function method_window_enable_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_window_enable = (((((data) >>> (0)) & 1)) & 0xff);
    }
    function method_set_cpu_tag(runtime, cpu_tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_cpu.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(cpu_tag) : runtime.macro("std::forward", cpu_tag))) : ((members.m_cpu)?.set_tag?.((__L0 ? __L0(cpu_tag) : runtime.macro("std::forward", cpu_tag))) ?? 0));
    }
    function method_set_vram_tag(runtime, vram_tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_vram.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(vram_tag) : runtime.macro("std::forward", vram_tag))) : ((members.m_vram)?.set_tag?.((__L0 ? __L0(vram_tag) : runtime.macro("std::forward", vram_tag))) ?? 0));
    }
    function method_set_proms_tag(runtime, proms_tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        (__deref_set_proms_tag(runtime, members.m_proms).set_tag?.((__L0 ? __L0(proms_tag) : runtime.macro("std::forward", proms_tag))) ?? 0);
    }
    function __deref_set_proms_tag(runtime, p) {
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
    function method_set_clip_address(runtime, clip_address) {
        const members = runtime.members;
        clip_address = ((clip_address) & 0xffff);
        members.m_clip_address = ((clip_address) & 0xffff);
    }
    function method_set_size_xor(runtime, size_xor) {
        const members = runtime.members;
        members.m_size_xor = ((size_xor) & 0xff);
    }
    function method_williams_blitter_device__set_cpu_tag(runtime, cpu_tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_cpu.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(cpu_tag) : runtime.macro("std::forward", cpu_tag))) : ((members.m_cpu)?.set_tag?.((__L0 ? __L0(cpu_tag) : runtime.macro("std::forward", cpu_tag))) ?? 0));
    }
    function method_williams_blitter_device__set_vram_tag(runtime, vram_tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_vram.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(vram_tag) : runtime.macro("std::forward", vram_tag))) : ((members.m_vram)?.set_tag?.((__L0 ? __L0(vram_tag) : runtime.macro("std::forward", vram_tag))) ?? 0));
    }
    function method_williams_blitter_device__set_proms_tag(runtime, proms_tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        (__deref_williams_blitter_device__set_proms_tag(runtime, members.m_proms).set_tag?.((__L0 ? __L0(proms_tag) : runtime.macro("std::forward", proms_tag))) ?? 0);
    }
    function __deref_williams_blitter_device__set_proms_tag(runtime, p) {
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
    function method_williams_blitter_device__set_clip_address(runtime, clip_address) {
        const members = runtime.members;
        clip_address = ((clip_address) & 0xffff);
        members.m_clip_address = ((clip_address) & 0xffff);
    }
    function method_williams_blitter_device__set_size_xor(runtime, size_xor) {
        const members = runtime.members;
        members.m_size_xor = ((size_xor) & 0xff);
    }
    function method___inline_map_1_lw8(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_solid_color = ((data) & 0xff);
    }
    function method___inline_map_2_lw8(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_sstart = (((((((members.m_sstart ?? 0)) & (255))) | (((((data) & 0xffff)) << (8))))) & 0xffff);
    }
    function method___inline_map_3_lw8(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_sstart = (((((((members.m_sstart ?? 0)) & (65280))) | (data))) & 0xffff);
    }
    function method___inline_map_4_lw8(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_dstart = (((((((members.m_dstart ?? 0)) & (255))) | (((((data) & 0xffff)) << (8))))) & 0xffff);
    }
    function method___inline_map_5_lw8(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_dstart = (((((((members.m_dstart ?? 0)) & (65280))) | (data))) & 0xffff);
    }
    function method___inline_map_6_lw8(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_width = ((data) & 0xff);
    }
    function method___inline_map_7_lw8(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_height = ((data) & 0xff);
    }
    function method_map__lambda0(runtime, data) {
        const members = runtime.members;
        members.m_solid_color = ((data) & 0xff);
    }
    function method_map__lambda1(runtime, data) {
        const members = runtime.members;
        members.m_sstart = (((((((members.m_sstart ?? 0)) & (255))) | (((((data) & 0xffff)) << (8))))) & 0xffff);
    }
    function method_map__lambda2(runtime, data) {
        const members = runtime.members;
        members.m_sstart = (((((((members.m_sstart ?? 0)) & (65280))) | (data))) & 0xffff);
    }
    function method_map__lambda3(runtime, data) {
        const members = runtime.members;
        members.m_dstart = (((((((members.m_dstart ?? 0)) & (255))) | (((((data) & 0xffff)) << (8))))) & 0xffff);
    }
    function method_map__lambda4(runtime, data) {
        const members = runtime.members;
        members.m_dstart = (((((((members.m_dstart ?? 0)) & (65280))) | (data))) & 0xffff);
    }
    function method_map__lambda5(runtime, data) {
        const members = runtime.members;
        members.m_width = ((data) & 0xff);
    }
    function method_map__lambda6(runtime, data) {
        const members = runtime.members;
        members.m_height = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "control_w": method_control_w,
        "blit_core": method_blit_core,
        "blit_pixel": method_blit_pixel,
        "window_enable_w": method_window_enable_w,
        "set_cpu_tag": method_set_cpu_tag,
        "set_vram_tag": method_set_vram_tag,
        "set_proms_tag": method_set_proms_tag,
        "set_clip_address": method_set_clip_address,
        "set_size_xor": method_set_size_xor,
        "williams_blitter_device::set_cpu_tag": method_williams_blitter_device__set_cpu_tag,
        "williams_blitter_device::set_vram_tag": method_williams_blitter_device__set_vram_tag,
        "williams_blitter_device::set_proms_tag": method_williams_blitter_device__set_proms_tag,
        "williams_blitter_device::set_clip_address": method_williams_blitter_device__set_clip_address,
        "williams_blitter_device::set_size_xor": method_williams_blitter_device__set_size_xor,
        "__inline_map_1_lw8": method___inline_map_1_lw8,
        "__inline_map_2_lw8": method___inline_map_2_lw8,
        "__inline_map_3_lw8": method___inline_map_3_lw8,
        "__inline_map_4_lw8": method___inline_map_4_lw8,
        "__inline_map_5_lw8": method___inline_map_5_lw8,
        "__inline_map_6_lw8": method___inline_map_6_lw8,
        "__inline_map_7_lw8": method___inline_map_7_lw8,
        "map__lambda0": method_map__lambda0,
        "map__lambda1": method_map__lambda1,
        "map__lambda2": method_map__lambda2,
        "map__lambda3": method_map__lambda3,
        "map__lambda4": method_map__lambda4,
        "map__lambda5": method_map__lambda5,
        "map__lambda6": method_map__lambda6
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "m_cpu.adjust_icount", "m_cpu.set_tag", "m_vram.set_tag", "save_item", "std::forward"];
export const device = definition;
export default device;
