import deviceData from './tia_ntsc_video.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0];
    const __mame_table_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0];
    const cppScratch_update_bitmap_linePF = new Uint8Array(Math.max(0, Number(160)));
    const cppScratch_update_bitmap_lineP0 = new Uint8Array(Math.max(0, Number(160)));
    const cppScratch_update_bitmap_lineP1 = new Uint8Array(Math.max(0, Number(160)));
    const cppScratch_update_bitmap_lineM0 = new Uint8Array(Math.max(0, Number(160)));
    const cppScratch_update_bitmap_lineM1 = new Uint8Array(Math.max(0, Number(160)));
    const cppScratch_update_bitmap_lineBL = new Uint8Array(Math.max(0, Number(160)));
    const cppScratch_update_bitmap_temp = new Uint8Array(Math.max(0, Number(160)));
    function method_extend_palette(runtime) {
        const members = runtime.members;
        for (let i = ((0) | 0); (((i) < (128)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let new_rgb = (runtime.palette[i] ?? 0xff000000);
            let new_r = (((typeof new_rgb === 'number' ? ((new_rgb) >>> 0) & 0xff : (__deref_extend_palette(runtime, new_rgb).r?.() ?? 0))) & 0xff);
            let new_g = (((typeof new_rgb === 'number' ? ((new_rgb) >>> 8) & 0xff : (__deref_extend_palette(runtime, new_rgb).g?.() ?? 0))) & 0xff);
            let new_b = (((typeof new_rgb === 'number' ? ((new_rgb) >>> 16) & 0xff : (__deref_extend_palette(runtime, new_rgb).b?.() ?? 0))) & 0xff);
            for (let j = ((0) | 0); (((j) < (128)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                let old_rgb = (runtime.palette[j] ?? 0xff000000);
                let old_r = (((typeof old_rgb === 'number' ? ((old_rgb) >>> 0) & 0xff : (__deref_extend_palette(runtime, old_rgb).r?.() ?? 0))) & 0xff);
                let old_g = (((typeof old_rgb === 'number' ? ((old_rgb) >>> 8) & 0xff : (__deref_extend_palette(runtime, old_rgb).g?.() ?? 0))) & 0xff);
                let old_b = (((typeof old_rgb === 'number' ? ((old_rgb) >>> 16) & 0xff : (__deref_extend_palette(runtime, old_rgb).b?.() ?? 0))) & 0xff);
                (runtime.palette[((((((i) + (1))) << (7))) | (j))] = ((0xff000000 | ((runtime.divide(((new_b) + (old_b)), 2)) & 0xff) << 16 | ((runtime.divide(((new_g) + (old_g)), 2)) & 0xff) << 8 | ((runtime.divide(((new_r) + (old_r)), 2)) & 0xff)) >>> 0));
            }
        }
    }
    function __deref_extend_palette(runtime, p) {
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
    function method_screen_update(runtime, screen, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["copybitmap"];
        let __t0;
        const h_buffer = members.buffer ?? 0;
        members.screen_height = (((__t0 = __deref_screen_update(runtime, screen), typeof __t0.height === 'function' ? __t0.height() : typeof __t0.height === 'number' || typeof __t0.height === 'boolean' ? __t0.height : runtime.container(screen, "height"))) & 0xffff);
        (__L0 ? __L0(bitmap, h_buffer, 0, 0, 0, 0, cliprect) : runtime.macro("copybitmap", bitmap, h_buffer, 0, 0, 0, 0, cliprect));
        return ((0) >>> 0);
    }
    function __deref_screen_update(runtime, p) {
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
    function method_draw_sprite_helper(runtime, p, col, gfx, GRP, COLUP, REFP) {
        const members = runtime.members;
        GRP = ((GRP) & 0xff);
        COLUP = ((COLUP) & 0xff);
        REFP = ((REFP) & 0xff);
        let i = ((0) | 0);
        let j = ((0) | 0);
        let k = ((0) | 0);
        if (((REFP) & (8))) {
            GRP = ((((((GRP) >>> (0)) & 1) << 7 | (((GRP) >>> (1)) & 1) << 6 | (((GRP) >>> (2)) & 1) << 5 | (((GRP) >>> (3)) & 1) << 4 | (((GRP) >>> (4)) & 1) << 3 | (((GRP) >>> (5)) & 1) << 2 | (((GRP) >>> (6)) & 1) << 1 | (((GRP) >>> (7)) & 1) << 0)) & 0xff);
        }
        for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let start_pos = ((runtime.readIndex(__deref_draw_sprite_helper(runtime, gfx).start_drawing, i)) | 0);
            for (j = ((runtime.readIndex(__deref_draw_sprite_helper(runtime, gfx).start_pixel, i)) | 0); (((j) < (8)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                for (k = ((0) | 0); ((Number(k) < Number(runtime.readIndex(__deref_draw_sprite_helper(runtime, gfx).size, i))) ? 1 : 0); k = ((((k) + (1))) | 0)) {
                    if (((GRP) & (runtime.shiftRight(128, j)))) {
                        if (((((((start_pos) < (160)) ? 1 : 0)) || (((runtime.readIndex(__deref_draw_sprite_helper(runtime, gfx).skipclip, i)) ? 0 : 1))) ? 1 : 0)) {
                            runtime.writeIndex(p, ((start_pos) % (160)), ((COLUP) >>> (1)));
                            runtime.writeIndex(col, ((start_pos) % (160)), ((COLUP) >>> (1)));
                        }
                    }
                    start_pos = ((((start_pos) + (1))) | 0);
                }
            }
        }
    }
    function __deref_draw_sprite_helper(runtime, p) {
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
    function method_draw_missile_helper(runtime, p, col, horz, skipdelay, latch, start, RESMP, ENAM, NUSIZ, COLUM) {
        const members = runtime.members;
        RESMP = ((RESMP) & 0xff);
        ENAM = ((ENAM) & 0xff);
        NUSIZ = ((NUSIZ) & 0xff);
        COLUM = ((COLUM) & 0xff);
        let num = (((__mame_table_0[(((__add_draw_missile_helper(runtime, ((((NUSIZ) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0)) | 0);
        let skp = (((__mame_table_0[(((__add_draw_missile_helper(runtime, ((((NUSIZ) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) | 0);
        let width = ((((1) << (((((NUSIZ) >>> (4))) & (3))))) | 0);
        let i = ((0) | 0);
        let j = ((0) | 0);
        for (i = ((0) | 0); (((i) < (num)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if ((((i) === (0)) ? 1 : 0)) {
                horz = ((((horz) - (skipdelay))) | 0);
            }
            if ((((i) === (1)) ? 1 : 0)) {
                horz = ((((horz) + (skipdelay))) | 0);
            }
            if (((((((i) > (0)) ? 1 : 0)) || (start)) ? 1 : 0)) {
                for (j = ((0) | 0); (((j) < (width)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    if ((((((ENAM) & (2))) && (((((RESMP) & (2))) ? 0 : 1))) ? 1 : 0)) {
                        if (latch) {
                            switch (((horz) % (4))) {
                                case 1:
                                    {
                                        if ((((horz) >= (0)) ? 1 : 0)) {
                                            if ((((horz) < (156)) ? 1 : 0)) {
                                                runtime.writeIndex(p, ((((horz) + (1))) % (160)), ((COLUM) >>> (1)));
                                                runtime.writeIndex(col, ((((horz) + (1))) % (160)), ((COLUM) >>> (1)));
                                            }
                                            runtime.writeIndex(p, ((horz) % (160)), ((COLUM) >>> (1)));
                                            runtime.writeIndex(col, ((horz) % (160)), ((COLUM) >>> (1)));
                                        }
                                        break;
                                    }
                                case 2:
                                case 3:
                                    {
                                        if ((((horz) >= (0)) ? 1 : 0)) {
                                            runtime.writeIndex(p, ((horz) % (160)), ((COLUM) >>> (1)));
                                            runtime.writeIndex(col, ((horz) % (160)), ((COLUM) >>> (1)));
                                        }
                                        break;
                                    }
                            }
                        }
                        else {
                            if ((((horz) >= (0)) ? 1 : 0)) {
                                runtime.writeIndex(p, ((horz) % (160)), ((COLUM) >>> (1)));
                                runtime.writeIndex(col, ((horz) % (160)), ((COLUM) >>> (1)));
                            }
                        }
                    }
                    horz = ((((horz) + (1))) | 0);
                }
            }
            else {
                horz = ((((horz) + (width))) | 0);
            }
            horz = ((((horz) + (((((8) * (((skp) + (1))))) - (width))))) | 0);
        }
    }
    function __add_draw_missile_helper(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_draw_playfield_helper(runtime, p, col, horz, COLU, REFPF) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        COLU = ((COLU) & 0xff);
        REFPF = ((REFPF) & 0xff);
        let PF = (((((((((__t0 = (members.PF0 ?? 0), (((__t0) >>> (0)) & 1) << 7 | (((__t0) >>> (1)) & 1) << 6 | (((__t0) >>> (2)) & 1) << 5 | (((__t0) >>> (3)) & 1) << 4 | (((__t0) >>> (4)) & 1) << 3 | (((__t0) >>> (5)) & 1) << 2 | (((__t0) >>> (6)) & 1) << 1 | (((__t0) >>> (7)) & 1) << 0)) << (16))) | ((((__t1 = (members.PF1 ?? 0), (((__t1) >>> (7)) & 1) << 7 | (((__t1) >>> (6)) & 1) << 6 | (((__t1) >>> (5)) & 1) << 5 | (((__t1) >>> (4)) & 1) << 4 | (((__t1) >>> (3)) & 1) << 3 | (((__t1) >>> (2)) & 1) << 2 | (((__t1) >>> (1)) & 1) << 1 | (((__t1) >>> (0)) & 1) << 0)) << (8))))) | ((((__t2 = (members.PF2 ?? 0), (((__t2) >>> (0)) & 1) << 7 | (((__t2) >>> (1)) & 1) << 6 | (((__t2) >>> (2)) & 1) << 5 | (((__t2) >>> (3)) & 1) << 4 | (((__t2) >>> (4)) & 1) << 3 | (((__t2) >>> (5)) & 1) << 2 | (((__t2) >>> (6)) & 1) << 1 | (((__t2) >>> (7)) & 1) << 0)) << (0))))) >>> 0);
        let i = ((0) | 0);
        let j = ((0) | 0);
        if (REFPF) {
            let swap = ((0) >>> 0);
            for (i = ((0) | 0); (((i) < (20)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                swap = ((((swap) << (1))) >>> 0);
                if (((PF) & (1))) {
                    swap = ((((swap) | (1))) >>> 0);
                }
                PF = ((((PF) >>> (1))) >>> 0);
            }
            PF = ((swap) >>> 0);
        }
        for (i = ((0) | 0); (((i) < (20)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            for (j = ((0) | 0); (((j) < (4)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                if (((PF) & (runtime.shiftRight(524288, i)))) {
                    runtime.writeIndex(p, horz, ((COLU) >>> (1)));
                    runtime.writeIndex(col, horz, ((COLU) >>> (1)));
                }
                horz = ((((horz) + (1))) | 0);
            }
        }
    }
    function method_current_x(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_maincpu.total_cycles"];
        return ((runtime.low32(runtime.wide("-", runtime.wide("*", 3, runtime.wide("%", runtime.wide("-", (__L0 ? __L0() : ((members.m_maincpu)?.total_cycles?.() ?? 0)), (members.frame_cycles ?? 0)), 76)), 68))) | 0);
    }
    function method_current_y(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_maincpu.total_cycles"];
        return ((runtime.low32(runtime.wide("/", runtime.wide("-", (__L0 ? __L0() : ((members.m_maincpu)?.total_cycles?.() ?? 0)), (members.frame_cycles ?? 0)), 76))) | 0);
    }
    function method_update_bitmap(runtime, next_x, next_y) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["pen"];
        let __t0, __t1;
        const h_helper = members.helper ?? 0;
        const h_buffer = members.buffer ?? 0;
        let linePF = cppScratch_update_bitmap_linePF.fill(0);
        let lineP0 = cppScratch_update_bitmap_lineP0.fill(0);
        let lineP1 = cppScratch_update_bitmap_lineP1.fill(0);
        let lineM0 = cppScratch_update_bitmap_lineM0.fill(0);
        let lineM1 = cppScratch_update_bitmap_lineM1.fill(0);
        let lineBL = cppScratch_update_bitmap_lineBL.fill(0);
        let temp = cppScratch_update_bitmap_temp.fill(0);
        if ((((((((members.prev_y ?? 0)) >= (next_y)) ? 1 : 0)) && (((((members.prev_x ?? 0)) >= (next_x)) ? 1 : 0))) ? 1 : 0)) {
            return;
        }
        cppMemset(runtime, linePF, 255, ((linePF)?.byteLength ?? 1));
        cppMemset(runtime, lineP0, 255, ((lineP0)?.byteLength ?? 1));
        cppMemset(runtime, lineP1, 255, ((lineP1)?.byteLength ?? 1));
        cppMemset(runtime, lineM0, 255, ((lineM0)?.byteLength ?? 1));
        cppMemset(runtime, lineM1, 255, ((lineM1)?.byteLength ?? 1));
        cppMemset(runtime, lineBL, 255, ((lineBL)?.byteLength ?? 1));
        if ((((members.VBLANK ?? 0)) & (2))) {
            cppMemset(runtime, temp, 0, 160);
        }
        else {
            cppMemset(runtime, temp, (((members.COLUBK ?? 0)) >>> (1)), 160);
            if ((((members.CTRLPF ?? 0)) & (4))) {
                method_drawS1(runtime, temp, lineP1);
                method_drawM1(runtime, temp, lineM1);
                method_drawS0(runtime, temp, lineP0);
                method_drawM0(runtime, temp, lineM0);
                method_drawPF(runtime, temp, linePF);
                method_drawBL(runtime, temp, lineBL);
            }
            else {
                method_drawPF(runtime, temp, linePF);
                method_drawBL(runtime, temp, lineBL);
                method_drawS1(runtime, temp, lineP1);
                method_drawM1(runtime, temp, lineM1);
                method_drawS0(runtime, temp, lineP0);
                method_drawM0(runtime, temp, lineM0);
            }
        }
        for (let y = (((members.prev_y ?? 0)) | 0); (((y) <= (next_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            let x1 = (((members.prev_x ?? 0)) | 0);
            let x2 = ((next_x) | 0);
            let colx1 = ((0) | 0);
            if ((((y) !== ((members.prev_y ?? 0))) ? 1 : 0)) {
                let redraw_line = ((0) | 0);
                members.HMOVE_started_previous = ((-200) | 0);
                if (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) {
                    if ((((((((members.HMOVE_started ?? 0)) >= (97)) ? 1 : 0)) && (((((members.HMOVE_started ?? 0)) < (157)) ? 1 : 0))) ? 1 : 0)) {
                        members.horzP0 = ((((members.horzP0) - ((members.motclkP0 ?? 0)))) | 0);
                        members.horzP1 = ((((members.horzP1) - ((members.motclkP1 ?? 0)))) | 0);
                        members.horzM0 = ((((members.horzM0) - ((members.motclkM0 ?? 0)))) | 0);
                        members.horzM1 = ((((members.horzM1) - ((members.motclkM1 ?? 0)))) | 0);
                        members.horzBL = ((((members.horzBL) - ((members.motclkBL ?? 0)))) | 0);
                        if (((((members.horzP0 ?? 0)) < (0)) ? 1 : 0)) {
                            members.horzP0 = ((((members.horzP0) + (160))) | 0);
                        }
                        if (((((members.horzP1 ?? 0)) < (0)) ? 1 : 0)) {
                            members.horzP1 = ((((members.horzP1) + (160))) | 0);
                        }
                        if (((((members.horzM0 ?? 0)) < (0)) ? 1 : 0)) {
                            members.horzM0 = ((((members.horzM0) + (160))) | 0);
                        }
                        if (((((members.horzM1 ?? 0)) < (0)) ? 1 : 0)) {
                            members.horzM1 = ((((members.horzM1) + (160))) | 0);
                        }
                        if (((((members.horzBL ?? 0)) < (0)) ? 1 : 0)) {
                            members.horzBL = ((((members.horzBL) + (160))) | 0);
                        }
                        members.HMOVE_started_previous = (((members.HMOVE_started ?? 0)) | 0);
                    }
                    members.HMOVE_started = ((-200) | 0);
                    redraw_line = ((1) | 0);
                }
                if (((Number((members.REFLECT ?? 0)) !== Number((((members.CTRLPF ?? 0)) & (1)))) ? 1 : 0)) {
                    members.REFLECT = (((((members.CTRLPF ?? 0)) & (1))) & 0xff);
                    redraw_line = ((1) | 0);
                }
                if (((((((((((((members.startP0 ?? 0)) ? 0 : 1)) || ((((members.startP1 ?? 0)) ? 0 : 1))) ? 1 : 0)) || ((((members.startM0 ?? 0)) ? 0 : 1))) ? 1 : 0)) || ((((members.startM1 ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    members.startP0 = ((1) | 0);
                    members.startP1 = ((1) | 0);
                    members.startM0 = ((1) | 0);
                    members.startM1 = ((1) | 0);
                    redraw_line = ((1) | 0);
                }
                if ((members.skipclipP0 ?? 0)) {
                    members.skipclipP0 = ((((members.skipclipP0) - (1))) | 0);
                    redraw_line = ((1) | 0);
                }
                if ((members.skipclipP1 ?? 0)) {
                    members.skipclipP1 = ((((members.skipclipP1) - (1))) | 0);
                    redraw_line = ((1) | 0);
                }
                if ((members.HMP0_latch ?? 0)) {
                    members.horzP0 = ((((members.horzP0) - (17))) | 0);
                    if (((((members.horzP0 ?? 0)) < (0)) ? 1 : 0)) {
                        members.horzP0 = ((((members.horzP0) + (160))) | 0);
                    }
                    redraw_line = ((1) | 0);
                }
                if ((members.HMP1_latch ?? 0)) {
                    members.horzP1 = ((((members.horzP1) - (17))) | 0);
                    if (((((members.horzP1 ?? 0)) < (0)) ? 1 : 0)) {
                        members.horzP1 = ((((members.horzP1) + (160))) | 0);
                    }
                    redraw_line = ((1) | 0);
                }
                if ((members.HMM0_latch ?? 0)) {
                    members.horzM0 = ((((members.horzM0) - (17))) | 0);
                    if (((((members.horzM0 ?? 0)) < (0)) ? 1 : 0)) {
                        members.horzM0 = ((((members.horzM0) + (160))) | 0);
                    }
                    redraw_line = ((1) | 0);
                }
                if ((members.HMM1_latch ?? 0)) {
                    members.horzM1 = ((((members.horzM1) - (17))) | 0);
                    if (((((members.horzM1 ?? 0)) < (0)) ? 1 : 0)) {
                        members.horzM1 = ((((members.horzM1) + (160))) | 0);
                    }
                    redraw_line = ((1) | 0);
                }
                if ((members.HMBL_latch ?? 0)) {
                    members.horzBL = ((((members.horzBL) - (17))) | 0);
                    if (((((members.horzBL ?? 0)) < (0)) ? 1 : 0)) {
                        members.horzBL = ((((members.horzBL) + (160))) | 0);
                    }
                    redraw_line = ((1) | 0);
                }
                if ((members.NUSIZx_changed ?? 0)) {
                    members.NUSIZx_changed = ((0) & 0xff);
                    redraw_line = ((1) | 0);
                }
                if (((((members.skipM0delay ?? 0)) || ((members.skipM1delay ?? 0))) ? 1 : 0)) {
                    members.skipM0delay = ((0) | 0);
                    members.skipM1delay = ((0) | 0);
                    redraw_line = ((1) | 0);
                }
                if (redraw_line) {
                    if ((((members.VBLANK ?? 0)) & (2))) {
                        method_setup_pXgfx(runtime);
                        cppMemset(runtime, temp, 0, 160);
                    }
                    else {
                        cppMemset(runtime, linePF, 255, ((linePF)?.byteLength ?? 1));
                        cppMemset(runtime, lineP0, 255, ((lineP0)?.byteLength ?? 1));
                        cppMemset(runtime, lineP1, 255, ((lineP1)?.byteLength ?? 1));
                        cppMemset(runtime, lineM0, 255, ((lineM0)?.byteLength ?? 1));
                        cppMemset(runtime, lineM1, 255, ((lineM1)?.byteLength ?? 1));
                        cppMemset(runtime, lineBL, 255, ((lineBL)?.byteLength ?? 1));
                        cppMemset(runtime, temp, (((members.COLUBK ?? 0)) >>> (1)), 160);
                        method_setup_pXgfx(runtime);
                        if ((((members.CTRLPF ?? 0)) & (4))) {
                            method_drawS1(runtime, temp, lineP1);
                            method_drawM1(runtime, temp, lineM1);
                            method_drawS0(runtime, temp, lineP0);
                            method_drawM0(runtime, temp, lineM0);
                            method_drawPF(runtime, temp, linePF);
                            method_drawBL(runtime, temp, lineBL);
                        }
                        else {
                            method_drawPF(runtime, temp, linePF);
                            method_drawBL(runtime, temp, lineBL);
                            method_drawS1(runtime, temp, lineP1);
                            method_drawM1(runtime, temp, lineM1);
                            method_drawS0(runtime, temp, lineP0);
                            method_drawM0(runtime, temp, lineM0);
                        }
                    }
                }
            }
            if (((((((y) !== ((members.prev_y ?? 0))) ? 1 : 0)) || ((((x1) < (0)) ? 1 : 0))) ? 1 : 0)) {
                x1 = ((0) | 0);
            }
            if (((((((y) !== (next_y)) ? 1 : 0)) || ((((x2) > (160)) ? 1 : 0))) ? 1 : 0)) {
                x2 = ((160) | 0);
            }
            colx1 = ((((((((((x1) === (8)) ? 1 : 0)) && (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0))) ? 1 : 0)) ? (0) : (x1))) | 0);
            if (method_collision_check(runtime, lineM0, lineP1, colx1, x2)) {
                members.CXM0P = ((((members.CXM0P) | (128))) & 0xff);
            }
            if (method_collision_check(runtime, lineM0, lineP0, colx1, x2)) {
                members.CXM0P = ((((members.CXM0P) | (64))) & 0xff);
            }
            if (method_collision_check(runtime, lineM1, lineP0, colx1, x2)) {
                members.CXM1P = ((((members.CXM1P) | (128))) & 0xff);
            }
            if (method_collision_check(runtime, lineM1, lineP1, colx1, x2)) {
                members.CXM1P = ((((members.CXM1P) | (64))) & 0xff);
            }
            if (method_collision_check(runtime, lineP0, linePF, colx1, x2)) {
                members.CXP0FB = ((((members.CXP0FB) | (128))) & 0xff);
            }
            if (method_collision_check(runtime, lineP0, lineBL, colx1, x2)) {
                members.CXP0FB = ((((members.CXP0FB) | (64))) & 0xff);
            }
            if (method_collision_check(runtime, lineP1, linePF, colx1, x2)) {
                members.CXP1FB = ((((members.CXP1FB) | (128))) & 0xff);
            }
            if (method_collision_check(runtime, lineP1, lineBL, colx1, x2)) {
                members.CXP1FB = ((((members.CXP1FB) | (64))) & 0xff);
            }
            if (method_collision_check(runtime, lineM0, linePF, colx1, x2)) {
                members.CXM0FB = ((((members.CXM0FB) | (128))) & 0xff);
            }
            if (method_collision_check(runtime, lineM0, lineBL, colx1, x2)) {
                members.CXM0FB = ((((members.CXM0FB) | (64))) & 0xff);
            }
            if (method_collision_check(runtime, lineM1, linePF, colx1, x2)) {
                members.CXM1FB = ((((members.CXM1FB) | (128))) & 0xff);
            }
            if (method_collision_check(runtime, lineM1, lineBL, colx1, x2)) {
                members.CXM1FB = ((((members.CXM1FB) | (64))) & 0xff);
            }
            if (method_collision_check(runtime, lineBL, linePF, colx1, x2)) {
                members.CXBLPF = ((((members.CXBLPF) | (128))) & 0xff);
            }
            if (method_collision_check(runtime, lineP0, lineP1, colx1, x2)) {
                members.CXPPMM = ((((members.CXPPMM) | (128))) & 0xff);
            }
            if (method_collision_check(runtime, lineM0, lineM1, colx1, x2)) {
                members.CXPPMM = ((((members.CXPPMM) | (64))) & 0xff);
            }
            let p = __deref_update_bitmap(runtime, h_helper[(members.current_bitmap ?? 0)])["pix&"](((y) % ((members.screen_height ?? 0))), 34);
            let p$s = undefined, p$o = 0;
            if (ArrayBuffer.isView(p) || Array.isArray(p))
                p$s = p;
            else if (p !== null && typeof p === 'object' && p.generatedPointer === true && p.path === undefined && p.target === undefined && (ArrayBuffer.isView(p.source) || Array.isArray(p.source))) {
                p$s = p.source;
                p$o = p.offset;
            }
            for (let x = ((x1) | 0); (((x) < (x2)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                runtime.writeIndex(p, x, (temp[x] ?? 0));
            }
            if (((((((x2) === (160)) ? 1 : 0)) && (((Number(((y) % ((members.screen_height ?? 0)))) === Number((((members.screen_height ?? 0)) - (1)))) ? 1 : 0))) ? 1 : 0)) {
                for (let t_y = ((0) | 0); ((Number(t_y) < Number((__t0 = (h_buffer), typeof __t0.height === 'function' ? __t0.height() : typeof __t0.height === 'number' || typeof __t0.height === 'boolean' ? __t0.height : runtime.container(h_buffer, "height")))) ? 1 : 0); t_y = ((((t_y) + (1))) | 0)) {
                    let l0 = __deref_update_bitmap(runtime, h_helper[(members.current_bitmap ?? 0)])["pix&"](t_y);
                    let l0$s = undefined, l0$o = 0;
                    if (ArrayBuffer.isView(l0) || Array.isArray(l0))
                        l0$s = l0;
                    else if (l0 !== null && typeof l0 === 'object' && l0.generatedPointer === true && l0.path === undefined && l0.target === undefined && (ArrayBuffer.isView(l0.source) || Array.isArray(l0.source))) {
                        l0$s = l0.source;
                        l0$o = l0.offset;
                    }
                    let l1 = __deref_update_bitmap(runtime, h_helper[((1) - ((members.current_bitmap ?? 0)))])["pix&"](t_y);
                    let l1$s = undefined, l1$o = 0;
                    if (ArrayBuffer.isView(l1) || Array.isArray(l1))
                        l1$s = l1;
                    else if (l1 !== null && typeof l1 === 'object' && l1.generatedPointer === true && l1.path === undefined && l1.target === undefined && (ArrayBuffer.isView(l1.source) || Array.isArray(l1.source))) {
                        l1$s = l1.source;
                        l1$o = l1.offset;
                    }
                    let l2 = h_buffer["pix&"](t_y);
                    let l2$s = undefined, l2$o = 0;
                    if (ArrayBuffer.isView(l2) || Array.isArray(l2))
                        l2$s = l2;
                    else if (l2 !== null && typeof l2 === 'object' && l2.generatedPointer === true && l2.path === undefined && l2.target === undefined && (ArrayBuffer.isView(l2.source) || Array.isArray(l2.source))) {
                        l2$s = l2.source;
                        l2$o = l2.offset;
                    }
                    let t_x = ((0) | 0);
                    for (t_x = ((0) | 0); ((Number(t_x) < Number((__t1 = (h_buffer), typeof __t1.width === 'function' ? __t1.width() : typeof __t1.width === 'number' || typeof __t1.width === 'boolean' ? __t1.width : runtime.container(h_buffer, "width")))) ? 1 : 0); t_x = ((((t_x) + (1))) | 0)) {
                        if (((Number((l0$s !== undefined ? (l0$s[l0$o + (t_x)] ?? 0) : runtime.readIndex(l0, t_x))) !== Number((l1$s !== undefined ? (l1$s[l1$o + (t_x)] ?? 0) : runtime.readIndex(l1, t_x)))) ? 1 : 0)) {
                            runtime.writeIndex(l2, t_x, (__L0 ? __L0(((((__add_update_bitmap(runtime, (l0$s !== undefined ? (l0$s[l0$o + (t_x)] ?? 0) : runtime.readIndex(l0, t_x)), 1)) << (7))) | ((l1$s !== undefined ? (l1$s[l1$o + (t_x)] ?? 0) : runtime.readIndex(l1, t_x))))) : runtime.macro("pen", ((((__add_update_bitmap(runtime, (l0$s !== undefined ? (l0$s[l0$o + (t_x)] ?? 0) : runtime.readIndex(l0, t_x)), 1)) << (7))) | ((l1$s !== undefined ? (l1$s[l1$o + (t_x)] ?? 0) : runtime.readIndex(l1, t_x)))))));
                        }
                        else {
                            runtime.writeIndex(l2, t_x, (__L0 ? __L0((l0$s !== undefined ? (l0$s[l0$o + (t_x)] ?? 0) : runtime.readIndex(l0, t_x))) : runtime.macro("pen", (l0$s !== undefined ? (l0$s[l0$o + (t_x)] ?? 0) : runtime.readIndex(l0, t_x)))));
                        }
                    }
                }
                members.current_bitmap = ((((members.current_bitmap) ^ (1))) | 0);
            }
        }
        members.prev_x = ((next_x) | 0);
        members.prev_y = ((next_y) | 0);
    }
    function __add_update_bitmap(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_update_bitmap(runtime, p) {
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
    function method_drawS1(runtime, p, col) {
        const members = runtime.members;
        const h_p1gfx = members.p1gfx ?? 0;
        method_draw_sprite_helper(runtime, p, col, h_p1gfx, (((((members.VDELP1 ?? 0)) & (1))) ? ((members.prevGRP1 ?? 0)) : ((members.GRP1 ?? 0))), (members.COLUP1 ?? 0), (members.REFP1 ?? 0));
    }
    function method_drawM1(runtime, p, col) {
        const members = runtime.members;
        method_draw_missile_helper(runtime, p, col, (members.horzM1 ?? 0), (members.skipM1delay ?? 0), (members.HMM1_latch ?? 0), (members.startM1 ?? 0), (members.RESMP1 ?? 0), (members.ENAM1 ?? 0), (members.NUSIZ1 ?? 0), (members.COLUP1 ?? 0));
    }
    function method_drawS0(runtime, p, col) {
        const members = runtime.members;
        const h_p0gfx = members.p0gfx ?? 0;
        method_draw_sprite_helper(runtime, p, col, h_p0gfx, (((((members.VDELP0 ?? 0)) & (1))) ? ((members.prevGRP0 ?? 0)) : ((members.GRP0 ?? 0))), (members.COLUP0 ?? 0), (members.REFP0 ?? 0));
    }
    function method_drawM0(runtime, p, col) {
        const members = runtime.members;
        method_draw_missile_helper(runtime, p, col, (members.horzM0 ?? 0), (members.skipM0delay ?? 0), (members.HMM0_latch ?? 0), (members.startM0 ?? 0), (members.RESMP0 ?? 0), (members.ENAM0 ?? 0), (members.NUSIZ0 ?? 0), (members.COLUP0 ?? 0));
    }
    function method_drawPF(runtime, p, col) {
        const members = runtime.members;
        method_draw_playfield_helper(runtime, p, col, 0, ((((Number((((members.CTRLPF ?? 0)) & (6))) === Number(2)) ? 1 : 0)) ? ((members.COLUP0 ?? 0)) : ((members.COLUPF ?? 0))), 0);
        method_draw_playfield_helper(runtime, p, col, 80, ((((Number((((members.CTRLPF ?? 0)) & (6))) === Number(2)) ? 1 : 0)) ? ((members.COLUP1 ?? 0)) : ((members.COLUPF ?? 0))), (members.REFLECT ?? 0));
    }
    function method_drawBL(runtime, p, col) {
        const members = runtime.members;
        method_draw_ball_helper(runtime, p, col, (members.horzBL ?? 0), (((((members.VDELBL ?? 0)) & (1))) ? ((members.prevENABL ?? 0)) : ((members.ENABL ?? 0))));
    }
    function method_draw_ball_helper(runtime, p, col, horz, ENAB) {
        const members = runtime.members;
        ENAB = ((ENAB) & 0xff);
        let width = ((((1) << ((((((members.CTRLPF ?? 0)) >>> (4))) & (3))))) | 0);
        let i = ((0) | 0);
        for (i = ((0) | 0); (((i) < (width)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((ENAB) & (2))) {
                runtime.writeIndex(p, ((horz) % (160)), (((members.COLUPF ?? 0)) >>> (1)));
                runtime.writeIndex(col, ((horz) % (160)), (((members.COLUPF ?? 0)) >>> (1)));
            }
            horz = ((((horz) + (1))) | 0);
        }
    }
    function method_setup_pXgfx(runtime) {
        const members = runtime.members;
        const h_p0gfx = members.p0gfx ?? 0;
        const h_p1gfx = members.p1gfx ?? 0;
        let i = ((0) | 0);
        for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if ((((((Number(i) < Number((__mame_table_0[(((__add_setup_pXgfx(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0)) && (((Number(i) >= Number((((members.startP0 ?? 0)) ? (0) : (1)))) ? 1 : 0))) ? 1 : 0)) {
                h_p0gfx.size[i] = (__mame_table_0[(((__add_setup_pXgfx(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                if (i) {
                    h_p0gfx.start_drawing[i] = ((__add_setup_pXgfx(runtime, (((members.horzP0 ?? 0)) + ((((((h_p0gfx.size[i]) > (1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * ((((__mame_table_0[(((__add_setup_pXgfx(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p0gfx.size[i])))))) % (160));
                    h_p0gfx.skipclip[i] = 0;
                }
                else {
                    h_p0gfx.start_drawing[i] = (((members.horzP0 ?? 0)) + ((((((h_p0gfx.size[i]) > (1)) ? 1 : 0)) ? (1) : (0))));
                    h_p0gfx.skipclip[i] = (members.skipclipP0 ?? 0);
                }
                h_p0gfx.start_pixel[i] = 0;
            }
            else {
                h_p0gfx.start_pixel[i] = 8;
            }
            if ((((((Number(i) < Number((__mame_table_0[(((__add_setup_pXgfx(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0)) && (((Number(i) >= Number((((members.startP1 ?? 0)) ? (0) : (1)))) ? 1 : 0))) ? 1 : 0)) {
                h_p1gfx.size[i] = (__mame_table_0[(((__add_setup_pXgfx(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                if (i) {
                    h_p1gfx.start_drawing[i] = ((__add_setup_pXgfx(runtime, (((members.horzP1 ?? 0)) + ((((((h_p1gfx.size[i]) > (1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * ((((__mame_table_0[(((__add_setup_pXgfx(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p1gfx.size[i])))))) % (160));
                    h_p1gfx.skipclip[i] = 0;
                }
                else {
                    h_p1gfx.start_drawing[i] = (((members.horzP1 ?? 0)) + ((((((h_p1gfx.size[i]) > (1)) ? 1 : 0)) ? (1) : (0))));
                    h_p1gfx.skipclip[i] = (members.skipclipP1 ?? 0);
                }
                h_p1gfx.start_pixel[i] = 0;
            }
            else {
                h_p1gfx.start_pixel[i] = 8;
            }
        }
    }
    function __add_setup_pXgfx(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_collision_check(runtime, p1, p2, x1, x2) {
        const members = runtime.members;
        let i = ((0) | 0);
        for (i = ((x1) | 0); (((i) < (x2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if ((((((Number(runtime.readIndex(p1, i)) !== Number(255)) ? 1 : 0)) && (((Number(runtime.readIndex(p2, i)) !== Number(255)) ? 1 : 0))) ? 1 : 0)) {
                return ((1) | 0);
            }
        }
        return ((0) | 0);
    }
    function method_NUSIZ0_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_p0gfx = members.p0gfx ?? 0;
        let curr_x = ((method_current_x(runtime)) | 0);
        if (((Number(((data) & (7))) !== Number((((members.NUSIZ0 ?? 0)) & (7)))) ? 1 : 0)) {
            let i = ((0) | 0);
            for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if ((((h_p0gfx.start_pixel[i]) < (8)) ? 1 : 0)) {
                    let min_x = ((h_p0gfx.start_drawing[i]) | 0);
                    let size = ((((((8) - (h_p0gfx.start_pixel[i]))) * (h_p0gfx.size[i]))) | 0);
                    if ((((((Number(curr_x) >= Number(((((min_x) - (5))) % (160)))) ? 1 : 0)) && (((Number(curr_x) < Number(((((min_x) + (size))) % (160)))) ? 1 : 0))) ? 1 : 0)) {
                        if ((((((Number(curr_x) >= Number(((min_x) % (160)))) ? 1 : 0)) || ((((h_p0gfx.start_pixel[i]) !== (0)) ? 1 : 0))) ? 1 : 0)) {
                            if (((((((h_p0gfx.size[i]) === (1)) ? 1 : 0)) && (((Number((__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                let delay = ((__add_NUSIZ0_w(runtime, 1, ((((h_p0gfx.start_pixel[i]) + (((curr_x) - (h_p0gfx.start_drawing[i]))))) & (1)))) | 0);
                                method_update_bitmap(runtime, ((curr_x) + (delay)), method_current_y(runtime));
                                h_p0gfx.start_pixel[i] = ((h_p0gfx.start_pixel[i]) + (((((curr_x) + (delay))) - (h_p0gfx.start_drawing[i]))));
                                if ((((h_p0gfx.start_pixel[i]) > (8)) ? 1 : 0)) {
                                    h_p0gfx.start_pixel[i] = 8;
                                }
                                h_p0gfx.start_drawing[i] = ((curr_x) + (delay));
                            }
                            else {
                                if (((((((h_p0gfx.size[1]) > (1)) ? 1 : 0)) && (((Number((__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                    let delay = ((((((curr_x) - (h_p0gfx.start_drawing[i]))) & (((h_p0gfx.size[i]) - (1))))) | 0);
                                    if (delay) {
                                        delay = ((((h_p0gfx.size[i]) - (delay))) | 0);
                                    }
                                    method_update_bitmap(runtime, ((curr_x) + (delay)), method_current_y(runtime));
                                    h_p0gfx.start_pixel[i] = ((h_p0gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p0gfx.start_drawing[i])), h_p0gfx.size[i])));
                                    h_p0gfx.start_drawing[i] = ((curr_x) + (delay));
                                }
                                else {
                                    h_p0gfx.start_pixel[i] = ((h_p0gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p0gfx.start_drawing[i])), h_p0gfx.size[i])));
                                    h_p0gfx.start_drawing[i] = curr_x;
                                }
                            }
                            h_p0gfx.size[i] = (__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                        }
                        else {
                            if (((((((h_p0gfx.size[i]) === (1)) ? 1 : 0)) && (((Number((__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                if (((Number(((h_p0gfx.start_drawing[i]) - (curr_x))) === Number(2)) ? 1 : 0)) {
                                    h_p0gfx.start_drawing[i] = ((h_p0gfx.start_drawing[i]) - (1));
                                }
                                else {
                                    h_p0gfx.start_drawing[i] = ((h_p0gfx.start_drawing[i]) + (1));
                                }
                            }
                            else {
                                if (((((((h_p0gfx.size[i]) > (1)) ? 1 : 0)) && (((Number((__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                    h_p0gfx.start_drawing[i] = ((h_p0gfx.start_drawing[i]) - (1));
                                }
                            }
                            h_p0gfx.size[i] = (__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                        }
                    }
                    else {
                        h_p0gfx.start_pixel[i] = 8;
                    }
                }
            }
            for (i = (((((members.startP0 ?? 0)) ? (0) : (1))) | 0); ((Number(i) < Number((__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let j = ((0) | 0);
                for (j = ((0) | 0); ((Number(j) < Number(4)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    if ((((h_p0gfx.start_pixel[j]) === (8)) ? 1 : 0)) {
                        break;
                    }
                }
                h_p0gfx.size[j] = (__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                h_p0gfx.start_drawing[j] = ((__add_NUSIZ0_w(runtime, (((members.horzP0 ?? 0)) + ((((((h_p0gfx.size[j]) > (1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * ((((__mame_table_0[(((__add_NUSIZ0_w(runtime, ((((data) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p0gfx.size[j])))))) % (160));
                if (((Number(curr_x) < Number(((h_p0gfx.start_drawing[j]) % (160)))) ? 1 : 0)) {
                    h_p0gfx.start_pixel[j] = 0;
                }
            }
            members.NUSIZx_changed = ((1) & 0xff);
        }
        members.NUSIZ0 = ((data) & 0xff);
    }
    function __add_NUSIZ0_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_NUSIZ1_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_p1gfx = members.p1gfx ?? 0;
        const h_p0gfx = members.p0gfx ?? 0;
        let curr_x = ((method_current_x(runtime)) | 0);
        if (((Number(((data) & (7))) !== Number((((members.NUSIZ1 ?? 0)) & (7)))) ? 1 : 0)) {
            let i = ((0) | 0);
            for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if ((((h_p1gfx.start_pixel[i]) < (8)) ? 1 : 0)) {
                    let min_x = ((h_p1gfx.start_drawing[i]) | 0);
                    let size = ((((((8) - (h_p1gfx.start_pixel[i]))) * (h_p1gfx.size[i]))) | 0);
                    if ((((((Number(curr_x) >= Number(((((min_x) - (5))) % (160)))) ? 1 : 0)) && (((Number(curr_x) < Number(((((min_x) + (size))) % (160)))) ? 1 : 0))) ? 1 : 0)) {
                        if ((((((Number(curr_x) >= Number(((min_x) % (160)))) ? 1 : 0)) || ((((h_p1gfx.start_pixel[i]) !== (0)) ? 1 : 0))) ? 1 : 0)) {
                            if (((((((h_p1gfx.size[i]) === (1)) ? 1 : 0)) && (((Number((__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                let delay = ((__add_NUSIZ1_w(runtime, 1, ((((h_p0gfx.start_pixel[i]) + (((curr_x) - (h_p0gfx.start_drawing[i]))))) & (1)))) | 0);
                                method_update_bitmap(runtime, ((curr_x) + (delay)), method_current_y(runtime));
                                h_p1gfx.start_pixel[i] = ((h_p1gfx.start_pixel[i]) + (((((curr_x) + (delay))) - (h_p1gfx.start_drawing[i]))));
                                if ((((h_p1gfx.start_pixel[i]) > (8)) ? 1 : 0)) {
                                    h_p1gfx.start_pixel[i] = 8;
                                }
                                h_p1gfx.start_drawing[i] = ((curr_x) + (delay));
                            }
                            else {
                                if (((((((h_p1gfx.size[1]) > (1)) ? 1 : 0)) && (((Number((__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                    let delay = ((((((curr_x) - (h_p1gfx.start_drawing[i]))) & (((h_p1gfx.size[i]) - (1))))) | 0);
                                    if (delay) {
                                        delay = ((((h_p1gfx.size[i]) - (delay))) | 0);
                                    }
                                    method_update_bitmap(runtime, ((curr_x) + (delay)), method_current_y(runtime));
                                    h_p1gfx.start_pixel[i] = ((h_p1gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p1gfx.start_drawing[i])), h_p1gfx.size[i])));
                                    h_p1gfx.start_drawing[i] = ((curr_x) + (delay));
                                }
                                else {
                                    h_p1gfx.start_pixel[i] = ((h_p1gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p1gfx.start_drawing[i])), h_p1gfx.size[i])));
                                    h_p1gfx.start_drawing[i] = curr_x;
                                }
                            }
                            h_p1gfx.size[i] = (__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                        }
                        else {
                            if (((((((h_p1gfx.size[i]) === (1)) ? 1 : 0)) && (((Number((__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                if (((Number(((h_p1gfx.start_drawing[i]) - (curr_x))) === Number(2)) ? 1 : 0)) {
                                    h_p1gfx.start_drawing[i] = ((h_p1gfx.start_drawing[i]) - (1));
                                }
                                else {
                                    h_p1gfx.start_drawing[i] = ((h_p1gfx.start_drawing[i]) + (1));
                                }
                            }
                            else {
                                if (((((((h_p1gfx.size[i]) > (1)) ? 1 : 0)) && (((Number((__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                    h_p1gfx.start_drawing[i] = ((h_p1gfx.start_drawing[i]) - (1));
                                }
                            }
                            h_p1gfx.size[i] = (__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                        }
                    }
                    else {
                        h_p1gfx.start_pixel[i] = 8;
                    }
                }
            }
            for (i = (((((members.startP1 ?? 0)) ? (0) : (1))) | 0); ((Number(i) < Number((__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let j = ((0) | 0);
                for (j = ((0) | 0); ((Number(j) < Number(4)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    if ((((h_p1gfx.start_pixel[j]) === (8)) ? 1 : 0)) {
                        break;
                    }
                }
                h_p1gfx.size[j] = (__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                h_p1gfx.start_drawing[j] = ((__add_NUSIZ1_w(runtime, (((members.horzP1 ?? 0)) + ((((((h_p1gfx.size[j]) > (1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * ((((__mame_table_0[(((__add_NUSIZ1_w(runtime, ((((data) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p1gfx.size[j])))))) % (160));
                if (((Number(curr_x) < Number(((h_p1gfx.start_drawing[j]) % (160)))) ? 1 : 0)) {
                    h_p1gfx.start_pixel[j] = 0;
                }
            }
            members.NUSIZx_changed = ((1) & 0xff);
        }
        members.NUSIZ1 = ((data) & 0xff);
    }
    function __add_NUSIZ1_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_RESP0_w(runtime) {
        const members = runtime.members;
        const h_p0gfx = members.p0gfx ?? 0;
        let curr_x = ((method_current_x(runtime)) | 0);
        let new_horzP0 = ((0) | 0);
        if (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) {
            new_horzP0 = (((((((curr_x) < (7)) ? 1 : 0)) ? (3) : (((curr_x) + (5))))) | 0);
            if (((Number(curr_x) < Number(cppMin(+(__add_RESP0_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), 64)), +(7)))) ? 1 : 0)) {
                let decrements_passed = ((runtime.divide(((curr_x) - ((((members.HMOVE_started ?? 0)) + (4)))), 4)) | 0);
                new_horzP0 = ((((new_horzP0) + (8))) | 0);
                if (((Number((((members.motclkP0 ?? 0)) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
                    new_horzP0 = ((((new_horzP0) - ((((members.motclkP0 ?? 0)) - (decrements_passed))))) | 0);
                    if ((((new_horzP0) < (0)) ? 1 : 0)) {
                        new_horzP0 = ((((new_horzP0) + (160))) | 0);
                    }
                }
            }
        }
        else {
            new_horzP0 = ((((((Number(curr_x) < Number(-2)) ? 1 : 0)) ? (3) : (((curr_x) + (5))))) | 0);
            if (((Number((members.HMOVE_started_previous ?? 0)) !== Number(-200)) ? 1 : 0)) {
                let motclk = ((runtime.shiftRight((((members.HMP0 ?? 0)) ^ (128)), 4)) & 0xff);
                if (((Number(curr_x) <= Number(__add_RESP0_w(runtime, __add_RESP0_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
                    let motclk_passed = ((runtime.divide(((curr_x) - (__add_RESP0_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 6))), 4)) & 0xff);
                    new_horzP0 = ((((new_horzP0) - (((motclk) - (motclk_passed))))) | 0);
                }
            }
        }
        if ((((new_horzP0) !== ((members.horzP0 ?? 0))) ? 1 : 0)) {
            let i = ((0) | 0);
            members.horzP0 = ((new_horzP0) | 0);
            members.startP0 = ((0) | 0);
            members.skipclipP0 = ((2) | 0);
            for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if ((((h_p0gfx.start_pixel[i]) < (8)) ? 1 : 0)) {
                    let min_x = ((h_p0gfx.start_drawing[i]) | 0);
                    let size = ((((((8) - (h_p0gfx.start_pixel[i]))) * (h_p0gfx.size[i]))) | 0);
                    if ((((((Number(curr_x) >= Number(((((min_x) - (5))) % (160)))) ? 1 : 0)) && (((Number(curr_x) < Number(((((min_x) + (size))) % (160)))) ? 1 : 0))) ? 1 : 0)) {
                        if ((((curr_x) >= (min_x)) ? 1 : 0)) {
                            h_p0gfx.start_pixel[i] = ((h_p0gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p0gfx.start_drawing[i])), h_p0gfx.size[i])));
                            h_p0gfx.start_drawing[i] = curr_x;
                        }
                        else {
                            h_p0gfx.start_drawing[i] = (members.horzP0 ?? 0);
                        }
                    }
                    else {
                        h_p0gfx.start_pixel[i] = 8;
                    }
                }
            }
            for (i = ((1) | 0); ((Number(i) < Number((__mame_table_0[(((__add_RESP0_w(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let j = ((0) | 0);
                for (j = ((0) | 0); ((Number(j) < Number(4)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    if ((((h_p0gfx.start_pixel[j]) === (8)) ? 1 : 0)) {
                        break;
                    }
                }
                h_p0gfx.size[j] = (__mame_table_0[(((__add_RESP0_w(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                h_p0gfx.start_drawing[j] = ((__add_RESP0_w(runtime, (((members.horzP0 ?? 0)) + ((((((h_p0gfx.size[j]) > (1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * ((((__mame_table_0[(((__add_RESP0_w(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p0gfx.size[j])))))) % (160));
                if (((Number(curr_x) < Number(((h_p0gfx.start_drawing[j]) % (160)))) ? 1 : 0)) {
                    h_p0gfx.start_pixel[j] = 0;
                }
            }
        }
    }
    function __add_RESP0_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_RESP1_w(runtime) {
        const members = runtime.members;
        const h_p1gfx = members.p1gfx ?? 0;
        let curr_x = ((method_current_x(runtime)) | 0);
        let new_horzP1 = ((0) | 0);
        if (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) {
            new_horzP1 = (((((((curr_x) < (7)) ? 1 : 0)) ? (3) : (((curr_x) + (5))))) | 0);
            if (((Number(curr_x) < Number(cppMin(+(__add_RESP1_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), 64)), +(7)))) ? 1 : 0)) {
                let decrements_passed = ((runtime.divide(((curr_x) - ((((members.HMOVE_started ?? 0)) + (4)))), 4)) | 0);
                new_horzP1 = ((((new_horzP1) + (8))) | 0);
                if (((Number((((members.motclkP1 ?? 0)) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
                    new_horzP1 = ((((new_horzP1) - ((((members.motclkP1 ?? 0)) - (decrements_passed))))) | 0);
                    if ((((new_horzP1) < (0)) ? 1 : 0)) {
                        new_horzP1 = ((((new_horzP1) + (160))) | 0);
                    }
                }
            }
        }
        else {
            new_horzP1 = ((((((Number(curr_x) < Number(-2)) ? 1 : 0)) ? (3) : (((curr_x) + (5))))) | 0);
            if (((Number((members.HMOVE_started_previous ?? 0)) !== Number(-200)) ? 1 : 0)) {
                let motclk = ((runtime.shiftRight((((members.HMP1 ?? 0)) ^ (128)), 4)) & 0xff);
                if (((Number(curr_x) <= Number(__add_RESP1_w(runtime, __add_RESP1_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
                    let motclk_passed = ((runtime.divide(((curr_x) - (__add_RESP1_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 6))), 4)) & 0xff);
                    new_horzP1 = ((((new_horzP1) - (((motclk) - (motclk_passed))))) | 0);
                }
            }
        }
        if ((((new_horzP1) !== ((members.horzP1 ?? 0))) ? 1 : 0)) {
            let i = ((0) | 0);
            members.horzP1 = ((new_horzP1) | 0);
            members.startP1 = ((0) | 0);
            members.skipclipP1 = ((2) | 0);
            for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if ((((h_p1gfx.start_pixel[i]) < (8)) ? 1 : 0)) {
                    let min_x = ((h_p1gfx.start_drawing[i]) | 0);
                    let size = ((((((8) - (h_p1gfx.start_pixel[i]))) * (h_p1gfx.size[i]))) | 0);
                    if ((((((Number(curr_x) >= Number(((((min_x) - (5))) % (160)))) ? 1 : 0)) && (((Number(curr_x) < Number(((((min_x) + (size))) % (160)))) ? 1 : 0))) ? 1 : 0)) {
                        if ((((curr_x) >= (min_x)) ? 1 : 0)) {
                            h_p1gfx.start_pixel[i] = ((h_p1gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p1gfx.start_drawing[i])), h_p1gfx.size[i])));
                            h_p1gfx.start_drawing[i] = curr_x;
                        }
                        else {
                            h_p1gfx.start_drawing[i] = (members.horzP1 ?? 0);
                        }
                    }
                    else {
                        h_p1gfx.start_pixel[i] = 8;
                    }
                }
            }
            for (i = ((1) | 0); ((Number(i) < Number((__mame_table_0[(((__add_RESP1_w(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let j = ((0) | 0);
                for (j = ((0) | 0); ((Number(j) < Number(4)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    if ((((h_p1gfx.start_pixel[j]) === (8)) ? 1 : 0)) {
                        break;
                    }
                }
                h_p1gfx.size[j] = (__mame_table_0[(((__add_RESP1_w(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
                h_p1gfx.start_drawing[j] = ((__add_RESP1_w(runtime, (((members.horzP1 ?? 0)) + ((((((h_p1gfx.size[j]) > (1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * ((((__mame_table_0[(((__add_RESP1_w(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p1gfx.size[j])))))) % (160));
                if (((Number(curr_x) < Number(((h_p1gfx.start_drawing[j]) % (160)))) ? 1 : 0)) {
                    h_p1gfx.start_pixel[j] = 0;
                }
            }
        }
    }
    function __add_RESP1_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_INPT_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_maincpu.total_cycles"], __L1 = __l["m_read_input_port_cb"];
        let elapsed = runtime.wide("-", (__L0 ? __L0() : ((members.m_maincpu)?.total_cycles?.() ?? 0)), (members.paddle_start ?? 0));
        let input = (((__L1 ? __L1(Number(((offset) & (3))), Number(65535)) : typeof members.m_read_input_port_cb === 'function' ? members.m_read_input_port_cb(((offset) & (3)), 65535) : runtime.invoke("m_read_input_port_cb", ((offset) & (3)), 65535))) & 0xffff);
        if (((Number(input) === Number(0)) ? 1 : 0)) {
            return ((128) & 0xff);
        }
        if (((Number(input) === Number(255)) ? 1 : 0)) {
            return ((0) & 0xff);
        }
        let paddle_cycles = ((((input) * (76))) & 0xffff);
        return ((((runtime.wide(">", elapsed, ((paddle_cycles) & 0xffff))) ? (128) : (0))) & 0xff);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_databus_contents_cb"], __L1 = __l["m_read_input_port_cb"];
        let __t0, __t1, __t2;
        let data = ((((offset) & (63))) & 0xff);
        if ((((__t0 = __deref_read(runtime, members.m_databus_contents_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_databus_contents_cb, "isunset"))) ? 0 : 1)) {
            data = (((((__L0 ? __L0(Number(offset)) : typeof members.m_databus_contents_cb === 'function' ? members.m_databus_contents_cb(offset) : runtime.invoke("m_databus_contents_cb", offset))) & (63))) & 0xff);
        }
        if (((((offset) & (8))) ? 0 : 1)) {
            method_update_bitmap(runtime, method_current_x(runtime), method_current_y(runtime));
        }
        switch (((offset) & (15))) {
            case 0:
                {
                    return ((((data) | ((members.CXM0P ?? 0)))) & 0xff);
                }
            case 1:
                {
                    return ((((data) | ((members.CXM1P ?? 0)))) & 0xff);
                }
            case 2:
                {
                    return ((((data) | ((members.CXP0FB ?? 0)))) & 0xff);
                }
            case 3:
                {
                    return ((((data) | ((members.CXP1FB ?? 0)))) & 0xff);
                }
            case 4:
                {
                    return ((((data) | ((members.CXM0FB ?? 0)))) & 0xff);
                }
            case 5:
                {
                    return ((((data) | ((members.CXM1FB ?? 0)))) & 0xff);
                }
            case 6:
                {
                    return ((((data) | ((members.CXBLPF ?? 0)))) & 0xff);
                }
            case 7:
                {
                    return ((((data) | ((members.CXPPMM ?? 0)))) & 0xff);
                }
            case 8:
                {
                    return ((((data) | (method_INPT_r(runtime, 0)))) & 0xff);
                }
            case 9:
                {
                    return ((((data) | (method_INPT_r(runtime, 1)))) & 0xff);
                }
            case 10:
                {
                    return ((((data) | (method_INPT_r(runtime, 2)))) & 0xff);
                }
            case 11:
                {
                    return ((((data) | (method_INPT_r(runtime, 3)))) & 0xff);
                }
            case 12:
                {
                    let button = (((((((__t1 = __deref_read(runtime, members.m_read_input_port_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_read_input_port_cb, "isunset"))) ? 0 : 1)) ? ((((__L1 ? __L1(Number(4), Number(65535)) : typeof members.m_read_input_port_cb === 'function' ? members.m_read_input_port_cb(4, 65535) : runtime.invoke("m_read_input_port_cb", 4, 65535))) & (128))) : (128))) | 0);
                    members.INPT4 = (((((((members.VBLANK ?? 0)) & (64))) ? ((((members.INPT4 ?? 0)) & (button))) : (button))) & 0xff);
                    return ((((data) | ((members.INPT4 ?? 0)))) & 0xff);
                }
            case 13:
                {
                    let button__1 = (((((((__t2 = __deref_read(runtime, members.m_read_input_port_cb), typeof __t2.isunset === 'function' ? __t2.isunset() : typeof __t2.isunset === 'number' || typeof __t2.isunset === 'boolean' ? __t2.isunset : runtime.container(members.m_read_input_port_cb, "isunset"))) ? 0 : 1)) ? ((((__L1 ? __L1(Number(5), Number(65535)) : typeof members.m_read_input_port_cb === 'function' ? members.m_read_input_port_cb(5, 65535) : runtime.invoke("m_read_input_port_cb", 5, 65535))) & (128))) : (128))) | 0);
                    members.INPT5 = (((((((members.VBLANK ?? 0)) & (64))) ? ((((members.INPT5 ?? 0)) & (button__1))) : (button__1))) & 0xff);
                    return ((((data) | ((members.INPT5 ?? 0)))) & 0xff);
                }
        }
        return ((data) & 0xff);
    }
    function __deref_read(runtime, p) {
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
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_tia.tia_sound_w"];
        data = ((data) & 0xff);
        let curr_x = ((method_current_x(runtime)) | 0);
        let curr_y = ((method_current_y(runtime)) | 0);
        offset = ((offset) & (63));
        if (((((((offset) >= (13)) ? 1 : 0)) && ((((offset) <= (15)) ? 1 : 0))) ? 1 : 0)) {
            curr_x = ((((((curr_x) + (1))) & (-4))) | 0);
        }
        if (((Number((__mame_table_1[(((offset) % 45) + 45) % 45] ?? 0)) >= Number(0)) ? 1 : 0)) {
            method_update_bitmap(runtime, ((curr_x) + ((__mame_table_1[(((offset) % 45) + 45) % 45] ?? 0))), curr_y);
        }
        switch (offset) {
            case 0:
                {
                    method_VSYNC_w(runtime, data);
                    break;
                }
            case 1:
                {
                    method_VBLANK_w(runtime, data);
                    break;
                }
            case 2:
                {
                    method_WSYNC_w(runtime);
                    break;
                }
            case 3:
                {
                    method_RSYNC_w(runtime);
                    break;
                }
            case 4:
                {
                    method_NUSIZ0_w(runtime, data);
                    break;
                }
            case 5:
                {
                    method_NUSIZ1_w(runtime, data);
                    break;
                }
            case 6:
                {
                    members.COLUP0 = ((data) & 0xff);
                    break;
                }
            case 7:
                {
                    members.COLUP1 = ((data) & 0xff);
                    break;
                }
            case 8:
                {
                    members.COLUPF = ((data) & 0xff);
                    break;
                }
            case 9:
                {
                    members.COLUBK = ((data) & 0xff);
                    break;
                }
            case 10:
                {
                    method_CTRLPF_w(runtime, data);
                    break;
                }
            case 11:
                {
                    members.REFP0 = ((data) & 0xff);
                    break;
                }
            case 12:
                {
                    members.REFP1 = ((data) & 0xff);
                    break;
                }
            case 13:
                {
                    members.PF0 = ((data) & 0xff);
                    break;
                }
            case 14:
                {
                    members.PF1 = ((data) & 0xff);
                    break;
                }
            case 15:
                {
                    members.PF2 = ((data) & 0xff);
                    break;
                }
            case 16:
                {
                    method_RESP0_w(runtime);
                    break;
                }
            case 17:
                {
                    method_RESP1_w(runtime);
                    break;
                }
            case 18:
                {
                    method_RESM0_w(runtime);
                    break;
                }
            case 19:
                {
                    method_RESM1_w(runtime);
                    break;
                }
            case 20:
                {
                    method_RESBL_w(runtime);
                    break;
                }
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
                {
                    (__L0 ? __L0(offset, data) : ((members.m_tia)?.tia_sound_w?.(offset, data) ?? 0));
                    break;
                }
            case 27:
                {
                    method_GRP0_w(runtime, data);
                    break;
                }
            case 28:
                {
                    method_GRP1_w(runtime, data);
                    break;
                }
            case 29:
                {
                    members.ENAM0 = ((data) & 0xff);
                    break;
                }
            case 30:
                {
                    members.ENAM1 = ((data) & 0xff);
                    break;
                }
            case 31:
                {
                    members.ENABL = ((data) & 0xff);
                    break;
                }
            case 32:
                {
                    method_HMP0_w(runtime, data);
                    break;
                }
            case 33:
                {
                    method_HMP1_w(runtime, data);
                    break;
                }
            case 34:
                {
                    method_HMM0_w(runtime, data);
                    break;
                }
            case 35:
                {
                    method_HMM1_w(runtime, data);
                    break;
                }
            case 36:
                {
                    method_HMBL_w(runtime, data);
                    break;
                }
            case 37:
                {
                    members.VDELP0 = ((data) & 0xff);
                    break;
                }
            case 38:
                {
                    members.VDELP1 = ((data) & 0xff);
                    break;
                }
            case 39:
                {
                    members.VDELBL = ((data) & 0xff);
                    break;
                }
            case 40:
                {
                    method_RESMP0_w(runtime, data);
                    break;
                }
            case 41:
                {
                    method_RESMP1_w(runtime, data);
                    break;
                }
            case 42:
                {
                    method_HMOVE_w(runtime, data);
                    break;
                }
            case 43:
                {
                    method_HMCLR_w(runtime, data);
                    break;
                }
            case 44:
                {
                    method_CXCLR_w(runtime);
                    break;
                }
        }
    }
    function method_VSYNC_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().width"], __L2 = __l["screen().height"], __L3 = __l["m_vsync_cb"];
        data = ((data) & 0xff);
        if (((data) & (2))) {
            if ((((((members.VSYNC ?? 0)) & (2))) ? 0 : 1)) {
                let curr_y = ((method_current_y(runtime)) | 0);
                if ((((curr_y) > (5)) ? 1 : 0)) {
                    method_update_bitmap(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("screen().width"))?.() ?? 0), ((__L2 ?? globalThis.mamekitMissingCall?.("screen().height"))?.() ?? 0));
                }
                (__L3 ? __L3(Number(0), Number(curr_y), Number(65535)) : typeof members.m_vsync_cb === 'function' ? members.m_vsync_cb(0, curr_y, 65535) : runtime.invoke("m_vsync_cb", 0, curr_y, 65535));
                members.prev_y = ((0) | 0);
                members.prev_x = ((0) | 0);
                members.frame_cycles = runtime.wide("+", (members.frame_cycles ?? 0), ((76) * (method_current_y(runtime))));
            }
        }
        members.VSYNC = ((data) & 0xff);
    }
    function method_VBLANK_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_maincpu.total_cycles"];
        data = ((data) & 0xff);
        if (((data) & (128))) {
            members.paddle_start = (__L0 ? __L0() : ((members.m_maincpu)?.total_cycles?.() ?? 0));
        }
        if ((((((members.VBLANK ?? 0)) & (64))) ? 0 : 1)) {
            members.INPT4 = ((128) & 0xff);
            members.INPT5 = ((128) & 0xff);
        }
        members.VBLANK = ((data) & 0xff);
    }
    function method_WSYNC_w(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_maincpu.total_cycles"], __L1 = __l["m_maincpu.adjust_icount"];
        let cycles = ((runtime.low32(runtime.wide("-", (__L0 ? __L0() : ((members.m_maincpu)?.total_cycles?.() ?? 0)), (members.frame_cycles ?? 0)))) | 0);
        if (((cycles) % (76))) {
            (__L1 ? __L1(((((cycles) % (76))) - (76))) : ((members.m_maincpu)?.adjust_icount?.(((((cycles) % (76))) - (76))) ?? 0));
        }
    }
    function method_RSYNC_w(runtime) {
        const members = runtime.members;
    }
    function method_CTRLPF_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let curr_x = ((method_current_x(runtime)) | 0);
        members.CTRLPF = ((data) & 0xff);
        if ((((curr_x) < (80)) ? 1 : 0)) {
            members.REFLECT = (((((members.CTRLPF ?? 0)) & (1))) & 0xff);
        }
    }
    function method_RESM0_w(runtime) {
        const members = runtime.members;
        let curr_x = ((method_current_x(runtime)) | 0);
        let new_horzM0 = ((0) | 0);
        if (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) {
            new_horzM0 = (((((((curr_x) < (7)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))))) | 0);
            if (((Number(curr_x) < Number(cppMin(+(__add_RESM0_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), 64)), +(7)))) ? 1 : 0)) {
                let decrements_passed = ((runtime.divide(((curr_x) - ((((members.HMOVE_started ?? 0)) + (4)))), 4)) | 0);
                new_horzM0 = ((((new_horzM0) + (8))) | 0);
                if (((Number((((members.motclkM0 ?? 0)) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
                    new_horzM0 = ((((new_horzM0) - ((((members.motclkM0 ?? 0)) - (decrements_passed))))) | 0);
                    if ((((new_horzM0) < (0)) ? 1 : 0)) {
                        new_horzM0 = ((((new_horzM0) + (160))) | 0);
                    }
                }
            }
        }
        else {
            new_horzM0 = ((((((Number(curr_x) < Number(-1)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))))) | 0);
            members.skipM0delay = ((((((((((((Number(curr_x) < Number(-1)) ? 1 : 0)) && (((Number((((members.horzM0 ?? 0)) % (160))) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.horzM0 ?? 0)) % (160))) < Number(1)) ? 1 : 0))) ? 1 : 0)) ? (4) : (0))) | 0);
            if (((Number((members.HMOVE_started_previous ?? 0)) !== Number(-200)) ? 1 : 0)) {
                let motclk = ((runtime.shiftRight((((members.HMM0 ?? 0)) ^ (128)), 4)) & 0xff);
                if (((Number(curr_x) <= Number(__add_RESM0_w(runtime, __add_RESM0_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
                    let motclk_passed = ((runtime.divide(((curr_x) - (__add_RESM0_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 6))), 4)) & 0xff);
                    new_horzM0 = ((((new_horzM0) - (((motclk) - (motclk_passed))))) | 0);
                }
            }
        }
        if ((((new_horzM0) !== ((members.horzM0 ?? 0))) ? 1 : 0)) {
            members.startM0 = (((((members.skipM0delay ?? 0)) ? (1) : (0))) | 0);
            members.horzM0 = ((new_horzM0) | 0);
        }
    }
    function __add_RESM0_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_RESM1_w(runtime) {
        const members = runtime.members;
        let curr_x = ((method_current_x(runtime)) | 0);
        let new_horzM1 = ((0) | 0);
        if (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) {
            new_horzM1 = (((((((curr_x) < (7)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))))) | 0);
            if (((Number(curr_x) < Number(cppMin(+(__add_RESM1_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), 64)), +(7)))) ? 1 : 0)) {
                let decrements_passed = ((runtime.divide(((curr_x) - ((((members.HMOVE_started ?? 0)) + (4)))), 4)) | 0);
                new_horzM1 = ((((new_horzM1) + (8))) | 0);
                if (((Number((((members.motclkM1 ?? 0)) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
                    new_horzM1 = ((((new_horzM1) - ((((members.motclkM1 ?? 0)) - (decrements_passed))))) | 0);
                    if ((((new_horzM1) < (0)) ? 1 : 0)) {
                        new_horzM1 = ((((new_horzM1) + (160))) | 0);
                    }
                }
            }
        }
        else {
            new_horzM1 = ((((((Number(curr_x) < Number(-1)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))))) | 0);
            members.skipM1delay = ((((((((((((Number(curr_x) < Number(-1)) ? 1 : 0)) && (((Number((((members.horzM1 ?? 0)) % (160))) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.horzM1 ?? 0)) % (160))) < Number(1)) ? 1 : 0))) ? 1 : 0)) ? (4) : (0))) | 0);
            if (((Number((members.HMOVE_started_previous ?? 0)) !== Number(-200)) ? 1 : 0)) {
                let motclk = ((runtime.shiftRight((((members.HMM1 ?? 0)) ^ (128)), 4)) & 0xff);
                if (((Number(curr_x) <= Number(__add_RESM1_w(runtime, __add_RESM1_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
                    let motclk_passed = ((runtime.divide(((curr_x) - (__add_RESM1_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 6))), 4)) & 0xff);
                    new_horzM1 = ((((new_horzM1) - (((motclk) - (motclk_passed))))) | 0);
                }
            }
        }
        if ((((new_horzM1) !== ((members.horzM1 ?? 0))) ? 1 : 0)) {
            members.startM1 = (((((members.skipM1delay ?? 0)) ? (1) : (0))) | 0);
            members.horzM1 = ((new_horzM1) | 0);
        }
    }
    function __add_RESM1_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_RESBL_w(runtime) {
        const members = runtime.members;
        let curr_x = ((method_current_x(runtime)) | 0);
        if (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) {
            members.horzBL = (((((((curr_x) < (7)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))))) | 0);
            if (((Number(curr_x) < Number(cppMin(+(__add_RESBL_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), 64)), +(7)))) ? 1 : 0)) {
                let decrements_passed = ((runtime.divide(((curr_x) - ((((members.HMOVE_started ?? 0)) + (4)))), 4)) | 0);
                members.horzBL = ((((members.horzBL) + (8))) | 0);
                if (((Number((((members.motclkBL ?? 0)) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
                    members.horzBL = ((((members.horzBL) - ((((members.motclkBL ?? 0)) - (decrements_passed))))) | 0);
                    if (((((members.horzBL ?? 0)) < (0)) ? 1 : 0)) {
                        members.horzBL = ((((members.horzBL) + (160))) | 0);
                    }
                }
            }
        }
        else {
            members.horzBL = (((((((curr_x) < (0)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))))) | 0);
            if (((Number((members.HMOVE_started_previous ?? 0)) !== Number(-200)) ? 1 : 0)) {
                let motclk = ((runtime.shiftRight((((members.HMBL ?? 0)) ^ (128)), 4)) & 0xff);
                if (((Number(curr_x) <= Number(__add_RESBL_w(runtime, __add_RESBL_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
                    let motclk_passed = ((runtime.divide(((curr_x) - (__add_RESBL_w(runtime, (((members.HMOVE_started_previous ?? 0)) - (228)), 6))), 4)) & 0xff);
                    members.horzBL = ((((members.horzBL) - (((motclk) - (motclk_passed))))) | 0);
                }
            }
        }
    }
    function __add_RESBL_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_GRP0_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.prevGRP1 = (((members.GRP1 ?? 0)) & 0xff);
        members.GRP0 = ((data) & 0xff);
    }
    function method_GRP1_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.prevGRP0 = (((members.GRP0 ?? 0)) & 0xff);
        members.GRP1 = ((data) & 0xff);
        members.prevENABL = (((members.ENABL ?? 0)) & 0xff);
    }
    function method_HMP0_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let curr_x = ((method_current_x(runtime)) | 0);
        data = ((((data) & (240))) & 0xff);
        if ((((data) === ((members.HMP0 ?? 0))) ? 1 : 0)) {
            return;
        }
        if ((((((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number(cppMin(+(__add_HMP0_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), (((members.motclkP0 ?? 0)) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
            let new_motclkP0 = ((runtime.shiftRight(((data) ^ (128)), 4)) | 0);
            if (((((((new_motclkP0) > ((members.motclkP0 ?? 0))) ? 1 : 0)) || (((Number(curr_x) <= Number(cppMin(+(__add_HMP0_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), ((new_motclkP0) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
                members.horzP0 = ((((members.horzP0) - (((new_motclkP0) - ((members.motclkP0 ?? 0)))))) | 0);
                members.motclkP0 = ((new_motclkP0) | 0);
            }
            else {
                members.horzP0 = ((((members.horzP0) - (((15) - ((members.motclkP0 ?? 0)))))) | 0);
                members.motclkP0 = ((15) | 0);
                if (((((((data) !== (112)) ? 1 : 0)) && ((((data) !== (128)) ? 1 : 0))) ? 1 : 0)) {
                    members.HMP0_latch = ((1) & 0xff);
                }
            }
            if (((((members.horzP0 ?? 0)) < (0)) ? 1 : 0)) {
                members.horzP0 = ((((members.horzP0) + (160))) | 0);
            }
            members.horzP0 = ((((members.horzP0) % (160))) | 0);
            method_setup_pXgfx(runtime);
        }
        members.HMP0 = ((data) & 0xff);
    }
    function __add_HMP0_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_HMP1_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let curr_x = ((method_current_x(runtime)) | 0);
        data = ((((data) & (240))) & 0xff);
        if ((((data) === ((members.HMP1 ?? 0))) ? 1 : 0)) {
            return;
        }
        if ((((((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number(cppMin(+(__add_HMP1_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), (((members.motclkP1 ?? 0)) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
            let new_motclkP1 = ((runtime.shiftRight(((data) ^ (128)), 4)) | 0);
            if (((((((new_motclkP1) > ((members.motclkP1 ?? 0))) ? 1 : 0)) || (((Number(curr_x) <= Number(cppMin(+(__add_HMP1_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), ((new_motclkP1) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
                members.horzP1 = ((((members.horzP1) - (((new_motclkP1) - ((members.motclkP1 ?? 0)))))) | 0);
                members.motclkP1 = ((new_motclkP1) | 0);
            }
            else {
                members.horzP1 = ((((members.horzP1) - (((15) - ((members.motclkP1 ?? 0)))))) | 0);
                members.motclkP1 = ((15) | 0);
                if (((((((data) !== (112)) ? 1 : 0)) && ((((data) !== (128)) ? 1 : 0))) ? 1 : 0)) {
                    members.HMP1_latch = ((1) & 0xff);
                }
            }
            if (((((members.horzP1 ?? 0)) < (0)) ? 1 : 0)) {
                members.horzP1 = ((((members.horzP1) + (160))) | 0);
            }
            members.horzP1 = ((((members.horzP1) % (160))) | 0);
            method_setup_pXgfx(runtime);
        }
        members.HMP1 = ((data) & 0xff);
    }
    function __add_HMP1_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_HMM0_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let curr_x = ((method_current_x(runtime)) | 0);
        data = ((((data) & (240))) & 0xff);
        if ((((data) === ((members.HMM0 ?? 0))) ? 1 : 0)) {
            return;
        }
        if ((((((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number(cppMin(+(__add_HMM0_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), (((members.motclkM0 ?? 0)) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
            let new_motclkM0 = ((runtime.shiftRight(((data) ^ (128)), 4)) | 0);
            if (((((((new_motclkM0) > ((members.motclkM0 ?? 0))) ? 1 : 0)) || (((Number(curr_x) <= Number(cppMin(+(__add_HMM0_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), ((new_motclkM0) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
                members.horzM0 = ((((members.horzM0) - (((new_motclkM0) - ((members.motclkM0 ?? 0)))))) | 0);
                members.motclkM0 = ((new_motclkM0) | 0);
            }
            else {
                members.horzM0 = ((((members.horzM0) - (((15) - ((members.motclkM0 ?? 0)))))) | 0);
                members.motclkM0 = ((15) | 0);
                if (((((((data) !== (112)) ? 1 : 0)) && ((((data) !== (128)) ? 1 : 0))) ? 1 : 0)) {
                    members.HMM0_latch = ((1) & 0xff);
                }
            }
            if (((((members.horzM0 ?? 0)) < (0)) ? 1 : 0)) {
                members.horzM0 = ((((members.horzM0) + (160))) | 0);
            }
            members.horzM0 = ((((members.horzM0) % (160))) | 0);
        }
        members.HMM0 = ((data) & 0xff);
    }
    function __add_HMM0_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_HMM1_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let curr_x = ((method_current_x(runtime)) | 0);
        data = ((((data) & (240))) & 0xff);
        if ((((data) === ((members.HMM1 ?? 0))) ? 1 : 0)) {
            return;
        }
        if ((((((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number(cppMin(+(__add_HMM1_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), (((members.motclkM1 ?? 0)) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
            let new_motclkM1 = ((runtime.shiftRight(((data) ^ (128)), 4)) | 0);
            if (((((((new_motclkM1) > ((members.motclkM1 ?? 0))) ? 1 : 0)) || (((Number(curr_x) <= Number(cppMin(+(__add_HMM1_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), ((new_motclkM1) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
                members.horzM1 = ((((members.horzM1) - (((new_motclkM1) - ((members.motclkM1 ?? 0)))))) | 0);
                members.motclkM1 = ((new_motclkM1) | 0);
            }
            else {
                members.horzM1 = ((((members.horzM1) - (((15) - ((members.motclkM1 ?? 0)))))) | 0);
                members.motclkM1 = ((15) | 0);
                if (((((((data) !== (112)) ? 1 : 0)) && ((((data) !== (128)) ? 1 : 0))) ? 1 : 0)) {
                    members.HMM1_latch = ((1) & 0xff);
                }
            }
            if (((((members.horzM1 ?? 0)) < (0)) ? 1 : 0)) {
                members.horzM1 = ((((members.horzM1) + (160))) | 0);
            }
            members.horzM1 = ((((members.horzM1) % (160))) | 0);
        }
        members.HMM1 = ((data) & 0xff);
    }
    function __add_HMM1_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_HMBL_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let curr_x = ((method_current_x(runtime)) | 0);
        data = ((((data) & (240))) & 0xff);
        if ((((data) === ((members.HMBL ?? 0))) ? 1 : 0)) {
            return;
        }
        if ((((((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number(cppMin(+(__add_HMBL_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), (((members.motclkBL ?? 0)) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
            let new_motclkBL = ((runtime.shiftRight(((data) ^ (128)), 4)) | 0);
            if (((((((new_motclkBL) > ((members.motclkBL ?? 0))) ? 1 : 0)) || (((Number(curr_x) <= Number(cppMin(+(__add_HMBL_w(runtime, (((members.HMOVE_started ?? 0)) + (6)), ((new_motclkBL) * (4)))), +(7)))) ? 1 : 0))) ? 1 : 0)) {
                members.horzBL = ((((members.horzBL) - (((new_motclkBL) - ((members.motclkBL ?? 0)))))) | 0);
                members.motclkBL = ((new_motclkBL) | 0);
            }
            else {
                members.horzBL = ((((members.horzBL) - (((15) - ((members.motclkBL ?? 0)))))) | 0);
                members.motclkBL = ((15) | 0);
                if (((((((data) !== (112)) ? 1 : 0)) && ((((data) !== (128)) ? 1 : 0))) ? 1 : 0)) {
                    members.HMBL_latch = ((1) & 0xff);
                }
            }
            if (((((members.horzBL ?? 0)) < (0)) ? 1 : 0)) {
                members.horzBL = ((((members.horzBL) + (160))) | 0);
            }
            members.horzBL = ((((members.horzBL) % (160))) | 0);
        }
        members.HMBL = ((data) & 0xff);
    }
    function __add_HMBL_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_RESMP0_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((members.RESMP0 ?? 0)) & (2))) {
            if (((Number((__mame_table_0[(((__add_RESMP0_w(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0)) {
                members.horzM0 = (((((((members.horzP0 ?? 0)) + (((3) * ((__mame_table_0[(((__add_RESMP0_w(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)))))) - (1))) | 0);
            }
            else {
                members.horzM0 = (((((members.horzP0 ?? 0)) + (((4) * ((__mame_table_0[(((__add_RESMP0_w(runtime, (((((members.NUSIZ0 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)))))) | 0);
            }
            if (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) {
                members.horzM0 = ((((members.horzM0) - (((8) - ((members.motclkP0 ?? 0)))))) | 0);
                members.horzM0 = ((((members.horzM0) + (((8) - ((members.motclkM0 ?? 0)))))) | 0);
                if (((((members.horzM0 ?? 0)) < (0)) ? 1 : 0)) {
                    members.horzM0 = ((((members.horzM0) + (160))) | 0);
                }
            }
            members.horzM0 = ((((members.horzM0) % (160))) | 0);
        }
        members.RESMP0 = ((data) & 0xff);
    }
    function __add_RESMP0_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_RESMP1_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((members.RESMP1 ?? 0)) & (2))) {
            if (((Number((__mame_table_0[(((__add_RESMP1_w(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0)) {
                members.horzM1 = (((((((members.horzP1 ?? 0)) + (((3) * ((__mame_table_0[(((__add_RESMP1_w(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)))))) - (1))) | 0);
            }
            else {
                members.horzM1 = (((((members.horzP1 ?? 0)) + (((4) * ((__mame_table_0[(((__add_RESMP1_w(runtime, (((((members.NUSIZ1 ?? 0)) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)))))) | 0);
            }
            if (((Number((members.HMOVE_started ?? 0)) !== Number(-200)) ? 1 : 0)) {
                members.horzM1 = ((((members.horzM1) - (((8) - ((members.motclkP1 ?? 0)))))) | 0);
                members.horzM1 = ((((members.horzM1) + (((8) - ((members.motclkM1 ?? 0)))))) | 0);
                if (((((members.horzM1 ?? 0)) < (0)) ? 1 : 0)) {
                    members.horzM1 = ((((members.horzM1) + (160))) | 0);
                }
            }
            members.horzM1 = ((((members.horzM1) % (160))) | 0);
        }
        members.RESMP1 = ((data) & 0xff);
    }
    function __add_RESMP1_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_HMOVE_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_helper = members.helper ?? 0;
        let curr_x = ((method_current_x(runtime)) | 0);
        let curr_y = ((method_current_y(runtime)) | 0);
        members.HMOVE_started = ((curr_x) | 0);
        if (((Number(((curr_x) + (68))) < Number(68)) ? 1 : 0)) {
            let cycle_fix = ((((17) - (runtime.divide(__add_HMOVE_w(runtime, ((curr_x) + (68)), 7), 4)))) | 0);
            if ((members.HMP0_latch ?? 0)) {
                members.horzP0 = (((((((members.horzP0 ?? 0)) + (cycle_fix))) % (160))) | 0);
            }
            if ((members.HMP1_latch ?? 0)) {
                members.horzP1 = (((((((members.horzP1 ?? 0)) + (cycle_fix))) % (160))) | 0);
            }
            if ((members.HMM0_latch ?? 0)) {
                members.horzM0 = (((((((members.horzM0 ?? 0)) + (cycle_fix))) % (160))) | 0);
            }
            if ((members.HMM1_latch ?? 0)) {
                members.horzM1 = (((((((members.horzM1 ?? 0)) + (cycle_fix))) % (160))) | 0);
            }
            if ((members.HMBL_latch ?? 0)) {
                members.horzBL = (((((((members.horzBL ?? 0)) + (cycle_fix))) % (160))) | 0);
            }
        }
        members.HMP0_latch = ((0) & 0xff);
        members.HMP1_latch = ((0) & 0xff);
        members.HMM0_latch = ((0) & 0xff);
        members.HMM1_latch = ((0) & 0xff);
        members.HMBL_latch = ((0) & 0xff);
        if ((((((Number(curr_x) >= Number(-5)) ? 1 : 0)) && ((((curr_x) < (97)) ? 1 : 0))) ? 1 : 0)) {
            members.motclkP0 = ((0) | 0);
            members.motclkP1 = ((0) | 0);
            members.motclkM0 = ((0) | 0);
            members.motclkM1 = ((0) | 0);
            members.motclkBL = ((0) | 0);
            members.HMOVE_started = ((-200) | 0);
            return;
        }
        members.motclkP0 = ((runtime.shiftRight((((members.HMP0 ?? 0)) ^ (128)), 4)) | 0);
        members.motclkP1 = ((runtime.shiftRight((((members.HMP1 ?? 0)) ^ (128)), 4)) | 0);
        members.motclkM0 = ((runtime.shiftRight((((members.HMM0 ?? 0)) ^ (128)), 4)) | 0);
        members.motclkM1 = ((runtime.shiftRight((((members.HMM1 ?? 0)) ^ (128)), 4)) | 0);
        members.motclkBL = ((runtime.shiftRight((((members.HMBL ?? 0)) ^ (128)), 4)) | 0);
        if (((((((curr_x) >= (97)) ? 1 : 0)) && ((((curr_x) < (151)) ? 1 : 0))) ? 1 : 0)) {
            let skip_motclks = ((runtime.divide(((((160) - ((members.HMOVE_started ?? 0)))) - (6)), 4)) | 0);
            members.motclkP0 = ((((members.motclkP0) - (skip_motclks))) | 0);
            members.motclkP1 = ((((members.motclkP1) - (skip_motclks))) | 0);
            members.motclkM0 = ((((members.motclkM0) - (skip_motclks))) | 0);
            members.motclkM1 = ((((members.motclkM1) - (skip_motclks))) | 0);
            members.motclkBL = ((((members.motclkBL) - (skip_motclks))) | 0);
            if (((((members.motclkP0 ?? 0)) < (0)) ? 1 : 0)) {
                members.motclkP0 = ((0) | 0);
            }
            if (((((members.motclkP1 ?? 0)) < (0)) ? 1 : 0)) {
                members.motclkP1 = ((0) | 0);
            }
            if (((((members.motclkM0 ?? 0)) < (0)) ? 1 : 0)) {
                members.motclkM0 = ((0) | 0);
            }
            if (((((members.motclkM1 ?? 0)) < (0)) ? 1 : 0)) {
                members.motclkM1 = ((0) | 0);
            }
            if (((((members.motclkBL ?? 0)) < (0)) ? 1 : 0)) {
                members.motclkBL = ((0) | 0);
            }
        }
        if ((((((Number(curr_x) >= Number(-56)) ? 1 : 0)) && (((Number(curr_x) < Number(-5)) ? 1 : 0))) ? 1 : 0)) {
            let max_motclks = ((runtime.divide(((7) - ((((members.HMOVE_started ?? 0)) + (5)))), 4)) | 0);
            if (((((members.motclkP0 ?? 0)) > (max_motclks)) ? 1 : 0)) {
                members.motclkP0 = ((max_motclks) | 0);
            }
            if (((((members.motclkP1 ?? 0)) > (max_motclks)) ? 1 : 0)) {
                members.motclkP1 = ((max_motclks) | 0);
            }
            if (((((members.motclkM0 ?? 0)) > (max_motclks)) ? 1 : 0)) {
                members.motclkM0 = ((max_motclks) | 0);
            }
            if (((((members.motclkM1 ?? 0)) > (max_motclks)) ? 1 : 0)) {
                members.motclkM1 = ((max_motclks) | 0);
            }
            if (((((members.motclkBL ?? 0)) > (max_motclks)) ? 1 : 0)) {
                members.motclkBL = ((max_motclks) | 0);
            }
        }
        if ((((((Number(curr_x) < Number(-5)) ? 1 : 0)) || ((((curr_x) >= (157)) ? 1 : 0))) ? 1 : 0)) {
            members.horzP0 = ((((members.horzP0) + (((8) - ((members.motclkP0 ?? 0)))))) | 0);
            members.horzP1 = ((((members.horzP1) + (((8) - ((members.motclkP1 ?? 0)))))) | 0);
            members.horzM0 = ((((members.horzM0) + (((8) - ((members.motclkM0 ?? 0)))))) | 0);
            members.horzM1 = ((((members.horzM1) + (((8) - ((members.motclkM1 ?? 0)))))) | 0);
            members.horzBL = ((((members.horzBL) + (((8) - ((members.motclkBL ?? 0)))))) | 0);
            if (((((members.horzP0 ?? 0)) < (0)) ? 1 : 0)) {
                members.horzP0 = ((((members.horzP0) + (160))) | 0);
            }
            if (((((members.horzP1 ?? 0)) < (0)) ? 1 : 0)) {
                members.horzP1 = ((((members.horzP1) + (160))) | 0);
            }
            if (((((members.horzM0 ?? 0)) < (0)) ? 1 : 0)) {
                members.horzM0 = ((((members.horzM0) + (160))) | 0);
            }
            if (((((members.horzM1 ?? 0)) < (0)) ? 1 : 0)) {
                members.horzM1 = ((((members.horzM1) + (160))) | 0);
            }
            if (((((members.horzBL ?? 0)) < (0)) ? 1 : 0)) {
                members.horzBL = ((((members.horzBL) + (160))) | 0);
            }
            members.horzP0 = ((((members.horzP0) % (160))) | 0);
            members.horzP1 = ((((members.horzP1) % (160))) | 0);
            members.horzM0 = ((((members.horzM0) % (160))) | 0);
            members.horzM1 = ((((members.horzM1) % (160))) | 0);
            members.horzBL = ((((members.horzBL) % (160))) | 0);
            if ((((curr_x) >= (157)) ? 1 : 0)) {
                curr_y = ((((curr_y) + (1))) | 0);
                method_update_bitmap(runtime, -8, curr_y);
            }
            else {
                method_setup_pXgfx(runtime);
            }
            if ((((curr_y) < ((members.screen_height ?? 0))) ? 1 : 0)) {
                cppMemset(runtime, __deref_HMOVE_w(runtime, h_helper[(members.current_bitmap ?? 0)])["pix&"](curr_y, 34), 0, 16);
            }
            members.prev_x = ((8) | 0);
        }
    }
    function __add_HMOVE_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_HMOVE_w(runtime, p) {
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
    function method_HMCLR_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_HMP0_w(runtime, 0);
        method_HMP1_w(runtime, 0);
        method_HMM0_w(runtime, 0);
        method_HMM1_w(runtime, 0);
        method_HMBL_w(runtime, 0);
    }
    function method_CXCLR_w(runtime) {
        const members = runtime.members;
        members.CXM0P = ((0) & 0xff);
        members.CXM1P = ((0) & 0xff);
        members.CXP0FB = ((0) & 0xff);
        members.CXP1FB = ((0) & 0xff);
        members.CXM0FB = ((0) & 0xff);
        members.CXM1FB = ((0) & 0xff);
        members.CXBLPF = ((0) & 0xff);
        members.CXPPMM = ((0) & 0xff);
    }
    function method_read_input_port_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_input_port_callback(runtime, members.m_read_input_port_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_input_port_cb, "bind"));
    }
    function __deref_read_input_port_callback(runtime, p) {
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
    function method_databus_contents_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_databus_contents_callback(runtime, members.m_databus_contents_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_databus_contents_cb, "bind"));
    }
    function __deref_databus_contents_callback(runtime, p) {
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
    function method_vsync_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_vsync_callback(runtime, members.m_vsync_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vsync_cb, "bind"));
    }
    function __deref_vsync_callback(runtime, p) {
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
    function method_set_tia_tag(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_tia.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_tia)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_palette_entries(runtime) {
        const members = runtime.members;
        return ((16512) >>> 0);
    }
    function method_tia_video_device__read_input_port_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tia_video_device__read_input_port_callback(runtime, members.m_read_input_port_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_input_port_cb, "bind"));
    }
    function __deref_tia_video_device__read_input_port_callback(runtime, p) {
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
    function method_tia_video_device__databus_contents_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tia_video_device__databus_contents_callback(runtime, members.m_databus_contents_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_databus_contents_cb, "bind"));
    }
    function __deref_tia_video_device__databus_contents_callback(runtime, p) {
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
    function method_tia_video_device__vsync_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tia_video_device__vsync_callback(runtime, members.m_vsync_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vsync_cb, "bind"));
    }
    function __deref_tia_video_device__vsync_callback(runtime, p) {
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
    function method_tia_video_device__set_tia_tag(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_tia.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_tia)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_tia_video_device__palette_entries(runtime) {
        const members = runtime.members;
        return ((16512) >>> 0);
    }
    function method_init_palette(runtime) {
        const members = runtime.members;
        if ((((members.__static_init_palette_color__initialised ?? 0)) ? 0 : 1)) {
            members.__static_init_palette_color = [[0, 0], [0.192, (-0.127)], [0.241, (-0.048)], [0.24, 0.04], [0.191, 0.121], [0.103, 0.175], [(-0.008), 0.196], [(-0.116), 0.174], [(-0.199), 0.118], [(-0.243), 0.037], [(-0.237), (-0.052)], [(-0.18), (-0.129)], [(-0.087), (-0.181)], [0.021, (-0.196)], [0.13, (-0.169)], [0.21, (-0.107)]];
            members.__static_init_palette_color__initialised = 1;
        }
        let color = (members.__static_init_palette_color ?? 0);
        for (let i = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let I = runtime.readIndex(runtime.readIndex(color, i), 0);
            let Q = runtime.readIndex(runtime.readIndex(color, i), 1);
            for (let j = ((0) | 0); (((j) < (8)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                let Y = ((j) / (7));
                let R = __add_init_palette(runtime, ((Y) + (((0.956) * (I)))), ((0.621) * (Q)));
                let G = ((((Y) - (((0.272) * (I))))) - (((0.647) * (Q))));
                let B = __add_init_palette(runtime, ((Y) - (((1.106) * (I)))), ((1.703) * (Q)));
                if ((((R) < (0)) ? 1 : 0)) {
                    R = 0;
                }
                if ((((G) < (0)) ? 1 : 0)) {
                    G = 0;
                }
                if ((((B) < (0)) ? 1 : 0)) {
                    B = 0;
                }
                R = Math.pow(Number(R), Number(0.9));
                G = Math.pow(Number(G), Number(0.9));
                B = Math.pow(Number(B), Number(0.9));
                if ((((R) > (1)) ? 1 : 0)) {
                    R = 1;
                }
                if ((((G) > (1)) ? 1 : 0)) {
                    G = 1;
                }
                if ((((B) > (1)) ? 1 : 0)) {
                    B = 1;
                }
                (runtime.palette[((((8) * (i))) + (j))] = ((0xff000000 | ((((__add_init_palette(runtime, ((255) * (B)), 0.5)) & 0xff)) & 0xff) << 16 | ((((__add_init_palette(runtime, ((255) * (G)), 0.5)) & 0xff)) & 0xff) << 8 | ((((__add_init_palette(runtime, ((255) * (R)), 0.5)) & 0xff)) & 0xff)) >>> 0));
            }
        }
        method_extend_palette(runtime);
    }
    function __add_init_palette(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "extend_palette": method_extend_palette,
        "screen_update": method_screen_update,
        "draw_sprite_helper": method_draw_sprite_helper,
        "draw_missile_helper": method_draw_missile_helper,
        "draw_playfield_helper": method_draw_playfield_helper,
        "current_x": method_current_x,
        "current_y": method_current_y,
        "update_bitmap": method_update_bitmap,
        "drawS1": method_drawS1,
        "drawM1": method_drawM1,
        "drawS0": method_drawS0,
        "drawM0": method_drawM0,
        "drawPF": method_drawPF,
        "drawBL": method_drawBL,
        "draw_ball_helper": method_draw_ball_helper,
        "setup_pXgfx": method_setup_pXgfx,
        "collision_check": method_collision_check,
        "NUSIZ0_w": method_NUSIZ0_w,
        "NUSIZ1_w": method_NUSIZ1_w,
        "RESP0_w": method_RESP0_w,
        "RESP1_w": method_RESP1_w,
        "INPT_r": method_INPT_r,
        "read": method_read,
        "write": method_write,
        "VSYNC_w": method_VSYNC_w,
        "VBLANK_w": method_VBLANK_w,
        "WSYNC_w": method_WSYNC_w,
        "RSYNC_w": method_RSYNC_w,
        "CTRLPF_w": method_CTRLPF_w,
        "RESM0_w": method_RESM0_w,
        "RESM1_w": method_RESM1_w,
        "RESBL_w": method_RESBL_w,
        "GRP0_w": method_GRP0_w,
        "GRP1_w": method_GRP1_w,
        "HMP0_w": method_HMP0_w,
        "HMP1_w": method_HMP1_w,
        "HMM0_w": method_HMM0_w,
        "HMM1_w": method_HMM1_w,
        "HMBL_w": method_HMBL_w,
        "RESMP0_w": method_RESMP0_w,
        "RESMP1_w": method_RESMP1_w,
        "HMOVE_w": method_HMOVE_w,
        "HMCLR_w": method_HMCLR_w,
        "CXCLR_w": method_CXCLR_w,
        "read_input_port_callback": method_read_input_port_callback,
        "databus_contents_callback": method_databus_contents_callback,
        "vsync_callback": method_vsync_callback,
        "set_tia_tag": method_set_tia_tag,
        "palette_entries": method_palette_entries,
        "tia_video_device::read_input_port_callback": method_tia_video_device__read_input_port_callback,
        "tia_video_device::databus_contents_callback": method_tia_video_device__databus_contents_callback,
        "tia_video_device::vsync_callback": method_tia_video_device__vsync_callback,
        "tia_video_device::set_tia_tag": method_tia_video_device__set_tia_tag,
        "tia_video_device::palette_entries": method_tia_video_device__palette_entries,
        "init_palette": method_init_palette
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["copybitmap", "m_databus_contents_cb", "m_maincpu.adjust_icount", "m_maincpu.total_cycles", "m_read_input_port_cb", "m_tia.set_tag", "m_tia.tia_sound_w", "m_vsync_cb", "pen", "screen", "screen().height", "screen().width", "std::forward"];
export const device = definition;
export default device;
