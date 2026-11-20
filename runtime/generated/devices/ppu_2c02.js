import deviceData from './ppu_2c02.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0.5, 0.75, 1, 1, 0.29, 0.45, 0.73, 0.9, 0, 0.24, 0.47, 0.77];
    const __mame_table_1 = [1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75];
    function method_readbyte(runtime, address) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["space"], __L1 = __l["space().read_byte"];
        return ((((__L1 ?? globalThis.mamekitMissingCall?.("space().read_byte"))?.(address) ?? 0)) & 0xff);
    }
    function method_ppu_vram_direct_read(runtime, address) {
        const members = runtime.members;
        return ((method_readbyte(runtime, address)) & 0xff);
    }
    function method_init_palette_tables(runtime) {
        const members = runtime.members;
        let is_pal = ((((Number((members.m_scanlines_per_frame ?? 0)) !== Number(262)) ? 1 : 0)) ? 1 : 0);
        let entry = ((0) | 0);
        for (let color_emphasis = ((0) | 0); (((color_emphasis) < (8)) ? 1 : 0); color_emphasis = ((((color_emphasis) + (1))) | 0)) {
            for (let color_intensity = ((0) | 0); (((color_intensity) < (4)) ? 1 : 0); color_intensity = ((((color_intensity) + (1))) | 0)) {
                for (let color_num = ((0) | 0); (((color_num) < (16)) ? 1 : 0); color_num = ((((color_num) + (1))) | 0)) {
                    let col = method_nespal_to_RGB(runtime, color_intensity, color_num, color_emphasis, is_pal);
                    (runtime.palette[entry] = col);
                    entry = ((((entry) + (1))) | 0);
                }
            }
        }
    }
    function method_nespal_to_RGB(runtime, color_intensity, color_num, color_emphasis, is_pal_or_dendy) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["DEGREE_TO_RADIAN"], __L1 = __l["std::clamp"], __L2 = __l["rgb_t"];
        let tint = 0.22;
        let hue = 287;
        let Kr = 0.2989;
        let Kb = 0.1145;
        let Ku = 2.029;
        let Kv = 1.14;
        let sat = 0;
        let y = 0;
        let u = 0;
        let v = 0;
        let rad = 0;
        switch (color_num) {
            case 0:
                {
                    sat = 0;
                    rad = 0;
                    y = (__mame_table_0[(((((0) + (color_intensity))) % 12) + 12) % 12] ?? 0);
                    break;
                }
            case 13:
                {
                    sat = 0;
                    rad = 0;
                    y = (__mame_table_0[(((((8) + (color_intensity))) % 12) + 12) % 12] ?? 0);
                    break;
                }
            case 14:
            case 15:
                {
                    sat = 0;
                    rad = 0;
                    y = 0;
                    break;
                }
            default:
                {
                    sat = tint;
                    rad = (__L0 ? __L0(((((color_num) * (30))) + (hue))) : runtime.macro("DEGREE_TO_RADIAN", ((((color_num) * (30))) + (hue))));
                    y = (__mame_table_0[(((((4) + (color_intensity))) % 12) + 12) % 12] ?? 0);
                    break;
                }
        }
        u = ((sat) * (Math.cos(Number(rad))));
        v = ((sat) * (Math.sin(Number(rad))));
        let R = ((((y) + (((Kv) * (v))))) * (255));
        let G = ((((y) - (((__add_nespal_to_RGB(runtime, ((((Kb) * (Ku))) * (u)), ((((Kr) * (Kv))) * (v)))) / (((((1) - (Kb))) - (Kr))))))) * (255));
        let B = ((((y) + (((Ku) * (u))))) * (255));
        let __inline0_is_pal_or_dendy = is_pal_or_dendy;
        let __inline0_color_emphasis = color_emphasis;
        if (__inline0_is_pal_or_dendy) {
            __inline0_color_emphasis = ((((((__inline0_color_emphasis) >>> (2)) & 1) << 2 | (((__inline0_color_emphasis) >>> (0)) & 1) << 1 | (((__inline0_color_emphasis) >>> (1)) & 1) << 0)) | 0);
        }
        R = (__L1 ? __L1(((R) * ((__mame_table_1[(((__add_nespal_to_RGB(runtime, ((__inline0_color_emphasis) * (3)), 0)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((R) * ((__mame_table_1[(((__add_nespal_to_RGB(runtime, ((__inline0_color_emphasis) * (3)), 0)) % 24) + 24) % 24] ?? 0))), 0, 255));
        G = (__L1 ? __L1(((G) * ((__mame_table_1[(((__add_nespal_to_RGB(runtime, ((__inline0_color_emphasis) * (3)), 1)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((G) * ((__mame_table_1[(((__add_nespal_to_RGB(runtime, ((__inline0_color_emphasis) * (3)), 1)) % 24) + 24) % 24] ?? 0))), 0, 255));
        B = (__L1 ? __L1(((B) * ((__mame_table_1[(((__add_nespal_to_RGB(runtime, ((__inline0_color_emphasis) * (3)), 2)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((B) * ((__mame_table_1[(((__add_nespal_to_RGB(runtime, ((__inline0_color_emphasis) * (3)), 2)) % 24) + 24) % 24] ?? 0))), 0, 255));
        return (__L2 ? __L2(Math.floor(Number(((R) + (0.5)))), Math.floor(Number(((G) + (0.5)))), Math.floor(Number(((B) + (0.5))))) : runtime.macro("rgb_t", Math.floor(Number(((R) + (0.5)))), Math.floor(Number(((G) + (0.5)))), Math.floor(Number(((B) + (0.5))))));
    }
    function __add_nespal_to_RGB(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_draw_background(runtime, line_priority) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_latch.isnull"], __L1 = __l["m_latch"];
        const h_m_bitmap = members.m_bitmap ?? 0;
        const h_m_latch = members.m_latch ?? 0;
        const h_m_planebuf = members.m_planebuf ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        let scroll_x_coarse = (((((members.m_refresh_data ?? 0)) & (31))) & 0xff);
        let scroll_y_coarse = ((runtime.shiftRight((((members.m_refresh_data ?? 0)) & (992)), 5)) & 0xff);
        let nametable = (((((members.m_refresh_data ?? 0)) & (3072))) & 0xffff);
        let scroll_y_fine = ((runtime.shiftRight((((members.m_refresh_data ?? 0)) & (28672)), 12)) & 0xff);
        let x = ((scroll_x_coarse) | 0);
        let tile_index = ((__add_draw_background(runtime, ((nametable) | (8192)), ((scroll_y_coarse) * (32)))) | 0);
        let start_x = (((((((members.m_x_fine ?? 0)) ^ (7))) - (7))) | 0);
        let dest = h_m_bitmap["pix&"]((members.m_scanline ?? 0), start_x);
        members.m_tilecount = ((0) | 0);
        while (((((members.m_tilecount ?? 0)) < (34)) ? 1 : 0)) {
            let index1 = ((((tile_index) + (x))) | 0);
            let page2 = ((method_readbyte(runtime, index1)) | 0);
            let pos = ((((runtime.shiftRight(((index1) & (896)), 4)) | (runtime.shiftRight(((index1) & (31)), 2)))) | 0);
            let page = ((runtime.shiftRight(((index1) & (3072)), 10)) | 0);
            let address = ((((960) + (pos))) | 0);
            let color_byte = ((method_readbyte(runtime, __add_draw_background(runtime, ((((((page) * (1024))) + (address))) & (4095)), 8192))) | 0);
            let color_bits = ((__add_draw_background(runtime, runtime.shiftRight(((index1) & (64)), 4), ((index1) & (2)))) | 0);
            if ((((__L0 ? __L0() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
                (__L1 ? __L1((((((members.m_tile_page ?? 0)) << (10))) | (((page2) << (4))))) : runtime.macro("m_latch", (((((members.m_tile_page ?? 0)) << (10))) | (((page2) << (4))))));
            }
            if (((Number(start_x) < Number(256)) ? 1 : 0)) {
                address = ((__add_draw_background(runtime, (((members.m_tile_page ?? 0)) ? (4096) : (0)), ((page2) * (16)))) | 0);
                address = ((((address) + (scroll_y_fine))) | 0);
                let __inline2_line_priority = line_priority;
                let __inline2_color_byte = color_byte;
                let __inline2_color_bits = color_bits;
                let __inline2_address = address;
                let __inline2_start_x = start_x;
                let __inline2_back_pen = (members.m_back_color ?? 0);
                let __inline2_color = ((((runtime.shiftRight(__inline2_color_byte, __inline2_color_bits)) & (3))) | 0);
                method_read_tile_plane_data(runtime, __inline2_address, __inline2_color);
                for (let __inline2_i = ((0) | 0); (((__inline2_i) < (8)) ? 1 : 0); __inline2_i = ((((__inline2_i) + (1))) | 0)) {
                    let __inline2_pix = ((0) & 0xff);
                    __inline2_pix = (((((((h_m_planebuf[0]) >>> (7)) & 1)) | ((((((h_m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
                    h_m_planebuf[0] = ((h_m_planebuf[0]) << (1));
                    h_m_planebuf[1] = ((h_m_planebuf[1]) << (1));
                    if ((((((Number(((__inline2_start_x) + (__inline2_i))) >= Number(0)) ? 1 : 0)) && (((Number(((__inline2_start_x) + (__inline2_i))) < Number(256)) ? 1 : 0))) ? 1 : 0)) {
                        method_draw_tile_pixel(runtime, __inline2_pix, __inline2_color, __inline2_back_pen, dest);
                        if (__inline2_pix) {
                            runtime.writeIndex(__inline2_line_priority, ((__inline2_start_x) + (__inline2_i)), ((runtime.readIndex(__inline2_line_priority, ((__inline2_start_x) + (__inline2_i)))) | (2)));
                        }
                    }
                    dest = __add_draw_background(runtime, dest, 1);
                }
                start_x = ((((start_x) + (8))) | 0);
                x = ((((x) + (1))) | 0);
                if ((((x) > (31)) ? 1 : 0)) {
                    x = ((0) | 0);
                    tile_index = ((((tile_index) ^ (1024))) | 0);
                }
            }
            members.m_tilecount = ((((members.m_tilecount) + (1))) | 0);
        }
        if (((((h_m_regs[1]) & (2))) ? 0 : 1)) {
            dest = h_m_bitmap["pix&"]((members.m_scanline ?? 0));
            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                method_draw_back_pen(runtime, dest, (members.m_back_color ?? 0));
                dest = __add_draw_background(runtime, dest, 1);
                runtime.writeIndex(line_priority, i, ((runtime.readIndex(line_priority, i)) ^ (2)));
            }
        }
    }
    function __add_draw_background(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_read_tile_plane_data(runtime, address, color) {
        const members = runtime.members;
        const h_m_planebuf = members.m_planebuf ?? 0;
        h_m_planebuf[0] = method_readbyte(runtime, ((address) & (8191)));
        h_m_planebuf[1] = method_readbyte(runtime, ((((address) + (8))) & (8191)));
    }
    function method_draw_tile_pixel(runtime, pix, color, back_pen, dest) {
        const members = runtime.members;
        pix = ((pix) & 0xff);
        let palval = ((((pix) ? (runtime.readIndex((members.m_palette_ram ?? 0), ((((((4) * (color))) + (pix))) & (31)))) : (back_pen))) & 0xffff);
        runtime.pointerStore(dest, (runtime.palette[method_apply_grayscale_and_emphasis(runtime, palval)] ?? 0xff000000));
    }
    function method_apply_grayscale_and_emphasis(runtime, color) {
        const members = runtime.members;
        color = ((color) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        let palval = ((color) & 0xffff);
        palval = ((((palval) & (((((h_m_regs[1]) & (1))) ? (48) : (63))))) & 0xffff);
        palval = ((((palval) | (((((h_m_regs[1]) & (224))) << (1))))) & 0xffff);
        return ((palval) & 0xffff);
    }
    function method_draw_back_pen(runtime, dest, back_pen) {
        const members = runtime.members;
        runtime.pointerStore(dest, (runtime.palette[method_apply_grayscale_and_emphasis(runtime, back_pen)] ?? 0xff000000));
    }
    function method_ppu2c0x_device__draw_background(runtime, line_priority) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_latch.isnull"], __L1 = __l["m_latch"];
        const h_m_bitmap = members.m_bitmap ?? 0;
        const h_m_latch = members.m_latch ?? 0;
        const h_m_planebuf = members.m_planebuf ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        let scroll_x_coarse = (((((members.m_refresh_data ?? 0)) & (31))) & 0xff);
        let scroll_y_coarse = ((runtime.shiftRight((((members.m_refresh_data ?? 0)) & (992)), 5)) & 0xff);
        let nametable = (((((members.m_refresh_data ?? 0)) & (3072))) & 0xffff);
        let scroll_y_fine = ((runtime.shiftRight((((members.m_refresh_data ?? 0)) & (28672)), 12)) & 0xff);
        let x = ((scroll_x_coarse) | 0);
        let tile_index = ((__add_ppu2c0x_device__draw_background(runtime, ((nametable) | (8192)), ((scroll_y_coarse) * (32)))) | 0);
        let start_x = (((((((members.m_x_fine ?? 0)) ^ (7))) - (7))) | 0);
        let dest = h_m_bitmap["pix&"]((members.m_scanline ?? 0), start_x);
        members.m_tilecount = ((0) | 0);
        while (((((members.m_tilecount ?? 0)) < (34)) ? 1 : 0)) {
            let index1 = ((((tile_index) + (x))) | 0);
            let page2 = ((method_readbyte(runtime, index1)) | 0);
            let pos = ((((runtime.shiftRight(((index1) & (896)), 4)) | (runtime.shiftRight(((index1) & (31)), 2)))) | 0);
            let page = ((runtime.shiftRight(((index1) & (3072)), 10)) | 0);
            let address = ((((960) + (pos))) | 0);
            let color_byte = ((method_readbyte(runtime, __add_ppu2c0x_device__draw_background(runtime, ((((((page) * (1024))) + (address))) & (4095)), 8192))) | 0);
            let color_bits = ((__add_ppu2c0x_device__draw_background(runtime, runtime.shiftRight(((index1) & (64)), 4), ((index1) & (2)))) | 0);
            if ((((__L0 ? __L0() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
                (__L1 ? __L1((((((members.m_tile_page ?? 0)) << (10))) | (((page2) << (4))))) : runtime.macro("m_latch", (((((members.m_tile_page ?? 0)) << (10))) | (((page2) << (4))))));
            }
            if (((Number(start_x) < Number(256)) ? 1 : 0)) {
                address = ((__add_ppu2c0x_device__draw_background(runtime, (((members.m_tile_page ?? 0)) ? (4096) : (0)), ((page2) * (16)))) | 0);
                address = ((((address) + (scroll_y_fine))) | 0);
                let __inline3_line_priority = line_priority;
                let __inline3_color_byte = color_byte;
                let __inline3_color_bits = color_bits;
                let __inline3_address = address;
                let __inline3_start_x = start_x;
                let __inline3_back_pen = (members.m_back_color ?? 0);
                let __inline3_color = ((((runtime.shiftRight(__inline3_color_byte, __inline3_color_bits)) & (3))) | 0);
                method_read_tile_plane_data(runtime, __inline3_address, __inline3_color);
                for (let __inline3_i = ((0) | 0); (((__inline3_i) < (8)) ? 1 : 0); __inline3_i = ((((__inline3_i) + (1))) | 0)) {
                    let __inline3_pix = ((0) & 0xff);
                    __inline3_pix = (((((((h_m_planebuf[0]) >>> (7)) & 1)) | ((((((h_m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
                    h_m_planebuf[0] = ((h_m_planebuf[0]) << (1));
                    h_m_planebuf[1] = ((h_m_planebuf[1]) << (1));
                    if ((((((Number(((__inline3_start_x) + (__inline3_i))) >= Number(0)) ? 1 : 0)) && (((Number(((__inline3_start_x) + (__inline3_i))) < Number(256)) ? 1 : 0))) ? 1 : 0)) {
                        method_draw_tile_pixel(runtime, __inline3_pix, __inline3_color, __inline3_back_pen, dest);
                        if (__inline3_pix) {
                            runtime.writeIndex(__inline3_line_priority, ((__inline3_start_x) + (__inline3_i)), ((runtime.readIndex(__inline3_line_priority, ((__inline3_start_x) + (__inline3_i)))) | (2)));
                        }
                    }
                    dest = __add_ppu2c0x_device__draw_background(runtime, dest, 1);
                }
                start_x = ((((start_x) + (8))) | 0);
                x = ((((x) + (1))) | 0);
                if ((((x) > (31)) ? 1 : 0)) {
                    x = ((0) | 0);
                    tile_index = ((((tile_index) ^ (1024))) | 0);
                }
            }
            members.m_tilecount = ((((members.m_tilecount) + (1))) | 0);
        }
        if (((((h_m_regs[1]) & (2))) ? 0 : 1)) {
            dest = h_m_bitmap["pix&"]((members.m_scanline ?? 0));
            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                method_draw_back_pen(runtime, dest, (members.m_back_color ?? 0));
                dest = __add_ppu2c0x_device__draw_background(runtime, dest, 1);
                runtime.writeIndex(line_priority, i, ((runtime.readIndex(line_priority, i)) ^ (2)));
            }
        }
    }
    function __add_ppu2c0x_device__draw_background(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap) {
        const members = runtime.members;
        pixel_data = ((pixel_data) & 0xff);
        let palval = ((runtime.readIndex((members.m_palette_ram ?? 0), ((((((4) * (color))) | (pixel_data))) & (31)))) & 0xffff);
        bitmap["pix="]((members.m_scanline ?? 0), ((sprite_xpos) + (pixel)), (runtime.palette[method_apply_grayscale_and_emphasis(runtime, palval)] ?? 0xff000000));
    }
    function method_draw_sprite_pixel_low(runtime, bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if (method_is_spritepixel_opaque(runtime, pixel_data, color)) {
            if (((Number(((sprite_xpos) + (pixel))) < Number(256)) ? 1 : 0)) {
                if (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) ? 0 : 1)) {
                    method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap);
                }
                runtime.writeIndex(line_priority, ((sprite_xpos) + (pixel)), ((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) | (1)));
            }
        }
        if (((((((((((((sprite_index) === (0)) ? 1 : 0)) && (((pixel_data) & (3)))) ? 1 : 0)) && (((Number(((sprite_xpos) + (pixel))) < Number(255)) ? 1 : 0))) ? 1 : 0)) && (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) & (2)))) ? 1 : 0)) {
            h_m_regs[2] = ((h_m_regs[2]) | (64));
        }
    }
    function method_is_spritepixel_opaque(runtime, pixel_data, color) {
        const members = runtime.members;
        if (pixel_data) {
            return 1;
        }
        else {
            return 0;
        }
    }
    function method_draw_sprite_pixel_high(runtime, bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if (method_is_spritepixel_opaque(runtime, pixel_data, color)) {
            if (((Number(((sprite_xpos) + (pixel))) < Number(256)) ? 1 : 0)) {
                if (((((~runtime.readIndex(line_priority, ((sprite_xpos) + (pixel))))) >>> (0)) & 1)) {
                    method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap);
                    runtime.writeIndex(line_priority, ((sprite_xpos) + (pixel)), ((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) | (1)));
                }
            }
        }
        if (((((((((((((sprite_index) === (0)) ? 1 : 0)) && (((pixel_data) & (3)))) ? 1 : 0)) && (((Number(((sprite_xpos) + (pixel))) < Number(255)) ? 1 : 0))) ? 1 : 0)) && (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) & (2)))) ? 1 : 0)) {
            h_m_regs[2] = ((h_m_regs[2]) | (64));
        }
    }
    function method_draw_sprites(runtime, line_priority) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_latch.isnull"], __L1 = __l["m_latch"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_latch = members.m_latch ?? 0;
        const h_m_planebuf = members.m_planebuf ?? 0;
        const h_m_bitmap = members.m_bitmap ?? 0;
        let sprite_count = ((0) | 0);
        let size = ((((((h_m_regs[0]) & (32))) ? (16) : (8))) | 0);
        let first_pixel = ((((((h_m_regs[1]) & (4))) ? (0) : (8))) | 0);
        for (let sprite_index = ((0) | 0); (((sprite_index) < (256)) ? 1 : 0); sprite_index = ((((sprite_index) + (4))) | 0)) {
            let sprite_ypos = ((__add_draw_sprites(runtime, (__t0 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[sprite_index] ?? 0) : runtime.readIndex(__t0, sprite_index)), 1)) | 0);
            let sprite_xpos = (((__t1 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((sprite_index) + (3))] ?? 0) : runtime.readIndex(__t1, ((sprite_index) + (3))))) | 0);
            if (((((((sprite_index) === (0)) ? 1 : 0)) && ((((sprite_xpos) === (254)) ? 1 : 0))) ? 1 : 0)) {
                sprite_ypos = ((((sprite_ypos) - (1))) | 0);
                if (((runtime.readIndex(line_priority, sprite_xpos)) & (2))) {
                    h_m_regs[2] = ((h_m_regs[2]) | (64));
                }
            }
            if ((((((Number(((sprite_ypos) + (size))) <= Number((members.m_scanline ?? 0))) ? 1 : 0)) || ((((sprite_ypos) > ((members.m_scanline ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            let tile = (((__t2 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[((sprite_index) + (1))] ?? 0) : runtime.readIndex(__t2, ((sprite_index) + (1))))) | 0);
            let color = ((__add_draw_sprites(runtime, (((__t3 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t3) ? (__t3[((sprite_index) + (2))] ?? 0) : runtime.readIndex(__t3, ((sprite_index) + (2))))) & (3)), 4)) | 0);
            let pri = ((((((__t4 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t4) ? (__t4[((sprite_index) + (2))] ?? 0) : runtime.readIndex(__t4, ((sprite_index) + (2))))) >>> (5)) & 1)) ? 1 : 0);
            let flipx = ((((((__t5 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t5) ? (__t5[((sprite_index) + (2))] ?? 0) : runtime.readIndex(__t5, ((sprite_index) + (2))))) >>> (6)) & 1)) ? 1 : 0);
            let flipy = ((((((__t6 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t6) ? (__t6[((sprite_index) + (2))] ?? 0) : runtime.readIndex(__t6, ((sprite_index) + (2))))) >>> (7)) & 1)) ? 1 : 0);
            method_read_extra_sprite_bits(runtime, sprite_index);
            if ((((size) === (16)) ? 1 : 0)) {
                if ((((tile) >>> (0)) & 1)) {
                    tile = ((((tile) & (-2))) | 0);
                    tile = ((((tile) | (256))) | 0);
                }
            }
            if ((((__L0 ? __L0() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
                (__L1 ? __L1((((((members.m_sprite_page ?? 0)) << (10))) | (((((tile) & (255))) << (4))))) : runtime.macro("m_latch", (((((members.m_sprite_page ?? 0)) << (10))) | (((((tile) & (255))) << (4))))));
            }
            let sprite_line = (((((members.m_scanline ?? 0)) - (sprite_ypos))) | 0);
            if (flipy) {
                sprite_line = ((((((size) - (1))) - (sprite_line))) | 0);
            }
            if (((((((size) === (16)) ? 1 : 0)) && ((((sprite_line) > (7)) ? 1 : 0))) ? 1 : 0)) {
                tile = ((((tile) + (1))) | 0);
                sprite_line = ((((sprite_line) - (8))) | 0);
            }
            let index1 = ((((tile) * (16))) | 0);
            index1 = ((method_apply_sprite_pattern_page(runtime, index1, size)) | 0);
            method_read_sprite_plane_data(runtime, ((index1) + (sprite_line)));
            if ((((sprite_count) === (8)) ? 1 : 0)) {
                h_m_regs[2] = ((h_m_regs[2]) | (32));
                break;
            }
            sprite_count = ((((sprite_count) + (1))) | 0);
            if (((((h_m_regs[1]) & (16))) ? 0 : 1)) {
                continue;
            }
            if (pri) {
                for (let pixel = ((0) | 0); (((pixel) < (8)) ? 1 : 0); pixel = ((((pixel) + (1))) | 0)) {
                    let pixel_data = ((0) & 0xff);
                    let __inline4_flipx = flipx;
                    if (__inline4_flipx) {
                        pixel_data = ((((((h_m_planebuf[0]) & (1))) | (((((h_m_planebuf[1]) & (1))) << (1))))) & 0xff);
                        h_m_planebuf[0] = runtime.shiftRight(h_m_planebuf[0], 1);
                        h_m_planebuf[1] = runtime.shiftRight(h_m_planebuf[1], 1);
                    }
                    else {
                        pixel_data = (((((((h_m_planebuf[0]) >>> (7)) & 1)) | ((((((h_m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
                        h_m_planebuf[0] = ((h_m_planebuf[0]) << (1));
                        h_m_planebuf[1] = ((h_m_planebuf[1]) << (1));
                    }
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_low(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
            else {
                for (let pixel = ((0) | 0); (((pixel) < (8)) ? 1 : 0); pixel = ((((pixel) + (1))) | 0)) {
                    let pixel_data = ((0) & 0xff);
                    let __inline5_flipx = flipx;
                    if (__inline5_flipx) {
                        pixel_data = ((((((h_m_planebuf[0]) & (1))) | (((((h_m_planebuf[1]) & (1))) << (1))))) & 0xff);
                        h_m_planebuf[0] = runtime.shiftRight(h_m_planebuf[0], 1);
                        h_m_planebuf[1] = runtime.shiftRight(h_m_planebuf[1], 1);
                    }
                    else {
                        pixel_data = (((((((h_m_planebuf[0]) >>> (7)) & 1)) | ((((((h_m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
                        h_m_planebuf[0] = ((h_m_planebuf[0]) << (1));
                        h_m_planebuf[1] = ((h_m_planebuf[1]) << (1));
                    }
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_high(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
        }
    }
    function __add_draw_sprites(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_read_extra_sprite_bits(runtime, sprite_index) {
        const members = runtime.members;
    }
    function method_apply_sprite_pattern_page(runtime, index1, size) {
        const members = runtime.members;
        if ((((size) === (8)) ? 1 : 0)) {
            index1 = ((((index1) + (((((((members.m_sprite_page ?? 0)) === (0)) ? 1 : 0)) ? (0) : (4096))))) | 0);
        }
        return ((index1) | 0);
    }
    function method_read_sprite_plane_data(runtime, address) {
        const members = runtime.members;
        const h_m_planebuf = members.m_planebuf ?? 0;
        h_m_planebuf[0] = method_readbyte(runtime, ((address) & (8191)));
        h_m_planebuf[1] = method_readbyte(runtime, ((((address) + (8))) & (8191)));
    }
    function method_ppu2c0x_device__draw_sprites(runtime, line_priority) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_latch.isnull"], __L1 = __l["m_latch"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_latch = members.m_latch ?? 0;
        const h_m_planebuf = members.m_planebuf ?? 0;
        const h_m_bitmap = members.m_bitmap ?? 0;
        let sprite_count = ((0) | 0);
        let size = ((((((h_m_regs[0]) & (32))) ? (16) : (8))) | 0);
        let first_pixel = ((((((h_m_regs[1]) & (4))) ? (0) : (8))) | 0);
        for (let sprite_index = ((0) | 0); (((sprite_index) < (256)) ? 1 : 0); sprite_index = ((((sprite_index) + (4))) | 0)) {
            let sprite_ypos = ((__add_ppu2c0x_device__draw_sprites(runtime, (__t0 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[sprite_index] ?? 0) : runtime.readIndex(__t0, sprite_index)), 1)) | 0);
            let sprite_xpos = (((__t1 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((sprite_index) + (3))] ?? 0) : runtime.readIndex(__t1, ((sprite_index) + (3))))) | 0);
            if (((((((sprite_index) === (0)) ? 1 : 0)) && ((((sprite_xpos) === (254)) ? 1 : 0))) ? 1 : 0)) {
                sprite_ypos = ((((sprite_ypos) - (1))) | 0);
                if (((runtime.readIndex(line_priority, sprite_xpos)) & (2))) {
                    h_m_regs[2] = ((h_m_regs[2]) | (64));
                }
            }
            if ((((((Number(((sprite_ypos) + (size))) <= Number((members.m_scanline ?? 0))) ? 1 : 0)) || ((((sprite_ypos) > ((members.m_scanline ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            let tile = (((__t2 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[((sprite_index) + (1))] ?? 0) : runtime.readIndex(__t2, ((sprite_index) + (1))))) | 0);
            let color = ((__add_ppu2c0x_device__draw_sprites(runtime, (((__t3 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t3) ? (__t3[((sprite_index) + (2))] ?? 0) : runtime.readIndex(__t3, ((sprite_index) + (2))))) & (3)), 4)) | 0);
            let pri = ((((((__t4 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t4) ? (__t4[((sprite_index) + (2))] ?? 0) : runtime.readIndex(__t4, ((sprite_index) + (2))))) >>> (5)) & 1)) ? 1 : 0);
            let flipx = ((((((__t5 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t5) ? (__t5[((sprite_index) + (2))] ?? 0) : runtime.readIndex(__t5, ((sprite_index) + (2))))) >>> (6)) & 1)) ? 1 : 0);
            let flipy = ((((((__t6 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t6) ? (__t6[((sprite_index) + (2))] ?? 0) : runtime.readIndex(__t6, ((sprite_index) + (2))))) >>> (7)) & 1)) ? 1 : 0);
            method_read_extra_sprite_bits(runtime, sprite_index);
            if ((((size) === (16)) ? 1 : 0)) {
                if ((((tile) >>> (0)) & 1)) {
                    tile = ((((tile) & (-2))) | 0);
                    tile = ((((tile) | (256))) | 0);
                }
            }
            if ((((__L0 ? __L0() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
                (__L1 ? __L1((((((members.m_sprite_page ?? 0)) << (10))) | (((((tile) & (255))) << (4))))) : runtime.macro("m_latch", (((((members.m_sprite_page ?? 0)) << (10))) | (((((tile) & (255))) << (4))))));
            }
            let sprite_line = (((((members.m_scanline ?? 0)) - (sprite_ypos))) | 0);
            if (flipy) {
                sprite_line = ((((((size) - (1))) - (sprite_line))) | 0);
            }
            if (((((((size) === (16)) ? 1 : 0)) && ((((sprite_line) > (7)) ? 1 : 0))) ? 1 : 0)) {
                tile = ((((tile) + (1))) | 0);
                sprite_line = ((((sprite_line) - (8))) | 0);
            }
            let index1 = ((((tile) * (16))) | 0);
            index1 = ((method_apply_sprite_pattern_page(runtime, index1, size)) | 0);
            method_read_sprite_plane_data(runtime, ((index1) + (sprite_line)));
            if ((((sprite_count) === (8)) ? 1 : 0)) {
                h_m_regs[2] = ((h_m_regs[2]) | (32));
                break;
            }
            sprite_count = ((((sprite_count) + (1))) | 0);
            if (((((h_m_regs[1]) & (16))) ? 0 : 1)) {
                continue;
            }
            if (pri) {
                for (let pixel = ((0) | 0); (((pixel) < (8)) ? 1 : 0); pixel = ((((pixel) + (1))) | 0)) {
                    let pixel_data = ((0) & 0xff);
                    let __inline6_flipx = flipx;
                    if (__inline6_flipx) {
                        pixel_data = ((((((h_m_planebuf[0]) & (1))) | (((((h_m_planebuf[1]) & (1))) << (1))))) & 0xff);
                        h_m_planebuf[0] = runtime.shiftRight(h_m_planebuf[0], 1);
                        h_m_planebuf[1] = runtime.shiftRight(h_m_planebuf[1], 1);
                    }
                    else {
                        pixel_data = (((((((h_m_planebuf[0]) >>> (7)) & 1)) | ((((((h_m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
                        h_m_planebuf[0] = ((h_m_planebuf[0]) << (1));
                        h_m_planebuf[1] = ((h_m_planebuf[1]) << (1));
                    }
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_low(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
            else {
                for (let pixel = ((0) | 0); (((pixel) < (8)) ? 1 : 0); pixel = ((((pixel) + (1))) | 0)) {
                    let pixel_data = ((0) & 0xff);
                    let __inline7_flipx = flipx;
                    if (__inline7_flipx) {
                        pixel_data = ((((((h_m_planebuf[0]) & (1))) | (((((h_m_planebuf[1]) & (1))) << (1))))) & 0xff);
                        h_m_planebuf[0] = runtime.shiftRight(h_m_planebuf[0], 1);
                        h_m_planebuf[1] = runtime.shiftRight(h_m_planebuf[1], 1);
                    }
                    else {
                        pixel_data = (((((((h_m_planebuf[0]) >>> (7)) & 1)) | ((((((h_m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
                        h_m_planebuf[0] = ((h_m_planebuf[0]) << (1));
                        h_m_planebuf[1] = ((h_m_planebuf[1]) << (1));
                    }
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_high(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
        }
    }
    function __add_ppu2c0x_device__draw_sprites(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_palette_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        data = ((((data) & (63))) & 0xff);
        if (((offset) & (3))) {
            runtime.writeIndex(runtime.writableMember("m_palette_ram"), ((offset) & (31)), data);
        }
        else {
            if (((Number(0) === Number(((offset) & (15)))) ? 1 : 0)) {
                members.m_back_color = ((data) & 0xff);
            }
            runtime.writeIndex(runtime.writableMember("m_palette_ram"), ((offset) & (15)), (runtime.writeIndex(runtime.writableMember("m_palette_ram"), __add_palette_write(runtime, ((offset) & (15)), 16), data)));
        }
    }
    function __add_palette_write(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_palette_read(runtime, offset) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if (((h_m_regs[1]) & (1))) {
            return ((((runtime.readIndex((members.m_palette_ram ?? 0), ((offset) & (31)))) & (48))) & 0xff);
        }
        else {
            return ((runtime.readIndex((members.m_palette_ram ?? 0), ((offset) & (31)))) & 0xff);
        }
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_latch.isnull"], __L1 = __l["m_latch"];
        let __t0;
        const h_m_security_value = members.m_security_value ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_latch = members.m_latch ?? 0;
        const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? 0;
        if (((Number(offset) >= Number(8)) ? 1 : 0)) {
            0;
            offset = ((offset) & (7));
        }
        switch (((offset) & (7))) {
            case 2:
                {
                    if (h_m_security_value) {
                        members.m_data_latch = ((((((h_m_regs[2]) & (192))) | (h_m_security_value))) & 0xff);
                    }
                    else {
                        members.m_data_latch = ((((h_m_regs[2]) | ((((members.m_data_latch ?? 0)) & (31))))) & 0xff);
                    }
                    members.m_toggle = ((0) ? 1 : 0);
                    if ((((members.m_data_latch ?? 0)) & (128))) {
                        h_m_regs[2] = ((h_m_regs[2]) & (96));
                    }
                    break;
                }
            case 4:
                {
                    members.m_data_latch = (((__t0 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[h_m_regs[3]] ?? 0) : runtime.readIndex(__t0, h_m_regs[3]))) & 0xff);
                    break;
                }
            case 7:
                {
                    if ((((__L0 ? __L0() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
                        (__L1 ? __L1((((members.m_videomem_addr ?? 0)) & (16383))) : runtime.macro("m_latch", (((members.m_videomem_addr ?? 0)) & (16383))));
                    }
                    if ((((((((members.m_videomem_addr ?? 0)) >= (16128)) ? 1 : 0)) && (h_m_paletteram_in_ppuspace)) ? 1 : 0)) {
                        members.m_data_latch = ((method_readbyte(runtime, (members.m_videomem_addr ?? 0))) & 0xff);
                        members.m_buffered_data = ((method_readbyte(runtime, (((members.m_videomem_addr ?? 0)) & (12287)))) & 0xff);
                    }
                    else {
                        members.m_data_latch = (((members.m_buffered_data ?? 0)) & 0xff);
                        members.m_buffered_data = ((method_readbyte(runtime, (members.m_videomem_addr ?? 0))) & 0xff);
                    }
                    members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? 0)))) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
        return (((members.m_data_latch ?? 0)) & 0xff);
    }
    function method_ppu2c0x_device__read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_latch.isnull"], __L1 = __l["m_latch"];
        let __t0;
        const h_m_security_value = members.m_security_value ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_latch = members.m_latch ?? 0;
        const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? 0;
        if (((Number(offset) >= Number(8)) ? 1 : 0)) {
            0;
            offset = ((offset) & (7));
        }
        switch (((offset) & (7))) {
            case 2:
                {
                    if (h_m_security_value) {
                        members.m_data_latch = ((((((h_m_regs[2]) & (192))) | (h_m_security_value))) & 0xff);
                    }
                    else {
                        members.m_data_latch = ((((h_m_regs[2]) | ((((members.m_data_latch ?? 0)) & (31))))) & 0xff);
                    }
                    members.m_toggle = ((0) ? 1 : 0);
                    if ((((members.m_data_latch ?? 0)) & (128))) {
                        h_m_regs[2] = ((h_m_regs[2]) & (96));
                    }
                    break;
                }
            case 4:
                {
                    members.m_data_latch = (((__t0 = (members.m_spriteram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[h_m_regs[3]] ?? 0) : runtime.readIndex(__t0, h_m_regs[3]))) & 0xff);
                    break;
                }
            case 7:
                {
                    if ((((__L0 ? __L0() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
                        (__L1 ? __L1((((members.m_videomem_addr ?? 0)) & (16383))) : runtime.macro("m_latch", (((members.m_videomem_addr ?? 0)) & (16383))));
                    }
                    if ((((((((members.m_videomem_addr ?? 0)) >= (16128)) ? 1 : 0)) && (h_m_paletteram_in_ppuspace)) ? 1 : 0)) {
                        members.m_data_latch = ((method_readbyte(runtime, (members.m_videomem_addr ?? 0))) & 0xff);
                        members.m_buffered_data = ((method_readbyte(runtime, (((members.m_videomem_addr ?? 0)) & (12287)))) & 0xff);
                    }
                    else {
                        members.m_data_latch = (((members.m_buffered_data ?? 0)) & 0xff);
                        members.m_buffered_data = ((method_readbyte(runtime, (members.m_videomem_addr ?? 0))) & 0xff);
                    }
                    members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? 0)))) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
        return (((members.m_data_latch ?? 0)) & 0xff);
    }
    function method_write_to_spriteram_with_increment(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        if ((((((Number((members.m_scanline ?? 0)) > Number(239)) ? 1 : 0)) || (((((h_m_regs[1]) & (24))) ? 0 : 1))) ? 1 : 0)) {
            ((__t0 = members.m_spriteram) && ArrayBuffer.isView(__t0) ? (__t0[h_m_regs[3]] = data) : runtime.writeIndex(runtime.writableMember("m_spriteram"), h_m_regs[3], data));
            h_m_regs[3] = ((((h_m_regs[3]) + (1))) & (255));
        }
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_latch.isnull"], __L1 = __l["m_latch"];
        data = ((data) & 0xff);
        const h_m_security_value = members.m_security_value ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_line_write_increment_large = members.m_line_write_increment_large ?? 0;
        const h_m_global_refresh_mask = members.m_global_refresh_mask ?? 0;
        const h_m_videoram_addr_mask = members.m_videoram_addr_mask ?? 0;
        const h_m_latch = members.m_latch ?? 0;
        if (((Number(offset) >= Number(8)) ? 1 : 0)) {
            0;
            offset = ((offset) & (7));
        }
        if ((((h_m_security_value) && (((((offset) & (6))) ? 0 : 1))) ? 1 : 0)) {
            offset = ((offset) ^ (1));
        }
        switch (((offset) & (7))) {
            case 0:
                {
                    h_m_regs[0] = data;
                    members.m_refresh_latch = ((((members.m_refresh_latch) & (29695))) | 0);
                    members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (3))) << (10))))) | 0);
                    members.m_tile_page = ((runtime.shiftRight(((data) & (16)), 2)) >>> 0);
                    members.m_sprite_page = ((runtime.shiftRight(((data) & (8)), 1)) >>> 0);
                    members.m_add = ((((((data) & (4))) ? (h_m_line_write_increment_large) : (1))) | 0);
                    break;
                }
            case 1:
                {
                    h_m_regs[1] = data;
                    break;
                }
            case 3:
                {
                    h_m_regs[3] = data;
                    break;
                }
            case 4:
                {
                    method_write_to_spriteram_with_increment(runtime, data);
                    break;
                }
            case 5:
                {
                    if ((members.m_toggle ?? 0)) {
                        members.m_refresh_latch = ((((members.m_refresh_latch) & (3103))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (248))) << (2))))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (7))) << (12))))) | 0);
                    }
                    else {
                        members.m_refresh_latch = ((((members.m_refresh_latch) & (((65504) & (h_m_global_refresh_mask))))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (runtime.shiftRight(((data) & (248)), 3)))) | 0);
                        members.m_x_fine = ((((data) & (7))) & 0xff);
                    }
                    members.m_toggle = (((((members.m_toggle ?? 0)) ? 0 : 1)) ? 1 : 0);
                    break;
                }
            case 6:
                {
                    if ((members.m_toggle ?? 0)) {
                        members.m_refresh_latch = ((((members.m_refresh_latch) & (((65280) & (h_m_global_refresh_mask))))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (data))) | 0);
                        members.m_refresh_data = (((members.m_refresh_latch ?? 0)) | 0);
                        members.m_videomem_addr = (((members.m_refresh_latch ?? 0)) >>> 0);
                    }
                    else {
                        members.m_refresh_latch = ((((members.m_refresh_latch) & (255))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (runtime.shiftRight(h_m_videoram_addr_mask, 8)))) << (8))))) | 0);
                    }
                    members.m_toggle = (((((members.m_toggle ?? 0)) ? 0 : 1)) ? 1 : 0);
                    break;
                }
            case 7:
                {
                    let tempAddr = (((((members.m_videomem_addr ?? 0)) & (h_m_videoram_addr_mask))) | 0);
                    if ((((__L0 ? __L0() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
                        (__L1 ? __L1(({ generatedLValue: true, get: () => tempAddr, set: (value) => { tempAddr = ((value) | 0); } })) : runtime.macro("m_latch", ({ generatedLValue: true, get: () => tempAddr, set: (value) => { tempAddr = ((value) | 0); } })));
                    }
                    method_writebyte(runtime, tempAddr, data);
                    members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? 0)))) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
        members.m_data_latch = ((data) & 0xff);
    }
    function method_writebyte(runtime, address, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["space"], __L1 = __l["space().write_byte"];
        data = ((data) & 0xff);
        ((__L1 ?? globalThis.mamekitMissingCall?.("space().write_byte"))?.(address, data) ?? 0);
    }
    function method_ppu2c0x_device__write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_latch.isnull"], __L1 = __l["m_latch"];
        data = ((data) & 0xff);
        const h_m_security_value = members.m_security_value ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_line_write_increment_large = members.m_line_write_increment_large ?? 0;
        const h_m_global_refresh_mask = members.m_global_refresh_mask ?? 0;
        const h_m_videoram_addr_mask = members.m_videoram_addr_mask ?? 0;
        const h_m_latch = members.m_latch ?? 0;
        if (((Number(offset) >= Number(8)) ? 1 : 0)) {
            0;
            offset = ((offset) & (7));
        }
        if ((((h_m_security_value) && (((((offset) & (6))) ? 0 : 1))) ? 1 : 0)) {
            offset = ((offset) ^ (1));
        }
        switch (((offset) & (7))) {
            case 0:
                {
                    h_m_regs[0] = data;
                    members.m_refresh_latch = ((((members.m_refresh_latch) & (29695))) | 0);
                    members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (3))) << (10))))) | 0);
                    members.m_tile_page = ((runtime.shiftRight(((data) & (16)), 2)) >>> 0);
                    members.m_sprite_page = ((runtime.shiftRight(((data) & (8)), 1)) >>> 0);
                    members.m_add = ((((((data) & (4))) ? (h_m_line_write_increment_large) : (1))) | 0);
                    break;
                }
            case 1:
                {
                    h_m_regs[1] = data;
                    break;
                }
            case 3:
                {
                    h_m_regs[3] = data;
                    break;
                }
            case 4:
                {
                    method_write_to_spriteram_with_increment(runtime, data);
                    break;
                }
            case 5:
                {
                    if ((members.m_toggle ?? 0)) {
                        members.m_refresh_latch = ((((members.m_refresh_latch) & (3103))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (248))) << (2))))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (7))) << (12))))) | 0);
                    }
                    else {
                        members.m_refresh_latch = ((((members.m_refresh_latch) & (((65504) & (h_m_global_refresh_mask))))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (runtime.shiftRight(((data) & (248)), 3)))) | 0);
                        members.m_x_fine = ((((data) & (7))) & 0xff);
                    }
                    members.m_toggle = (((((members.m_toggle ?? 0)) ? 0 : 1)) ? 1 : 0);
                    break;
                }
            case 6:
                {
                    if ((members.m_toggle ?? 0)) {
                        members.m_refresh_latch = ((((members.m_refresh_latch) & (((65280) & (h_m_global_refresh_mask))))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (data))) | 0);
                        members.m_refresh_data = (((members.m_refresh_latch ?? 0)) | 0);
                        members.m_videomem_addr = (((members.m_refresh_latch ?? 0)) >>> 0);
                    }
                    else {
                        members.m_refresh_latch = ((((members.m_refresh_latch) & (255))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (runtime.shiftRight(h_m_videoram_addr_mask, 8)))) << (8))))) | 0);
                    }
                    members.m_toggle = (((((members.m_toggle ?? 0)) ? 0 : 1)) ? 1 : 0);
                    break;
                }
            case 7:
                {
                    let tempAddr = (((((members.m_videomem_addr ?? 0)) & (h_m_videoram_addr_mask))) | 0);
                    if ((((__L0 ? __L0() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
                        (__L1 ? __L1(({ generatedLValue: true, get: () => tempAddr, set: (value) => { tempAddr = ((value) | 0); } })) : runtime.macro("m_latch", ({ generatedLValue: true, get: () => tempAddr, set: (value) => { tempAddr = ((value) | 0); } })));
                    }
                    method_writebyte(runtime, tempAddr, data);
                    members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? 0)))) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
        members.m_data_latch = ((data) & 0xff);
    }
    function method_get_vram_dest(runtime) {
        const members = runtime.members;
        return (((members.m_videomem_addr ?? 0)) & 0xffff);
    }
    function method_set_vram_dest(runtime, dest) {
        const members = runtime.members;
        dest = ((dest) & 0xffff);
        members.m_videomem_addr = ((dest) >>> 0);
    }
    function method_render(runtime, bitmap, flipx, flipy, sx, sy, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["copybitmap"];
        let __t0;
        const h_m_bitmap = members.m_bitmap ?? 0;
        if (((Number((__t0 = __deref_render(runtime, members.m_scanline_timer), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_scanline_timer, "remaining"))) !== Number(0)) ? 1 : 0)) {
            method_update_scanline(runtime);
        }
        (__L0 ? __L0(bitmap, h_m_bitmap, flipx, flipy, sx, sy, cliprect) : runtime.macro("copybitmap", bitmap, h_m_bitmap, flipx, flipy, sx, sy, cliprect));
    }
    function __deref_render(runtime, p) {
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
    function method_update_scanline(runtime) {
        const members = runtime.members;
        if (((Number((members.m_scanline ?? 0)) <= Number(239)) ? 1 : 0)) {
            method_update_visible_scanline(runtime);
        }
    }
    function method_update_visible_scanline(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_regs = members.m_regs ?? 0;
        if (((h_m_regs[1]) & (24))) {
            method_update_visible_enabled_scanline(runtime);
        }
        else {
            method_update_visible_disabled_scanline(runtime);
        }
        if (((Number((__t0 = __deref_update_visible_scanline(runtime, members.m_scanline_timer), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_scanline_timer, "remaining"))) === Number(0)) ? 1 : 0)) {
            method_scanline_increment_fine_ycounter(runtime);
        }
    }
    function __deref_update_visible_scanline(runtime, p) {
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
    function method_update_visible_enabled_scanline(runtime) {
        const members = runtime.members;
        let __t0;
        if (((Number((__t0 = __deref_update_visible_enabled_scanline(runtime, members.m_scanline_timer), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_scanline_timer, "remaining"))) === Number(0)) ? 1 : 0)) {
            members.m_refresh_data = ((((members.m_refresh_data) & (-1056))) | 0);
            members.m_refresh_data = ((((members.m_refresh_data) | ((((members.m_refresh_latch ?? 0)) & (1055))))) | 0);
        }
        method_render_scanline(runtime);
    }
    function __deref_update_visible_enabled_scanline(runtime, p) {
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
    function method_render_scanline(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let line_priority = new Uint8Array(Math.max(0, Number(256)));
        let profile = 0;
        cppMemset(runtime, line_priority, 0, 256);
        members.m_draw_phase = ((0) | 0);
        if (((h_m_regs[1]) & (8))) {
            method_draw_background(runtime, line_priority);
        }
        else {
            method_draw_background_pen(runtime);
        }
        members.m_draw_phase = ((1) | 0);
        method_draw_sprites(runtime, line_priority);
        members.m_draw_phase = ((0) | 0);
    }
    function method_draw_background_pen(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bitmap = members.m_bitmap ?? 0;
        for (let i = ((0) | 0); ((Number(i) < Number((__t0 = (members.m_bitmap), typeof __t0.width === 'function' ? __t0.width() : typeof __t0.width === 'number' || typeof __t0.width === 'boolean' ? __t0.width : runtime.container(members.m_bitmap, "width")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            method_draw_back_pen(runtime, h_m_bitmap["pix&"]((members.m_scanline ?? 0), i), (members.m_back_color ?? 0));
        }
    }
    function method_update_visible_disabled_scanline(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? 0;
        const h_m_bitmap = members.m_bitmap ?? 0;
        let back_pen = (((members.m_back_color ?? 0)) >>> 0);
        if (h_m_paletteram_in_ppuspace) {
            if (((((members.m_videomem_addr ?? 0)) >= (16128)) ? 1 : 0)) {
                back_pen = ((runtime.readIndex((members.m_palette_ram ?? 0), (((members.m_videomem_addr ?? 0)) & (31)))) >>> 0);
            }
        }
        for (let i = ((0) | 0); ((Number(i) < Number((__t0 = (members.m_bitmap), typeof __t0.width === 'function' ? __t0.width() : typeof __t0.width === 'number' || typeof __t0.width === 'boolean' ? __t0.width : runtime.container(members.m_bitmap, "width")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            method_draw_back_pen(runtime, h_m_bitmap["pix&"]((members.m_scanline ?? 0), i), back_pen);
        }
    }
    function method_scanline_increment_fine_ycounter(runtime) {
        const members = runtime.members;
        members.m_refresh_data = ((((members.m_refresh_data) + (4096))) | 0);
        if ((((members.m_refresh_data ?? 0)) & (32768))) {
            let tmp = ((__add_scanline_increment_fine_ycounter(runtime, (((members.m_refresh_data ?? 0)) & (992)), 32)) & 0xffff);
            members.m_refresh_data = ((((members.m_refresh_data) & (31775))) | 0);
            if ((((tmp) === (960)) ? 1 : 0)) {
                members.m_refresh_data = ((((members.m_refresh_data) ^ (2048))) | 0);
            }
            else {
                members.m_refresh_data = ((((members.m_refresh_data) | (((tmp) & (992))))) | 0);
            }
        }
    }
    function __add_scanline_increment_fine_ycounter(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_screen_update(runtime, screen, bitmap, cliprect) {
        const members = runtime.members;
        method_render(runtime, bitmap, 0, 0, 0, 0, cliprect);
        return ((0) >>> 0);
    }
    function method_hblank_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_hblank_callback_proc.isnull"], __L1 = __l["m_hblank_callback_proc"];
        const h_m_regs = members.m_regs ?? 0;
        const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? 0;
        const h_m_hblank_callback_proc = members.m_hblank_callback_proc ?? 0;
        let blanked = ((((Number(((h_m_regs[1]) & (24))) === Number(0)) ? 1 : 0)) ? 1 : 0);
        let vblank = (((((((Number((members.m_scanline ?? 0)) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0)) && (((Number((members.m_scanline ?? 0)) < Number((((members.m_scanlines_per_frame ?? 0)) - (1)))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if ((((__L0 ? __L0() : typeof (h_m_hblank_callback_proc)?.isnull === 'function' ? (h_m_hblank_callback_proc).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_hblank_callback_proc.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L1 ? __L1(({ generatedLValue: true, get: () => (members.m_scanline ?? 0), set: (value) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value) => { blanked = ((value) ? 1 : 0); } })) : runtime.macro("m_hblank_callback_proc", ({ generatedLValue: true, get: () => (members.m_scanline ?? 0), set: (value) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value) => { blanked = ((value) ? 1 : 0); } })));
        }
        (__deref_hblank_tick(runtime, members.m_hblank_timer).adjust?.(Infinity) ?? 0);
    }
    function __deref_hblank_tick(runtime, p) {
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
    function method_nmi_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_int_callback"];
        (__L0 ? __L0(Number(1)) : typeof members.m_int_callback === 'function' ? members.m_int_callback(1) : runtime.invoke("m_int_callback", 1));
        (__L0 ? __L0(Number(0)) : typeof members.m_int_callback === 'function' ? members.m_int_callback(0) : runtime.invoke("m_int_callback", 0));
        (__deref_nmi_tick(runtime, members.m_nmi_timer).adjust?.(Infinity) ?? 0);
    }
    function __deref_nmi_tick(runtime, p) {
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
    function method_scanline_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_scanline_callback_proc.isnull"], __L1 = __l["m_scanline_callback_proc"], __L2 = __l["m_cpu.cycles_to_attotime"], __L3 = __l["screen"], __L4 = __l["screen().time_until_pos"];
        const h_m_regs = members.m_regs ?? 0;
        const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? 0;
        const h_m_scanline_callback_proc = members.m_scanline_callback_proc ?? 0;
        const h_m_scan_scale = members.m_scan_scale ?? 0;
        let blanked = ((((Number(((h_m_regs[1]) & (24))) === Number(0)) ? 1 : 0)) ? 1 : 0);
        let vblank = (((((((((Number((members.m_scanline ?? 0)) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0)) && (((Number((members.m_scanline ?? 0)) < Number((((members.m_scanlines_per_frame ?? 0)) - (1)))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
        if ((((__L0 ? __L0() : typeof (h_m_scanline_callback_proc)?.isnull === 'function' ? (h_m_scanline_callback_proc).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_scanline_callback_proc.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L1 ? __L1(({ generatedLValue: true, get: () => (members.m_scanline ?? 0), set: (value) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value) => { blanked = ((value) ? 1 : 0); } })) : runtime.macro("m_scanline_callback_proc", ({ generatedLValue: true, get: () => (members.m_scanline ?? 0), set: (value) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value) => { blanked = ((value) ? 1 : 0); } })));
        }
        method_update_scanline(runtime);
        members.m_scanline = ((((members.m_scanline) + (1))) | 0);
        if (((((members.m_scanline ?? 0)) === (h_m_vblank_first_scanline)) ? 1 : 0)) {
            h_m_regs[2] = ((h_m_regs[2]) | (128));
            if (((h_m_regs[0]) & (128))) {
                (__deref_scanline_tick(runtime, members.m_nmi_timer).adjust?.((__L2 ? __L2(4) : ((members.m_cpu)?.cycles_to_attotime?.(4) ?? 0))) ?? 0);
            }
        }
        if (((Number((members.m_scanline ?? 0)) === Number((((members.m_scanlines_per_frame ?? 0)) - (1)))) ? 1 : 0)) {
            h_m_regs[2] = ((h_m_regs[2]) & (-225));
        }
        else {
            if (((((members.m_scanline ?? 0)) === ((members.m_scanlines_per_frame ?? 0))) ? 1 : 0)) {
                if (((blanked) ? 0 : 1)) {
                    members.m_refresh_data = (((members.m_refresh_latch ?? 0)) | 0);
                }
                members.m_scanline = ((0) | 0);
            }
        }
        let next_scanline = (((((members.m_scanline ?? 0)) + (1))) | 0);
        if ((((next_scanline) === ((members.m_scanlines_per_frame ?? 0))) ? 1 : 0)) {
            next_scanline = ((0) | 0);
        }
        (__deref_scanline_tick(runtime, members.m_hblank_timer).adjust?.(runtime.divide((__L2 ? __L2(260) : ((members.m_cpu)?.cycles_to_attotime?.(260) ?? 0)), 3)) ?? 0);
        (__deref_scanline_tick(runtime, members.m_scanline_timer).adjust?.(((__L4 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(((next_scanline) * (h_m_scan_scale))) ?? 0)) ?? 0);
    }
    function __deref_scanline_tick(runtime, p) {
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
    function method_set_cpu_tag(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_cpu.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_cpu)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_int_callback(runtime, members.m_int_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_int_callback, "bind"));
    }
    function __deref_int_callback(runtime, p) {
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
    function method_set_spriteram_value(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_spriteram) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data));
    }
    function method_get_current_scanline(runtime) {
        const members = runtime.members;
        return (((members.m_scanline ?? 0)) | 0);
    }
    function method_set_scanlines_per_frame(runtime, scanlines) {
        const members = runtime.members;
        members.m_scanlines_per_frame = ((scanlines) | 0);
    }
    function method_is_sprite_8x16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[0]) & (32))) | 0);
    }
    function method_get_draw_phase(runtime) {
        const members = runtime.members;
        return (((members.m_draw_phase ?? 0)) | 0);
    }
    function method_get_tilenum(runtime) {
        const members = runtime.members;
        return (((members.m_tilecount ?? 0)) | 0);
    }
    function method_in_vblanking(runtime) {
        const members = runtime.members;
        const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? 0;
        return ((Number((members.m_scanline ?? 0)) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0);
    }
    function method_palette_entries(runtime) {
        const members = runtime.members;
        return ((512) >>> 0);
    }
    function method_ppu2c0x_device__set_cpu_tag(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_cpu.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_cpu)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_ppu2c0x_device__int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ppu2c0x_device__int_callback(runtime, members.m_int_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_int_callback, "bind"));
    }
    function __deref_ppu2c0x_device__int_callback(runtime, p) {
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
    function method_ppu2c0x_device__set_spriteram_value(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_spriteram) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data));
    }
    function method_ppu2c0x_device__get_current_scanline(runtime) {
        const members = runtime.members;
        return (((members.m_scanline ?? 0)) | 0);
    }
    function method_ppu2c0x_device__set_scanlines_per_frame(runtime, scanlines) {
        const members = runtime.members;
        members.m_scanlines_per_frame = ((scanlines) | 0);
    }
    function method_ppu2c0x_device__is_sprite_8x16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[0]) & (32))) | 0);
    }
    function method_ppu2c0x_device__get_draw_phase(runtime) {
        const members = runtime.members;
        return (((members.m_draw_phase ?? 0)) | 0);
    }
    function method_ppu2c0x_device__get_tilenum(runtime) {
        const members = runtime.members;
        return (((members.m_tilecount ?? 0)) | 0);
    }
    function method_ppu2c0x_device__in_vblanking(runtime) {
        const members = runtime.members;
        const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? 0;
        return ((Number((members.m_scanline ?? 0)) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0);
    }
    function method_ppu2c0x_device__palette_entries(runtime) {
        const members = runtime.members;
        return ((512) >>> 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "readbyte": method_readbyte,
        "ppu_vram_direct_read": method_ppu_vram_direct_read,
        "init_palette_tables": method_init_palette_tables,
        "nespal_to_RGB": method_nespal_to_RGB,
        "draw_background": method_draw_background,
        "read_tile_plane_data": method_read_tile_plane_data,
        "draw_tile_pixel": method_draw_tile_pixel,
        "apply_grayscale_and_emphasis": method_apply_grayscale_and_emphasis,
        "draw_back_pen": method_draw_back_pen,
        "ppu2c0x_device::draw_background": method_ppu2c0x_device__draw_background,
        "draw_sprite_pixel": method_draw_sprite_pixel,
        "draw_sprite_pixel_low": method_draw_sprite_pixel_low,
        "is_spritepixel_opaque": method_is_spritepixel_opaque,
        "draw_sprite_pixel_high": method_draw_sprite_pixel_high,
        "draw_sprites": method_draw_sprites,
        "read_extra_sprite_bits": method_read_extra_sprite_bits,
        "apply_sprite_pattern_page": method_apply_sprite_pattern_page,
        "read_sprite_plane_data": method_read_sprite_plane_data,
        "ppu2c0x_device::draw_sprites": method_ppu2c0x_device__draw_sprites,
        "palette_write": method_palette_write,
        "palette_read": method_palette_read,
        "read": method_read,
        "ppu2c0x_device::read": method_ppu2c0x_device__read,
        "write_to_spriteram_with_increment": method_write_to_spriteram_with_increment,
        "write": method_write,
        "writebyte": method_writebyte,
        "ppu2c0x_device::write": method_ppu2c0x_device__write,
        "get_vram_dest": method_get_vram_dest,
        "set_vram_dest": method_set_vram_dest,
        "render": method_render,
        "update_scanline": method_update_scanline,
        "update_visible_scanline": method_update_visible_scanline,
        "update_visible_enabled_scanline": method_update_visible_enabled_scanline,
        "render_scanline": method_render_scanline,
        "draw_background_pen": method_draw_background_pen,
        "update_visible_disabled_scanline": method_update_visible_disabled_scanline,
        "scanline_increment_fine_ycounter": method_scanline_increment_fine_ycounter,
        "screen_update": method_screen_update,
        "hblank_tick": method_hblank_tick,
        "nmi_tick": method_nmi_tick,
        "scanline_tick": method_scanline_tick,
        "set_cpu_tag": method_set_cpu_tag,
        "int_callback": method_int_callback,
        "set_spriteram_value": method_set_spriteram_value,
        "get_current_scanline": method_get_current_scanline,
        "set_scanlines_per_frame": method_set_scanlines_per_frame,
        "is_sprite_8x16": method_is_sprite_8x16,
        "get_draw_phase": method_get_draw_phase,
        "get_tilenum": method_get_tilenum,
        "in_vblanking": method_in_vblanking,
        "palette_entries": method_palette_entries,
        "ppu2c0x_device::set_cpu_tag": method_ppu2c0x_device__set_cpu_tag,
        "ppu2c0x_device::int_callback": method_ppu2c0x_device__int_callback,
        "ppu2c0x_device::set_spriteram_value": method_ppu2c0x_device__set_spriteram_value,
        "ppu2c0x_device::get_current_scanline": method_ppu2c0x_device__get_current_scanline,
        "ppu2c0x_device::set_scanlines_per_frame": method_ppu2c0x_device__set_scanlines_per_frame,
        "ppu2c0x_device::is_sprite_8x16": method_ppu2c0x_device__is_sprite_8x16,
        "ppu2c0x_device::get_draw_phase": method_ppu2c0x_device__get_draw_phase,
        "ppu2c0x_device::get_tilenum": method_ppu2c0x_device__get_tilenum,
        "ppu2c0x_device::in_vblanking": method_ppu2c0x_device__in_vblanking,
        "ppu2c0x_device::palette_entries": method_ppu2c0x_device__palette_entries
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["DEGREE_TO_RADIAN", "copybitmap", "m_cpu.cycles_to_attotime", "m_cpu.set_tag", "m_hblank_callback_proc", "m_hblank_callback_proc.isnull", "m_int_callback", "m_latch", "m_latch.isnull", "m_scanline_callback_proc", "m_scanline_callback_proc.isnull", "rgb_t", "screen", "screen().time_until_pos", "space", "space().read_byte", "space().write_byte", "std::clamp", "std::forward"];
export const device = definition;
export default device;
