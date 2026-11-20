import deviceData from './tms9928a.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [3, 251, 15, 255, 7, 127, 7, 255];
    function method_read(runtime, offset) {
        const members = runtime.members;
        let value = ((0) & 0xff);
        if (((Number(((offset) & (1))) === Number(0)) ? 1 : 0)) {
            value = ((method_vram_read(runtime)) & 0xff);
        }
        else {
            value = ((method_register_read(runtime)) & 0xff);
        }
        return ((value) & 0xff);
    }
    function method_vram_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let data = (((members.m_ReadAhead ?? 0)) & 0xff);
        if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
            return ((data) & 0xff);
        }
        members.m_ReadAhead = (((__deref_vram_read(runtime, members.m_vram_space).read_byte?.((members.m_Addr ?? 0)) ?? 0)) & 0xff);
        members.m_Addr = (((((((members.m_Addr ?? 0)) + (1))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
        members.m_latch = ((0) & 0xff);
        return ((data) & 0xff);
    }
    function __deref_vram_read(runtime, p) {
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
    function method_register_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let data = (((members.m_StatusReg ?? 0)) & 0xff);
        if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
            return ((data) & 0xff);
        }
        members.m_StatusReg = (((members.m_FifthSprite ?? 0)) & 0xff);
        method_check_interrupt(runtime);
        members.m_latch = ((0) & 0xff);
        return ((data) & 0xff);
    }
    function method_check_interrupt(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_int_line_cb"];
        const h_m_Regs = members.m_Regs ?? 0;
        let b = ((((((((((members.m_StatusReg ?? 0)) & (128))) && (((h_m_Regs[1]) & (32)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        if ((((b) !== ((members.m_INT ?? 0))) ? 1 : 0)) {
            members.m_INT = ((b) & 0xff);
            (__L0 ? __L0(Number((members.m_INT ?? 0))) : typeof members.m_out_int_line_cb === 'function' ? members.m_out_int_line_cb((members.m_INT ?? 0)) : runtime.invoke("m_out_int_line_cb", (members.m_INT ?? 0)));
        }
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((Number(((offset) & (1))) === Number(0)) ? 1 : 0)) {
            method_vram_write(runtime, data);
        }
        else {
            method_register_write(runtime, data);
        }
    }
    function method_vram_write(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        data = ((data) & 0xff);
        (__deref_vram_write(runtime, members.m_vram_space).write_byte?.((members.m_Addr ?? 0), data) ?? 0);
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            members.m_Addr = (((((((members.m_Addr ?? 0)) + (1))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
            members.m_ReadAhead = ((data) & 0xff);
            members.m_latch = ((0) & 0xff);
        }
    }
    function __deref_vram_write(runtime, p) {
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
    function method_register_write(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        data = ((data) & 0xff);
        if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
            return;
        }
        if ((members.m_latch ?? 0)) {
            members.m_Addr = ((((((((data) << (8))) | ((((members.m_Addr ?? 0)) & (255))))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
            if (((data) & (128))) {
                method_change_register(runtime, ((data) & (7)), (((members.m_Addr ?? 0)) & (255)));
            }
            else {
                if (((((data) & (64))) ? 0 : 1)) {
                    method_vram_read(runtime);
                }
            }
            members.m_latch = ((0) & 0xff);
        }
        else {
            members.m_Addr = (((((((((members.m_Addr ?? 0)) & (65280))) | (data))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
            members.m_latch = ((1) & 0xff);
        }
    }
    function method_change_register(runtime, reg, val) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        val = ((val) & 0xff);
        const h_m_Regs = members.m_Regs ?? 0;
        if ((((members.__static_change_register_modes__initialised ?? 0)) ? 0 : 1)) {
            members.__static_change_register_modes = ["Mode 0 (GRAPHIC 1)", "Mode 1 (TEXT 1)", "Mode 2 (GRAPHIC 2)", "Mode 1+2 (TEXT 1 variation)", "Mode 3 (MULTICOLOR)", "Mode 1+3 (BOGUS)", "Mode 2+3 (MULTICOLOR variation)", "Mode 1+2+3 (BOGUS)"];
            members.__static_change_register_modes__initialised = 1;
        }
        let modes = (members.__static_change_register_modes ?? 0);
        let prev = ((h_m_Regs[reg]) & 0xff);
        val = ((((val) & ((__mame_table_0[((reg) & 7)] ?? 0)))) & 0xff);
        h_m_Regs[reg] = val;
        if (0) {
            0;
        }
        switch (reg) {
            case 0:
                {
                    if (((val) & (2))) {
                        members.m_colour = ((((((((h_m_Regs[3]) & (128))) * (64))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                        members.m_pattern = ((((((((h_m_Regs[4]) & (4))) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                        method_update_table_masks(runtime);
                    }
                    else {
                        members.m_colour = ((((((h_m_Regs[3]) * (64))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                        members.m_pattern = ((((((h_m_Regs[4]) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                    }
                    members.m_mode = ((((((((1) ? (((h_m_Regs[0]) & (2))) : (0))) | (runtime.shiftRight(((h_m_Regs[1]) & (16)), 4)))) | (runtime.shiftRight(((h_m_Regs[1]) & (8)), 1)))) & 0xff);
                    if (((((val) ^ (prev))) & (1))) {
                        method_update_backdrop(runtime);
                    }
                    if (0) {
                        0;
                    }
                    break;
                }
            case 1:
                {
                    method_check_interrupt(runtime);
                    members.m_mode = ((((((((1) ? (((h_m_Regs[0]) & (2))) : (0))) | (runtime.shiftRight(((h_m_Regs[1]) & (16)), 4)))) | (runtime.shiftRight(((h_m_Regs[1]) & (8)), 1)))) & 0xff);
                    if (0) {
                        0;
                    }
                    break;
                }
            case 2:
                {
                    members.m_nametbl = ((((((val) * (1024))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                    break;
                }
            case 3:
                {
                    if (((h_m_Regs[0]) & (2))) {
                        members.m_colour = ((((((((val) & (128))) * (64))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                        method_update_table_masks(runtime);
                    }
                    else {
                        members.m_colour = ((((((val) * (64))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    if (((h_m_Regs[0]) & (2))) {
                        members.m_pattern = ((((((((val) & (4))) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                        method_update_table_masks(runtime);
                    }
                    else {
                        members.m_pattern = ((((((val) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    members.m_spriteattribute = ((((((val) * (128))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                    break;
                }
            case 6:
                {
                    members.m_spritepattern = ((((((val) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
                    break;
                }
            case 7:
                {
                    if (((((val) ^ (prev))) & (15))) {
                        method_update_backdrop(runtime);
                    }
                    break;
                }
        }
    }
    function method_update_table_masks(runtime) {
        const members = runtime.members;
        const h_m_Regs = members.m_Regs ?? 0;
        members.m_colourmask = ((((((((h_m_Regs[3]) & (127))) << (3))) | (7))) | 0);
        members.m_patternmask = ((((((((h_m_Regs[4]) & (3))) << (8))) | (((1) ? ((((members.m_colourmask ?? 0)) & (255))) : (255))))) | 0);
    }
    function method_update_backdrop(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rgb_t"];
        const h_m_Regs = members.m_Regs ?? 0;
        if (((Number(((h_m_Regs[7]) & (15))) === Number(0)) ? 1 : 0)) {
            (runtime.palette[0] = (__L0 ? __L0(((((h_m_Regs[0]) & (1))) ? (0) : (255)), 0, 0, 0) : runtime.macro("rgb_t", ((((h_m_Regs[0]) & (1))) ? (0) : (255)), 0, 0, 0)));
        }
    }
    function method_screen_update(runtime, screen, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["copybitmap"];
        (__L0 ? __L0(bitmap, (members.m_tmpbmp ?? 0), 0, 0, 0, 0, cliprect) : runtime.macro("copybitmap", bitmap, (members.m_tmpbmp ?? 0), 0, 0, 0, 0, cliprect));
        return ((0) >>> 0);
    }
    function method_clock_grom(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_gromclk_cb"];
        (__L0 ? __L0(Number(1)) : typeof members.m_out_gromclk_cb === 'function' ? members.m_out_gromclk_cb(1) : runtime.invoke("m_out_gromclk_cb", 1));
        (__L0 ? __L0(Number(0)) : typeof members.m_out_gromclk_cb === 'function' ? members.m_out_gromclk_cb(0) : runtime.invoke("m_out_gromclk_cb", 0));
    }
    function method_update_line(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().vpos"], __L2 = __l["screen().height"], __L3 = __l["pen"], __L4 = __l["screen().time_until_pos"];
        const h_m_Regs = members.m_Regs ?? 0;
        let raw_vpos = ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) | 0);
        let vpos = ((runtime.divide(((raw_vpos) * ((members.m_vertical_size ?? 0))), ((__L2 ?? globalThis.mamekitMissingCall?.("screen().height"))?.() ?? 0))) | 0);
        let BackColour = ((((h_m_Regs[7]) & (15))) & 0xffff);
        let p = (members.m_tmpbmp ?? 0)["pix&"](vpos);
        let p$s = undefined, p$o = 0;
        if (ArrayBuffer.isView(p) || Array.isArray(p))
            p$s = p;
        else if (p !== null && typeof p === 'object' && p.generatedPointer === true && p.path === undefined && p.target === undefined && (ArrayBuffer.isView(p.source) || Array.isArray(p.source))) {
            p$s = p.source;
            p$o = p.offset;
        }
        let y = ((((vpos) - ((members.m_top_border ?? 0)))) | 0);
        if ((((((((((y) < (0)) ? 1 : 0)) || ((((y) >= (192)) ? 1 : 0))) ? 1 : 0)) || (((((h_m_Regs[1]) & (64))) ? 0 : 1))) ? 1 : 0)) {
            for (let i = ((0) | 0); (((i) < (342)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.writeIndex(p, i, (__L3 ? __L3(BackColour) : runtime.macro("pen", BackColour)));
            }
            if ((((y) === (193)) ? 1 : 0)) {
                members.m_StatusReg = ((((members.m_StatusReg) | (128))) & 0xff);
                method_check_interrupt(runtime);
            }
        }
        else {
            for (let i = ((0) | 0); ((Number(i) < Number(37)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.writeIndex(p, i, (__L3 ? __L3(BackColour) : runtime.macro("pen", BackColour)));
            }
            switch ((members.m_mode ?? 0)) {
                case 0:
                    {
                        let addr = (((((members.m_nametbl ?? 0)) + (((((y) & (248))) << (2))))) & 0xffff);
                        for (let x = ((37) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (8))) | 0), addr = ((((addr) + (1))) & 0xffff)) {
                            let charcode = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(addr) ?? 0)) & 0xff);
                            let pattern = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_pattern ?? 0)) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
                            let colour = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.((((members.m_colour ?? 0)) + (((charcode) >>> (3))))) ?? 0)) & 0xff);
                            let fg = (__L3 ? __L3(((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
                            let bg = (__L3 ? __L3(((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
                            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
                                runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg) : (bg)));
                            }
                        }
                        break;
                    }
                case 1:
                    {
                        let addr__1 = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (40))))) & 0xffff);
                        let fg = (__L3 ? __L3(((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))));
                        let bg = (__L3 ? __L3(BackColour) : runtime.macro("pen", BackColour));
                        for (let x = ((37) | 0); ((Number(x) < Number(43)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            runtime.writeIndex(p, x, bg);
                        }
                        for (let x = ((43) | 0); ((Number(x) < Number(283)) ? 1 : 0); x = ((((x) + (6))) | 0), addr__1 = ((((addr__1) + (1))) & 0xffff)) {
                            let charcode = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(addr__1) ?? 0)) & 0xffff);
                            let pattern = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_pattern ?? 0)) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
                            for (let i = ((0) | 0); (((i) < (6)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
                                runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg) : (bg)));
                            }
                        }
                        for (let x = ((283) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            runtime.writeIndex(p, x, bg);
                        }
                        break;
                    }
                case 2:
                    {
                        let addr__2 = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (32))))) & 0xffff);
                        for (let x = ((37) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (8))) | 0), addr__2 = ((((addr__2) + (1))) & 0xffff)) {
                            let charcode = ((__add_update_line(runtime, (__deref_update_line(runtime, members.m_vram_space).read_byte?.(addr__2) ?? 0), ((runtime.shiftRight(y, 6)) << (8)))) & 0xffff);
                            let pattern = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_pattern ?? 0)) + (((((charcode) & ((members.m_patternmask ?? 0)))) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
                            let colour = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_colour ?? 0)) + (((((charcode) & ((members.m_colourmask ?? 0)))) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
                            let fg__1 = (__L3 ? __L3(((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
                            let bg__1 = (__L3 ? __L3(((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
                            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
                                runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg__1) : (bg__1)));
                            }
                        }
                        break;
                    }
                case 3:
                    {
                        let addr__3 = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (40))))) & 0xffff);
                        let fg__2 = (__L3 ? __L3(((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))));
                        let bg__2 = (__L3 ? __L3(BackColour) : runtime.macro("pen", BackColour));
                        for (let x = ((37) | 0); ((Number(x) < Number(43)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            runtime.writeIndex(p, x, bg__2);
                        }
                        for (let x = ((43) | 0); ((Number(x) < Number(283)) ? 1 : 0); x = ((((x) + (6))) | 0), addr__3 = ((((addr__3) + (1))) & 0xffff)) {
                            let charcode = ((((__add_update_line(runtime, (__deref_update_line(runtime, members.m_vram_space).read_byte?.(addr__3) ?? 0), ((runtime.shiftRight(y, 6)) << (8)))) & ((members.m_patternmask ?? 0)))) & 0xffff);
                            let pattern = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_pattern ?? 0)) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
                            for (let i = ((0) | 0); (((i) < (6)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
                                runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg__2) : (bg__2)));
                            }
                        }
                        for (let x = ((283) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            runtime.writeIndex(p, x, bg__2);
                        }
                        break;
                    }
                case 4:
                    {
                        let addr__4 = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (32))))) & 0xffff);
                        for (let x = ((37) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (8))) | 0), addr__4 = ((((addr__4) + (1))) & 0xffff)) {
                            let charcode = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(addr__4) ?? 0)) & 0xff);
                            let colour = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_pattern ?? 0)) + (((charcode) << (3)))), ((runtime.shiftRight(y, 2)) & (7)))) ?? 0)) & 0xff);
                            let fg__3 = (__L3 ? __L3(((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
                            let bg__3 = (__L3 ? __L3(((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
                            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg__3)))))));
                            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), (runtime.writeIndex(p, ((x) + (6)), (runtime.writeIndex(p, ((x) + (7)), bg__3)))))));
                        }
                        break;
                    }
                case 5:
                case 7:
                    {
                        let fg__4 = (__L3 ? __L3(((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))));
                        let bg__4 = (__L3 ? __L3(BackColour) : runtime.macro("pen", BackColour));
                        for (let x = ((37) | 0); ((Number(x) < Number(43)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            runtime.writeIndex(p, x, bg__4);
                        }
                        for (let x = ((43) | 0); ((Number(x) < Number(283)) ? 1 : 0); x = ((((x) + (6))) | 0)) {
                            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg__4)))))));
                            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), bg__4)));
                        }
                        for (let x = ((283) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            runtime.writeIndex(p, x, bg__4);
                        }
                        break;
                    }
                case 6:
                    {
                        let addr__5 = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (32))))) & 0xffff);
                        for (let x = ((37) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (8))) | 0), addr__5 = ((((addr__5) + (1))) & 0xffff)) {
                            let charcode = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(addr__5) ?? 0)) & 0xff);
                            let colour = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.((((members.m_pattern ?? 0)) + (((((__add_update_line(runtime, ((charcode) + (((runtime.shiftRight(y, 2)) & (7)))), ((runtime.shiftRight(y, 6)) << (8)))) & ((members.m_patternmask ?? 0)))) << (3))))) ?? 0)) & 0xff);
                            let fg__5 = (__L3 ? __L3(((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
                            let bg__5 = (__L3 ? __L3(((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
                            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg__5)))))));
                            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), (runtime.writeIndex(p, ((x) + (6)), (runtime.writeIndex(p, ((x) + (7)), bg__5)))))));
                        }
                        break;
                    }
            }
            if (((Number(((h_m_Regs[1]) & (80))) !== Number(64)) ? 1 : 0)) {
                members.m_FifthSprite = ((31) & 0xff);
            }
            else {
                let sprite_size = ((((((h_m_Regs[1]) & (2))) ? (16) : (8))) & 0xff);
                let sprite_mag = ((((h_m_Regs[1]) & (1))) & 0xff);
                let sprite_height = ((((sprite_size) * (((sprite_mag) + (1))))) & 0xff);
                let spr_drawn = [0];
                let num_sprites = ((0) & 0xff);
                let fifth_encountered = ((0) ? 1 : 0);
                for (let sprattr = ((0) & 0xffff); (((sprattr) < (128)) ? 1 : 0); sprattr = ((((sprattr) + (4))) & 0xffff)) {
                    let spr_y = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_spriteattribute ?? 0)) + (sprattr)), 0)) ?? 0)) | 0);
                    members.m_FifthSprite = ((runtime.divide(sprattr, 4)) & 0xff);
                    if ((((spr_y) === (208)) ? 1 : 0)) {
                        break;
                    }
                    if ((((spr_y) > (224)) ? 1 : 0)) {
                        spr_y = ((((spr_y) - (256))) | 0);
                    }
                    spr_y = ((((spr_y) + (1))) | 0);
                    if (((((((spr_y) <= (y)) ? 1 : 0)) && (((Number(y) < Number(((spr_y) + (sprite_height)))) ? 1 : 0))) ? 1 : 0)) {
                        let spr_x = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_spriteattribute ?? 0)) + (sprattr)), 1)) ?? 0)) | 0);
                        let sprcode = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_spriteattribute ?? 0)) + (sprattr)), 2)) ?? 0)) & 0xff);
                        let sprcol = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(__add_update_line(runtime, (((members.m_spriteattribute ?? 0)) + (sprattr)), 3)) ?? 0)) & 0xff);
                        let pataddr = (((((members.m_spritepattern ?? 0)) + ((((((((sprite_size) === (16)) ? 1 : 0)) ? (((sprcode) & (-4))) : (sprcode))) * (8))))) & 0xffff);
                        num_sprites = ((((num_sprites) + (1))) & 0xff);
                        if ((((num_sprites) === (5)) ? 1 : 0)) {
                            fifth_encountered = ((1) ? 1 : 0);
                            break;
                        }
                        if (sprite_mag) {
                            pataddr = ((((pataddr) + (runtime.shiftRight(((((y) - (spr_y))) & (31)), 1)))) & 0xffff);
                        }
                        else {
                            pataddr = ((((pataddr) + (((((y) - (spr_y))) & (15))))) & 0xffff);
                        }
                        let pattern = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(pataddr) ?? 0)) & 0xff);
                        if (((sprcol) & (128))) {
                            spr_x = ((((spr_x) - (32))) | 0);
                        }
                        sprcol = ((((sprcol) & (15))) & 0xff);
                        for (let s = ((0) | 0); (((s) < (sprite_size)) ? 1 : 0); s = ((((s) + (8))) | 0)) {
                            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
                                let colission_index = ((__add_update_line(runtime, ((spr_x) + (((sprite_mag) ? (((i) * (2))) : (i)))), 32)) | 0);
                                for (let z = ((0) | 0); (((z) <= (sprite_mag)) ? 1 : 0); colission_index = ((((colission_index) + (1))) | 0), z = ((((z) + (1))) | 0)) {
                                    if (((pattern) & (128))) {
                                        if (((((((colission_index) >= (32)) ? 1 : 0)) && (((Number(colission_index) < Number(288)) ? 1 : 0))) ? 1 : 0)) {
                                            if ((spr_drawn[colission_index] ?? 0)) {
                                                members.m_StatusReg = ((((members.m_StatusReg) | (32))) & 0xff);
                                            }
                                            spr_drawn[colission_index] = ((spr_drawn[colission_index]) | (1));
                                            if (sprcol) {
                                                if ((((((spr_drawn[colission_index] ?? 0)) & (2))) ? 0 : 1)) {
                                                    spr_drawn[colission_index] = ((spr_drawn[colission_index]) | (2));
                                                    runtime.writeIndex(p, ((((37) + (colission_index))) - (32)), (__L3 ? __L3(sprcol) : runtime.macro("pen", sprcol)));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            pattern = (((__deref_update_line(runtime, members.m_vram_space).read_byte?.(((pataddr) + (16))) ?? 0)) & 0xff);
                            spr_x = ((((spr_x) + (((sprite_mag) ? (16) : (8))))) | 0);
                        }
                    }
                }
                if ((((~(members.m_StatusReg ?? 0))) & (64))) {
                    members.m_StatusReg = (((((((members.m_StatusReg ?? 0)) & (224))) | ((members.m_FifthSprite ?? 0)))) & 0xff);
                    if ((((fifth_encountered) && ((((~(members.m_StatusReg ?? 0))) & (128)))) ? 1 : 0)) {
                        members.m_StatusReg = ((((members.m_StatusReg) | (64))) & 0xff);
                    }
                }
            }
            for (let i = ((293) | 0); (((i) < (342)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.writeIndex(p, i, (__L3 ? __L3(BackColour) : runtime.macro("pen", BackColour)));
            }
        }
        (__deref_update_line(runtime, members.m_line_timer).adjust?.(((__L4 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(((((raw_vpos) + (1))) % (((__L2 ?? globalThis.mamekitMissingCall?.("screen().height"))?.() ?? 0))), 37) ?? 0)) ?? 0);
    }
    function __add_update_line(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_update_line(runtime, p) {
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
    function method_set_vram_size(runtime, vram_size) {
        const members = runtime.members;
        members.m_vram_size = ((vram_size) | 0);
    }
    function method_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_int_callback(runtime, members.m_out_int_line_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_line_cb, "bind"));
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
    function method_gromclk_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_gromclk_callback(runtime, members.m_out_gromclk_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_gromclk_cb, "bind"));
    }
    function __deref_gromclk_callback(runtime, p) {
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
    function method_get_bitmap(runtime) {
        const members = runtime.members;
        return (members.m_tmpbmp ?? 0);
    }
    function method_reset_line(runtime, state) {
        const members = runtime.members;
        if (((Number(state) === Number(1)) ? 1 : 0)) {
            method_device_reset(runtime);
        }
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().time_until_pos"], __L2 = __l["clocks_to_attotime"];
        let __t0;
        const h_m_Regs = members.m_Regs ?? 0;
        for (let __range0 = h_m_Regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            runtime.writeIndex(__range0, __range0_index, 0);
        }
        members.m_StatusReg = ((0) & 0xff);
        members.m_FifthSprite = ((31) & 0xff);
        members.m_nametbl = ((0) & 0xffff);
        members.m_pattern = ((0) & 0xffff);
        members.m_colour = ((0) & 0xffff);
        members.m_spritepattern = ((0) & 0xffff);
        members.m_spriteattribute = ((0) & 0xffff);
        members.m_colourmask = ((16383) | 0);
        members.m_patternmask = ((16383) | 0);
        members.m_Addr = ((0) & 0xffff);
        members.m_ReadAhead = ((0) & 0xff);
        members.m_latch = ((0) & 0xff);
        members.m_mode = ((0) & 0xff);
        method_check_interrupt(runtime);
        (__deref_device_reset(runtime, members.m_line_timer).adjust?.(((__L1 ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(0, 37) ?? 0)) ?? 0);
        if (((((((__t0 = __deref_device_reset(runtime, members.m_out_gromclk_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_out_gromclk_cb, "isunset"))) ? 0 : 1)) && (1)) ? 1 : 0)) {
            (__deref_device_reset(runtime, members.m_gromclk_timer).adjust?.(0, 0, (__L2 ? __L2(24) : runtime.macro("clocks_to_attotime", 24))) ?? 0);
        }
    }
    function __deref_device_reset(runtime, p) {
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
    function method_palette_entries(runtime) {
        const members = runtime.members;
        return ((16) >>> 0);
    }
    function method_tms9928a_device__set_vram_size(runtime, vram_size) {
        const members = runtime.members;
        members.m_vram_size = ((vram_size) | 0);
    }
    function method_tms9928a_device__int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms9928a_device__int_callback(runtime, members.m_out_int_line_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_line_cb, "bind"));
    }
    function __deref_tms9928a_device__int_callback(runtime, p) {
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
    function method_tms9928a_device__gromclk_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms9928a_device__gromclk_callback(runtime, members.m_out_gromclk_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_gromclk_cb, "bind"));
    }
    function __deref_tms9928a_device__gromclk_callback(runtime, p) {
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
    function method_tms9928a_device__get_bitmap(runtime) {
        const members = runtime.members;
        return (members.m_tmpbmp ?? 0);
    }
    function method_tms9928a_device__reset_line(runtime, state) {
        const members = runtime.members;
        if (((Number(state) === Number(1)) ? 1 : 0)) {
            method_device_reset(runtime);
        }
    }
    function method_tms9928a_device__palette_entries(runtime) {
        const members = runtime.members;
        return ((16) >>> 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "vram_read": method_vram_read,
        "register_read": method_register_read,
        "check_interrupt": method_check_interrupt,
        "write": method_write,
        "vram_write": method_vram_write,
        "register_write": method_register_write,
        "change_register": method_change_register,
        "update_table_masks": method_update_table_masks,
        "update_backdrop": method_update_backdrop,
        "screen_update": method_screen_update,
        "clock_grom": method_clock_grom,
        "update_line": method_update_line,
        "set_vram_size": method_set_vram_size,
        "int_callback": method_int_callback,
        "gromclk_callback": method_gromclk_callback,
        "get_bitmap": method_get_bitmap,
        "reset_line": method_reset_line,
        "device_reset": method_device_reset,
        "palette_entries": method_palette_entries,
        "tms9928a_device::set_vram_size": method_tms9928a_device__set_vram_size,
        "tms9928a_device::int_callback": method_tms9928a_device__int_callback,
        "tms9928a_device::gromclk_callback": method_tms9928a_device__gromclk_callback,
        "tms9928a_device::get_bitmap": method_tms9928a_device__get_bitmap,
        "tms9928a_device::reset_line": method_tms9928a_device__reset_line,
        "tms9928a_device::palette_entries": method_tms9928a_device__palette_entries
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["clocks_to_attotime", "copybitmap", "m_out_gromclk_cb", "m_out_int_line_cb", "machine", "machine().side_effects_disabled", "pen", "rgb_t", "screen", "screen().height", "screen().time_until_pos", "screen().vpos"];
export const device = definition;
export default device;
