import deviceData from './k051960.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [1, 2, 1, 2, 4, 2, 4, 8];
    const __mame_table_1 = [0, 1, 3, 5, 7, 9, 10, 12, 14, 15, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49, 49, 50, 51, 52, 52, 53, 54, 54, 55, 56, 56, 57, 57, 58, 59, 59, 60, 60, 61, 61, 62, 62, 63];
    const __mame_table_2 = [0, 1, 4, 5, 16, 17, 20, 21];
    const __mame_table_3 = [0, 2, 8, 10, 32, 34, 40, 42];
    const cppScratch_k051960_sprites_draw_drawmode_table = new Uint8Array(Math.max(0, Number(256)));
    function method_k051960_fetchromdata(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_k051960_cb"];
        const h_m_spriterombank = members.m_spriterombank ?? 0;
        const h_m_sprite_rom = members.m_sprite_rom ?? 0;
        let addr = ((__add_k051960_fetchromdata(runtime, (((members.m_romoffset ?? 0)) + (((h_m_spriterombank[0]) << (8)))), ((((h_m_spriterombank[1]) & (3))) << (16)))) | 0);
        let code = ((runtime.shiftRight(((addr) & (262112)), 5)) | 0);
        let off1 = ((((addr) & (31))) | 0);
        let color = ((__add_k051960_fetchromdata(runtime, runtime.shiftRight(((h_m_spriterombank[1]) & (252)), 2), ((((h_m_spriterombank[2]) & (3))) << (6)))) | 0);
        let pri = ((0) | 0);
        let shadow = ((0) ? 1 : 0);
        (__L0 ? __L0(({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => pri, set: (value) => { pri = ((value) | 0); } }), ({ generatedLValue: true, get: () => shadow, set: (value) => { shadow = ((value) ? 1 : 0); } })) : runtime.macro("m_k051960_cb", ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => pri, set: (value) => { pri = ((value) | 0); } }), ({ generatedLValue: true, get: () => shadow, set: (value) => { shadow = ((value) ? 1 : 0); } })));
        addr = ((((((((code) << (7))) | (((off1) << (2))))) | (offset))) | 0);
        addr = ((((addr) & (runtime.subtract((members.m_sprite_rom).length, 1)))) | 0);
        return ((runtime.readIndex(h_m_sprite_rom, addr)) & 0xff);
    }
    function __add_k051960_fetchromdata(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_k051960_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        const h_m_ram = members.m_ram ?? 0;
        if (((((members.m_control ?? 0)) >>> (5)) & 1)) {
            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                members.m_romoffset = ((runtime.shiftRight(((offset) & (1020)), 2)) & 0xff);
            }
            return ((method_k051960_fetchromdata(runtime, ((offset) & (3)))) & 0xff);
        }
        else {
            return ((h_m_ram[offset]) & 0xff);
        }
    }
    function method_k051960_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_ram = members.m_ram ?? 0;
        h_m_ram[offset] = data;
    }
    function method_k051937_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        offset = ((offset) & (7));
        if ((((((((members.m_control ?? 0)) >>> (5)) & 1)) && (((offset) & (4)))) ? 1 : 0)) {
            return ((method_k051960_fetchromdata(runtime, ((offset) & (3)))) & 0xff);
        }
        else {
            if ((((offset) === (0)) ? 1 : 0)) {
                return (((((__t0 = __deref_k051937_r(runtime, members.m_sprites_busy), typeof __t0.enabled === 'function' ? __t0.enabled() : typeof __t0.enabled === 'number' || typeof __t0.enabled === 'boolean' ? __t0.enabled : runtime.container(members.m_sprites_busy, "enabled"))) ? (1) : (0))) & 0xff);
            }
        }
        return ((0) & 0xff);
    }
    function __deref_k051937_r(runtime, p) {
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
    function method_k051937_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_handler"], __L1 = __l["m_firq_handler"], __L2 = __l["m_nmi_handler"], __L3 = __l["m_shadow_config_cb"];
        data = ((data) & 0xff);
        const h_m_spriterombank = members.m_spriterombank ?? 0;
        offset = ((offset) & (7));
        if ((((offset) === (0)) ? 1 : 0)) {
            if (((((((~data)) & ((members.m_control ?? 0)))) >>> (0)) & 1)) {
                (__L0 ? __L0(Number(0)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(0) : runtime.invoke("m_irq_handler", 0));
            }
            if (((((((~data)) & ((members.m_control ?? 0)))) >>> (1)) & 1)) {
                (__L1 ? __L1(Number(0)) : typeof members.m_firq_handler === 'function' ? members.m_firq_handler(0) : runtime.invoke("m_firq_handler", 0));
            }
            if (((((((~data)) & ((members.m_control ?? 0)))) >>> (2)) & 1)) {
                (__L2 ? __L2(Number(0)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(0) : runtime.invoke("m_nmi_handler", 0));
            }
            members.m_control = ((data) & 0xff);
        }
        else {
            if ((((offset) === (1)) ? 1 : 0)) {
                if ((((((data) ^ ((members.m_shadow_config ?? 0)))) >>> (0)) & 1)) {
                    (__L3 ? __L3(Number(((data) & (1)))) : typeof members.m_shadow_config_cb === 'function' ? members.m_shadow_config_cb(((data) & (1))) : runtime.invoke("m_shadow_config_cb", ((data) & (1))));
                }
                members.m_shadow_config = ((((data) & (7))) & 0xff);
            }
            else {
                if (((((((offset) >= (2)) ? 1 : 0)) && ((((offset) < (5)) ? 1 : 0))) ? 1 : 0)) {
                    h_m_spriterombank[((offset) - (2))] = data;
                }
                else {
                }
            }
        }
    }
    function method_k051960_sprites_draw(runtime, bitmap, cliprect, priority_bitmap, min_priority, max_priority) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["palette"], __L1 = __l["palette().shadow_mode"], __L2 = __l["m_k051960_cb"], __L3 = __l["gfx"];
        let __t0;
        const h_m_buffer = members.m_buffer ?? 0;
        if ((((members.__static_k051960_sprites_draw_NUM_SPRITES__initialised ?? 0)) ? 0 : 1)) {
            members.__static_k051960_sprites_draw_NUM_SPRITES = 128;
            members.__static_k051960_sprites_draw_NUM_SPRITES__initialised = 1;
        }
        let offs = ((0) | 0);
        let pri_code = ((0) | 0);
        let sortedlist = new Int32Array(new Uint8Array(Math.max(0, Number((members.__static_k051960_sprites_draw_NUM_SPRITES ?? 0)))));
        let drawmode_table = cppScratch_k051960_sprites_draw_drawmode_table.fill(0);
        cppMemset(runtime, drawmode_table, 1, ((drawmode_table)?.byteLength ?? 1));
        drawmode_table[0] = 0;
        let shadow_mode = ((((((((members.m_priority_shadows ?? 0)) || (((__L1 ?? globalThis.mamekitMissingCall?.("palette().shadow_mode"))?.() ?? 0))) ? 1 : 0)) ? (3) : (2))) >>> 0);
        for (offs = ((0) | 0); (((offs) < ((members.__static_k051960_sprites_draw_NUM_SPRITES ?? 0))) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
            sortedlist[offs] = -1;
        }
        for (offs = ((0) | 0); (((offs) < (1024)) ? 1 : 0); offs = ((((offs) + (8))) | 0)) {
            if (((h_m_buffer[offs]) & (128))) {
                pri_code = ((((h_m_buffer[offs]) & (127))) | 0);
                if (((Number(max_priority) === Number(-1)) ? 1 : 0)) {
                    pri_code = ((((pri_code) ^ (127))) | 0);
                }
                sortedlist[pri_code] = offs;
            }
        }
        for (pri_code = ((0) | 0); (((pri_code) < ((members.__static_k051960_sprites_draw_NUM_SPRITES ?? 0))) ? 1 : 0); pri_code = ((((pri_code) + (1))) | 0)) {
            let ox = ((0) | 0);
            let oy = ((0) | 0);
            let size = ((0) | 0);
            let w = ((0) | 0);
            let h = ((0) | 0);
            let x = ((0) | 0);
            let y = ((0) | 0);
            let flipx = ((0) | 0);
            let flipy = ((0) | 0);
            let zoomx = ((0) | 0);
            let zoomy = ((0) | 0);
            if ((((members.__static_k051960_sprites_draw_height__initialised ?? 0)) ? 0 : 1)) {
                members.__static_k051960_sprites_draw_height = [1, 1, 2, 2, 2, 4, 4, 8];
                members.__static_k051960_sprites_draw_height__initialised = 1;
            }
            let height = (members.__static_k051960_sprites_draw_height ?? 0);
            offs = (((sortedlist[pri_code] ?? 0)) | 0);
            if (((Number(offs) === Number(-1)) ? 1 : 0)) {
                continue;
            }
            let code = ((((h_m_buffer[((offs) + (2))]) + (((((h_m_buffer[((offs) + (1))]) & (31))) << (8))))) | 0);
            let color = ((((h_m_buffer[((offs) + (3))]) & (255))) | 0);
            let pri = ((0) | 0);
            let shadow = (((((((((((members.m_shadow_config ?? 0)) >>> (2)) & 1)) ? 0 : 1)) && ((((((((members.m_shadow_config ?? 0)) >>> (1)) & 1)) || ((((color) >>> (7)) & 1))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
            (__L2 ? __L2(({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => pri, set: (value) => { pri = ((value) | 0); } }), ({ generatedLValue: true, get: () => shadow, set: (value) => { shadow = ((value) ? 1 : 0); } })) : runtime.macro("m_k051960_cb", ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => pri, set: (value) => { pri = ((value) | 0); } }), ({ generatedLValue: true, get: () => shadow, set: (value) => { shadow = ((value) ? 1 : 0); } })));
            if (((Number(max_priority) !== Number(-1)) ? 1 : 0)) {
                if (((((((pri) < (min_priority)) ? 1 : 0)) || ((((pri) > (max_priority)) ? 1 : 0))) ? 1 : 0)) {
                    continue;
                }
            }
            size = ((runtime.shiftRight(((h_m_buffer[((offs) + (1))]) & (224)), 5)) | 0);
            w = (((__mame_table_0[((size) & 7)] ?? 0)) | 0);
            h = ((runtime.readIndex(height, size)) | 0);
            if ((((w) >= (2)) ? 1 : 0)) {
                code = ((((code) & (-2))) | 0);
            }
            if ((((h) >= (2)) ? 1 : 0)) {
                code = ((((code) & (-3))) | 0);
            }
            if ((((w) >= (4)) ? 1 : 0)) {
                code = ((((code) & (-5))) | 0);
            }
            if ((((h) >= (4)) ? 1 : 0)) {
                code = ((((code) & (-9))) | 0);
            }
            if ((((w) >= (8)) ? 1 : 0)) {
                code = ((((code) & (-17))) | 0);
            }
            if ((((h) >= (8)) ? 1 : 0)) {
                code = ((((code) & (-33))) | 0);
            }
            ox = ((((((((256) * (h_m_buffer[((offs) + (6))]))) + (h_m_buffer[((offs) + (7))]))) & (511))) | 0);
            oy = ((((256) - (((((((256) * (h_m_buffer[((offs) + (4))]))) + (h_m_buffer[((offs) + (5))]))) & (511))))) | 0);
            flipx = ((((h_m_buffer[((offs) + (6))]) & (2))) | 0);
            flipy = ((((h_m_buffer[((offs) + (4))]) & (2))) | 0);
            zoomx = ((runtime.shiftRight(((h_m_buffer[((offs) + (6))]) & (252)), 2)) | 0);
            zoomx = ((((runtime.divide(65536, 128)) * (((128) - (zoomx))))) | 0);
            zoomy = ((runtime.shiftRight(((h_m_buffer[((offs) + (4))]) & (252)), 2)) | 0);
            zoomy = ((runtime.subtract(128, (__mame_table_1[((zoomy) & 63)] ?? 0))) | 0);
            for (let i = ((0) | 0); (((i) < (3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if (((Number(h) <= Number(((1) << (i)))) ? 1 : 0)) {
                    zoomy = ((runtime.divide(((zoomy) + (1)), 2)) | 0);
                }
            }
            zoomy = ((((zoomy) * (runtime.divide(8, h)))) | 0);
            zoomy = ((((runtime.divide(65536, 128)) * (zoomy))) | 0);
            if (((((members.m_control ?? 0)) >>> (3)) & 1)) {
                ox = ((((((512) - (runtime.shiftRight(((zoomx) * (w)), 12)))) - (ox))) | 0);
                oy = ((((((256) - (runtime.shiftRight(((zoomy) * (h)), 12)))) - (oy))) | 0);
                flipx = ((((flipx) ? 0 : 1)) | 0);
                flipy = ((((flipy) ? 0 : 1)) | 0);
            }
            drawmode_table[runtime.subtract((__t0 = __deref_k051960_sprites_draw(runtime, (__L3 ? __L3(0) : runtime.macro("gfx", 0))), typeof __t0.granularity === 'function' ? (__t0.granularity() ?? 0) : runtime.container((__L3 ? __L3(0) : runtime.macro("gfx", 0)), "granularity")), 1)] = ((shadow) ? (shadow_mode) : (1));
            if (((((((zoomx) === (65536)) ? 1 : 0)) && ((((zoomy) === (65536)) ? 1 : 0))) ? 1 : 0)) {
                let sx = ((0) | 0);
                let sy = ((0) | 0);
                for (y = ((0) | 0); (((y) < (h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    sy = ((((oy) + (((16) * (y))))) | 0);
                    for (x = ((0) | 0); (((x) < (w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                        let c = ((code) | 0);
                        sx = ((((ox) + (((16) * (x))))) | 0);
                        if (flipx) {
                            c = ((((c) + ((__mame_table_2[(((((((w) - (1))) - (x))) % 8) + 8) % 8] ?? 0)))) | 0);
                        }
                        else {
                            c = ((((c) + ((__mame_table_2[((x) & 7)] ?? 0)))) | 0);
                        }
                        if (flipy) {
                            c = ((((c) + ((__mame_table_3[(((((((h) - (1))) - (y))) % 8) + 8) % 8] ?? 0)))) | 0);
                        }
                        else {
                            c = ((((c) + ((__mame_table_3[((y) & 7)] ?? 0)))) | 0);
                        }
                        if (((Number(max_priority) === Number(-1)) ? 1 : 0)) {
                            (__deref_k051960_sprites_draw(runtime, (__L3 ? __L3(0) : runtime.macro("gfx", 0))).prio_transtable?.(bitmap, cliprect, c, color, flipx, flipy, ((((sx) & (511))) - (96)), sy, priority_bitmap, pri, drawmode_table) ?? 0);
                        }
                        else {
                            (__deref_k051960_sprites_draw(runtime, (__L3 ? __L3(0) : runtime.macro("gfx", 0))).transtable?.(bitmap, cliprect, c, color, flipx, flipy, ((((sx) & (511))) - (96)), sy, drawmode_table) ?? 0);
                        }
                    }
                }
            }
            else {
                let sx = ((0) | 0);
                let sy = ((0) | 0);
                let zw = ((0) | 0);
                let zh = ((0) | 0);
                for (y = ((0) | 0); (((y) < (h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    sy = ((((oy) + (runtime.shiftRight(__add_k051960_sprites_draw(runtime, ((zoomy) * (y)), 2048), 12)))) | 0);
                    zh = ((((((oy) + (runtime.shiftRight(__add_k051960_sprites_draw(runtime, ((zoomy) * (((y) + (1)))), 2048), 12)))) - (sy))) | 0);
                    for (x = ((0) | 0); (((x) < (w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                        let c = ((code) | 0);
                        sx = ((((ox) + (runtime.shiftRight(__add_k051960_sprites_draw(runtime, ((zoomx) * (x)), 2048), 12)))) | 0);
                        zw = ((((((ox) + (runtime.shiftRight(__add_k051960_sprites_draw(runtime, ((zoomx) * (((x) + (1)))), 2048), 12)))) - (sx))) | 0);
                        if (flipx) {
                            c = ((((c) + ((__mame_table_2[(((((((w) - (1))) - (x))) % 8) + 8) % 8] ?? 0)))) | 0);
                        }
                        else {
                            c = ((((c) + ((__mame_table_2[((x) & 7)] ?? 0)))) | 0);
                        }
                        if (flipy) {
                            c = ((((c) + ((__mame_table_3[(((((((h) - (1))) - (y))) % 8) + 8) % 8] ?? 0)))) | 0);
                        }
                        else {
                            c = ((((c) + ((__mame_table_3[((y) & 7)] ?? 0)))) | 0);
                        }
                        if (((Number(max_priority) === Number(-1)) ? 1 : 0)) {
                            (__deref_k051960_sprites_draw(runtime, (__L3 ? __L3(0) : runtime.macro("gfx", 0))).prio_zoom_transtable?.(bitmap, cliprect, c, color, flipx, flipy, ((((sx) & (511))) - (96)), sy, runtime.divide(((zw) << (16)), 16), runtime.divide(((zh) << (16)), 16), priority_bitmap, pri, drawmode_table) ?? 0);
                        }
                        else {
                            (__deref_k051960_sprites_draw(runtime, (__L3 ? __L3(0) : runtime.macro("gfx", 0))).zoom_transtable?.(bitmap, cliprect, c, color, flipx, flipy, ((((sx) & (511))) - (96)), sy, runtime.divide(((zw) << (16)), 16), runtime.divide(((zh) << (16)), 16), drawmode_table) ?? 0);
                        }
                    }
                }
            }
        }
    }
    function __add_k051960_sprites_draw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_k051960_sprites_draw(runtime, p) {
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
        if (((((members.m_control ?? 0)) >>> (1)) & 1)) {
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
        if (((((members.m_control ?? 0)) >>> (2)) & 1)) {
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
    function method_k051937_shadow_mode(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k051937_shadow_mode(runtime, members.m_shadow_config_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_shadow_config_cb, "bind"));
    }
    function __deref_k051937_shadow_mode(runtime, p) {
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
    function method_set_priority_shadows(runtime, pri) {
        const members = runtime.members;
        members.m_priority_shadows = ((pri) ? 1 : 0);
    }
    function method_k051960_device__irq_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k051960_device__irq_handler(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function __deref_k051960_device__irq_handler(runtime, p) {
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
    function method_k051960_device__nmi_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k051960_device__nmi_handler(runtime, members.m_nmi_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_nmi_handler, "bind"));
    }
    function __deref_k051960_device__nmi_handler(runtime, p) {
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
    function method_k051960_device__k051937_shadow_mode(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k051960_device__k051937_shadow_mode(runtime, members.m_shadow_config_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_shadow_config_cb, "bind"));
    }
    function __deref_k051960_device__k051937_shadow_mode(runtime, p) {
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
    function method_k051960_device__set_priority_shadows(runtime, pri) {
        const members = runtime.members;
        members.m_priority_shadows = ((pri) ? 1 : 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "k051960_fetchromdata": method_k051960_fetchromdata,
        "k051960_r": method_k051960_r,
        "k051960_w": method_k051960_w,
        "k051937_r": method_k051937_r,
        "k051937_w": method_k051937_w,
        "k051960_sprites_draw": method_k051960_sprites_draw,
        "firq_scanline": method_firq_scanline,
        "nmi_scanline": method_nmi_scanline,
        "irq_handler": method_irq_handler,
        "nmi_handler": method_nmi_handler,
        "k051937_shadow_mode": method_k051937_shadow_mode,
        "set_priority_shadows": method_set_priority_shadows,
        "k051960_device::irq_handler": method_k051960_device__irq_handler,
        "k051960_device::nmi_handler": method_k051960_device__nmi_handler,
        "k051960_device::k051937_shadow_mode": method_k051960_device__k051937_shadow_mode,
        "k051960_device::set_priority_shadows": method_k051960_device__set_priority_shadows
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["gfx", "m_firq_handler", "m_irq_handler", "m_k051960_cb", "m_nmi_handler", "m_shadow_config_cb", "machine", "machine().side_effects_disabled", "palette", "palette().shadow_mode", "screen", "screen().time_until_pos", "screen().vpos"];
export const device = definition;
export default device;
