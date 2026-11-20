import deviceData from './snes_ppu.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [8, 8, 8, 16, 16, 32, 16, 16];
    const __mame_table_1 = [8, 8, 8, 16, 16, 32, 32, 32];
    const __mame_table_2 = [16, 32, 64, 32, 64, 64, 32, 32];
    const __mame_table_3 = [16, 32, 64, 32, 64, 64, 64, 32];
    const __mame_table_4 = [1, 32, 128, 128];
    const __mame_table_5 = [0, 32, 64, 128];
    const __mame_table_6 = [0, 5, 6, 7];
    const cppScratch_update_line_window_above = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_update_line_window_below = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_update_line_mode7_window_above = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_update_line_mode7_window_below = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_update_objects_window_above = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_update_objects_window_below = new Uint8Array(Math.max(0, Number(256)));
    function struct_clear_object_item(runtime, target, value, count) {
        if (!Array.isArray(target))
            return cppMemset(runtime, target, value, count);
        const total = Number(count);
        for (let index = 0; index < total; index++) {
            const e = target[index];
            if (e !== null && typeof e === 'object') {
                if (ArrayBuffer.isView(e) || Array.isArray(e) || e[cppUnionElements] === true)
                    return runtime.macro("memset", target, value, total);
                e.valid = value;
                e.index = value;
                e.width = value;
                e.height = value;
            }
            else
                target[index] = value;
        }
        return target;
    }
    function struct_clear_object_tile(runtime, target, value, count) {
        if (!Array.isArray(target))
            return cppMemset(runtime, target, value, count);
        const total = Number(count);
        for (let index = 0; index < total; index++) {
            const e = target[index];
            if (e !== null && typeof e === 'object') {
                if (ArrayBuffer.isView(e) || Array.isArray(e) || e[cppUnionElements] === true)
                    return runtime.macro("memset", target, value, total);
                e.valid = value;
                e.x = value;
                e.y = value;
                e.pri = value;
                e.pal = value;
                e.hflip = value;
                e.data = value;
            }
            else
                target[index] = value;
        }
        return target;
    }
    function cppStruct_valid_index_width_height(a0, a1, a2, a3) { this["valid"] = a0; this["index"] = a1; this["width"] = a2; this["height"] = a3; }
    cppStruct_valid_index_width_height.prototype = cppStructPrototype;
    function cppStruct_valid_x_y_pri_pal_hflip_data(a0, a1, a2, a3, a4, a5, a6) { this["valid"] = a0; this["x"] = a1; this["y"] = a2; this["pri"] = a3; this["pal"] = a4; this["hflip"] = a5; this["data"] = a6; }
    cppStruct_valid_x_y_pri_pal_hflip_data.prototype = cppStructPrototype;
    const cppScratch_update_objects_palbuf = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_update_objects_pribuf = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_refresh_scanline_window_above = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_refresh_scanline_window_below = new Uint8Array(Math.max(0, Number(256)));
    function method_pal555(runtime, data, rshift, gshift, bshift) {
        const members = runtime.members;
        rshift = ((rshift) & 0xff);
        gshift = ((gshift) & 0xff);
        bshift = ((bshift) & 0xff);
        return method_rgbexpand_5_5_5(runtime, data, rshift, gshift, bshift);
    }
    function method_rgbexpand_5_5_5(runtime, data, rshift, gshift, bshift) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rgb_t"];
        rshift = ((rshift) & 0xff);
        gshift = ((gshift) & 0xff);
        bshift = ((bshift) & 0xff);
        return (__L0 ? __L0(method_palexpand_5(runtime, ((data) >>> (rshift))), method_palexpand_5(runtime, ((data) >>> (gshift))), method_palexpand_5(runtime, ((data) >>> (bshift)))) : runtime.macro("rgb_t", method_palexpand_5(runtime, ((data) >>> (rshift))), method_palexpand_5(runtime, ((data) >>> (gshift))), method_palexpand_5(runtime, ((data) >>> (bshift)))));
    }
    function method_palexpand_5(runtime, bits) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
        if (1) {
            bits = ((((bits) & (31))) & 0xff);
            return ((((((bits) << (3))) | (((bits) >>> (2))))) & 0xff);
        }
        return ((bits) & 0xff);
    }
    function method_render_window(runtime, layer_idx, enable, output) {
        const members = runtime.members;
        layer_idx = ((layer_idx) & 0xffff);
        enable = ((enable) & 0xff);
        const h_m_layer = members.m_layer ?? 0;
        let self = h_m_layer[layer_idx];
        if ((((((enable) ? 0 : 1)) || ((((((self.window1_enabled) ? 0 : 1)) && (((self.window2_enabled) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
            cppMemset(runtime, output, 0, 256);
            return;
        }
        if ((((self.window1_enabled) && (((self.window2_enabled) ? 0 : 1))) ? 1 : 0)) {
            let set = ((((1) ^ (self.window1_invert))) & 0xff);
            let clear = ((((1) - (set))) & 0xff);
            for (let x = ((0) & 0xffff); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) & 0xffff)) {
                runtime.writeIndex(output, x, ((((((((x) >= ((members.m_window1_left ?? 0))) ? 1 : 0)) && ((((x) <= ((members.m_window1_right ?? 0))) ? 1 : 0))) ? 1 : 0)) ? (set) : (clear)));
            }
            return;
        }
        if ((((self.window2_enabled) && (((self.window1_enabled) ? 0 : 1))) ? 1 : 0)) {
            let set = ((((1) ^ (self.window2_invert))) & 0xff);
            let clear = ((((1) - (set))) & 0xff);
            for (let x = ((0) & 0xffff); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) & 0xffff)) {
                runtime.writeIndex(output, x, ((((((((x) >= ((members.m_window2_left ?? 0))) ? 1 : 0)) && ((((x) <= ((members.m_window2_right ?? 0))) ? 1 : 0))) ? 1 : 0)) ? (set) : (clear)));
            }
            return;
        }
        for (let x = ((0) & 0xffff); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) & 0xffff)) {
            let one_mask = ((((((((((((x) >= ((members.m_window1_left ?? 0))) ? 1 : 0)) && ((((x) <= ((members.m_window1_right ?? 0))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) ^ (self.window1_invert))) & 0xff);
            let two_mask = ((((((((((((x) >= ((members.m_window2_left ?? 0))) ? 1 : 0)) && ((((x) <= ((members.m_window2_right ?? 0))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) ^ (self.window2_invert))) & 0xff);
            switch (self.wlog_mask) {
                case 0:
                    {
                        runtime.writeIndex(output, x, ((one_mask) | (two_mask)));
                        break;
                    }
                case 1:
                    {
                        runtime.writeIndex(output, x, ((one_mask) & (two_mask)));
                        break;
                    }
                case 2:
                    {
                        runtime.writeIndex(output, x, ((one_mask) ^ (two_mask)));
                        break;
                    }
                case 3:
                    {
                        runtime.writeIndex(output, x, ((1) - (((one_mask) ^ (two_mask)))));
                        break;
                    }
            }
        }
    }
    function method_update_line(runtime, curline, layer_idx, direct_colors) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["pen_indirect"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16, __t17, __t18, __t19, __t20, __t21, __t22, __t23, __t24, __t25, __t26, __t27, __t28, __t29, __t30, __t31, __t32, __t33, __t34, __t35, __t36, __t37, __t38, __t39, __t40, __t41, __t42, __t43, __t44, __t45;
        curline = ((curline) & 0xffff);
        layer_idx = ((layer_idx) & 0xff);
        direct_colors = ((direct_colors) & 0xff);
        const h_m_layer = members.m_layer ?? 0;
        const h_m_scanlines = members.m_scanlines ?? 0;
        let layer = h_m_layer[layer_idx];
        if (((Number(layer.tile_mode) === Number(3)) ? 1 : 0)) {
            return;
        }
        h_m_scanlines[0].enable = ((layer.main_bg_enabled) | 0);
        h_m_scanlines[1].enable = ((layer.sub_bg_enabled) | 0);
        if ((((((h_m_scanlines[0].enable) ? 0 : 1)) && (((h_m_scanlines[1].enable) ? 0 : 1))) ? 1 : 0)) {
            return;
        }
        let window_above = cppScratch_update_line_window_above.fill(0);
        let window_below = cppScratch_update_line_window_below.fill(0);
        method_render_window(runtime, layer_idx, layer.main_window_enabled, window_above);
        method_render_window(runtime, layer_idx, layer.sub_window_enabled, window_below);
        let hires = (((((((((members.m_mode ?? 0)) === (5)) ? 1 : 0)) || (((((members.m_mode ?? 0)) === (6)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        let opt_mode = ((((((((((((members.m_mode ?? 0)) === (2)) ? 1 : 0)) || (((((members.m_mode ?? 0)) === (4)) ? 1 : 0))) ? 1 : 0)) || (((((members.m_mode ?? 0)) === (6)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        let direct_color_mode = ((((((((direct_colors) && (((Number(layer_idx) === Number(0)) ? 1 : 0))) ? 1 : 0)) && ((((((((members.m_mode ?? 0)) === (3)) ? 1 : 0)) || (((((members.m_mode ?? 0)) === (4)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        let color_shift = ((((3) + (layer.tile_mode))) >>> 0);
        let width = ((((256) << (((hires) ? (1) : (0))))) | 0);
        let tile_height = ((((3) + (layer.tile_size))) >>> 0);
        let tile_width = ((((((hires) ? 0 : 1)) ? (tile_height) : (4))) >>> 0);
        let tile_mask = ((runtime.shiftRight(4095, layer.tile_mode)) >>> 0);
        let tiledata_index = ((((layer.charmap) >>> (((3) + (layer.tile_mode))))) >>> 0);
        let palette_base = ((((((((members.m_mode ?? 0)) === (0)) ? 1 : 0)) ? (((layer_idx) << (5))) : (0))) >>> 0);
        let palette_shift = ((((2) << (layer.tile_mode))) >>> 0);
        let hscroll = ((layer.hoffs) >>> 0);
        let vscroll = ((layer.voffs) >>> 0);
        let hmask = ((((((((width) << (layer.tile_size))) << (((layer.tilemap_size) & (1))))) - (1))) >>> 0);
        let vmask = ((((((((width) << (layer.tile_size))) << (runtime.shiftRight(((layer.tilemap_size) & (2)), 1)))) - (1))) >>> 0);
        let y = ((((layer.mosaic_enabled) ? (layer.mosaic_offset) : (curline))) >>> 0);
        if (hires) {
            hscroll = ((((hscroll) << (1))) >>> 0);
            if (((((members.m_interlace ?? 0)) === (2)) ? 1 : 0)) {
                y = ((((((y) & (-2))) | ((((members.m_stat78 ?? 0)) >>> (7))))) >>> 0);
            }
        }
        let mosaic_counter = ((1) >>> 0);
        let mosaic_palette = ((0) >>> 0);
        let mosaic_priority = ((0) >>> 0);
        let mosaic_color = ((0) >>> 0);
        let x = ((((0) - (((hscroll) & (7))))) | 0);
        while ((((x) < (width)) ? 1 : 0)) {
            let hoffset = ((((x) + (hscroll))) >>> 0);
            let voffset = ((((y) + (vscroll))) >>> 0);
            if (opt_mode) {
                let valid_bit = ((((8192) << (layer_idx))) >>> 0);
                let offset_x = ((((x) + (((hscroll) & (7))))) >>> 0);
                if ((((offset_x) >= (8)) ? 1 : 0)) {
                    let hlookup = ((method_get_tile(runtime, 2, __add_update_line(runtime, ((offset_x) - (8)), ((h_m_layer[2].hoffs) & (-8))), h_m_layer[2].voffs)) >>> 0);
                    if (((((members.m_mode ?? 0)) === (4)) ? 1 : 0)) {
                        if (((hlookup) & (valid_bit))) {
                            if (((((hlookup) & (32768))) ? 0 : 1)) {
                                hoffset = ((((offset_x) + (((hlookup) & (-8))))) >>> 0);
                            }
                            else {
                                voffset = ((((y) + (hlookup))) >>> 0);
                            }
                        }
                    }
                    else {
                        let vlookup = ((method_get_tile(runtime, 2, __add_update_line(runtime, ((offset_x) - (8)), ((h_m_layer[2].hoffs) & (-8))), ((h_m_layer[2].voffs) + (8)))) >>> 0);
                        if (((hlookup) & (valid_bit))) {
                            hoffset = ((((offset_x) + (((hlookup) & (-8))))) >>> 0);
                        }
                        if (((vlookup) & (valid_bit))) {
                            voffset = ((((y) + (vlookup))) >>> 0);
                        }
                    }
                }
            }
            hoffset = ((((hoffset) & (hmask))) >>> 0);
            voffset = ((((voffset) & (vmask))) >>> 0);
            let tile_number = ((method_get_tile(runtime, layer_idx, hoffset, voffset)) >>> 0);
            let mirrory = ((((((tile_number) & (32768))) ? (7) : (0))) >>> 0);
            let mirrorx = ((((((tile_number) & (16384))) ? (7) : (0))) >>> 0);
            let tile_priority = ((layer.priority[(((tile_number) >>> (13)) & 1)]) & 0xff);
            let palette_number = ((((((tile_number) >>> (10))) & (7))) >>> 0);
            let palette_index = ((((((palette_base) + (((palette_number) << (palette_shift))))) & (255))) >>> 0);
            if (((((((tile_width) === (4)) ? 1 : 0)) && (((((((hoffset) & (8))) ? 1 : 0)) ^ (((mirrorx) ? 1 : 0))))) ? 1 : 0)) {
                tile_number = ((((tile_number) + (1))) >>> 0);
            }
            if (((((((tile_height) === (4)) ? 1 : 0)) && (((((((voffset) & (8))) ? 1 : 0)) ^ (((mirrory) ? 1 : 0))))) ? 1 : 0)) {
                tile_number = ((((tile_number) + (16))) >>> 0);
            }
            tile_number = ((((((((tile_number) & (1023))) + (tiledata_index))) & (tile_mask))) >>> 0);
            let address = ((((((__add_update_line(runtime, ((tile_number) << (color_shift)), ((((voffset) & (7))) ^ (mirrory)))) & (32767))) << (1))) & 0xffff);
            let data$lo = 0, data$hi = 0;
            data$lo = 0;
            data$hi = 0;
            __t0 = Number((__t1 = (members.m_vram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((address) + (0))] ?? 0) : runtime.readIndex(__t1, ((address) + (0))))) >>> 0;
            __t2 = __t0;
            __t3 = 0;
            data$lo = __t2;
            data$hi = __t3;
            __t6 = Number((__t7 = (members.m_vram ?? 0), ArrayBuffer.isView(__t7) ? (__t7[((address) + (1))] ?? 0) : runtime.readIndex(__t7, ((address) + (1))))) >>> 0;
            __t8 = (__t6 << 8) >>> 0;
            __t9 = ((0 << 8) | (__t6 >>> 24)) >>> 0;
            __t4 = (data$lo | __t8) >>> 0;
            __t5 = (data$hi | __t9) >>> 0;
            data$lo = __t4;
            data$hi = __t5;
            __t12 = Number((__t13 = (members.m_vram ?? 0), ArrayBuffer.isView(__t13) ? (__t13[((address) + (16))] ?? 0) : runtime.readIndex(__t13, ((address) + (16))))) >>> 0;
            __t14 = (__t12 << 16) >>> 0;
            __t15 = ((0 << 16) | (__t12 >>> 16)) >>> 0;
            __t10 = (data$lo | __t14) >>> 0;
            __t11 = (data$hi | __t15) >>> 0;
            data$lo = __t10;
            data$hi = __t11;
            __t18 = Number((__t19 = (members.m_vram ?? 0), ArrayBuffer.isView(__t19) ? (__t19[((address) + (17))] ?? 0) : runtime.readIndex(__t19, ((address) + (17))))) >>> 0;
            __t20 = (__t18 << 24) >>> 0;
            __t21 = ((0 << 24) | (__t18 >>> 8)) >>> 0;
            __t16 = (data$lo | __t20) >>> 0;
            __t17 = (data$hi | __t21) >>> 0;
            data$lo = __t16;
            data$hi = __t17;
            __t24 = Number((__t25 = (members.m_vram ?? 0), ArrayBuffer.isView(__t25) ? (__t25[((address) + (32))] ?? 0) : runtime.readIndex(__t25, ((address) + (32))))) >>> 0;
            __t26 = 0;
            __t27 = (__t24 << 0) >>> 0;
            __t22 = (data$lo | __t26) >>> 0;
            __t23 = (data$hi | __t27) >>> 0;
            data$lo = __t22;
            data$hi = __t23;
            __t30 = Number((__t31 = (members.m_vram ?? 0), ArrayBuffer.isView(__t31) ? (__t31[((address) + (33))] ?? 0) : runtime.readIndex(__t31, ((address) + (33))))) >>> 0;
            __t32 = 0;
            __t33 = (__t30 << 8) >>> 0;
            __t28 = (data$lo | __t32) >>> 0;
            __t29 = (data$hi | __t33) >>> 0;
            data$lo = __t28;
            data$hi = __t29;
            __t36 = Number((__t37 = (members.m_vram ?? 0), ArrayBuffer.isView(__t37) ? (__t37[((address) + (48))] ?? 0) : runtime.readIndex(__t37, ((address) + (48))))) >>> 0;
            __t38 = 0;
            __t39 = (__t36 << 16) >>> 0;
            __t34 = (data$lo | __t38) >>> 0;
            __t35 = (data$hi | __t39) >>> 0;
            data$lo = __t34;
            data$hi = __t35;
            __t42 = Number((__t43 = (members.m_vram ?? 0), ArrayBuffer.isView(__t43) ? (__t43[((address) + (49))] ?? 0) : runtime.readIndex(__t43, ((address) + (49))))) >>> 0;
            __t44 = 0;
            __t45 = (__t42 << 24) >>> 0;
            __t40 = (data$lo | __t44) >>> 0;
            __t41 = (data$hi | __t45) >>> 0;
            data$lo = __t40;
            data$hi = __t41;
            for (let tilex = ((0) >>> 0); (((tilex) < (8)) ? 1 : 0); tilex = ((((tilex) + (1))) >>> 0), x = ((((x) + (1))) | 0)) {
                if (((x) & (width))) {
                    continue;
                }
                if ((((((layer.mosaic_enabled) ? 0 : 1)) || (((Number((mosaic_counter = ((((mosaic_counter) - (1))) >>> 0))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                    let color = ((0) >>> 0);
                    let shift = ((((mirrorx) ? (tilex) : (((7) - (tilex))))) >>> 0);
                    color = ((((cppShr64Lo(data$lo, data$hi, Number(((shift) + (0)))) & 1) >>> 0)) >>> 0);
                    color = ((((color) | (((cppShr64Lo(data$lo, data$hi, Number(((shift) + (7)))) & 2) >>> 0)))) >>> 0);
                    if (((Number(layer.tile_mode) >= Number(1)) ? 1 : 0)) {
                        color = ((((color) | (((cppShr64Lo(data$lo, data$hi, Number(((shift) + (14)))) & 4) >>> 0)))) >>> 0);
                        color = ((((color) | (((cppShr64Lo(data$lo, data$hi, Number(((shift) + (21)))) & 8) >>> 0)))) >>> 0);
                    }
                    if (((Number(layer.tile_mode) >= Number(2)) ? 1 : 0)) {
                        color = ((((color) | (((cppShr64Lo(data$lo, data$hi, Number(((shift) + (28)))) & 16) >>> 0)))) >>> 0);
                        color = ((((color) | (((cppShr64Lo(data$lo, data$hi, Number(((shift) + (35)))) & 32) >>> 0)))) >>> 0);
                        color = ((((color) | (((cppShr64Lo(data$lo, data$hi, Number(((shift) + (42)))) & 64) >>> 0)))) >>> 0);
                        color = ((((color) | (((cppShr64Lo(data$lo, data$hi, Number(((shift) + (49)))) & 128) >>> 0)))) >>> 0);
                    }
                    mosaic_counter = ((((1) + ((members.m_mosaic_size ?? 0)))) >>> 0);
                    mosaic_palette = ((color) >>> 0);
                    mosaic_priority = ((tile_priority) >>> 0);
                    if (direct_color_mode) {
                        mosaic_color = ((method_direct_color(runtime, mosaic_palette, palette_number)) >>> 0);
                    }
                    else {
                        mosaic_color = (((__L0 ? __L0(((((palette_index) + (mosaic_palette))) & (255))) : runtime.macro("pen_indirect", ((((palette_index) + (mosaic_palette))) & (255))))) >>> 0);
                    }
                }
                if (((mosaic_palette) ? 0 : 1)) {
                    continue;
                }
                if (((hires) ? 0 : 1)) {
                    if ((((layer.main_bg_enabled) && (((Number((window_above[x] ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        method_plot_above(runtime, x, layer_idx, mosaic_priority, mosaic_color);
                    }
                    if ((((layer.sub_bg_enabled) && (((Number((window_below[x] ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        method_plot_below(runtime, x, layer_idx, mosaic_priority, mosaic_color);
                    }
                }
                else {
                    let _x = ((runtime.shiftRight(x, 1)) >>> 0);
                    if (((x) & (1))) {
                        if ((((layer.main_bg_enabled) && (((Number((window_above[_x] ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                            method_plot_above(runtime, _x, layer_idx, mosaic_priority, mosaic_color);
                        }
                    }
                    else {
                        if ((((layer.sub_bg_enabled) && (((Number((window_below[_x] ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                            method_plot_below(runtime, _x, layer_idx, mosaic_priority, mosaic_color);
                        }
                    }
                }
            }
        }
    }
    function __add_update_line(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_get_tile(runtime, layer_idx, hoffset, voffset) {
        const members = runtime.members;
        let __t0, __t1;
        layer_idx = ((layer_idx) & 0xff);
        const h_m_layer = members.m_layer ?? 0;
        let self = h_m_layer[layer_idx];
        let hires = (((((((((members.m_mode ?? 0)) === (5)) ? 1 : 0)) || (((((members.m_mode ?? 0)) === (6)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        let tile_height = ((((3) + (self.tile_size))) >>> 0);
        let tile_width = ((((((hires) ? 0 : 1)) ? (tile_height) : (4))) >>> 0);
        let screenx = ((((((self.tilemap_size) & (1))) ? (1024) : (0))) >>> 0);
        let screeny = ((((((self.tilemap_size) & (2))) ? (((32) << (__add_get_tile(runtime, 5, ((self.tilemap_size) & (1)))))) : (0))) >>> 0);
        let tilex = ((((hoffset) >>> (tile_width))) >>> 0);
        let tiley = ((((voffset) >>> (tile_height))) >>> 0);
        let offset = ((((((((tiley) & (31))) << (5))) | (((tilex) & (31))))) >>> 0);
        if (((tilex) & (32))) {
            offset = ((((offset) + (screenx))) >>> 0);
        }
        if (((tiley) & (32))) {
            offset = ((((offset) + (screeny))) >>> 0);
        }
        let addr = ((((((((self.tilemap) + (offset))) & (32767))) << (1))) >>> 0);
        return (((((__t0 = (members.m_vram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[addr] ?? 0) : runtime.readIndex(__t0, addr))) | ((((__t1 = (members.m_vram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((addr) + (1))] ?? 0) : runtime.readIndex(__t1, ((addr) + (1))))) << (8))))) >>> 0);
    }
    function __add_get_tile(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_direct_color(runtime, palette, group) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["pen_indirect"];
        palette = ((palette) & 0xffff);
        group = ((group) & 0xffff);
        return (((__L0 ? __L0(__add_direct_color(runtime, ((256) + (palette)), ((group) * (256)))) : runtime.macro("pen_indirect", __add_direct_color(runtime, ((256) + (palette)), ((group) * (256)))))) & 0xffff);
    }
    function __add_direct_color(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_plot_above(runtime, x, source, priority, color, blend_exception = 0) {
        const members = runtime.members;
        x = ((x) & 0xffff);
        source = ((source) & 0xff);
        priority = ((priority) & 0xff);
        color = ((color) & 0xffff);
        const h_m_scanlines = members.m_scanlines ?? 0;
        if ((((priority) > (h_m_scanlines[0].priority[x])) ? 1 : 0)) {
            h_m_scanlines[0].priority[x] = priority;
            h_m_scanlines[0].buffer[x] = color;
            h_m_scanlines[0].layer[x] = source;
            h_m_scanlines[0].blend_exception[x] = blend_exception;
        }
    }
    function method_plot_below(runtime, x, source, priority, color, blend_exception = 0) {
        const members = runtime.members;
        x = ((x) & 0xffff);
        source = ((source) & 0xff);
        priority = ((priority) & 0xff);
        color = ((color) & 0xffff);
        const h_m_scanlines = members.m_scanlines ?? 0;
        if ((((priority) > (h_m_scanlines[1].priority[x])) ? 1 : 0)) {
            h_m_scanlines[1].priority[x] = priority;
            h_m_scanlines[1].buffer[x] = color;
            h_m_scanlines[1].layer[x] = source;
            h_m_scanlines[1].blend_exception[x] = blend_exception;
        }
    }
    function method_update_line_mode7(runtime, curline, layer_idx) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["util::sext"], __L1 = __l["pen_indirect"];
        let __t0, __t1;
        curline = ((curline) & 0xffff);
        layer_idx = ((layer_idx) & 0xff);
        const h_m_layer = members.m_layer ?? 0;
        const h_m_mode7 = members.m_mode7 ?? 0;
        let self = h_m_layer[layer_idx];
        let _y = ((((self.mosaic_enabled) ? (self.mosaic_offset) : (curline))) | 0);
        let y = ((((((h_m_mode7.vflip) ? 0 : 1)) ? (_y) : (((255) - (_y))))) | 0);
        let a = ((h_m_mode7.matrix_a) | 0);
        let b = ((h_m_mode7.matrix_b) | 0);
        let c = ((h_m_mode7.matrix_c) | 0);
        let d = ((h_m_mode7.matrix_d) | 0);
        let hcenter = (((__L0 ? __L0(h_m_mode7.origin_x, 13) : runtime.macro("util::sext", h_m_mode7.origin_x, 13))) | 0);
        let vcenter = (((__L0 ? __L0(h_m_mode7.origin_y, 13) : runtime.macro("util::sext", h_m_mode7.origin_y, 13))) | 0);
        let hoffset = (((__L0 ? __L0(h_m_mode7.hor_offset, 13) : runtime.macro("util::sext", h_m_mode7.hor_offset, 13))) | 0);
        let voffset = (((__L0 ? __L0(h_m_mode7.ver_offset, 13) : runtime.macro("util::sext", h_m_mode7.ver_offset, 13))) | 0);
        let mosaic_counter = ((1) >>> 0);
        let mosaic_palette = ((0) >>> 0);
        let mosaic_priority = ((0) & 0xff);
        let mosaic_color = ((0) & 0xffff);
        let origin_x = ((__add_update_line_mode7(runtime, __add_update_line_mode7(runtime, __add_update_line_mode7(runtime, ((((a) * (((((((hoffset) - (hcenter))) & (8192))) ? (((((hoffset) - (hcenter))) | (-1024))) : (((((hoffset) - (hcenter))) & (1023))))))) & (-64)), ((((b) * (((((((voffset) - (vcenter))) & (8192))) ? (((((voffset) - (vcenter))) | (-1024))) : (((((voffset) - (vcenter))) & (1023))))))) & (-64))), ((((b) * (y))) & (-64))), ((hcenter) << (8)))) | 0);
        let origin_y = ((__add_update_line_mode7(runtime, __add_update_line_mode7(runtime, __add_update_line_mode7(runtime, ((((c) * (((((((hoffset) - (hcenter))) & (8192))) ? (((((hoffset) - (hcenter))) | (-1024))) : (((((hoffset) - (hcenter))) & (1023))))))) & (-64)), ((((d) * (((((((voffset) - (vcenter))) & (8192))) ? (((((voffset) - (vcenter))) | (-1024))) : (((((voffset) - (vcenter))) & (1023))))))) & (-64))), ((((d) * (y))) & (-64))), ((vcenter) << (8)))) | 0);
        let window_above = cppScratch_update_line_mode7_window_above.fill(0);
        let window_below = cppScratch_update_line_mode7_window_below.fill(0);
        method_render_window(runtime, layer_idx, self.main_window_enabled, window_above);
        method_render_window(runtime, layer_idx, self.sub_window_enabled, window_below);
        for (let _x = ((0) | 0); (((_x) < (256)) ? 1 : 0); _x = ((((_x) + (1))) | 0)) {
            let x = ((((((h_m_mode7.hflip) ? 0 : 1)) ? (_x) : (((255) - (_x))))) | 0);
            let pixel_x = ((runtime.shiftRight(((origin_x) + (((a) * (x)))), 8)) | 0);
            let pixel_y = ((runtime.shiftRight(((origin_y) + (((c) * (x)))), 8)) | 0);
            let tile_x = ((((runtime.shiftRight(pixel_x, 3)) & (127))) | 0);
            let tile_y = ((((runtime.shiftRight(pixel_y, 3)) & (127))) | 0);
            let out_of_bounds = ((((((pixel_x) | (pixel_y))) & (-1024))) ? 1 : 0);
            let tile_address = ((((((((tile_y) * (128))) + (tile_x))) << (1))) & 0xffff);
            let palette_address = ((((__add_update_line_mode7(runtime, ((((pixel_y) & (7))) << (3)), ((pixel_x) & (7)))) & (32767))) & 0xffff);
            let tile = ((((((((((h_m_mode7.repeat) === (3)) ? 1 : 0)) && (out_of_bounds)) ? 1 : 0)) ? (0) : ((__t0 = (members.m_vram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[tile_address] ?? 0) : runtime.readIndex(__t0, tile_address))))) & 0xff);
            let palette = ((((((((((h_m_mode7.repeat) === (2)) ? 1 : 0)) && (out_of_bounds)) ? 1 : 0)) ? (0) : ((__t1 = (members.m_vram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((((((((tile) << (6))) | (palette_address))) << (1))) | (1))] ?? 0) : runtime.readIndex(__t1, ((((((((tile) << (6))) | (palette_address))) << (1))) | (1))))))) & 0xff);
            let priority = ((0) & 0xff);
            if (((Number(layer_idx) === Number(0)) ? 1 : 0)) {
                priority = ((self.priority[0]) & 0xff);
            }
            else {
                if (((Number(layer_idx) === Number(1)) ? 1 : 0)) {
                    priority = ((self.priority[((palette) >>> (7))]) & 0xff);
                    palette = ((((palette) & (127))) & 0xff);
                }
            }
            if ((((((self.mosaic_enabled) ? 0 : 1)) || (((Number((mosaic_counter = ((((mosaic_counter) - (1))) >>> 0))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                mosaic_counter = ((((1) + ((members.m_mosaic_size ?? 0)))) >>> 0);
                mosaic_palette = ((palette) >>> 0);
                mosaic_priority = ((priority) & 0xff);
                if (((((members.m_direct_color ?? 0)) && (((Number(layer_idx) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                    mosaic_color = ((method_direct_color(runtime, palette, 0)) & 0xffff);
                }
                else {
                    mosaic_color = (((__L1 ? __L1(palette) : runtime.macro("pen_indirect", palette))) & 0xffff);
                }
            }
            if (((mosaic_palette) ? 0 : 1)) {
                continue;
            }
            if ((((self.main_bg_enabled) && (((Number((window_above[_x] ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                method_plot_above(runtime, _x, layer_idx, mosaic_priority, mosaic_color);
            }
            if ((((self.sub_bg_enabled) && (((Number((window_below[_x] ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                method_plot_below(runtime, _x, layer_idx, mosaic_priority, mosaic_color);
            }
        }
    }
    function __add_update_line_mode7(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_update_objects(runtime, curline) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["pen_indirect"];
        let __t0, __t1, __t2, __t3, __t4, __t5;
        curline = ((curline) & 0xffff);
        const h_m_layer = members.m_layer ?? 0;
        const h___local_update_objects_items = members.__local_update_objects_items ?? 0;
        const h___local_update_objects_tiles = members.__local_update_objects_tiles ?? 0;
        const h_m_oam = members.m_oam ?? 0;
        const h_m_objects = members.m_objects ?? 0;
        if ((((((h_m_layer[4].main_bg_enabled) ? 0 : 1)) && (((h_m_layer[4].sub_bg_enabled) ? 0 : 1))) ? 1 : 0)) {
            return;
        }
        let window_above = cppScratch_update_objects_window_above.fill(0);
        let window_below = cppScratch_update_objects_window_below.fill(0);
        method_render_window(runtime, 4, h_m_layer[4].main_window_enabled, window_above);
        method_render_window(runtime, 4, h_m_layer[4].sub_window_enabled, window_below);
        let item_count = ((0) >>> 0);
        let tile_count = ((0) >>> 0);
        let items = h___local_update_objects_items;
        let tiles = h___local_update_objects_tiles;
        struct_clear_object_item(runtime, items, 0, ((1) * (32)));
        struct_clear_object_tile(runtime, tiles, 0, ((1) * (34)));
        for (let n = ((0) >>> 0); (((n) < (128)) ? 1 : 0); n = ((((n) + (1))) >>> 0)) {
            let item = new cppStruct_valid_index_width_height(1, ((((((h_m_oam.first) + (n))) & (127))) & 0xff), 0, 0);
            let obj = h_m_objects[item.index];
            if ((((obj.size) === (0)) ? 1 : 0)) {
                item.width = (((__mame_table_0[((h_m_oam.base_size) & 7)] ?? 0)) & 0xff);
                item.height = (((__mame_table_1[((h_m_oam.base_size) & 7)] ?? 0)) & 0xff);
                if ((((h_m_oam.interlace) && ((((h_m_oam.base_size) >= (6)) ? 1 : 0))) ? 1 : 0)) {
                    item.height = ((16) & 0xff);
                }
            }
            else {
                item.width = (((__mame_table_2[((h_m_oam.base_size) & 7)] ?? 0)) & 0xff);
                item.height = (((__mame_table_3[((h_m_oam.base_size) & 7)] ?? 0)) & 0xff);
            }
            if (((((((obj.x) > (256)) ? 1 : 0)) && (((Number(((((obj.x) + (item.width))) - (1))) < Number(512)) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            let height = ((((item.height) >>> (h_m_oam.interlace))) >>> 0);
            if ((((((((((curline) >= (obj.y)) ? 1 : 0)) && (((Number(curline) < Number(((obj.y) + (height)))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((obj.y) + (height))) >= Number(256)) ? 1 : 0)) && (((Number(curline) < Number(((((obj.y) + (height))) & (255)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                if (((Number((__t0 = item_count, item_count = ((((item_count) + (1))) >>> 0), __t0)) >= Number(32)) ? 1 : 0)) {
                    break;
                }
                runtime.writeIndex(items, ((item_count) - (1)), item);
            }
        }
        for (let n = ((31) | 0); (((n) >= (0)) ? 1 : 0); n = ((((n) - (1))) | 0)) {
            let item = runtime.readIndex(items, n);
            if (((item.valid) ? 0 : 1)) {
                continue;
            }
            let obj = h_m_objects[item.index];
            let tile_width = ((((item.width) >>> (3))) >>> 0);
            let x = ((obj.x) & 0xffff);
            let y = ((((((curline) - (obj.y))) & (255))) & 0xffff);
            if (h_m_oam.interlace) {
                y = ((((y) << (1))) & 0xffff);
            }
            if (obj.vflip) {
                if ((((item.width) === (item.height)) ? 1 : 0)) {
                    y = ((((((item.height) - (1))) - (y))) & 0xffff);
                }
                else {
                    if ((((y) < (item.width)) ? 1 : 0)) {
                        y = ((((((item.width) - (1))) - (y))) & 0xffff);
                    }
                    else {
                        y = ((((((item.width) + (((item.width) - (1))))) - (((y) - (item.width))))) & 0xffff);
                    }
                }
            }
            if (h_m_oam.interlace) {
                y = ((((((obj.vflip) ? 0 : 1)) ? (((y) + (((((members.m_stat78 ?? 0)) >>> (7)) & 1)))) : (((y) - (((((members.m_stat78 ?? 0)) >>> (7)) & 1)))))) & 0xffff);
            }
            x = ((((x) & (511))) & 0xffff);
            y = ((((y) & (255))) & 0xffff);
            let tile_data_address = ((h_m_oam.tile_data_address) & 0xffff);
            if (obj.name_select) {
                tile_data_address = ((((tile_data_address) + (((((h_m_oam.name_select) + (1))) << (12))))) & 0xffff);
            }
            let character_x = ((((obj.character) & (15))) & 0xffff);
            let character_y = ((((((__add_update_objects(runtime, ((obj.character) >>> (4)), ((y) >>> (3)))) & (15))) << (4))) & 0xffff);
            for (let tile_x = ((0) >>> 0); (((tile_x) < (tile_width)) ? 1 : 0); tile_x = ((((tile_x) + (1))) >>> 0)) {
                let object_x = ((((((x) + (((tile_x) << (3))))) & (511))) >>> 0);
                if ((((((((((x) !== (256)) ? 1 : 0)) && ((((object_x) >= (256)) ? 1 : 0))) ? 1 : 0)) && (((Number(((object_x) + (7))) < Number(512)) ? 1 : 0))) ? 1 : 0)) {
                    continue;
                }
                let tile = new cppStruct_valid_x_y_pri_pal_hflip_data(1, 0, 0, 0, 0, 0, 0);
                tile.x = ((object_x) & 0xffff);
                tile.y = ((y) & 0xff);
                tile.pri = ((obj.pri) & 0xff);
                tile.pal = ((__add_update_objects(runtime, 128, ((obj.pal) << (4)))) & 0xff);
                tile.hflip = ((obj.hflip) & 0xff);
                let mirror_x = ((((((obj.hflip) ? 0 : 1)) ? (tile_x) : (((((tile_width) - (1))) - (tile_x))))) >>> 0);
                let address = ((((tile_data_address) + (((((character_y) + (((((character_x) + (mirror_x))) & (15))))) << (4))))) >>> 0);
                address = ((((__add_update_objects(runtime, ((address) & (32752)), ((y) & (7)))) << (1))) >>> 0);
                tile.data = (((((__t1 = (members.m_vram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((address) + (0))] ?? 0) : runtime.readIndex(__t1, ((address) + (0))))) << (0))) >>> 0);
                tile.data = ((((tile.data) | ((((__t2 = (members.m_vram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[((address) + (1))] ?? 0) : runtime.readIndex(__t2, ((address) + (1))))) << (8))))) >>> 0);
                tile.data = ((((tile.data) | ((((__t3 = (members.m_vram ?? 0), ArrayBuffer.isView(__t3) ? (__t3[((address) + (16))] ?? 0) : runtime.readIndex(__t3, ((address) + (16))))) << (16))))) >>> 0);
                tile.data = ((((tile.data) | ((((__t4 = (members.m_vram ?? 0), ArrayBuffer.isView(__t4) ? (__t4[((address) + (17))] ?? 0) : runtime.readIndex(__t4, ((address) + (17))))) << (24))))) >>> 0);
                if (((Number((__t5 = tile_count, tile_count = ((((tile_count) + (1))) >>> 0), __t5)) >= Number(34)) ? 1 : 0)) {
                    break;
                }
                runtime.writeIndex(tiles, ((tile_count) - (1)), tile);
            }
        }
        if ((((item_count) > (32)) ? 1 : 0)) {
            members.m_stat77 = ((((members.m_stat77) | (64))) & 0xff);
        }
        if ((((tile_count) > (34)) ? 1 : 0)) {
            members.m_stat77 = ((((members.m_stat77) | (128))) & 0xff);
        }
        let palbuf = cppScratch_update_objects_palbuf.fill(0);
        let pribuf = cppScratch_update_objects_pribuf.fill(0);
        for (let n = ((0) >>> 0); (((n) < (34)) ? 1 : 0); n = ((((n) + (1))) >>> 0)) {
            let tile = runtime.readIndex(tiles, n);
            if (((tile.valid) ? 0 : 1)) {
                continue;
            }
            let tile_x = ((tile.x) >>> 0);
            for (let x = ((0) >>> 0); (((x) < (8)) ? 1 : 0); x = ((((x) + (1))) >>> 0)) {
                tile_x = ((((tile_x) & (511))) >>> 0);
                if ((((tile_x) < (256)) ? 1 : 0)) {
                    let color = ((0) >>> 0);
                    let shift = ((((tile.hflip) ? (x) : (((7) - (x))))) >>> 0);
                    color = ((((((tile.data) >>> (((shift) + (0))))) & (1))) >>> 0);
                    color = ((((color) | (((((tile.data) >>> (((shift) + (7))))) & (2))))) >>> 0);
                    color = ((((color) | (((((tile.data) >>> (((shift) + (14))))) & (4))))) >>> 0);
                    color = ((((color) | (((((tile.data) >>> (((shift) + (21))))) & (8))))) >>> 0);
                    if (color) {
                        palbuf[tile_x] = ((tile.pal) + (color));
                        pribuf[tile_x] = h_m_oam.priority[tile.pri];
                    }
                }
                tile_x = ((((tile_x) + (1))) >>> 0);
            }
        }
        for (let x = ((0) >>> 0); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) >>> 0)) {
            if ((((pribuf[x] ?? 0)) ? 0 : 1)) {
                continue;
            }
            let blend = ((((((Number((palbuf[x] ?? 0)) < Number(192)) ? 1 : 0)) ? (1) : (0))) | 0);
            if ((((h_m_layer[4].main_bg_enabled) && (((Number((window_above[x] ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                method_plot_above(runtime, x, 4, (pribuf[x] ?? 0), (__L0 ? __L0((palbuf[x] ?? 0)) : runtime.macro("pen_indirect", (palbuf[x] ?? 0))), blend);
            }
            if ((((h_m_layer[4].sub_bg_enabled) && (((Number((window_below[x] ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                method_plot_below(runtime, x, 4, (pribuf[x] ?? 0), (__L0 ? __L0((palbuf[x] ?? 0)) : runtime.macro("pen_indirect", (palbuf[x] ?? 0))), blend);
            }
        }
    }
    function __add_update_objects(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_update_color_windowmasks(runtime, mask, output) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        const h_m_layer = members.m_layer ?? 0;
        let self = h_m_layer[5];
        let set = ((0) & 0xff);
        let clear = ((0) & 0xff);
        switch (mask) {
            case 0:
                {
                    cppMemset(runtime, output, 1, 256);
                    return;
                }
            case 1:
                {
                    set = ((1) & 0xff);
                    clear = ((0) & 0xff);
                    break;
                }
            case 2:
                {
                    set = ((0) & 0xff);
                    clear = ((1) & 0xff);
                    break;
                }
            case 3:
                {
                    cppMemset(runtime, output, 0, 256);
                    return;
                }
        }
        if ((((((self.window1_enabled) ? 0 : 1)) && (((self.window2_enabled) ? 0 : 1))) ? 1 : 0)) {
            cppMemset(runtime, output, clear, 256);
            return;
        }
        if ((((self.window1_enabled) && (((self.window2_enabled) ? 0 : 1))) ? 1 : 0)) {
            if (self.window1_invert) {
                set = ((((set) ^ (1))) & 0xff);
                clear = ((((clear) ^ (1))) & 0xff);
            }
            for (let x = ((0) & 0xffff); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) & 0xffff)) {
                runtime.writeIndex(output, x, ((((((((x) >= ((members.m_window1_left ?? 0))) ? 1 : 0)) && ((((x) <= ((members.m_window1_right ?? 0))) ? 1 : 0))) ? 1 : 0)) ? (set) : (clear)));
            }
            return;
        }
        if ((((self.window2_enabled) && (((self.window1_enabled) ? 0 : 1))) ? 1 : 0)) {
            if (self.window2_invert) {
                set = ((((set) ^ (1))) & 0xff);
                clear = ((((clear) ^ (1))) & 0xff);
            }
            for (let x = ((0) & 0xffff); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) & 0xffff)) {
                runtime.writeIndex(output, x, ((((((((x) >= ((members.m_window2_left ?? 0))) ? 1 : 0)) && ((((x) <= ((members.m_window2_right ?? 0))) ? 1 : 0))) ? 1 : 0)) ? (set) : (clear)));
            }
            return;
        }
        for (let x = ((0) & 0xffff); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) & 0xffff)) {
            let one_mask = ((((((((((((x) >= ((members.m_window1_left ?? 0))) ? 1 : 0)) && ((((x) <= ((members.m_window1_right ?? 0))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) ^ (self.window1_invert))) & 0xff);
            let two_mask = ((((((((((((x) >= ((members.m_window2_left ?? 0))) ? 1 : 0)) && ((((x) <= ((members.m_window2_right ?? 0))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) ^ (self.window2_invert))) & 0xff);
            switch (self.wlog_mask) {
                case 0:
                    {
                        runtime.writeIndex(output, x, ((((Number(((one_mask) | (two_mask))) === Number(1)) ? 1 : 0)) ? (set) : (clear)));
                        break;
                    }
                case 1:
                    {
                        runtime.writeIndex(output, x, ((((Number(((one_mask) & (two_mask))) === Number(1)) ? 1 : 0)) ? (set) : (clear)));
                        break;
                    }
                case 2:
                    {
                        runtime.writeIndex(output, x, ((((Number(((one_mask) ^ (two_mask))) === Number(1)) ? 1 : 0)) ? (set) : (clear)));
                        break;
                    }
                case 3:
                    {
                        runtime.writeIndex(output, x, ((((Number(((one_mask) ^ (two_mask))) === Number(0)) ? 1 : 0)) ? (set) : (clear)));
                        break;
                    }
            }
        }
    }
    function method_refresh_scanline(runtime, bitmap, curline) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rgb_t::black"], __L1 = __l["pen_indirect"], __L2 = __l["indirect_color"];
        curline = ((curline) & 0xffff);
        const h_m_scanlines = members.m_scanlines ?? 0;
        let blurring = (((((__deref_refresh_scanline(runtime, members.m_options).read_safe?.(0) ?? 0)) & (1))) ? 1 : 0);
        let profile = 0;
        method_cache_background(runtime);
        if ((members.m_screen_disabled ?? 0)) {
            for (let x = ((0) | 0); ((Number(x) < Number(512)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                bitmap["pix="](0, x, (__L0 ? __L0() : runtime.macro("rgb_t::black")));
            }
        }
        else {
            let window_above = cppScratch_refresh_scanline_window_above.fill(0);
            let window_below = cppScratch_refresh_scanline_window_below.fill(0);
            cppMemset(runtime, h_m_scanlines[0].priority, 0, 256);
            cppMemset(runtime, h_m_scanlines[1].priority, 0, 256);
            cppMemset(runtime, h_m_scanlines[0].layer, 5, 256);
            cppMemset(runtime, h_m_scanlines[1].layer, 5, 256);
            cppMemset(runtime, h_m_scanlines[0].blend_exception, 0, 256);
            cppMemset(runtime, h_m_scanlines[1].blend_exception, 0, 256);
            let above = __addr_refresh_scanline(runtime, h_m_scanlines, 0);
            let __pointee_above = __deref_refresh_scanline(runtime, above);
            let below = __addr_refresh_scanline(runtime, h_m_scanlines, 1);
            let __pointee_below = __deref_refresh_scanline(runtime, below);
            let hires = ((((((((((((members.m_mode ?? 0)) === (5)) ? 1 : 0)) || (((((members.m_mode ?? 0)) === (6)) ? 1 : 0))) ? 1 : 0)) || ((members.m_pseudo_hires ?? 0))) ? 1 : 0)) ? 1 : 0);
            let above_color = (((__L1 ? __L1(0) : runtime.macro("pen_indirect", 0))) & 0xffff);
            let below_color = ((((hires) ? ((__L1 ? __L1(0) : runtime.macro("pen_indirect", 0))) : ((__L1 ? __L1(2304) : runtime.macro("pen_indirect", 2304))))) & 0xffff);
            for (let x = ((0) | 0); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                __pointee_above.buffer[x] = above_color;
                __pointee_above.priority[x] = 0;
                __pointee_above.layer[x] = 5;
                __pointee_below.buffer[x] = below_color;
                __pointee_below.priority[x] = 0;
                __pointee_below.layer[x] = 5;
            }
            method_update_color_windowmasks(runtime, (members.m_clip_to_black ?? 0), window_above);
            method_update_color_windowmasks(runtime, (members.m_prevent_color_math ?? 0), window_below);
            method_draw_screens(runtime, curline);
            method_update_objects(runtime, curline);
            let prev = ((0) & 0xffff);
            let luma = __addr_refresh_scanline(runtime, runtime.readIndex((members.m_light_table ?? 0), (members.m_screen_brightness ?? 0)), 0);
            let luma$s = undefined, luma$o = 0;
            if (ArrayBuffer.isView(luma) || Array.isArray(luma))
                luma$s = luma;
            else if (luma !== null && typeof luma === 'object' && luma.generatedPointer === true && luma.path === undefined && luma.target === undefined && (ArrayBuffer.isView(luma.source) || Array.isArray(luma.source))) {
                luma$s = luma.source;
                luma$o = luma.offset;
            }
            for (let x = ((0) | 0); (((x) < (256)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                if (((hires) ? 0 : 1)) {
                    let c = (((luma$s !== undefined ? (luma$s[luma$o + (method_pixel(runtime, x, above, below, window_above, window_below))] ?? 0) : runtime.readIndex(luma, method_pixel(runtime, x, above, below, window_above, window_below)))) & 0xffff);
                    bitmap["pix="](0, __add_refresh_scanline(runtime, ((x) * (2)), 0), (__L2 ? __L2(((c) & (32767))) : runtime.macro("indirect_color", ((c) & (32767)))));
                    bitmap["pix="](0, __add_refresh_scanline(runtime, ((x) * (2)), 1), (__L2 ? __L2(((c) & (32767))) : runtime.macro("indirect_color", ((c) & (32767)))));
                }
                else {
                    if (((blurring) ? 0 : 1)) {
                        let c0 = (((luma$s !== undefined ? (luma$s[luma$o + (method_pixel(runtime, x, below, above, window_above, window_below))] ?? 0) : runtime.readIndex(luma, method_pixel(runtime, x, below, above, window_above, window_below)))) & 0xffff);
                        let c1 = (((luma$s !== undefined ? (luma$s[luma$o + (method_pixel(runtime, x, above, below, window_above, window_below))] ?? 0) : runtime.readIndex(luma, method_pixel(runtime, x, above, below, window_above, window_below)))) & 0xffff);
                        bitmap["pix="](0, __add_refresh_scanline(runtime, ((x) * (2)), 0), (__L2 ? __L2(((c0) & (32767))) : runtime.macro("indirect_color", ((c0) & (32767)))));
                        bitmap["pix="](0, __add_refresh_scanline(runtime, ((x) * (2)), 1), (__L2 ? __L2(((c1) & (32767))) : runtime.macro("indirect_color", ((c1) & (32767)))));
                    }
                    else {
                        let curr = (((luma$s !== undefined ? (luma$s[luma$o + (method_pixel(runtime, x, below, above, window_above, window_below))] ?? 0) : runtime.readIndex(luma, method_pixel(runtime, x, below, above, window_above, window_below)))) & 0xffff);
                        let c0 = ((runtime.shiftRight(((((prev) + (curr))) - (((((prev) ^ (curr))) & (1057)))), 1)) & 0xffff);
                        bitmap["pix="](0, __add_refresh_scanline(runtime, ((x) * (2)), 0), (__L2 ? __L2(((c0) & (32767))) : runtime.macro("indirect_color", ((c0) & (32767)))));
                        prev = ((curr) & 0xffff);
                        curr = (((luma$s !== undefined ? (luma$s[luma$o + (method_pixel(runtime, x, above, below, window_above, window_below))] ?? 0) : runtime.readIndex(luma, method_pixel(runtime, x, above, below, window_above, window_below)))) & 0xffff);
                        let c1 = ((runtime.shiftRight(((((prev) + (curr))) - (((((prev) ^ (curr))) & (1057)))), 1)) & 0xffff);
                        bitmap["pix="](0, __add_refresh_scanline(runtime, ((x) * (2)), 1), (__L2 ? __L2(((c1) & (32767))) : runtime.macro("indirect_color", ((c1) & (32767)))));
                        prev = ((curr) & 0xffff);
                    }
                }
            }
        }
    }
    function __add_refresh_scanline(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_refresh_scanline(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_refresh_scanline(runtime, p) {
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
    function method_cache_background(runtime) {
        const members = runtime.members;
        const h_m_beam = members.m_beam ?? 0;
        const h_m_layer = members.m_layer ?? 0;
        for (let i = ((0) | 0); ((Number(i) <= Number(3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if ((((h_m_beam.current_vert) === (1)) ? 1 : 0)) {
                h_m_layer[i].mosaic_counter = (((((members.m_mosaic_size ?? 0)) + (1))) & 0xffff);
                h_m_layer[i].mosaic_offset = ((1) & 0xffff);
            }
            else {
                if (((Number((h_m_layer[i].mosaic_counter = ((((h_m_layer[i].mosaic_counter) - (1))) & 0xffff))) === Number(0)) ? 1 : 0)) {
                    h_m_layer[i].mosaic_counter = (((((members.m_mosaic_size ?? 0)) + (1))) & 0xffff);
                    h_m_layer[i].mosaic_offset = ((((h_m_layer[i].mosaic_offset) + ((((members.m_mosaic_size ?? 0)) + (1))))) & 0xffff);
                }
            }
        }
    }
    function method_draw_screens(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        switch ((members.m_mode ?? 0)) {
            case 0:
                {
                    method_update_mode_0(runtime, curline);
                    break;
                }
            case 1:
                {
                    method_update_mode_1(runtime, curline);
                    break;
                }
            case 2:
                {
                    method_update_mode_2(runtime, curline);
                    break;
                }
            case 3:
                {
                    method_update_mode_3(runtime, curline);
                    break;
                }
            case 4:
                {
                    method_update_mode_4(runtime, curline);
                    break;
                }
            case 5:
                {
                    method_update_mode_5(runtime, curline);
                    break;
                }
            case 6:
                {
                    method_update_mode_6(runtime, curline);
                    break;
                }
            case 7:
                {
                    method_update_mode_7(runtime, curline);
                    break;
                }
        }
    }
    function method_update_mode_0(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        method_update_line(runtime, curline, 0, 0);
        method_update_line(runtime, curline, 1, 0);
        method_update_line(runtime, curline, 2, 0);
        method_update_line(runtime, curline, 3, 0);
    }
    function method_update_mode_1(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        method_update_line(runtime, curline, 0, 0);
        method_update_line(runtime, curline, 1, 0);
        method_update_line(runtime, curline, 2, 0);
    }
    function method_update_mode_2(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        method_update_line(runtime, curline, 0, 0);
        method_update_line(runtime, curline, 1, 0);
    }
    function method_update_mode_3(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        method_update_line(runtime, curline, 0, (members.m_direct_color ?? 0));
        method_update_line(runtime, curline, 1, 0);
    }
    function method_update_mode_4(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        method_update_line(runtime, curline, 0, (members.m_direct_color ?? 0));
        method_update_line(runtime, curline, 1, 0);
    }
    function method_update_mode_5(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        method_update_line(runtime, curline, 0, 0);
        method_update_line(runtime, curline, 1, 0);
    }
    function method_update_mode_6(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        method_update_line(runtime, curline, 0, 0);
    }
    function method_update_mode_7(runtime, curline) {
        const members = runtime.members;
        curline = ((curline) & 0xffff);
        const h_m_mode7 = members.m_mode7 ?? 0;
        if (((h_m_mode7.extbg) ? 0 : 1)) {
            method_update_line_mode7(runtime, curline, 0);
        }
        else {
            method_update_line_mode7(runtime, curline, 0);
            method_update_line_mode7(runtime, curline, 1);
        }
    }
    function method_pixel(runtime, x, above, below, window_above, window_below) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["pen_indirect"];
        const __pointee_above = __deref_pixel(runtime, above);
        const __pointee_below = __deref_pixel(runtime, below);
        x = ((x) & 0xffff);
        const h_m_layer = members.m_layer ?? 0;
        if (((runtime.readIndex(window_above, x)) ? 0 : 1)) {
            __pointee_above.buffer[x] = 0;
        }
        if (((runtime.readIndex(window_below, x)) ? 0 : 1)) {
            return ((__pointee_above.buffer[x]) & 0xffff);
        }
        if ((((((h_m_layer[__pointee_above.layer[x]].color_math) ? 0 : 1)) || ((((((Number(__pointee_above.layer[x]) === Number(4)) ? 1 : 0)) && (__pointee_above.blend_exception[x])) ? 1 : 0))) ? 1 : 0)) {
            return ((__pointee_above.buffer[x]) & 0xffff);
        }
        if ((((members.m_sub_add_mode ?? 0)) ? 0 : 1)) {
            return ((method_blend(runtime, __pointee_above.buffer[x], (__L0 ? __L0(2304) : runtime.macro("pen_indirect", 2304)), (((((Number(((((members.m_color_modes ?? 0)) >>> (0)) & 1)) !== Number(0)) ? 1 : 0)) && (((Number(runtime.readIndex(window_above, x)) !== Number(0)) ? 1 : 0))) ? 1 : 0))) & 0xffff);
        }
        return ((method_blend(runtime, __pointee_above.buffer[x], __pointee_below.buffer[x], ((((((((Number(((((members.m_color_modes ?? 0)) >>> (0)) & 1)) !== Number(0)) ? 1 : 0)) && (((Number(runtime.readIndex(window_above, x)) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(__pointee_below.layer[x]) !== Number(5)) ? 1 : 0))) ? 1 : 0))) & 0xffff);
    }
    function __deref_pixel(runtime, p) {
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
    function method_blend(runtime, x, y, halve) {
        const members = runtime.members;
        x = ((x) & 0xffff);
        y = ((y) & 0xffff);
        if (((((((members.m_color_modes ?? 0)) >>> (1)) & 1)) ? 0 : 1)) {
            if (((halve) ? 0 : 1)) {
                let sum = ((((x) + (y))) & 0xffff);
                let carry = ((((((sum) - (((((x) ^ (y))) & (1057))))) & (33824))) & 0xffff);
                return ((((((sum) - (carry))) | (((carry) - (((carry) >>> (5))))))) & 0xffff);
            }
            else {
                return ((runtime.shiftRight(((((x) + (y))) - (((((x) ^ (y))) & (1057)))), 1)) & 0xffff);
            }
        }
        else {
            let diff = ((__add_blend(runtime, ((x) - (y)), 33824)) & 0xffff);
            let borrow = ((((((diff) - (((((x) ^ (y))) & (33824))))) & (33824))) & 0xffff);
            if (((halve) ? 0 : 1)) {
                return ((((((diff) - (borrow))) & (((borrow) - (((borrow) >>> (5))))))) & 0xffff);
            }
            else {
                return ((runtime.shiftRight(((((((diff) - (borrow))) & (((borrow) - (((borrow) >>> (5))))))) & (31710)), 1)) & 0xffff);
            }
        }
    }
    function __add_blend(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_vram_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().vpos"], __L2 = __l["screen().hpos"];
        let __t0, __t1, __t2;
        const h_m_beam = members.m_beam ?? 0;
        let res = ((0) & 0xff);
        offset = ((offset) & (65535));
        if ((members.m_screen_disabled ?? 0)) {
            res = (((__t0 = (members.m_vram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
        }
        else {
            let v = ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) & 0xffff);
            let h = ((((__L2 ?? globalThis.mamekitMissingCall?.("screen().hpos"))?.() ?? 0)) & 0xffff);
            let ls = ((((runtime.shiftRight(((((Number((((members.m_stat78 ?? 0)) & (16))) === Number(0)) ? 1 : 0)) ? (525) : (625)), 1)) - (1))) & 0xffff);
            if (((((members.m_interlace ?? 0)) === (2)) ? 1 : 0)) {
                ls = ((((ls) + (1))) & 0xffff);
            }
            if (((((((v) === (ls)) ? 1 : 0)) && ((((h) === (1362)) ? 1 : 0))) ? 1 : 0)) {
                res = ((0) & 0xff);
            }
            else {
                if (((Number(v) < Number(((h_m_beam.last_visible_line) - (1)))) ? 1 : 0)) {
                    res = ((0) & 0xff);
                }
                else {
                    if (((Number(v) === Number(((h_m_beam.last_visible_line) - (1)))) ? 1 : 0)) {
                        if ((((h) === (1362)) ? 1 : 0)) {
                            res = (((__t1 = (members.m_vram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[offset] ?? 0) : runtime.readIndex(__t1, offset))) & 0xff);
                        }
                        else {
                            res = ((0) & 0xff);
                        }
                    }
                    else {
                        res = (((__t2 = (members.m_vram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[offset] ?? 0) : runtime.readIndex(__t2, offset))) & 0xff);
                    }
                }
            }
        }
        return ((res) & 0xff);
    }
    function method_vram_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().vpos"], __L2 = __l["screen().hpos"], __L3 = __l["m_openbus_cb"];
        let __t0, __t1, __t2, __t3, __t4;
        data = ((data) & 0xff);
        const h_m_beam = members.m_beam ?? 0;
        offset = ((offset) & (65535));
        if ((members.m_screen_disabled ?? 0)) {
            ((__t0 = members.m_vram) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_vram"), offset, data));
        }
        else {
            let v = ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) & 0xffff);
            let h = ((((__L2 ?? globalThis.mamekitMissingCall?.("screen().hpos"))?.() ?? 0)) & 0xffff);
            if ((((v) === (0)) ? 1 : 0)) {
                if ((((h) <= (4)) ? 1 : 0)) {
                    ((__t1 = members.m_vram) && ArrayBuffer.isView(__t1) ? (__t1[offset] = data) : runtime.writeIndex(runtime.writableMember("m_vram"), offset, data));
                }
                else {
                    if ((((h) === (6)) ? 1 : 0)) {
                        ((__t2 = members.m_vram) && ArrayBuffer.isView(__t2) ? (__t2[offset] = (__L3 ? __L3(Number(0)) : typeof members.m_openbus_cb === 'function' ? members.m_openbus_cb(0) : runtime.invoke("m_openbus_cb", 0))) : runtime.writeIndex(runtime.writableMember("m_vram"), offset, (__L3 ? __L3(Number(0)) : typeof members.m_openbus_cb === 'function' ? members.m_openbus_cb(0) : runtime.invoke("m_openbus_cb", 0))));
                    }
                    else {
                    }
                }
            }
            else {
                if ((((v) < (h_m_beam.last_visible_line)) ? 1 : 0)) {
                }
                else {
                    if ((((v) === (h_m_beam.last_visible_line)) ? 1 : 0)) {
                        if ((((h) <= (4)) ? 1 : 0)) {
                        }
                        else {
                            ((__t3 = members.m_vram) && ArrayBuffer.isView(__t3) ? (__t3[offset] = data) : runtime.writeIndex(runtime.writableMember("m_vram"), offset, data));
                        }
                    }
                    else {
                        ((__t4 = members.m_vram) && ArrayBuffer.isView(__t4) ? (__t4[offset] = data) : runtime.writeIndex(runtime.writableMember("m_vram"), offset, data));
                    }
                }
            }
        }
    }
    function method_read_object(runtime, address) {
        const members = runtime.members;
        address = ((address) & 0xffff);
        const h_m_objects = members.m_objects ?? 0;
        if (((((address) & (512))) ? 0 : 1)) {
            let n = ((((((address) >>> (2))) & (127))) & 0xff);
            let obj = h_m_objects[n];
            switch (((address) & (3))) {
                case 0:
                    {
                        return ((((obj.x) & 0xff)) & 0xff);
                    }
                case 1:
                    {
                        return ((obj.y) & 0xff);
                    }
                case 2:
                    {
                        return ((obj.character) & 0xff);
                    }
                default:
                    {
                        return ((((((((((((obj.vflip) << (7))) | (((obj.hflip) << (6))))) | (((obj.pri) << (4))))) | (((obj.pal) << (1))))) | (obj.name_select))) & 0xff);
                    }
            }
        }
        else {
            let n = ((((((address) & (31))) << (2))) & 0xff);
            return (((((((((((((((((((((h_m_objects[((n) + (0))].x) >>> (8)) & 1)) << (0))) | ((((((h_m_objects[((n) + (1))].x) >>> (8)) & 1)) << (2))))) | ((((((h_m_objects[((n) + (2))].x) >>> (8)) & 1)) << (4))))) | ((((((h_m_objects[((n) + (3))].x) >>> (8)) & 1)) << (6))))) | (((h_m_objects[((n) + (0))].size) << (1))))) | (((h_m_objects[((n) + (1))].size) << (3))))) | (((h_m_objects[((n) + (2))].size) << (5))))) | (((h_m_objects[((n) + (3))].size) << (7))))) & 0xff);
        }
    }
    function method_cgram_read(runtime, offset) {
        const members = runtime.members;
        const h_m_cgram = members.m_cgram ?? 0;
        let res = ((0) & 0xff);
        offset = ((offset) & (511));
        res = ((runtime.readIndex(runtime.byteView(h_m_cgram), offset)) & 0xff);
        if (((offset) & (1))) {
            res = ((((res) & (127))) & 0xff);
        }
        return ((res) & 0xff);
    }
    function method_cgram_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["set_pen_indirect"];
        let __t0;
        data = ((data) & 0xff);
        const h_m_cgram = members.m_cgram ?? 0;
        offset = ((offset) & (511));
        if (((offset) & (1))) {
            data = ((((data) & (127))) & 0xff);
        }
        runtime.writeIndex(runtime.byteView(h_m_cgram), offset, data);
        (__L0 ? __L0(((offset) >>> (1)), (((__t0 = h_m_cgram, ArrayBuffer.isView(__t0) ? (__t0[((offset) >>> (1))] ?? 0) : runtime.readIndex(__t0, ((offset) >>> (1))))) & (32767))) : runtime.macro("set_pen_indirect", ((offset) >>> (1)), (((__t0 = h_m_cgram, ArrayBuffer.isView(__t0) ? (__t0[((offset) >>> (1))] ?? 0) : runtime.readIndex(__t0, ((offset) >>> (1))))) & (32767))));
    }
    function method_set_current_vert(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xffff);
        const h_m_beam = members.m_beam ?? 0;
        h_m_beam.current_vert = ((value) & 0xffff);
    }
    function method_read(runtime, offset, wrio_bit7) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().hpos"], __L2 = __l["screen().vpos"], __L3 = __l["m_openbus_cb"];
        wrio_bit7 = ((wrio_bit7) & 0xff);
        const h_m_mode7 = members.m_mode7 ?? 0;
        const h_m_oam = members.m_oam ?? 0;
        const h_m_beam = members.m_beam ?? 0;
        let value = ((0) & 0xff);
        switch (offset) {
            case 8452:
            case 8453:
            case 8454:
            case 8456:
            case 8457:
            case 8458:
            case 8468:
            case 8469:
            case 8470:
            case 8472:
            case 8473:
            case 8474:
            case 8484:
            case 8485:
            case 8486:
            case 8488:
            case 8489:
            case 8490:
                {
                    return (((members.m_ppu1_open_bus ?? 0)) & 0xff);
                }
            case 8500:
                {
                    let c = ((((((h_m_mode7.matrix_a) << 16 >> 16)) * (((runtime.shiftRight(h_m_mode7.matrix_b, 8)) << 24 >> 24)))) >>> 0);
                    members.m_ppu1_open_bus = ((((c) & (255))) & 0xff);
                    return (((members.m_ppu1_open_bus ?? 0)) & 0xff);
                }
            case 8501:
                {
                    let c__1 = ((((((h_m_mode7.matrix_a) << 16 >> 16)) * (((runtime.shiftRight(h_m_mode7.matrix_b, 8)) << 24 >> 24)))) >>> 0);
                    members.m_ppu1_open_bus = ((((((c__1) >>> (8))) & (255))) & 0xff);
                    return (((members.m_ppu1_open_bus ?? 0)) & 0xff);
                }
            case 8502:
                {
                    let c__2 = ((((((h_m_mode7.matrix_a) << 16 >> 16)) * (((runtime.shiftRight(h_m_mode7.matrix_b, 8)) << 24 >> 24)))) >>> 0);
                    members.m_ppu1_open_bus = ((((((c__2) >>> (16))) & (255))) & 0xff);
                    return (((members.m_ppu1_open_bus ?? 0)) & 0xff);
                }
            case 8503:
                {
                    method_set_latch_hv(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("screen().hpos"))?.() ?? 0), ((__L2 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0));
                    return (((__L3 ? __L3(Number(0)) : typeof members.m_openbus_cb === 'function' ? members.m_openbus_cb(0) : runtime.invoke("m_openbus_cb", 0))) & 0xff);
                }
            case 8504:
                {
                    let data = ((method_read_oam(runtime, h_m_oam.address)) & 0xff);
                    h_m_oam.address = ((((((h_m_oam.address) + (1))) & (1023))) & 0xffff);
                    method_oam_set_first_object(runtime);
                    members.m_ppu1_open_bus = ((data) & 0xff);
                    return (((members.m_ppu1_open_bus ?? 0)) & 0xff);
                }
            case 8505:
                {
                    let addr = ((method_get_vram_address(runtime)) >>> 0);
                    members.m_ppu1_open_bus = (((((members.m_vram_read_buffer ?? 0)) & (255))) & 0xff);
                    if ((((members.m_vram_fgr_high ?? 0)) ? 0 : 1)) {
                        members.m_vram_read_buffer = ((method_vram_read(runtime, addr)) & 0xffff);
                        members.m_vram_read_buffer = ((((members.m_vram_read_buffer) | (((method_vram_read(runtime, ((addr) + (1)))) << (8))))) & 0xffff);
                        members.m_vmadd = (((((((members.m_vmadd ?? 0)) + ((members.m_vram_fgr_increment ?? 0)))) & (65535))) & 0xffff);
                    }
                    return (((members.m_ppu1_open_bus ?? 0)) & 0xff);
                }
            case 8506:
                {
                    let addr__1 = ((method_get_vram_address(runtime)) >>> 0);
                    members.m_ppu1_open_bus = (((((((members.m_vram_read_buffer ?? 0)) >>> (8))) & (255))) & 0xff);
                    if ((members.m_vram_fgr_high ?? 0)) {
                        members.m_vram_read_buffer = ((method_vram_read(runtime, addr__1)) & 0xffff);
                        members.m_vram_read_buffer = ((((members.m_vram_read_buffer) | (((method_vram_read(runtime, ((addr__1) + (1)))) << (8))))) & 0xffff);
                        members.m_vmadd = (((((((members.m_vmadd ?? 0)) + ((members.m_vram_fgr_increment ?? 0)))) & (65535))) & 0xffff);
                    }
                    return (((members.m_ppu1_open_bus ?? 0)) & 0xff);
                }
            case 8507:
                {
                    if ((((((members.m_cgram_address ?? 0)) & (1))) ? 0 : 1)) {
                        members.m_ppu2_open_bus = ((method_cgram_read(runtime, (members.m_cgram_address ?? 0))) & 0xff);
                    }
                    else {
                        members.m_ppu2_open_bus = ((((members.m_ppu2_open_bus) & (128))) & 0xff);
                        members.m_ppu2_open_bus = ((((members.m_ppu2_open_bus) | (((method_cgram_read(runtime, (members.m_cgram_address ?? 0))) & (127))))) & 0xff);
                    }
                    members.m_cgram_address = (((((((members.m_cgram_address ?? 0)) + (1))) & (511))) & 0xffff);
                    return (((members.m_ppu2_open_bus ?? 0)) & 0xff);
                }
            case 8508:
                {
                    if ((members.m_read_ophct ?? 0)) {
                        members.m_ppu2_open_bus = ((((members.m_ppu2_open_bus) & (254))) & 0xff);
                        members.m_ppu2_open_bus = ((((members.m_ppu2_open_bus) | (((((h_m_beam.latch_horz) >>> (8))) & (1))))) & 0xff);
                    }
                    else {
                        members.m_ppu2_open_bus = ((((h_m_beam.latch_horz) & (255))) & 0xff);
                    }
                    members.m_read_ophct = ((((members.m_read_ophct) ^ (1))) & 0xff);
                    return (((members.m_ppu2_open_bus ?? 0)) & 0xff);
                }
            case 8509:
                {
                    if ((members.m_read_opvct ?? 0)) {
                        members.m_ppu2_open_bus = ((((members.m_ppu2_open_bus) & (254))) & 0xff);
                        members.m_ppu2_open_bus = ((((members.m_ppu2_open_bus) | (((((h_m_beam.latch_vert) >>> (8))) & (1))))) & 0xff);
                    }
                    else {
                        members.m_ppu2_open_bus = ((((h_m_beam.latch_vert) & (255))) & 0xff);
                    }
                    members.m_read_opvct = ((((members.m_read_opvct) ^ (1))) & 0xff);
                    return (((members.m_ppu2_open_bus ?? 0)) & 0xff);
                }
            case 8510:
                {
                    value = (((((members.m_stat77 ?? 0)) & (192))) & 0xff);
                    value = ((((value) | ((((members.m_ppu1_open_bus ?? 0)) & (16))))) & 0xff);
                    value = ((((value) | ((((members.m_ppu1_version ?? 0)) & (15))))) & 0xff);
                    members.m_stat77 = ((value) & 0xff);
                    members.m_ppu1_open_bus = ((value) & 0xff);
                    return (((members.m_ppu1_open_bus ?? 0)) & 0xff);
                }
            case 8511:
                {
                    members.m_read_ophct = ((0) & 0xff);
                    members.m_read_opvct = ((0) & 0xff);
                    if (wrio_bit7) {
                        members.m_stat78 = ((((members.m_stat78) & (-65))) & 0xff);
                    }
                    members.m_stat78 = (((((((((members.m_stat78 ?? 0)) & (-48))) | ((((members.m_ppu2_open_bus ?? 0)) & (32))))) | ((((members.m_ppu2_version ?? 0)) & (15))))) & 0xff);
                    members.m_ppu2_open_bus = (((members.m_stat78 ?? 0)) & 0xff);
                    return (((members.m_ppu2_open_bus ?? 0)) & 0xff);
                }
        }
        return (((__L3 ? __L3(Number(0)) : typeof members.m_openbus_cb === 'function' ? members.m_openbus_cb(0) : runtime.invoke("m_openbus_cb", 0))) & 0xff);
    }
    function method_set_latch_hv(runtime, x, y) {
        const members = runtime.members;
        x = ((x) << 16 >> 16);
        y = ((y) << 16 >> 16);
        const h_m_beam = members.m_beam ?? 0;
        h_m_beam.latch_vert = ((y) & 0xffff);
        h_m_beam.latch_horz = ((runtime.divide(x, (members.m_htmult ?? 0))) & 0xffff);
        members.m_stat78 = ((((members.m_stat78) | (64))) & 0xff);
    }
    function method_read_oam(runtime, address) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().vpos"];
        address = ((address) & 0xffff);
        const h_m_beam = members.m_beam ?? 0;
        const h_m_oam = members.m_oam ?? 0;
        if (((((((members.m_screen_disabled ?? 0)) ? 0 : 1)) && (((Number(((__L1 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) < Number(h_m_beam.last_visible_line)) ? 1 : 0))) ? 1 : 0)) {
            address = ((h_m_oam.write_latch) & 0xffff);
        }
        return ((method_read_object(runtime, address)) & 0xff);
    }
    function method_oam_set_first_object(runtime) {
        const members = runtime.members;
        const h_m_oam = members.m_oam ?? 0;
        h_m_oam.first = ((((((h_m_oam.priority_rotation) ? 0 : 1)) ? (0) : (((((h_m_oam.address) >>> (2))) & (127))))) & 0xff);
    }
    function method_get_vram_address(runtime) {
        const members = runtime.members;
        let addr = (((members.m_vmadd ?? 0)) >>> 0);
        if ((members.m_vram_fgr_count ?? 0)) {
            let rem = ((((addr) & ((members.m_vram_fgr_mask ?? 0)))) >>> 0);
            let faddr = ((__add_get_vram_address(runtime, __add_get_vram_address(runtime, ((addr) & ((~(members.m_vram_fgr_mask ?? 0)))), ((rem) >>> ((members.m_vram_fgr_shift ?? 0)))), ((((rem) & ((((members.m_vram_fgr_count ?? 0)) - (1))))) << (3)))) >>> 0);
            return ((((faddr) << (1))) >>> 0);
        }
        return ((((addr) << (1))) >>> 0);
    }
    function __add_get_vram_address(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["pen_indirect"], __L1 = __l["set_pen_indirect"];
        data = ((data) & 0xff);
        const h_m_oam = members.m_oam ?? 0;
        const h_m_layer = members.m_layer ?? 0;
        const h_m_mode7 = members.m_mode7 ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_beam = members.m_beam ?? 0;
        switch (offset) {
            case 8448:
                {
                    if (((((((members.m_screen_disabled ?? 0)) & (128))) && (((((data) & (128))) ? 0 : 1))) ? 1 : 0)) {
                        method_oam_address_reset(runtime);
                    }
                    members.m_screen_disabled = ((((data) & (128))) & 0xff);
                    members.m_screen_brightness = ((((data) & (15))) & 0xff);
                    break;
                }
            case 8449:
                {
                    h_m_oam.tile_data_address = ((((((data) << (13))) & (24576))) & 0xffff);
                    h_m_oam.name_select = ((((((data) >>> (3))) & (3))) & 0xff);
                    h_m_oam.base_size = ((((((data) >>> (5))) & (7))) & 0xff);
                    break;
                }
            case 8450:
                {
                    h_m_oam.base_address = ((((((h_m_oam.base_address) & (512))) | (((data) << (1))))) & 0xffff);
                    method_oam_address_reset(runtime);
                    break;
                }
            case 8451:
                {
                    h_m_oam.base_address = ((((((((data) & (1))) << (9))) | (((h_m_oam.base_address) & (510))))) & 0xffff);
                    h_m_oam.priority_rotation = ((((((data) >>> (7))) & (1))) & 0xff);
                    method_oam_address_reset(runtime);
                    break;
                }
            case 8452:
                {
                    let latch_bit = ((((h_m_oam.address) & (1))) & 0xff);
                    let address = ((h_m_oam.address) & 0xffff);
                    h_m_oam.address = ((((((h_m_oam.address) + (1))) & (1023))) & 0xffff);
                    if ((((latch_bit) === (0)) ? 1 : 0)) {
                        h_m_oam.data_latch = ((data) & 0xff);
                    }
                    if (((address) & (512))) {
                        method_write_oam(runtime, address, data);
                    }
                    else {
                        if ((((latch_bit) === (1)) ? 1 : 0)) {
                            method_write_oam(runtime, __add_write(runtime, ((address) & (-2)), 0), h_m_oam.data_latch);
                            method_write_oam(runtime, __add_write(runtime, ((address) & (-2)), 1), data);
                        }
                    }
                    method_oam_set_first_object(runtime);
                    return;
                }
            case 8453:
                {
                    members.m_mode = ((((data) & (7))) & 0xff);
                    method_dynamic_res_change(runtime);
                    members.m_bg_priority = (((((data) >>> (3)) & 1)) & 0xff);
                    h_m_layer[0].tile_size = (((((data) >>> (4)) & 1)) & 0xff);
                    h_m_layer[1].tile_size = (((((data) >>> (5)) & 1)) & 0xff);
                    h_m_layer[2].tile_size = (((((data) >>> (6)) & 1)) & 0xff);
                    h_m_layer[3].tile_size = (((((data) >>> (7)) & 1)) & 0xff);
                    method_update_video_mode(runtime);
                    break;
                }
            case 8454:
                {
                    members.m_mosaic_size = ((runtime.shiftRight(((data) & (240)), 4)) & 0xff);
                    h_m_layer[0].mosaic_enabled = (((((data) >>> (0)) & 1)) & 0xff);
                    h_m_layer[1].mosaic_enabled = (((((data) >>> (1)) & 1)) & 0xff);
                    h_m_layer[2].mosaic_enabled = (((((data) >>> (2)) & 1)) & 0xff);
                    h_m_layer[3].mosaic_enabled = (((((data) >>> (3)) & 1)) & 0xff);
                    break;
                }
            case 8455:
            case 8456:
            case 8457:
            case 8458:
                {
                    h_m_layer[((offset) - (8455))].tilemap = ((((((data) << (8))) & (31744))) & 0xffff);
                    h_m_layer[((offset) - (8455))].tilemap_size = ((((data) & (3))) & 0xff);
                    break;
                }
            case 8459:
                {
                    h_m_layer[0].charmap = ((((((data) << (12))) & (28672))) & 0xffff);
                    h_m_layer[1].charmap = ((((((data) << (8))) & (28672))) & 0xffff);
                    break;
                }
            case 8460:
                {
                    h_m_layer[2].charmap = ((((((data) << (12))) & (28672))) & 0xffff);
                    h_m_layer[3].charmap = ((((((data) << (8))) & (28672))) & 0xffff);
                    break;
                }
            case 8461:
                {
                    h_m_layer[0].hoffs = ((((((((data) << (8))) | ((((members.m_ppu_last_scroll ?? 0)) & (-8))))) | (((((h_m_layer[0].hoffs) >>> (8))) & (7))))) & 0xffff);
                    members.m_ppu_last_scroll = ((data) & 0xff);
                    h_m_mode7.hor_offset = ((((((((data) << (8))) | ((((members.m_mode7_last_scroll ?? 0)) & (-8))))) | (((runtime.shiftRight(h_m_mode7.hor_offset, 8)) & (7))))) << 16 >> 16);
                    members.m_mode7_last_scroll = ((data) & 0xff);
                    return;
                }
            case 8462:
                {
                    h_m_layer[0].voffs = ((((((data) << (8))) | ((members.m_ppu_last_scroll ?? 0)))) & 0xffff);
                    members.m_ppu_last_scroll = ((data) & 0xff);
                    h_m_mode7.ver_offset = ((((((data) << (8))) | ((members.m_mode7_last_scroll ?? 0)))) << 16 >> 16);
                    members.m_mode7_last_scroll = ((data) & 0xff);
                    return;
                }
            case 8463:
                {
                    h_m_layer[1].hoffs = ((((((((data) << (8))) | ((((members.m_ppu_last_scroll ?? 0)) & (-8))))) | (((((h_m_layer[1].hoffs) >>> (8))) & (7))))) & 0xffff);
                    members.m_ppu_last_scroll = ((data) & 0xff);
                    return;
                }
            case 8464:
                {
                    h_m_layer[1].voffs = ((((((data) << (8))) | ((members.m_ppu_last_scroll ?? 0)))) & 0xffff);
                    members.m_ppu_last_scroll = ((data) & 0xff);
                    return;
                }
            case 8465:
                {
                    h_m_layer[2].hoffs = ((((((((data) << (8))) | ((((members.m_ppu_last_scroll ?? 0)) & (-8))))) | (((((h_m_layer[2].hoffs) >>> (8))) & (7))))) & 0xffff);
                    members.m_ppu_last_scroll = ((data) & 0xff);
                    return;
                }
            case 8466:
                {
                    h_m_layer[2].voffs = ((((((data) << (8))) | ((members.m_ppu_last_scroll ?? 0)))) & 0xffff);
                    members.m_ppu_last_scroll = ((data) & 0xff);
                    return;
                }
            case 8467:
                {
                    h_m_layer[3].hoffs = ((((((((data) << (8))) | ((((members.m_ppu_last_scroll ?? 0)) & (-8))))) | (((((h_m_layer[3].hoffs) >>> (8))) & (7))))) & 0xffff);
                    members.m_ppu_last_scroll = ((data) & 0xff);
                    return;
                }
            case 8468:
                {
                    h_m_layer[3].voffs = ((((((data) << (8))) | ((members.m_ppu_last_scroll ?? 0)))) & 0xffff);
                    members.m_ppu_last_scroll = ((data) & 0xff);
                    return;
                }
            case 8469:
                {
                    members.m_vram_fgr_high = ((((data) & (128))) & 0xffff);
                    members.m_vram_fgr_increment = (((__mame_table_4[(((((data) & (3))) % 4) + 4) % 4] ?? 0)) & 0xffff);
                    if (((data) & (12))) {
                        let md = ((runtime.shiftRight(((data) & (12)), 2)) | 0);
                        members.m_vram_fgr_count = (((__mame_table_5[((md) & 3)] ?? 0)) & 0xffff);
                        members.m_vram_fgr_mask = (((((((members.m_vram_fgr_count ?? 0)) * (8))) - (1))) & 0xffff);
                        members.m_vram_fgr_shift = (((__mame_table_6[((md) & 3)] ?? 0)) & 0xffff);
                    }
                    else {
                        members.m_vram_fgr_count = ((0) & 0xffff);
                    }
                    break;
                }
            case 8470:
                {
                    let addr = ((0) >>> 0);
                    members.m_vmadd = (((((((members.m_vmadd ?? 0)) & (65280))) | (((data) << (0))))) & 0xffff);
                    addr = ((method_get_vram_address(runtime)) >>> 0);
                    members.m_vram_read_buffer = ((method_vram_read(runtime, addr)) & 0xffff);
                    members.m_vram_read_buffer = ((((members.m_vram_read_buffer) | (((method_vram_read(runtime, ((addr) + (1)))) << (8))))) & 0xffff);
                    break;
                }
            case 8471:
                {
                    let addr__1 = ((0) >>> 0);
                    members.m_vmadd = (((((((members.m_vmadd ?? 0)) & (255))) | (((data) << (8))))) & 0xffff);
                    addr__1 = ((method_get_vram_address(runtime)) >>> 0);
                    members.m_vram_read_buffer = ((method_vram_read(runtime, addr__1)) & 0xffff);
                    members.m_vram_read_buffer = ((((members.m_vram_read_buffer) | (((method_vram_read(runtime, ((addr__1) + (1)))) << (8))))) & 0xffff);
                    break;
                }
            case 8472:
                {
                    let addr__2 = ((method_get_vram_address(runtime)) >>> 0);
                    method_vram_write(runtime, addr__2, data);
                    if ((((members.m_vram_fgr_high ?? 0)) ? 0 : 1)) {
                        members.m_vmadd = (((((((members.m_vmadd ?? 0)) + ((members.m_vram_fgr_increment ?? 0)))) & (65535))) & 0xffff);
                    }
                    return;
                }
            case 8473:
                {
                    let addr__3 = ((method_get_vram_address(runtime)) >>> 0);
                    method_vram_write(runtime, ((addr__3) + (1)), data);
                    if ((members.m_vram_fgr_high ?? 0)) {
                        members.m_vmadd = (((((((members.m_vmadd ?? 0)) + ((members.m_vram_fgr_increment ?? 0)))) & (65535))) & 0xffff);
                    }
                    return;
                }
            case 8474:
                {
                    h_m_mode7.repeat = ((((((data) >>> (6))) & (3))) & 0xff);
                    h_m_mode7.vflip = (((((data) >>> (1)) & 1)) & 0xff);
                    h_m_mode7.hflip = (((((data) >>> (0)) & 1)) & 0xff);
                    break;
                }
            case 8475:
                {
                    h_m_mode7.matrix_a = (((((members.m_mode7_last_scroll ?? 0)) + (((data) << (8))))) << 16 >> 16);
                    members.m_mode7_last_scroll = ((data) & 0xff);
                    break;
                }
            case 8476:
                {
                    h_m_mode7.matrix_b = (((((members.m_mode7_last_scroll ?? 0)) + (((data) << (8))))) << 16 >> 16);
                    members.m_mode7_last_scroll = ((data) & 0xff);
                    break;
                }
            case 8477:
                {
                    h_m_mode7.matrix_c = (((((members.m_mode7_last_scroll ?? 0)) + (((data) << (8))))) << 16 >> 16);
                    members.m_mode7_last_scroll = ((data) & 0xff);
                    break;
                }
            case 8478:
                {
                    h_m_mode7.matrix_d = (((((members.m_mode7_last_scroll ?? 0)) + (((data) << (8))))) << 16 >> 16);
                    members.m_mode7_last_scroll = ((data) & 0xff);
                    break;
                }
            case 8479:
                {
                    h_m_mode7.origin_x = (((((members.m_mode7_last_scroll ?? 0)) + (((data) << (8))))) << 16 >> 16);
                    members.m_mode7_last_scroll = ((data) & 0xff);
                    break;
                }
            case 8480:
                {
                    h_m_mode7.origin_y = (((((members.m_mode7_last_scroll ?? 0)) + (((data) << (8))))) << 16 >> 16);
                    members.m_mode7_last_scroll = ((data) & 0xff);
                    break;
                }
            case 8481:
                {
                    members.m_cgram_address = ((((data) << (1))) & 0xffff);
                    break;
                }
            case 8482:
                {
                    method_cgram_write(runtime, (members.m_cgram_address ?? 0), data);
                    members.m_cgram_address = (((((((members.m_cgram_address ?? 0)) + (1))) & (511))) & 0xffff);
                    break;
                }
            case 8483:
                {
                    if ((((data) !== (h_m_regs[35])) ? 1 : 0)) {
                        h_m_layer[0].window1_invert = (((((data) >>> (0)) & 1)) & 0xff);
                        h_m_layer[0].window1_enabled = (((((data) >>> (1)) & 1)) & 0xff);
                        h_m_layer[0].window2_invert = (((((data) >>> (2)) & 1)) & 0xff);
                        h_m_layer[0].window2_enabled = (((((data) >>> (3)) & 1)) & 0xff);
                        h_m_layer[1].window1_invert = (((((data) >>> (4)) & 1)) & 0xff);
                        h_m_layer[1].window1_enabled = (((((data) >>> (5)) & 1)) & 0xff);
                        h_m_layer[1].window2_invert = (((((data) >>> (6)) & 1)) & 0xff);
                        h_m_layer[1].window2_enabled = (((((data) >>> (7)) & 1)) & 0xff);
                    }
                    break;
                }
            case 8484:
                {
                    if ((((data) !== (h_m_regs[36])) ? 1 : 0)) {
                        h_m_layer[2].window1_invert = (((((data) >>> (0)) & 1)) & 0xff);
                        h_m_layer[2].window1_enabled = (((((data) >>> (1)) & 1)) & 0xff);
                        h_m_layer[2].window2_invert = (((((data) >>> (2)) & 1)) & 0xff);
                        h_m_layer[2].window2_enabled = (((((data) >>> (3)) & 1)) & 0xff);
                        h_m_layer[3].window1_invert = (((((data) >>> (4)) & 1)) & 0xff);
                        h_m_layer[3].window1_enabled = (((((data) >>> (5)) & 1)) & 0xff);
                        h_m_layer[3].window2_invert = (((((data) >>> (6)) & 1)) & 0xff);
                        h_m_layer[3].window2_enabled = (((((data) >>> (7)) & 1)) & 0xff);
                    }
                    break;
                }
            case 8485:
                {
                    if ((((data) !== (h_m_regs[37])) ? 1 : 0)) {
                        h_m_layer[4].window1_invert = (((((data) >>> (0)) & 1)) & 0xff);
                        h_m_layer[4].window1_enabled = (((((data) >>> (1)) & 1)) & 0xff);
                        h_m_layer[4].window2_invert = (((((data) >>> (2)) & 1)) & 0xff);
                        h_m_layer[4].window2_enabled = (((((data) >>> (3)) & 1)) & 0xff);
                        h_m_layer[5].window1_invert = (((((data) >>> (4)) & 1)) & 0xff);
                        h_m_layer[5].window1_enabled = (((((data) >>> (5)) & 1)) & 0xff);
                        h_m_layer[5].window2_invert = (((((data) >>> (6)) & 1)) & 0xff);
                        h_m_layer[5].window2_enabled = (((((data) >>> (7)) & 1)) & 0xff);
                    }
                    break;
                }
            case 8486:
                {
                    if ((((data) !== (h_m_regs[38])) ? 1 : 0)) {
                        members.m_window1_left = ((data) & 0xff);
                    }
                    break;
                }
            case 8487:
                {
                    if ((((data) !== (h_m_regs[39])) ? 1 : 0)) {
                        members.m_window1_right = ((data) & 0xff);
                    }
                    break;
                }
            case 8488:
                {
                    if ((((data) !== (h_m_regs[40])) ? 1 : 0)) {
                        members.m_window2_left = ((data) & 0xff);
                    }
                    break;
                }
            case 8489:
                {
                    if ((((data) !== (h_m_regs[41])) ? 1 : 0)) {
                        members.m_window2_right = ((data) & 0xff);
                    }
                    break;
                }
            case 8490:
                {
                    if ((((data) !== (h_m_regs[42])) ? 1 : 0)) {
                        h_m_layer[0].wlog_mask = ((((data) & (3))) & 0xff);
                        h_m_layer[1].wlog_mask = ((runtime.shiftRight(((data) & (12)), 2)) & 0xff);
                        h_m_layer[2].wlog_mask = ((runtime.shiftRight(((data) & (48)), 4)) & 0xff);
                        h_m_layer[3].wlog_mask = ((runtime.shiftRight(((data) & (192)), 6)) & 0xff);
                    }
                    break;
                }
            case 8491:
                {
                    if ((((data) !== (h_m_regs[43])) ? 1 : 0)) {
                        h_m_layer[4].wlog_mask = ((((data) & (3))) & 0xff);
                        h_m_layer[5].wlog_mask = ((runtime.shiftRight(((data) & (12)), 2)) & 0xff);
                    }
                    break;
                }
            case 8492:
                {
                    h_m_layer[0].main_bg_enabled = (((((data) >>> (0)) & 1)) & 0xff);
                    h_m_layer[1].main_bg_enabled = (((((data) >>> (1)) & 1)) & 0xff);
                    h_m_layer[2].main_bg_enabled = (((((data) >>> (2)) & 1)) & 0xff);
                    h_m_layer[3].main_bg_enabled = (((((data) >>> (3)) & 1)) & 0xff);
                    h_m_layer[4].main_bg_enabled = (((((data) >>> (4)) & 1)) & 0xff);
                    break;
                }
            case 8493:
                {
                    h_m_layer[0].sub_bg_enabled = (((((data) >>> (0)) & 1)) & 0xff);
                    h_m_layer[1].sub_bg_enabled = (((((data) >>> (1)) & 1)) & 0xff);
                    h_m_layer[2].sub_bg_enabled = (((((data) >>> (2)) & 1)) & 0xff);
                    h_m_layer[3].sub_bg_enabled = (((((data) >>> (3)) & 1)) & 0xff);
                    h_m_layer[4].sub_bg_enabled = (((((data) >>> (4)) & 1)) & 0xff);
                    break;
                }
            case 8494:
                {
                    h_m_layer[0].main_window_enabled = (((((data) >>> (0)) & 1)) & 0xff);
                    h_m_layer[1].main_window_enabled = (((((data) >>> (1)) & 1)) & 0xff);
                    h_m_layer[2].main_window_enabled = (((((data) >>> (2)) & 1)) & 0xff);
                    h_m_layer[3].main_window_enabled = (((((data) >>> (3)) & 1)) & 0xff);
                    h_m_layer[4].main_window_enabled = (((((data) >>> (4)) & 1)) & 0xff);
                    break;
                }
            case 8495:
                {
                    h_m_layer[0].sub_window_enabled = (((((data) >>> (0)) & 1)) & 0xff);
                    h_m_layer[1].sub_window_enabled = (((((data) >>> (1)) & 1)) & 0xff);
                    h_m_layer[2].sub_window_enabled = (((((data) >>> (2)) & 1)) & 0xff);
                    h_m_layer[3].sub_window_enabled = (((((data) >>> (3)) & 1)) & 0xff);
                    h_m_layer[4].sub_window_enabled = (((((data) >>> (4)) & 1)) & 0xff);
                    break;
                }
            case 8496:
                {
                    members.m_clip_to_black = ((((((data) >>> (6))) & (3))) & 0xff);
                    members.m_prevent_color_math = ((((((data) >>> (4))) & (3))) & 0xff);
                    members.m_sub_add_mode = (((((data) >>> (1)) & 1)) & 0xff);
                    members.m_direct_color = (((((data) >>> (0)) & 1)) & 0xff);
                    break;
                }
            case 8497:
                {
                    members.m_color_modes = ((((((data) >>> (6))) & (3))) & 0xff);
                    h_m_layer[0].color_math = (((((data) >>> (0)) & 1)) & 0xff);
                    h_m_layer[1].color_math = (((((data) >>> (1)) & 1)) & 0xff);
                    h_m_layer[2].color_math = (((((data) >>> (2)) & 1)) & 0xff);
                    h_m_layer[3].color_math = (((((data) >>> (3)) & 1)) & 0xff);
                    h_m_layer[4].color_math = (((((data) >>> (4)) & 1)) & 0xff);
                    h_m_layer[5].color_math = (((((data) >>> (5)) & 1)) & 0xff);
                    break;
                }
            case 8498:
                {
                    let r = ((0) & 0xff);
                    let g = ((0) & 0xff);
                    let b = ((0) & 0xff);
                    r = (((((__L0 ? __L0(2304) : runtime.macro("pen_indirect", 2304))) & (31))) & 0xff);
                    g = ((runtime.shiftRight((((__L0 ? __L0(2304) : runtime.macro("pen_indirect", 2304))) & (992)), 5)) & 0xff);
                    b = ((runtime.shiftRight((((__L0 ? __L0(2304) : runtime.macro("pen_indirect", 2304))) & (31744)), 10)) & 0xff);
                    if (((data) & (32))) {
                        r = ((((data) & (31))) & 0xff);
                    }
                    if (((data) & (64))) {
                        g = ((((data) & (31))) & 0xff);
                    }
                    if (((data) & (128))) {
                        b = ((((data) & (31))) & 0xff);
                    }
                    (__L1 ? __L1(2304, ((((r) | (((g) << (5))))) | (((b) << (10))))) : runtime.macro("set_pen_indirect", 2304, ((((r) | (((g) << (5))))) | (((b) << (10))))));
                    break;
                }
            case 8499:
                {
                    members.m_interlace = ((((((data) & (1))) ? (2) : (1))) & 0xff);
                    h_m_oam.interlace = (((((data) >>> (1)) & 1)) & 0xff);
                    h_m_beam.last_visible_line = ((((((data) & (4))) ? (240) : (225))) & 0xff);
                    members.m_pseudo_hires = (((((data) >>> (3)) & 1)) & 0xff);
                    h_m_mode7.extbg = (((((data) >>> (6)) & 1)) & 0xff);
                    method_dynamic_res_change(runtime);
                    method_update_video_mode(runtime);
                    break;
                }
        }
        h_m_regs[((offset) - (8448))] = data;
    }
    function __add_write(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_oam_address_reset(runtime) {
        const members = runtime.members;
        const h_m_oam = members.m_oam ?? 0;
        h_m_oam.address = ((h_m_oam.base_address) & 0xffff);
        method_oam_set_first_object(runtime);
    }
    function method_write_oam(runtime, address, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().vpos"];
        address = ((address) & 0xffff);
        data = ((data) & 0xff);
        const h_m_beam = members.m_beam ?? 0;
        if (((((((members.m_screen_disabled ?? 0)) ? 0 : 1)) && (((Number(((__L1 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) < Number(h_m_beam.last_visible_line)) ? 1 : 0))) ? 1 : 0)) {
            address = ((536) & 0xffff);
        }
        return method_write_object(runtime, address, data);
    }
    function method_write_object(runtime, address, data) {
        const members = runtime.members;
        address = ((address) & 0xffff);
        data = ((data) & 0xff);
        const h_m_objects = members.m_objects ?? 0;
        if (((((address) & (512))) ? 0 : 1)) {
            let n = ((((((address) >>> (2))) & (127))) & 0xff);
            let obj = h_m_objects[n];
            switch (((address) & (3))) {
                case 0:
                    {
                        obj.x = ((((((obj.x) & (256))) | (data))) & 0xffff);
                        return;
                    }
                case 1:
                    {
                        obj.y = ((((data) + (1))) & 0xff);
                        return;
                    }
                case 2:
                    {
                        obj.character = ((data) & 0xff);
                        return;
                    }
                default:
                    {
                        obj.name_select = (((((data) >>> (0)) & 1)) & 0xff);
                        obj.pal = ((((((data) >>> (1))) & (7))) & 0xff);
                        obj.pri = ((((((data) >>> (4))) & (3))) & 0xff);
                        obj.hflip = (((((data) >>> (6)) & 1)) & 0xff);
                        obj.vflip = (((((data) >>> (7)) & 1)) & 0xff);
                        return;
                    }
            }
        }
        else {
            let n = ((((((address) & (31))) << (2))) & 0xff);
            h_m_objects[((n) + (0))].x = ((((((h_m_objects[((n) + (0))].x) & (255))) | (((((data) << (8))) & (256))))) & 0xffff);
            h_m_objects[((n) + (1))].x = ((((((h_m_objects[((n) + (1))].x) & (255))) | (((((data) << (6))) & (256))))) & 0xffff);
            h_m_objects[((n) + (2))].x = ((((((h_m_objects[((n) + (2))].x) & (255))) | (((((data) << (4))) & (256))))) & 0xffff);
            h_m_objects[((n) + (3))].x = ((((((h_m_objects[((n) + (3))].x) & (255))) | (((((data) << (2))) & (256))))) & 0xffff);
            h_m_objects[((n) + (0))].size = (((((data) >>> (1)) & 1)) & 0xff);
            h_m_objects[((n) + (1))].size = (((((data) >>> (3)) & 1)) & 0xff);
            h_m_objects[((n) + (2))].size = (((((data) >>> (5)) & 1)) & 0xff);
            h_m_objects[((n) + (3))].size = (((((data) >>> (7)) & 1)) & 0xff);
        }
    }
    function method_dynamic_res_change(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().visible_area"], __L2 = __l["HZ_TO_ATTOSECONDS"], __L3 = __l["screen().configure"];
        const h_m_beam = members.m_beam ?? 0;
        let visarea = ((__L1 ?? globalThis.mamekitMissingCall?.("screen().visible_area"))?.() ?? 0);
        let refresh = 0;
        visarea.min_x = (visarea.min_y = 0);
        visarea.max_y = ((((h_m_beam.last_visible_line) * ((members.m_interlace ?? 0)))) - (1));
        visarea.max_x = 511;
        if (((((((((((members.m_mode ?? 0)) === (5)) ? 1 : 0)) || (((((members.m_mode ?? 0)) === (6)) ? 1 : 0))) ? 1 : 0)) || ((members.m_pseudo_hires ?? 0))) ? 1 : 0)) {
            members.m_htmult = ((2) & 0xffff);
        }
        else {
            members.m_htmult = ((1) & 0xffff);
        }
        if (((Number((((members.m_stat78 ?? 0)) & (16))) === Number(0)) ? 1 : 0)) {
            refresh = (((((__L2 ? __L2(runtime.divide(21477272, 4)) : runtime.macro("HZ_TO_ATTOSECONDS", runtime.divide(21477272, 4)))) * (341))) * (262));
            ((__L3 ?? globalThis.mamekitMissingCall?.("screen().configure"))?.(((341) * ((members.m_htmult ?? 0))), ((262) * ((members.m_interlace ?? 0))), visarea, refresh) ?? 0);
        }
        else {
            refresh = (((((__L2 ? __L2(runtime.divide(21218370, 4)) : runtime.macro("HZ_TO_ATTOSECONDS", runtime.divide(21218370, 4)))) * (341))) * (312));
            ((__L3 ?? globalThis.mamekitMissingCall?.("screen().configure"))?.(((341) * ((members.m_htmult ?? 0))), ((312) * ((members.m_interlace ?? 0))), visarea, refresh) ?? 0);
        }
    }
    function method_update_video_mode(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["memcpy"];
        const h_m_layer = members.m_layer ?? 0;
        const h_m_oam = members.m_oam ?? 0;
        const h_m_mode7 = members.m_mode7 ?? 0;
        switch ((members.m_mode ?? 0)) {
            case 0:
                {
                    h_m_layer[0].tile_mode = ((0) & 0xff);
                    h_m_layer[1].tile_mode = ((0) & 0xff);
                    h_m_layer[2].tile_mode = ((0) & 0xff);
                    h_m_layer[3].tile_mode = ((0) & 0xff);
                    h_m_layer[0].priority[0] = 8;
                    h_m_layer[0].priority[1] = 11;
                    h_m_layer[1].priority[0] = 7;
                    h_m_layer[1].priority[1] = 10;
                    h_m_layer[2].priority[0] = 2;
                    h_m_layer[2].priority[1] = 5;
                    h_m_layer[3].priority[0] = 1;
                    h_m_layer[3].priority[1] = 4;
                    if ((((members.__static_update_video_mode_s_oam_priority__initialised ?? 0)) ? 0 : 1)) {
                        members.__static_update_video_mode_s_oam_priority = [3, 6, 9, 12];
                        members.__static_update_video_mode_s_oam_priority__initialised = 1;
                    }
                    let s_oam_priority = (members.__static_update_video_mode_s_oam_priority ?? 0);
                    (__L0 ? __L0(h_m_oam.priority, s_oam_priority, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority, 4));
                    break;
                }
            case 1:
                {
                    h_m_layer[0].tile_mode = ((1) & 0xff);
                    h_m_layer[1].tile_mode = ((1) & 0xff);
                    h_m_layer[2].tile_mode = ((0) & 0xff);
                    h_m_layer[3].tile_mode = ((3) & 0xff);
                    if ((members.m_bg_priority ?? 0)) {
                        h_m_layer[0].priority[0] = 5;
                        h_m_layer[0].priority[1] = 8;
                        h_m_layer[1].priority[0] = 4;
                        h_m_layer[1].priority[1] = 7;
                        h_m_layer[2].priority[0] = 1;
                        h_m_layer[2].priority[1] = 10;
                        if ((((members.__static_update_video_mode_s_oam_priority__2__initialised ?? 0)) ? 0 : 1)) {
                            members.__static_update_video_mode_s_oam_priority__2 = [2, 3, 6, 9];
                            members.__static_update_video_mode_s_oam_priority__2__initialised = 1;
                        }
                        let s_oam_priority__2 = (members.__static_update_video_mode_s_oam_priority__2 ?? 0);
                        (__L0 ? __L0(h_m_oam.priority, s_oam_priority__2, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__2, 4));
                    }
                    else {
                        h_m_layer[0].priority[0] = 6;
                        h_m_layer[0].priority[1] = 9;
                        h_m_layer[1].priority[0] = 5;
                        h_m_layer[1].priority[1] = 8;
                        h_m_layer[2].priority[0] = 1;
                        h_m_layer[2].priority[1] = 3;
                        if ((((members.__static_update_video_mode_s_oam_priority__3__initialised ?? 0)) ? 0 : 1)) {
                            members.__static_update_video_mode_s_oam_priority__3 = [2, 4, 7, 10];
                            members.__static_update_video_mode_s_oam_priority__3__initialised = 1;
                        }
                        let s_oam_priority__3 = (members.__static_update_video_mode_s_oam_priority__3 ?? 0);
                        (__L0 ? __L0(h_m_oam.priority, s_oam_priority__3, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__3, 4));
                    }
                    break;
                }
            case 2:
                {
                    h_m_layer[0].tile_mode = ((1) & 0xff);
                    h_m_layer[1].tile_mode = ((1) & 0xff);
                    h_m_layer[2].tile_mode = ((3) & 0xff);
                    h_m_layer[3].tile_mode = ((3) & 0xff);
                    h_m_layer[0].priority[0] = 3;
                    h_m_layer[0].priority[1] = 7;
                    h_m_layer[1].priority[0] = 1;
                    h_m_layer[1].priority[1] = 5;
                    if ((((members.__static_update_video_mode_s_oam_priority__4__initialised ?? 0)) ? 0 : 1)) {
                        members.__static_update_video_mode_s_oam_priority__4 = [2, 4, 6, 8];
                        members.__static_update_video_mode_s_oam_priority__4__initialised = 1;
                    }
                    let s_oam_priority__4 = (members.__static_update_video_mode_s_oam_priority__4 ?? 0);
                    (__L0 ? __L0(h_m_oam.priority, s_oam_priority__4, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__4, 4));
                    break;
                }
            case 3:
                {
                    h_m_layer[0].tile_mode = ((2) & 0xff);
                    h_m_layer[1].tile_mode = ((1) & 0xff);
                    h_m_layer[2].tile_mode = ((3) & 0xff);
                    h_m_layer[3].tile_mode = ((3) & 0xff);
                    h_m_layer[0].priority[0] = 3;
                    h_m_layer[0].priority[1] = 7;
                    h_m_layer[1].priority[0] = 1;
                    h_m_layer[1].priority[1] = 5;
                    if ((((members.__static_update_video_mode_s_oam_priority__5__initialised ?? 0)) ? 0 : 1)) {
                        members.__static_update_video_mode_s_oam_priority__5 = [2, 4, 6, 8];
                        members.__static_update_video_mode_s_oam_priority__5__initialised = 1;
                    }
                    let s_oam_priority__5 = (members.__static_update_video_mode_s_oam_priority__5 ?? 0);
                    (__L0 ? __L0(h_m_oam.priority, s_oam_priority__5, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__5, 4));
                    break;
                }
            case 4:
                {
                    h_m_layer[0].tile_mode = ((2) & 0xff);
                    h_m_layer[1].tile_mode = ((0) & 0xff);
                    h_m_layer[2].tile_mode = ((3) & 0xff);
                    h_m_layer[3].tile_mode = ((3) & 0xff);
                    h_m_layer[0].priority[0] = 3;
                    h_m_layer[0].priority[1] = 7;
                    h_m_layer[1].priority[0] = 1;
                    h_m_layer[1].priority[1] = 5;
                    if ((((members.__static_update_video_mode_s_oam_priority__6__initialised ?? 0)) ? 0 : 1)) {
                        members.__static_update_video_mode_s_oam_priority__6 = [2, 4, 6, 8];
                        members.__static_update_video_mode_s_oam_priority__6__initialised = 1;
                    }
                    let s_oam_priority__6 = (members.__static_update_video_mode_s_oam_priority__6 ?? 0);
                    (__L0 ? __L0(h_m_oam.priority, s_oam_priority__6, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__6, 4));
                    break;
                }
            case 5:
                {
                    h_m_layer[0].tile_mode = ((1) & 0xff);
                    h_m_layer[1].tile_mode = ((0) & 0xff);
                    h_m_layer[2].tile_mode = ((3) & 0xff);
                    h_m_layer[3].tile_mode = ((3) & 0xff);
                    h_m_layer[0].priority[0] = 3;
                    h_m_layer[0].priority[1] = 7;
                    h_m_layer[1].priority[0] = 1;
                    h_m_layer[1].priority[1] = 5;
                    if ((((members.__static_update_video_mode_s_oam_priority__7__initialised ?? 0)) ? 0 : 1)) {
                        members.__static_update_video_mode_s_oam_priority__7 = [2, 4, 6, 8];
                        members.__static_update_video_mode_s_oam_priority__7__initialised = 1;
                    }
                    let s_oam_priority__7 = (members.__static_update_video_mode_s_oam_priority__7 ?? 0);
                    (__L0 ? __L0(h_m_oam.priority, s_oam_priority__7, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__7, 4));
                    break;
                }
            case 6:
                {
                    h_m_layer[0].tile_mode = ((1) & 0xff);
                    h_m_layer[1].tile_mode = ((3) & 0xff);
                    h_m_layer[2].tile_mode = ((3) & 0xff);
                    h_m_layer[3].tile_mode = ((3) & 0xff);
                    h_m_layer[0].priority[0] = 2;
                    h_m_layer[0].priority[1] = 5;
                    if ((((members.__static_update_video_mode_s_oam_priority__8__initialised ?? 0)) ? 0 : 1)) {
                        members.__static_update_video_mode_s_oam_priority__8 = [1, 3, 4, 6];
                        members.__static_update_video_mode_s_oam_priority__8__initialised = 1;
                    }
                    let s_oam_priority__8 = (members.__static_update_video_mode_s_oam_priority__8 ?? 0);
                    (__L0 ? __L0(h_m_oam.priority, s_oam_priority__8, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__8, 4));
                    break;
                }
            case 7:
                {
                    if (((h_m_mode7.extbg) ? 0 : 1)) {
                        h_m_layer[0].tile_mode = ((4) & 0xff);
                        h_m_layer[1].tile_mode = ((3) & 0xff);
                        h_m_layer[2].tile_mode = ((3) & 0xff);
                        h_m_layer[3].tile_mode = ((3) & 0xff);
                        h_m_layer[0].priority[0] = 2;
                        h_m_layer[0].priority[1] = 2;
                        if ((((members.__static_update_video_mode_s_oam_priority__9__initialised ?? 0)) ? 0 : 1)) {
                            members.__static_update_video_mode_s_oam_priority__9 = [1, 3, 4, 5];
                            members.__static_update_video_mode_s_oam_priority__9__initialised = 1;
                        }
                        let s_oam_priority__9 = (members.__static_update_video_mode_s_oam_priority__9 ?? 0);
                        (__L0 ? __L0(h_m_oam.priority, s_oam_priority__9, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__9, 4));
                    }
                    else {
                        h_m_layer[0].tile_mode = ((4) & 0xff);
                        h_m_layer[1].tile_mode = ((4) & 0xff);
                        h_m_layer[2].tile_mode = ((3) & 0xff);
                        h_m_layer[3].tile_mode = ((3) & 0xff);
                        h_m_layer[0].priority[0] = 3;
                        h_m_layer[0].priority[1] = 3;
                        h_m_layer[1].priority[0] = 1;
                        h_m_layer[1].priority[1] = 5;
                        if ((((members.__static_update_video_mode_s_oam_priority__10__initialised ?? 0)) ? 0 : 1)) {
                            members.__static_update_video_mode_s_oam_priority__10 = [2, 4, 6, 7];
                            members.__static_update_video_mode_s_oam_priority__10__initialised = 1;
                        }
                        let s_oam_priority__10 = (members.__static_update_video_mode_s_oam_priority__10 ?? 0);
                        (__L0 ? __L0(h_m_oam.priority, s_oam_priority__10, 4) : runtime.macro("memcpy", h_m_oam.priority, s_oam_priority__10, 4));
                    }
                    break;
                }
        }
    }
    function method_open_bus_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_open_bus_callback(runtime, members.m_openbus_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_openbus_cb, "bind"));
    }
    function __deref_open_bus_callback(runtime, p) {
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
    function method_current_x(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().hpos"];
        return ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().hpos"))?.() ?? 0)) << 16 >> 16);
    }
    function method_current_y(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().vpos"];
        return ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) << 16 >> 16);
    }
    function method_vtotal(runtime) {
        const members = runtime.members;
        return ((((((Number((((members.m_stat78 ?? 0)) & (16))) === Number(0)) ? 1 : 0)) ? (262) : (312))) | 0);
    }
    function method_htmult(runtime) {
        const members = runtime.members;
        return (((members.m_htmult ?? 0)) & 0xffff);
    }
    function method_interlace(runtime) {
        const members = runtime.members;
        return (((members.m_interlace ?? 0)) & 0xff);
    }
    function method_screen_disabled(runtime) {
        const members = runtime.members;
        return (((members.m_screen_disabled ?? 0)) ? 1 : 0);
    }
    function method_last_visible_line(runtime) {
        const members = runtime.members;
        const h_m_beam = members.m_beam ?? 0;
        return ((h_m_beam.last_visible_line) & 0xff);
    }
    function method_current_vert(runtime) {
        const members = runtime.members;
        const h_m_beam = members.m_beam ?? 0;
        return ((h_m_beam.current_vert) & 0xffff);
    }
    function method_palette_entries(runtime) {
        const members = runtime.members;
        return ((2305) >>> 0);
    }
    function method_palette_indirect_entries(runtime) {
        const members = runtime.members;
        return ((32768) >>> 0);
    }
    function method_snes_ppu_device__open_bus_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_snes_ppu_device__open_bus_callback(runtime, members.m_openbus_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_openbus_cb, "bind"));
    }
    function __deref_snes_ppu_device__open_bus_callback(runtime, p) {
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
    function method_snes_ppu_device__current_x(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().hpos"];
        return ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().hpos"))?.() ?? 0)) << 16 >> 16);
    }
    function method_snes_ppu_device__current_y(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().vpos"];
        return ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) << 16 >> 16);
    }
    function method_snes_ppu_device__vtotal(runtime) {
        const members = runtime.members;
        return ((((((Number((((members.m_stat78 ?? 0)) & (16))) === Number(0)) ? 1 : 0)) ? (262) : (312))) | 0);
    }
    function method_snes_ppu_device__htmult(runtime) {
        const members = runtime.members;
        return (((members.m_htmult ?? 0)) & 0xffff);
    }
    function method_snes_ppu_device__interlace(runtime) {
        const members = runtime.members;
        return (((members.m_interlace ?? 0)) & 0xff);
    }
    function method_snes_ppu_device__screen_disabled(runtime) {
        const members = runtime.members;
        return (((members.m_screen_disabled ?? 0)) ? 1 : 0);
    }
    function method_snes_ppu_device__last_visible_line(runtime) {
        const members = runtime.members;
        const h_m_beam = members.m_beam ?? 0;
        return ((h_m_beam.last_visible_line) & 0xff);
    }
    function method_snes_ppu_device__current_vert(runtime) {
        const members = runtime.members;
        const h_m_beam = members.m_beam ?? 0;
        return ((h_m_beam.current_vert) & 0xffff);
    }
    function method_snes_ppu_device__palette_entries(runtime) {
        const members = runtime.members;
        return ((2305) >>> 0);
    }
    function method_snes_ppu_device__palette_indirect_entries(runtime) {
        const members = runtime.members;
        return ((32768) >>> 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "pal555": method_pal555,
        "rgbexpand_5_5_5": method_rgbexpand_5_5_5,
        "palexpand_5": method_palexpand_5,
        "render_window": method_render_window,
        "update_line": method_update_line,
        "get_tile": method_get_tile,
        "direct_color": method_direct_color,
        "plot_above": method_plot_above,
        "plot_below": method_plot_below,
        "update_line_mode7": method_update_line_mode7,
        "update_objects": method_update_objects,
        "update_color_windowmasks": method_update_color_windowmasks,
        "refresh_scanline": method_refresh_scanline,
        "cache_background": method_cache_background,
        "draw_screens": method_draw_screens,
        "update_mode_0": method_update_mode_0,
        "update_mode_1": method_update_mode_1,
        "update_mode_2": method_update_mode_2,
        "update_mode_3": method_update_mode_3,
        "update_mode_4": method_update_mode_4,
        "update_mode_5": method_update_mode_5,
        "update_mode_6": method_update_mode_6,
        "update_mode_7": method_update_mode_7,
        "pixel": method_pixel,
        "blend": method_blend,
        "vram_read": method_vram_read,
        "vram_write": method_vram_write,
        "read_object": method_read_object,
        "cgram_read": method_cgram_read,
        "cgram_write": method_cgram_write,
        "set_current_vert": method_set_current_vert,
        "read": method_read,
        "set_latch_hv": method_set_latch_hv,
        "read_oam": method_read_oam,
        "oam_set_first_object": method_oam_set_first_object,
        "get_vram_address": method_get_vram_address,
        "write": method_write,
        "oam_address_reset": method_oam_address_reset,
        "write_oam": method_write_oam,
        "write_object": method_write_object,
        "dynamic_res_change": method_dynamic_res_change,
        "update_video_mode": method_update_video_mode,
        "open_bus_callback": method_open_bus_callback,
        "current_x": method_current_x,
        "current_y": method_current_y,
        "vtotal": method_vtotal,
        "htmult": method_htmult,
        "interlace": method_interlace,
        "screen_disabled": method_screen_disabled,
        "last_visible_line": method_last_visible_line,
        "current_vert": method_current_vert,
        "palette_entries": method_palette_entries,
        "palette_indirect_entries": method_palette_indirect_entries,
        "snes_ppu_device::open_bus_callback": method_snes_ppu_device__open_bus_callback,
        "snes_ppu_device::current_x": method_snes_ppu_device__current_x,
        "snes_ppu_device::current_y": method_snes_ppu_device__current_y,
        "snes_ppu_device::vtotal": method_snes_ppu_device__vtotal,
        "snes_ppu_device::htmult": method_snes_ppu_device__htmult,
        "snes_ppu_device::interlace": method_snes_ppu_device__interlace,
        "snes_ppu_device::screen_disabled": method_snes_ppu_device__screen_disabled,
        "snes_ppu_device::last_visible_line": method_snes_ppu_device__last_visible_line,
        "snes_ppu_device::current_vert": method_snes_ppu_device__current_vert,
        "snes_ppu_device::palette_entries": method_snes_ppu_device__palette_entries,
        "snes_ppu_device::palette_indirect_entries": method_snes_ppu_device__palette_indirect_entries
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["HZ_TO_ATTOSECONDS", "indirect_color", "m_openbus_cb", "memcpy", "pen_indirect", "rgb_t", "rgb_t::black", "screen", "screen().configure", "screen().hpos", "screen().visible_area", "screen().vpos", "set_pen_indirect", "util::sext"];
export const device = definition;
export default device;
