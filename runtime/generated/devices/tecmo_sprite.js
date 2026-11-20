import deviceData from './tecmo_sprite.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0, 1, 4, 5, 16, 17, 20, 21, 2, 3, 6, 7, 18, 19, 22, 23, 8, 9, 12, 13, 24, 25, 28, 29, 10, 11, 14, 15, 26, 27, 30, 31, 32, 33, 36, 37, 48, 49, 52, 53, 34, 35, 38, 39, 50, 51, 54, 55, 40, 41, 44, 45, 56, 57, 60, 61, 42, 43, 46, 47, 58, 59, 62, 63];
    function method_gaiden_draw_sprites(runtime, screen, bitmap, cliprect, spriteram, sprite_sizey, spr_offset_y, flip_screen) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["gfx"];
        let __t0, __t1, __t2, __t3, __t4, __t5;
        let SOURCE_INC = ((8) | 0);
        let ATTRIBUTES_WORD = ((0) | 0);
        let TILE_NUMBER_WORD = ((1) | 0);
        let COLOUR_WORD = ((2) | 0);
        let Y_POSITION_WORD = ((3) | 0);
        let X_POSITION_WORD = ((4) | 0);
        let screenwidth = (((__t1 = __deref_gaiden_draw_sprites(runtime, (__t0 = __deref_gaiden_draw_sprites(runtime, screen), typeof __t0.visible_area === 'function' ? __t0.visible_area() : typeof __t0.visible_area === 'number' || typeof __t0.visible_area === 'boolean' ? __t0.visible_area : runtime.container(screen, "visible_area"))), typeof __t1.width === 'function' ? (__t1.width() ?? 0) : runtime.container((__t0 = __deref_gaiden_draw_sprites(runtime, screen), typeof __t0.visible_area === 'function' ? __t0.visible_area() : typeof __t0.visible_area === 'number' || typeof __t0.visible_area === 'boolean' ? __t0.visible_area : runtime.container(screen, "visible_area")), "width"))) | 0);
        let xmask = (((((((screenwidth) >= (512)) ? 1 : 0)) ? (512) : (256))) | 0);
        let source = spriteram;
        let count = ((256) | 0);
        while ((__t2 = count, count = ((((count) - (1))) | 0), __t2)) {
            let attributes = ((runtime.readIndex(source, ATTRIBUTES_WORD)) & 0xffff);
            let enabled = (((((attributes) >>> (2)) & 1)) ? 1 : 0);
            if (enabled) {
                if ((members.m_bootleg ?? 0)) {
                    if ((((attributes) >>> (6)) & 1)) {
                        let frame = (((((__t3 = __deref_gaiden_draw_sprites(runtime, screen), typeof __t3.frame_number === 'function' ? __t3.frame_number() : typeof __t3.frame_number === 'number' || typeof __t3.frame_number === 'boolean' ? __t3.frame_number : runtime.container(screen, "frame_number"))) & (1))) & 0xff);
                        if ((((frame) === (1)) ? 1 : 0)) {
                            enabled = ((0) ? 1 : 0);
                        }
                    }
                }
            }
            if (enabled) {
                let flipx = (((((attributes) >>> (0)) & 1)) ? 1 : 0);
                let flipy = (((((attributes) >>> (1)) & 1)) ? 1 : 0);
                let color = ((runtime.readIndex(source, COLOUR_WORD)) >>> 0);
                let sizex = ((((1) << (((((color) >>> (0))) & (3))))) & 0xff);
                let sizey = ((((1) << (((((color) >>> (sprite_sizey))) & (3))))) & 0xff);
                let number = ((runtime.readIndex(source, TILE_NUMBER_WORD)) >>> 0);
                if ((((sizex) >= (2)) ? 1 : 0)) {
                    number = ((((number) & (-2))) >>> 0);
                }
                if ((((sizey) >= (2)) ? 1 : 0)) {
                    number = ((((number) & (-3))) >>> 0);
                }
                if ((((sizex) >= (4)) ? 1 : 0)) {
                    number = ((((number) & (-5))) >>> 0);
                }
                if ((((sizey) >= (4)) ? 1 : 0)) {
                    number = ((((number) & (-9))) >>> 0);
                }
                if ((((sizex) >= (8)) ? 1 : 0)) {
                    number = ((((number) & (-17))) >>> 0);
                }
                if ((((sizey) >= (8)) ? 1 : 0)) {
                    number = ((((number) & (-33))) >>> 0);
                }
                let ypos = ((((((runtime.readIndex(source, Y_POSITION_WORD)) + (spr_offset_y))) & (511))) | 0);
                let xpos = ((((runtime.readIndex(source, X_POSITION_WORD)) & (((((xmask) * (2))) - (1))))) | 0);
                color = ((((((color) >>> (4))) & (15))) >>> 0);
                if ((((xpos) >= (xmask)) ? 1 : 0)) {
                    xpos = ((((xpos) - (((xmask) * (2))))) | 0);
                }
                if ((((ypos) >= (256)) ? 1 : 0)) {
                    ypos = ((((ypos) - (512))) | 0);
                }
                if (flip_screen) {
                    flipx = ((((flipx) ? 0 : 1)) ? 1 : 0);
                    flipy = ((((flipy) ? 0 : 1)) ? 1 : 0);
                    xpos = ((((((256) - (((8) * (sizex))))) - (xpos))) | 0);
                    ypos = ((((((256) - (((8) * (sizey))))) - (ypos))) | 0);
                    if (((Number(xpos) <= Number(-256)) ? 1 : 0)) {
                        xpos = ((((xpos) + (512))) | 0);
                    }
                    if (((Number(ypos) <= Number(-256)) ? 1 : 0)) {
                        ypos = ((((ypos) + (512))) | 0);
                    }
                }
                color = ((((color) | (((runtime.readIndex(source, ATTRIBUTES_WORD)) & (1008))))) >>> 0);
                for (let row = ((0) | 0); (((row) < (sizey)) ? 1 : 0); row = ((((row) + (1))) | 0)) {
                    for (let col = ((0) | 0); (((col) < (sizex)) ? 1 : 0); col = ((((col) + (1))) | 0)) {
                        let sx = ((((xpos) + (((8) * (((flipx) ? (((((sizex) - (1))) - (col))) : (col))))))) | 0);
                        let sy = ((((ypos) + (((8) * (((flipy) ? (((((sizey) - (1))) - (row))) : (row))))))) | 0);
                        (__deref_gaiden_draw_sprites(runtime, (__L0 ? __L0(0) : runtime.macro("gfx", 0))).transpen_raw?.(bitmap, cliprect, ((number) + ((__mame_table_0[(((((((row) * (8))) + (col))) % 64) + 64) % 64] ?? 0))), __add_gaiden_draw_sprites(runtime, (__t4 = __deref_gaiden_draw_sprites(runtime, (__L0 ? __L0(0) : runtime.macro("gfx", 0))), typeof __t4.colorbase === 'function' ? (__t4.colorbase() ?? 0) : runtime.container((__L0 ? __L0(0) : runtime.macro("gfx", 0)), "colorbase")), ((color) * ((__t5 = __deref_gaiden_draw_sprites(runtime, (__L0 ? __L0(0) : runtime.macro("gfx", 0))), typeof __t5.granularity === 'function' ? (__t5.granularity() ?? 0) : runtime.container((__L0 ? __L0(0) : runtime.macro("gfx", 0)), "granularity"))))), flipx, flipy, sx, sy, 0) ?? 0);
                    }
                }
            }
            source = __add_gaiden_draw_sprites(runtime, source, SOURCE_INC);
        }
    }
    function __add_gaiden_draw_sprites(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_gaiden_draw_sprites(runtime, p) {
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
    function method_draw_sprites_8bit(runtime, screen, bitmap, cliprect, spriteram, size, video_type, flip_screen) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pri_cb"], __L1 = __l["gfx"];
        let __t0;
        for (let offs = ((((size) - (8))) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (8))) | 0)) {
            let bank = ((runtime.readIndex(spriteram, ((offs) + (0)))) & 0xff);
            if ((((bank) >>> (2)) & 1)) {
                let flags = ((runtime.readIndex(spriteram, ((offs) + (3)))) & 0xff);
                let priority_mask = (((__L0 ? __L0(((flags) >>> (6))) : runtime.macro("m_pri_cb", ((flags) >>> (6))))) >>> 0);
                let which = ((runtime.readIndex(spriteram, ((offs) + (1)))) & 0xff);
                let code = ((0) >>> 0);
                let size__1 = ((((runtime.readIndex(spriteram, ((offs) + (2)))) & (3))) & 0xff);
                if ((((video_type) !== (0)) ? 1 : 0)) {
                    code = ((((which) + (((((bank) & (248))) << (5))))) >>> 0);
                }
                else {
                    code = ((((which) + (((((bank) & (240))) << (4))))) >>> 0);
                }
                code = ((((code) & ((~((((1) << (((size__1) * (2))))) - (1)))))) >>> 0);
                size__1 = ((((1) << (size__1))) & 0xff);
                let xpos = ((((runtime.readIndex(spriteram, ((offs) + (5)))) - (((((flags) & (16))) << (4))))) | 0);
                let ypos = ((((runtime.readIndex(spriteram, ((offs) + (4)))) - (((((flags) & (32))) << (3))))) | 0);
                let flipx = (((((bank) >>> (0)) & 1)) ? 1 : 0);
                let flipy = (((((bank) >>> (1)) & 1)) ? 1 : 0);
                if (flip_screen) {
                    xpos = ((((((256) - (((8) * (size__1))))) - (xpos))) | 0);
                    ypos = ((((((256) - (((8) * (size__1))))) - (ypos))) | 0);
                    flipx = ((((flipx) ? 0 : 1)) ? 1 : 0);
                    flipy = ((((flipy) ? 0 : 1)) ? 1 : 0);
                }
                for (let y = ((0) | 0); (((y) < (size__1)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    for (let x = ((0) | 0); (((x) < (size__1)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                        let sx = ((((xpos) + (((8) * (((flipx) ? (((((size__1) - (1))) - (x))) : (x))))))) | 0);
                        let sy = ((((ypos) + (((8) * (((flipy) ? (((((size__1) - (1))) - (y))) : (y))))))) | 0);
                        (__deref_draw_sprites_8bit(runtime, (__L1 ? __L1(0) : runtime.macro("gfx", 0))).prio_transpen?.(bitmap, cliprect, ((code) + ((__mame_table_0[(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), ((flags) & (15)), flipx, flipy, sx, sy, (__t0 = __deref_draw_sprites_8bit(runtime, screen), typeof __t0.priority === 'function' ? __t0.priority() : typeof __t0.priority === 'number' || typeof __t0.priority === 'boolean' ? __t0.priority : runtime.container(screen, "priority")), priority_mask, 0) ?? 0);
                    }
                }
            }
        }
    }
    function __deref_draw_sprites_8bit(runtime, p) {
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
    function method_draw_wc90_sprites(runtime, screen, bitmap, cliprect, spriteram, size) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pri_cb"], __L1 = __l["gfx"];
        let __t0;
        for (let offs = ((((size) - (16))) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (16))) | 0)) {
            let bank = ((runtime.readIndex(spriteram, ((offs) + (0)))) & 0xff);
            if ((((bank) >>> (2)) & 1)) {
                let priority_mask = (((__L0 ? __L0(((bank) >>> (4))) : runtime.macro("m_pri_cb", ((bank) >>> (4))))) >>> 0);
                let code = ((__add_draw_wc90_sprites(runtime, runtime.readIndex(spriteram, ((offs) + (2))), ((runtime.readIndex(spriteram, ((offs) + (3)))) << (8)))) >>> 0);
                let xpos = ((__add_draw_wc90_sprites(runtime, runtime.readIndex(spriteram, ((offs) + (8))), ((((runtime.readIndex(spriteram, ((offs) + (9)))) & (3))) << (8)))) | 0);
                let ypos = ((((runtime.readIndex(spriteram, ((offs) + (6)))) + ((members.m_yoffset ?? 0)))) | 0);
                ypos = ((((ypos) & (255))) | 0);
                ypos = ((((ypos) - (((((runtime.readIndex(spriteram, ((offs) + (7)))) & (1))) << (8))))) | 0);
                if ((((xpos) >= (768)) ? 1 : 0)) {
                    xpos = ((((xpos) - (1024))) | 0);
                }
                let flags = ((runtime.readIndex(spriteram, ((offs) + (4)))) & 0xff);
                let sizex = ((((1) << (((((flags) >>> (0))) & (3))))) & 0xff);
                let sizey = ((((1) << (((((flags) >>> (2))) & (3))))) & 0xff);
                let flipx = (((((bank) >>> (0)) & 1)) ? 1 : 0);
                let flipy = (((((bank) >>> (1)) & 1)) ? 1 : 0);
                for (let y = ((0) | 0); (((y) < (sizey)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    for (let x = ((0) | 0); (((x) < (sizex)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                        let sx = ((((xpos) + (((8) * (((flipx) ? (((((sizex) - (1))) - (x))) : (x))))))) | 0);
                        let sy = ((((ypos) + (((8) * (((flipy) ? (((((sizey) - (1))) - (y))) : (y))))))) | 0);
                        (__deref_draw_wc90_sprites(runtime, (__L1 ? __L1(0) : runtime.macro("gfx", 0))).prio_transpen?.(bitmap, cliprect, ((code) + ((__mame_table_0[(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), ((((flags) >>> (4))) & (15)), flipx, flipy, sx, sy, (__t0 = __deref_draw_wc90_sprites(runtime, screen), typeof __t0.priority === 'function' ? __t0.priority() : typeof __t0.priority === 'number' || typeof __t0.priority === 'boolean' ? __t0.priority : runtime.container(screen, "priority")), priority_mask, 0) ?? 0);
                    }
                }
            }
        }
    }
    function __add_draw_wc90_sprites(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_draw_wc90_sprites(runtime, p) {
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
    function method_tbowl_draw_sprites(runtime, bitmap, cliprect, xscroll, spriteram) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["gfx"];
        for (let offs = ((0) | 0); (((offs) < (2048)) ? 1 : 0); offs = ((((offs) + (8))) | 0)) {
            if ((((runtime.readIndex(spriteram, ((offs) + (0)))) >>> (7)) & 1)) {
                let code = ((__add_tbowl_draw_sprites(runtime, runtime.readIndex(spriteram, ((offs) + (2))), ((runtime.readIndex(spriteram, ((offs) + (1)))) << (8)))) >>> 0);
                let color = ((((runtime.readIndex(spriteram, ((offs) + (3)))) & (31))) >>> 0);
                let sizex = ((((1) << (runtime.shiftRight(((runtime.readIndex(spriteram, ((offs) + (0)))) & (3)), 0)))) & 0xff);
                let sizey = ((((1) << (runtime.shiftRight(((runtime.readIndex(spriteram, ((offs) + (0)))) & (12)), 2)))) & 0xff);
                let flipx = (((((runtime.readIndex(spriteram, ((offs) + (0)))) >>> (5)) & 1)) ? 1 : 0);
                let flipy = ((0) ? 1 : 0);
                let xpos = ((__add_tbowl_draw_sprites(runtime, runtime.readIndex(spriteram, ((offs) + (6))), ((((runtime.readIndex(spriteram, ((offs) + (4)))) & (3))) << (8)))) | 0);
                let ypos = ((__add_tbowl_draw_sprites(runtime, runtime.readIndex(spriteram, ((offs) + (5))), ((((runtime.readIndex(spriteram, ((offs) + (4)))) & (16))) << (4)))) | 0);
                for (let y = ((0) | 0); (((y) < (sizey)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    for (let x = ((0) | 0); (((x) < (sizex)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                        let sx = ((((xpos) + (((8) * (((flipx) ? (((((sizex) - (1))) - (x))) : (x))))))) | 0);
                        let sy = ((((ypos) + (((8) * (((flipy) ? (((((sizey) - (1))) - (y))) : (y))))))) | 0);
                        sx = ((((sx) - (xscroll))) | 0);
                        (__deref_tbowl_draw_sprites(runtime, (__L0 ? __L0(0) : runtime.macro("gfx", 0))).transpen?.(bitmap, cliprect, ((code) + ((__mame_table_0[(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), color, flipx, flipy, sx, sy, 0) ?? 0);
                        (__deref_tbowl_draw_sprites(runtime, (__L0 ? __L0(0) : runtime.macro("gfx", 0))).transpen?.(bitmap, cliprect, ((code) + ((__mame_table_0[(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), color, flipx, flipy, sx, ((sy) - (512)), 0) ?? 0);
                        (__deref_tbowl_draw_sprites(runtime, (__L0 ? __L0(0) : runtime.macro("gfx", 0))).transpen?.(bitmap, cliprect, ((code) + ((__mame_table_0[(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), color, flipx, flipy, ((sx) - (1024)), sy, 0) ?? 0);
                        (__deref_tbowl_draw_sprites(runtime, (__L0 ? __L0(0) : runtime.macro("gfx", 0))).transpen?.(bitmap, cliprect, ((code) + ((__mame_table_0[(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), color, flipx, flipy, ((sx) - (1024)), ((sy) - (512)), 0) ?? 0);
                    }
                }
            }
        }
    }
    function __add_tbowl_draw_sprites(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_tbowl_draw_sprites(runtime, p) {
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
    function method_set_bootleg(runtime, bootleg) {
        const members = runtime.members;
        members.m_bootleg = ((bootleg) ? 1 : 0);
    }
    function method_set_yoffset(runtime, yoffset) {
        const members = runtime.members;
        members.m_yoffset = ((yoffset) | 0);
    }
    function method_tecmo_spr_device__set_bootleg(runtime, bootleg) {
        const members = runtime.members;
        members.m_bootleg = ((bootleg) ? 1 : 0);
    }
    function method_tecmo_spr_device__set_yoffset(runtime, yoffset) {
        const members = runtime.members;
        members.m_yoffset = ((yoffset) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "gaiden_draw_sprites": method_gaiden_draw_sprites,
        "draw_sprites_8bit": method_draw_sprites_8bit,
        "draw_wc90_sprites": method_draw_wc90_sprites,
        "tbowl_draw_sprites": method_tbowl_draw_sprites,
        "set_bootleg": method_set_bootleg,
        "set_yoffset": method_set_yoffset,
        "tecmo_spr_device::set_bootleg": method_tecmo_spr_device__set_bootleg,
        "tecmo_spr_device::set_yoffset": method_tecmo_spr_device__set_yoffset
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["gfx", "m_pri_cb"];
export const device = definition;
export default device;
