import deviceData from './neogeo_sprite_optimzied.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [128, 2176, 2184, 10376, 10378, 10890, 10922, 43690, 43754, 47850, 47851, 48107, 48111, 64495, 64511, 65535];
    const cppScratch_draw_fixed_layer_garouoffsets = new Int32Array(new Uint8Array(Math.max(0, Number(34))));
    function method_get_videoram_data(runtime) {
        const members = runtime.members;
        return (((members.m_vram_read_buffer ?? 0)) & 0xffff);
    }
    function method_set_videoram_modulo(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        members.m_vram_modulo = ((data) & 0xffff);
    }
    function method_get_videoram_modulo(runtime) {
        const members = runtime.members;
        return (((members.m_vram_modulo ?? 0)) & 0xffff);
    }
    function method_set_auto_animation_speed(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_auto_animation_speed = ((data) & 0xff);
    }
    function method_set_auto_animation_disabled(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_auto_animation_disabled = ((data) & 0xff);
    }
    function method_get_auto_animation_counter(runtime) {
        const members = runtime.members;
        return (((members.m_auto_animation_counter ?? 0)) & 0xff);
    }
    function method_set_fixed_layer_source(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_fixed_layer_source = ((data) & 0xff);
    }
    function method_set_fixed_layer_bank_type(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_fixed_layer_bank_type = ((data) & 0xff);
    }
    function method_draw_fixed_layer(runtime, bitmap, scanline) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        const h_m_bppshift = members.m_bppshift ?? 0;
        let gfx_base = (((members.m_fixed_layer_source ?? 0)) ? ((members.m_region_fixed ?? 0)) : ((__t0 = __deref_draw_fixed_layer(runtime, members.m_region_fixedbios), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_region_fixedbios, "base"))));
        let gfx_base$s = undefined, gfx_base$o = 0;
        if (ArrayBuffer.isView(gfx_base) || Array.isArray(gfx_base))
            gfx_base$s = gfx_base;
        else if (gfx_base !== null && typeof gfx_base === 'object' && gfx_base.generatedPointer === true && gfx_base.path === undefined && gfx_base.target === undefined && (ArrayBuffer.isView(gfx_base.source) || Array.isArray(gfx_base.source))) {
            gfx_base$s = gfx_base.source;
            gfx_base$o = gfx_base.offset;
        }
        let addr_mask = (((((((members.m_fixed_layer_source ?? 0)) ? ((members.m_region_fixed_size ?? 0)) : (runtime.container(members.m_region_fixedbios, "bytes")))) - (1))) >>> 0);
        let video_data = __addr_draw_fixed_layer(runtime, (members.m_videoram_drawsource ?? 0), ((28672) | (runtime.shiftRight(scanline, 3))));
        let pixel_addr = bitmap["pix&"](scanline, 28);
        let garouoffsets = cppScratch_draw_fixed_layer_garouoffsets.fill(0);
        let banked = ((((((members.m_fixed_layer_source ?? 0)) && ((((addr_mask) > (131071)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if ((((banked) && (((Number((members.m_fixed_layer_bank_type ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
            let garoubank = ((0) | 0);
            let k = ((0) | 0);
            let y = ((0) | 0);
            while ((((y) < (32)) ? 1 : 0)) {
                if ((((((Number(runtime.readIndex((members.m_videoram_drawsource ?? 0), ((29952) + (k)))) === Number(512)) ? 1 : 0)) && (((Number(((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((30080) + (k)))) & (65280))) === Number(65280)) ? 1 : 0))) ? 1 : 0)) {
                    garoubank = ((((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((30080) + (k)))) & (3))) | 0);
                    garouoffsets[(__t1 = y, y = ((((y) + (1))) | 0), __t1)] = garoubank;
                }
                garouoffsets[(__t2 = y, y = ((((y) + (1))) | 0), __t2)] = garoubank;
                k = ((((k) + (2))) | 0);
            }
        }
        for (let x = ((0) | 0); (((x) < (40)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            let code_and_palette = ((__deref_draw_fixed_layer(runtime, video_data)) & 0xffff);
            let code = ((((code_and_palette) & (4095))) & 0xffff);
            if (banked) {
                let y = ((runtime.shiftRight(scanline, 3)) | 0);
                switch ((members.m_fixed_layer_bank_type ?? 0)) {
                    case 1:
                        {
                            code = ((((code) + (((4096) * ((((garouoffsets[((((y) - (2))) & (31))] ?? 0)) ^ (3))))))) & 0xffff);
                            break;
                        }
                    case 2:
                        {
                            code = ((((code) + (((4096) * (((((runtime.shiftRight(runtime.readIndex((members.m_videoram_drawsource ?? 0), __add_draw_fixed_layer(runtime, __add_draw_fixed_layer(runtime, 29952, ((((y) - (1))) & (31))), ((32) * (runtime.divide(x, 6))))), ((((5) - (((x) % (6))))) * (2)))) & (3))) ^ (3))))))) & 0xffff);
                            break;
                        }
                }
            }
            let gfx_offset = ((((((((code) << (5))) | (((scanline) & (7))))) & (addr_mask))) | 0);
            let char_pens = __addr_draw_fixed_layer(runtime, (members.m_pens ?? 0), ((((code_and_palette) >>> (12))) << (h_m_bppshift)));
            let char_pens$s = undefined, char_pens$o = 0;
            if (ArrayBuffer.isView(char_pens) || Array.isArray(char_pens))
                char_pens$s = char_pens;
            else if (char_pens !== null && typeof char_pens === 'object' && char_pens.generatedPointer === true && char_pens.path === undefined && char_pens.target === undefined && (ArrayBuffer.isView(char_pens.source) || Array.isArray(char_pens.source))) {
                char_pens$s = char_pens.source;
                char_pens$o = char_pens.offset;
            }
            if ((((members.__static_draw_fixed_layer_pix_offsets__initialised ?? 0)) ? 0 : 1)) {
                members.__static_draw_fixed_layer_pix_offsets = [16, 24, 0, 8];
                members.__static_draw_fixed_layer_pix_offsets__initialised = 1;
            }
            let pix_offsets = (members.__static_draw_fixed_layer_pix_offsets ?? 0);
            for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let __inline0_offset = ((gfx_offset) + (runtime.readIndex(pix_offsets, i)));
                let __inline0_gfx_base = gfx_base;
                let __inline0_char_pens = char_pens;
                let __inline0_data = ((runtime.readIndex(__inline0_gfx_base, __inline0_offset)) & 0xff);
                if (((__inline0_data) & (15))) {
                    runtime.pointerStore(pixel_addr, runtime.readIndex(__inline0_char_pens, ((__inline0_data) & (15))));
                }
                pixel_addr = __add_draw_fixed_layer(runtime, pixel_addr, 1);
                if (((__inline0_data) & (240))) {
                    runtime.pointerStore(pixel_addr, runtime.readIndex(__inline0_char_pens, runtime.shiftRight(((__inline0_data) & (240)), 4)));
                }
                pixel_addr = __add_draw_fixed_layer(runtime, pixel_addr, 1);
            }
            video_data = __addr_draw_fixed_layer(runtime, video_data, 32);
        }
    }
    function __add_draw_fixed_layer(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_draw_fixed_layer(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_draw_fixed_layer(runtime, p) {
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
    function method_draw_sprites(runtime, bitmap, scanline) {
        const members = runtime.members;
        const h_m_region_zoomy = members.m_region_zoomy ?? 0;
        const h_m_bppshift = members.m_bppshift ?? 0;
        let max_sprite_index = ((0) | 0);
        let y = ((0) | 0);
        let x = ((0) | 0);
        let rows = ((0) | 0);
        let zoom_y = ((0) | 0);
        let zoom_x = ((0) | 0);
        let sprite_list = runtime.packedView(0, false);
        if ((((scanline) >>> (0)) & 1)) {
            sprite_list = runtime.packedView(__addr_draw_sprites(runtime, (members.m_videoram_drawsource ?? 0), 34432), false);
        }
        else {
            sprite_list = runtime.packedView(__addr_draw_sprites(runtime, (members.m_videoram_drawsource ?? 0), 34304), false);
        }
        for (max_sprite_index = ((95) | 0); (((max_sprite_index) >= (0)) ? 1 : 0); max_sprite_index = ((((max_sprite_index) - (1))) | 0)) {
            if (((Number(runtime.readIndex(sprite_list, max_sprite_index)) !== Number(0)) ? 1 : 0)) {
                break;
            }
        }
        if (((Number(max_sprite_index) !== Number(95)) ? 1 : 0)) {
            max_sprite_index = ((((max_sprite_index) + (1))) | 0);
        }
        for (let sprite_index = ((0) | 0); (((sprite_index) <= (max_sprite_index)) ? 1 : 0); sprite_index = ((((sprite_index) + (1))) | 0)) {
            let sprite_number = ((((runtime.readIndex(sprite_list, sprite_index)) & (511))) & 0xffff);
            let y_control = ((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((33280) | (sprite_number)))) & 0xffff);
            let zoom_control = ((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((32768) | (sprite_number)))) & 0xffff);
            if ((((y_control) >>> (6)) & 1)) {
                x = ((((__add_draw_sprites(runtime, ((x) + (zoom_x)), 1)) & (511))) | 0);
                zoom_x = ((((((zoom_control) >>> (8))) & (15))) | 0);
            }
            else {
                y = ((((512) - (((y_control) >>> (7))))) | 0);
                x = ((runtime.shiftRight(runtime.readIndex((members.m_videoram_drawsource ?? 0), ((33792) | (sprite_number))), 7)) | 0);
                zoom_y = ((((zoom_control) & (255))) | 0);
                zoom_x = ((((((zoom_control) >>> (8))) & (15))) | 0);
                rows = ((((y_control) & (63))) | 0);
            }
            if (((((((x) >= (320)) ? 1 : 0)) && ((((x) <= (496)) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            if (method_sprite_on_scanline(runtime, scanline, y, rows)) {
                let sprite_line = ((((((scanline) - (y))) & (511))) | 0);
                let zoom_line = ((((sprite_line) & (255))) | 0);
                let invert = (((((sprite_line) >>> (8)) & 1)) ? 1 : 0);
                if (invert) {
                    zoom_line = ((((zoom_line) ^ (255))) | 0);
                }
                if ((((rows) > (32)) ? 1 : 0)) {
                    zoom_line = ((((zoom_line) % (((((zoom_y) + (1))) << (1))))) | 0);
                    if ((((zoom_line) > (zoom_y)) ? 1 : 0)) {
                        zoom_line = ((((((((((zoom_y) + (1))) << (1))) - (1))) - (zoom_line))) | 0);
                        invert = ((((invert) ? 0 : 1)) ? 1 : 0);
                    }
                }
                let sprite_y_and_tile = ((runtime.readIndex(h_m_region_zoomy, ((((zoom_y) << (8))) | (zoom_line)))) & 0xff);
                let sprite_y = ((((sprite_y_and_tile) & (15))) | 0);
                let tile = ((((sprite_y_and_tile) >>> (4))) | 0);
                if (invert) {
                    sprite_y = ((((sprite_y) ^ (15))) | 0);
                    tile = ((((tile) ^ (31))) | 0);
                }
                let attr_and_code_offs = ((((sprite_number) << (6))) | (((tile) << (1))));
                let attr = ((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((attr_and_code_offs) + (1)))) & 0xffff);
                let code = ((((((((attr) << (12))) & (983040))) | (runtime.readIndex((members.m_videoram_drawsource ?? 0), attr_and_code_offs)))) >>> 0);
                if ((((members.m_auto_animation_disabled ?? 0)) ? 0 : 1)) {
                    if ((((attr) >>> (3)) & 1)) {
                        code = ((((((code) & (-8))) | ((((members.m_auto_animation_counter ?? 0)) & (7))))) >>> 0);
                    }
                    else {
                        if ((((attr) >>> (2)) & 1)) {
                            code = ((((((code) & (-4))) | ((((members.m_auto_animation_counter ?? 0)) & (3))))) >>> 0);
                        }
                    }
                }
                if ((((attr) >>> (1)) & 1)) {
                    sprite_y = ((((sprite_y) ^ (15))) | 0);
                }
                let zoom_x_table = (((__mame_table_0[((zoom_x) & 15)] ?? 0)) & 0xffff);
                let gfx_base = ((((((((code) << (8))) | (((sprite_y) << (4))))) & ((members.m_sprite_gfx_address_mask ?? 0)))) | 0);
                let line_pens = __addr_draw_sprites(runtime, (members.m_pens ?? 0), ((((attr) >>> (8))) << (h_m_bppshift)));
                let line_pens$s = undefined, line_pens$o = 0;
                if (ArrayBuffer.isView(line_pens) || Array.isArray(line_pens))
                    line_pens$s = line_pens;
                else if (line_pens !== null && typeof line_pens === 'object' && line_pens.generatedPointer === true && line_pens.path === undefined && line_pens.target === undefined && (ArrayBuffer.isView(line_pens.source) || Array.isArray(line_pens.source))) {
                    line_pens$s = line_pens.source;
                    line_pens$o = line_pens.offset;
                }
                let x_inc = ((0) | 0);
                if ((((attr) >>> (0)) & 1)) {
                    gfx_base = ((((gfx_base) + (15))) | 0);
                    x_inc = ((-1) | 0);
                }
                else {
                    x_inc = ((1) | 0);
                }
                if ((((x) <= (496)) ? 1 : 0)) {
                    let pixel_addr = bitmap["pix&"](scanline, ((x) + (28)));
                    for (let i = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if ((((zoom_x_table) >>> (15)) & 1)) {
                            method_draw_pixel(runtime, gfx_base, pixel_addr, line_pens);
                            pixel_addr = __add_draw_sprites(runtime, pixel_addr, 1);
                        }
                        zoom_x_table = ((((zoom_x_table) << (1))) & 0xffff);
                        if ((((zoom_x_table) === (0)) ? 1 : 0)) {
                            break;
                        }
                        gfx_base = ((((gfx_base) + (x_inc))) | 0);
                    }
                }
                else {
                    let x_save = ((x) | 0);
                    let pixel_addr = bitmap["pix&"](scanline, 28);
                    for (let i = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if ((((zoom_x_table) >>> (15)) & 1)) {
                            if ((((x) >= (512)) ? 1 : 0)) {
                                method_draw_pixel(runtime, gfx_base, pixel_addr, line_pens);
                                pixel_addr = __add_draw_sprites(runtime, pixel_addr, 1);
                            }
                            x = ((((x) + (1))) | 0);
                        }
                        zoom_x_table = ((((zoom_x_table) << (1))) & 0xffff);
                        if ((((zoom_x_table) === (0)) ? 1 : 0)) {
                            break;
                        }
                        gfx_base = ((((gfx_base) + (x_inc))) | 0);
                    }
                    x = ((x_save) | 0);
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
    function __addr_draw_sprites(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_sprite_on_scanline(runtime, scanline, y, rows) {
        const members = runtime.members;
        return (((((((((rows) === (0)) ? 1 : 0)) || ((((rows) >= (32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
    }
    function method_draw_pixel(runtime, romaddr, dst, line_pens) {
        const members = runtime.members;
        let gfx = ((runtime.readIndex((members.m_spritegfx8 ?? 0), romaddr)) & 0xff);
        if (gfx) {
            runtime.pointerStore(dst, runtime.readIndex(line_pens, gfx));
        }
    }
    function method_set_pens(runtime, pens) {
        const members = runtime.members;
        members.m_pens = pens;
    }
    function method_auto_animation_timer_callback(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().time_until_pos"];
        if (((((members.m_auto_animation_frame_counter ?? 0)) === (0)) ? 1 : 0)) {
            members.m_auto_animation_frame_counter = (((members.m_auto_animation_speed ?? 0)) & 0xff);
            members.m_auto_animation_counter = ((((members.m_auto_animation_counter) + (1))) & 0xff);
        }
        else {
            members.m_auto_animation_frame_counter = (((((members.m_auto_animation_frame_counter ?? 0)) - (1))) & 0xff);
        }
        (__deref_auto_animation_timer_callback(runtime, members.m_auto_animation_timer).adjust?.(((__L1 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(256) ?? 0)) ?? 0);
    }
    function __deref_auto_animation_timer_callback(runtime, p) {
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
    function method_sprite_line_timer_callback(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().update_partial"], __L2 = __l["screen().time_until_pos"];
        let scanline = ((param) | 0);
        if ((((scanline) !== (0)) ? 1 : 0)) {
            ((__L1 ?? globalThis.mamekitMissingCall?.("screen().update_partial"))?.(((scanline) - (1))) ?? 0);
        }
        method_parse_sprites(runtime, scanline);
        scanline = ((((((scanline) + (1))) % (264))) | 0);
        (__deref_sprite_line_timer_callback(runtime, members.m_sprite_line_timer).adjust?.(((__L2 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(scanline) ?? 0), scanline) ?? 0);
    }
    function __deref_sprite_line_timer_callback(runtime, p) {
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
    function method_parse_sprites(runtime, scanline) {
        const members = runtime.members;
        let y = ((0) | 0);
        let rows = ((0) | 0);
        let sprite_list = runtime.packedView(0, false);
        let active_sprite_count = ((0) | 0);
        if ((((scanline) >>> (0)) & 1)) {
            sprite_list = runtime.packedView(__addr_parse_sprites(runtime, (members.m_videoram_drawsource ?? 0), 34432), false);
        }
        else {
            sprite_list = runtime.packedView(__addr_parse_sprites(runtime, (members.m_videoram_drawsource ?? 0), 34304), false);
        }
        for (let sprite_number = ((0) & 0xffff); ((Number(sprite_number) < Number(381)) ? 1 : 0); sprite_number = ((((sprite_number) + (1))) & 0xffff)) {
            let y_control = ((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((33280) | (sprite_number)))) & 0xffff);
            if (((((~y_control)) >>> (6)) & 1)) {
                y = ((((512) - (((y_control) >>> (7))))) | 0);
                rows = ((((y_control) & (63))) | 0);
            }
            if ((((rows) === (0)) ? 1 : 0)) {
                continue;
            }
            if (((method_sprite_on_scanline(runtime, scanline, y, rows)) ? 0 : 1)) {
                continue;
            }
            runtime.pointerStore(sprite_list, sprite_number);
            sprite_list = runtime.packedView(__add_parse_sprites(runtime, sprite_list, 1), false);
            active_sprite_count = ((((active_sprite_count) + (1))) | 0);
            if (((Number(active_sprite_count) === Number(96)) ? 1 : 0)) {
                break;
            }
        }
        cppMemset(runtime, sprite_list, 0, ((((runtime.readIndex(sprite_list, 0))?.byteLength ?? 2)) * (__add_parse_sprites(runtime, ((96) - (active_sprite_count)), 1))));
    }
    function __add_parse_sprites(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_parse_sprites(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_optimize_helper(runtime, spritegfx, region_sprites, region_sprites_size) {
        const members = runtime.members;
        let __t0, __t1;
        let mask = ((method_get_region_mask(runtime, region_sprites, region_sprites_size)) >>> 0);
        (spritegfx = runtime.resize(spritegfx, ((mask) + (1))));
        let src = region_sprites;
        let dest = __addr_optimize_helper(runtime, spritegfx, 0);
        for (let i = 0; (((i) < (region_sprites_size)) ? 1 : 0); i = ((i) + (128)), src = __add_optimize_helper(runtime, src, 128)) {
            for (let y = 0; (((y) < (16)) ? 1 : 0); y = ((y) + (1))) {
                for (let x = 0; (((x) < (8)) ? 1 : 0); x = ((x) + (1))) {
                    runtime.pointerStore((__t0 = dest, dest = __add_optimize_helper(runtime, dest, 1), __t0), (((((((((((runtime.readIndex(src, ((67) | (((y) << (2)))))) >>> (x)) & 1)) << (3))) | ((((((runtime.readIndex(src, ((65) | (((y) << (2)))))) >>> (x)) & 1)) << (2))))) | ((((((runtime.readIndex(src, ((66) | (((y) << (2)))))) >>> (x)) & 1)) << (1))))) | ((((((runtime.readIndex(src, ((64) | (((y) << (2)))))) >>> (x)) & 1)) << (0)))));
                }
                for (let x = 0; (((x) < (8)) ? 1 : 0); x = ((x) + (1))) {
                    runtime.pointerStore((__t1 = dest, dest = __add_optimize_helper(runtime, dest, 1), __t1), (((((((((((runtime.readIndex(src, ((3) | (((y) << (2)))))) >>> (x)) & 1)) << (3))) | ((((((runtime.readIndex(src, ((1) | (((y) << (2)))))) >>> (x)) & 1)) << (2))))) | ((((((runtime.readIndex(src, ((2) | (((y) << (2)))))) >>> (x)) & 1)) << (1))))) | ((((((runtime.readIndex(src, ((0) | (((y) << (2)))))) >>> (x)) & 1)) << (0)))));
                }
            }
        }
        return ((mask) >>> 0);
    }
    function __add_optimize_helper(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_optimize_helper(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
    function method_neosprite_base_device__optimize_sprite_data(runtime) {
        const members = runtime.members;
        return;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_videoram_data": method_get_videoram_data,
        "set_videoram_modulo": method_set_videoram_modulo,
        "get_videoram_modulo": method_get_videoram_modulo,
        "set_auto_animation_speed": method_set_auto_animation_speed,
        "set_auto_animation_disabled": method_set_auto_animation_disabled,
        "get_auto_animation_counter": method_get_auto_animation_counter,
        "set_fixed_layer_source": method_set_fixed_layer_source,
        "set_fixed_layer_bank_type": method_set_fixed_layer_bank_type,
        "draw_fixed_layer": method_draw_fixed_layer,
        "draw_sprites": method_draw_sprites,
        "sprite_on_scanline": method_sprite_on_scanline,
        "draw_pixel": method_draw_pixel,
        "set_pens": method_set_pens,
        "auto_animation_timer_callback": method_auto_animation_timer_callback,
        "sprite_line_timer_callback": method_sprite_line_timer_callback,
        "parse_sprites": method_parse_sprites,
        "optimize_helper": method_optimize_helper,
        "get_region_mask": method_get_region_mask,
        "neosprite_base_device::optimize_sprite_data": method_neosprite_base_device__optimize_sprite_data
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["screen", "screen().time_until_pos", "screen().update_partial"];
export const device = definition;
export default device;
