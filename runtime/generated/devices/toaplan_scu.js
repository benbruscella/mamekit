import deviceData from './toaplan_scu.device.ir.json' with { type: 'json' };
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
    function method_draw_sprites_common(runtime, bitmap, cliprect, spriteram, bytes) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pri_cb.isnull"], __L1 = __l["m_pri_cb"], __L2 = __l["screen"], __L3 = __l["screen().priority"], __L4 = __l["gfx"];
        const h_m_pri_cb = members.m_pri_cb ?? 0;
        for (let offs = ((((runtime.divide(bytes, 2)) - (4))) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
            let attribute = ((runtime.readIndex(spriteram, ((offs) + (1)))) & 0xffff);
            let priority = ((runtime.shiftRight(((attribute) & (3072)), 10)) | 0);
            if (((priority) ? 0 : 1)) {
                continue;
            }
            let sy = ((runtime.shiftRight(runtime.readIndex(spriteram, ((offs) + (3))), 7)) | 0);
            if ((((sy) !== (256)) ? 1 : 0)) {
                let sprite = ((((runtime.readIndex(spriteram, offs)) & (2047))) >>> 0);
                let color = ((((attribute) & (63))) >>> 0);
                let pri_mask = ((0) >>> 0);
                if ((((__L0 ? __L0() : typeof (h_m_pri_cb)?.isnull === 'function' ? (h_m_pri_cb).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_pri_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
                    (__L1 ? __L1(({ generatedLValue: true, get: () => priority, set: (value) => { priority = ((value) | 0); } }), ({ generatedLValue: true, get: () => pri_mask, set: (value) => { pri_mask = ((value) >>> 0); } })) : runtime.macro("m_pri_cb", ({ generatedLValue: true, get: () => priority, set: (value) => { priority = ((value) | 0); } }), ({ generatedLValue: true, get: () => pri_mask, set: (value) => { pri_mask = ((value) >>> 0); } })));
                }
                let sx = ((runtime.shiftRight(runtime.readIndex(spriteram, ((offs) + (2))), 7)) | 0);
                let flipx = (((((attribute) >>> (8)) & 1)) ? 1 : 0);
                if (flipx) {
                    sx = ((((sx) - ((members.m_xoffs_flipped ?? 0)))) | 0);
                }
                let flipy = (((((attribute) >>> (9)) & 1)) ? 1 : 0);
                (__deref_draw_sprites_common(runtime, (__L4 ? __L4(0) : runtime.macro("gfx", 0))).prio_transpen?.(bitmap, cliprect, sprite, color, flipx, flipy, ((sx) - ((members.m_xoffs ?? 0))), ((sy) - (16)), ((__L3 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), pri_mask, 0) ?? 0);
            }
        }
    }
    function __deref_draw_sprites_common(runtime, p) {
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
    function method_draw_sprites__bitmap_ind16__rectangle__u16__u32(runtime, bitmap, cliprect, spriteram, bytes) {
        const members = runtime.members;
        method_draw_sprites_common(runtime, bitmap, cliprect, spriteram, bytes);
    }
    function method_draw_sprites__bitmap_rgb32__rectangle__u16__u32(runtime, bitmap, cliprect, spriteram, bytes) {
        const members = runtime.members;
        method_draw_sprites_common(runtime, bitmap, cliprect, spriteram, bytes);
    }
    function method_set_colorbase(runtime, base) {
        const members = runtime.members;
        base = ((base) & 0xffff);
        members.m_colbase = ((base) & 0xffff);
    }
    function method_toaplan_scu_device__set_colorbase(runtime, base) {
        const members = runtime.members;
        base = ((base) & 0xffff);
        members.m_colbase = ((base) & 0xffff);
    }
    function method_draw_sprites(runtime, bitmap, cliprect, spriteram, bytes) {
        const members = runtime.members;
        let __t0;
        if (((Number((__t0 = __deref_draw_sprites(runtime, bitmap), typeof __t0.bpp === 'function' ? __t0.bpp() : typeof __t0.bpp === 'number' || typeof __t0.bpp === 'boolean' ? __t0.bpp : runtime.container(bitmap, "bpp"))) === Number(16)) ? 1 : 0)) {
            return method_draw_sprites__bitmap_ind16__rectangle__u16__u32(runtime, bitmap, cliprect, spriteram, bytes);
        }
        else {
            return method_draw_sprites__bitmap_rgb32__rectangle__u16__u32(runtime, bitmap, cliprect, spriteram, bytes);
        }
    }
    function __deref_draw_sprites(runtime, p) {
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
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "draw_sprites_common": method_draw_sprites_common,
        "draw_sprites__bitmap_ind16__rectangle__u16__u32": method_draw_sprites__bitmap_ind16__rectangle__u16__u32,
        "draw_sprites__bitmap_rgb32__rectangle__u16__u32": method_draw_sprites__bitmap_rgb32__rectangle__u16__u32,
        "set_colorbase": method_set_colorbase,
        "toaplan_scu_device::set_colorbase": method_toaplan_scu_device__set_colorbase,
        "draw_sprites": method_draw_sprites
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["gfx", "m_pri_cb", "m_pri_cb.isnull", "screen", "screen().priority"];
export const device = definition;
export default device;
