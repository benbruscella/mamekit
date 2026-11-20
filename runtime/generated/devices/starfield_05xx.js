import deviceData from './starfield_05xx.device.ir.json' with { type: 'json' };
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
    function method_draw_starfield(runtime, bitmap, cliprect, flip) {
        const members = runtime.members;
        let __t0;
        if ((((members.m_enable ?? 0)) ? 0 : 1)) {
            return;
        }
        let pre_vis_cycle_count = (((members.m_pre_vis_cycle_count ?? 0)) & 0xffff);
        let post_vis_cycle_count = (((members.m_post_vis_cycle_count ?? 0)) & 0xffff);
        while (pre_vis_cycle_count) {
            members.m_lfsr = ((method_get_next_lfsr_state(runtime, (members.m_lfsr ?? 0))) & 0xffff);
            pre_vis_cycle_count = ((((pre_vis_cycle_count) - (1))) & 0xffff);
        }
        for (let y = (((members.m_offset_y ?? 0)) | 0); ((Number(y) < Number(((224) + ((members.m_offset_y ?? 0))))) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            for (let x = (((members.m_offset_x ?? 0)) | 0); ((Number(x) < Number(((256) + ((members.m_offset_x ?? 0))))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                if (((Number((((members.m_lfsr ?? 0)) & (64020))) === Number(30720)) ? 1 : 0)) {
                    let star_set = (((__t0 = (members.m_lfsr ?? 0), (((__t0) >>> (10)) & 1) << 1 | (((__t0) >>> (8)) & 1) << 0)) & 0xff);
                    if ((((((((members.m_set_a ?? 0)) === (star_set)) ? 1 : 0)) || (((((members.m_set_b ?? 0)) === (star_set)) ? 1 : 0))) ? 1 : 0)) {
                        if ((((x) < ((members.m_limit_x ?? 0))) ? 1 : 0)) {
                            let dx = ((x) | 0);
                            if (flip) {
                                dx = ((((dx) + (64))) | 0);
                            }
                            if ((__deref_draw_starfield(runtime, cliprect).contains?.(dx, y) ?? 0)) {
                                let color = ((0) & 0xff);
                                color = (((((((members.m_lfsr ?? 0)) >>> (5))) & (7))) & 0xff);
                                color = ((((color) | ((((((members.m_lfsr ?? 0)) << (3))) & (24))))) & 0xff);
                                color = ((((color) | ((((((members.m_lfsr ?? 0)) << (2))) & (32))))) & 0xff);
                                color = (((((~color)) & (63))) & 0xff);
                                bitmap["pix="](y, dx, ((512) + (color)));
                            }
                        }
                    }
                }
                members.m_lfsr = ((method_get_next_lfsr_state(runtime, (members.m_lfsr ?? 0))) & 0xffff);
            }
        }
        while (post_vis_cycle_count) {
            members.m_lfsr = ((method_get_next_lfsr_state(runtime, (members.m_lfsr ?? 0))) & 0xffff);
            post_vis_cycle_count = ((((post_vis_cycle_count) - (1))) & 0xffff);
        }
    }
    function __deref_draw_starfield(runtime, p) {
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
    function method_get_next_lfsr_state(runtime, lfsr) {
        const members = runtime.members;
        lfsr = ((lfsr) & 0xffff);
        let bit = ((0) & 0xffff);
        bit = ((((((((((lfsr) >>> (0))) ^ (((lfsr) >>> (3))))) ^ (((lfsr) >>> (5))))) ^ (((lfsr) >>> (10))))) & 0xffff);
        lfsr = ((((((lfsr) >>> (1))) | (((bit) << (15))))) & 0xffff);
        return ((lfsr) & 0xffff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "draw_starfield": method_draw_starfield,
        "get_next_lfsr_state": method_get_next_lfsr_state
    };
    return __methodTable;
})();
export const device = definition;
export default device;
