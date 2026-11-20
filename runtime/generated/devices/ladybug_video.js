import deviceData from './ladybug_video.device.ir.json' with { type: 'json' };
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
    function method_bg_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_bg_ram) && ArrayBuffer.isView(__t0) ? (__t0[((offset) & (2047))] = data) : runtime.writeIndex(runtime.writableMember("m_bg_ram"), ((offset) & (2047)), data));
        (__deref_bg_w(runtime, members.m_bg_tilemap).mark_tile_dirty?.(((offset) & (1023))) ?? 0);
    }
    function __deref_bg_w(runtime, p) {
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
    function method_draw(runtime, screen, bitmap, cliprect, flip) {
        const members = runtime.members;
        let __t0;
        for (let offs = 0; (((offs) < (32)) ? 1 : 0); offs = ((offs) + (1))) {
            let scroll = (((__t0 = (members.m_bg_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[((((((offs) & (3))) << (5))) | (((offs) >>> (2))))] ?? 0) : runtime.readIndex(__t0, ((((((offs) & (3))) << (5))) | (((offs) >>> (2))))))) | 0);
            (__deref_draw(runtime, members.m_bg_tilemap).set_scrollx?.(offs, ((flip) ? ((-scroll)) : (scroll))) ?? 0);
        }
        (__deref_draw(runtime, members.m_bg_tilemap).draw?.(screen, bitmap, cliprect, 0) ?? 0);
        method_draw_sprites(runtime, bitmap, cliprect);
    }
    function __deref_draw(runtime, p) {
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
    function method_draw_sprites(runtime, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_gfxdecode.gfx"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9;
        for (let offs = ((896) | 0); ((Number(128) <= Number(offs)) ? 1 : 0); offs = ((((offs) - (64))) | 0)) {
            let i = ((0) | 0);
            while (((((((64) > (i)) ? 1 : 0)) && ((__t0 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[((offs) + (i))] ?? 0) : runtime.readIndex(__t0, ((offs) + (i)))))) ? 1 : 0)) {
                i = ((((i) + (4))) | 0);
            }
            while ((((0) < (i)) ? 1 : 0)) {
                i = ((((i) - (4))) | 0);
                if ((((__t1 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((offs) + (i))] ?? 0) : runtime.readIndex(__t1, ((offs) + (i))))) & (128))) {
                    let big = (((((((__t2 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[((offs) + (i))] ?? 0) : runtime.readIndex(__t2, ((offs) + (i))))) & (64))) ? 1 : 0)) ? 1 : 0);
                    let xflip = (((((((__t3 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t3) ? (__t3[((offs) + (i))] ?? 0) : runtime.readIndex(__t3, ((offs) + (i))))) & (32))) ? 1 : 0)) ? 1 : 0);
                    let yflip = (((((((__t4 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t4) ? (__t4[((offs) + (i))] ?? 0) : runtime.readIndex(__t4, ((offs) + (i))))) & (16))) ? 1 : 0)) ? 1 : 0);
                    let code = (((((((__t5 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t5) ? (__t5[__add_draw_sprites(runtime, ((offs) + (i)), 1)] ?? 0) : runtime.readIndex(__t5, __add_draw_sprites(runtime, ((offs) + (i)), 1)))) | (((((((__t6 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t6) ? (__t6[__add_draw_sprites(runtime, ((offs) + (i)), 2)] ?? 0) : runtime.readIndex(__t6, __add_draw_sprites(runtime, ((offs) + (i)), 2)))) >>> (4)) & 1)) << (8))))) | 0)) | 0);
                    let color = (((((((__t7 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t7) ? (__t7[__add_draw_sprites(runtime, ((offs) + (i)), 2)] ?? 0) : runtime.readIndex(__t7, __add_draw_sprites(runtime, ((offs) + (i)), 2)))) & (15))) | 0)) | 0);
                    let xpos = (((((__t8 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t8) ? (__t8[__add_draw_sprites(runtime, ((offs) + (i)), 3)] ?? 0) : runtime.readIndex(__t8, __add_draw_sprites(runtime, ((offs) + (i)), 3)))) | 0)) | 0);
                    let ypos = ((((((runtime.shiftRight(offs, 2)) | ((((__t9 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t9) ? (__t9[((offs) + (i))] ?? 0) : runtime.readIndex(__t9, ((offs) + (i))))) & (15))))) | 0)) | 0);
                    if (big) {
                        (__deref_draw_sprites(runtime, (__L0 ? __L0(1) : ((members.m_gfxdecode)?.gfx?.(1) ?? 0))).transpen?.(bitmap, cliprect, runtime.shiftRight(code, 2), color, xflip, yflip, xpos, ((ypos) - (8)), 0) ?? 0);
                    }
                    else {
                        (__deref_draw_sprites(runtime, (__L0 ? __L0(2) : ((members.m_gfxdecode)?.gfx?.(2) ?? 0))).transpen?.(bitmap, cliprect, code, color, xflip, yflip, xpos, ypos, 0) ?? 0);
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
    function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        let code = ((__add_get_bg_tile_info(runtime, (__t0 = (members.m_bg_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[tile_index] ?? 0) : runtime.readIndex(__t0, tile_index)), ((((((__t1 = (members.m_bg_ram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((1024) | (tile_index))] ?? 0) : runtime.readIndex(__t1, ((1024) | (tile_index))))) >>> (3)) & 1)) << (8)))) | 0);
        let color = (((((__t2 = (members.m_bg_ram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[((1024) | (tile_index))] ?? 0) : runtime.readIndex(__t2, ((1024) | (tile_index))))) & (7))) | 0);
        (__deref_get_bg_tile_info(runtime, tileinfo).set?.(0, code, color, 0) ?? 0);
    }
    function __add_get_bg_tile_info(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_get_bg_tile_info(runtime, p) {
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
    function method_set_gfxdecode_tag(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_gfxdecode.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_gfxdecode)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_spr_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[((offset) & (1023))] ?? 0) : runtime.readIndex(__t0, ((offset) & (1023))))) & 0xff);
    }
    function method_spr_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_spr_ram) && ArrayBuffer.isView(__t0) ? (__t0[((offset) & (1023))] = data) : runtime.writeIndex(runtime.writableMember("m_spr_ram"), ((offset) & (1023)), data));
    }
    function method_bg_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_bg_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[((offset) & (2047))] ?? 0) : runtime.readIndex(__t0, ((offset) & (2047))))) & 0xff);
    }
    function method_ladybug_video_device__set_gfxdecode_tag(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_gfxdecode.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_gfxdecode)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_ladybug_video_device__spr_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_spr_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[((offset) & (1023))] ?? 0) : runtime.readIndex(__t0, ((offset) & (1023))))) & 0xff);
    }
    function method_ladybug_video_device__spr_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_spr_ram) && ArrayBuffer.isView(__t0) ? (__t0[((offset) & (1023))] = data) : runtime.writeIndex(runtime.writableMember("m_spr_ram"), ((offset) & (1023)), data));
    }
    function method_ladybug_video_device__bg_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_bg_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[((offset) & (2047))] ?? 0) : runtime.readIndex(__t0, ((offset) & (2047))))) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "bg_w": method_bg_w,
        "draw": method_draw,
        "draw_sprites": method_draw_sprites,
        "get_bg_tile_info": method_get_bg_tile_info,
        "set_gfxdecode_tag": method_set_gfxdecode_tag,
        "spr_r": method_spr_r,
        "spr_w": method_spr_w,
        "bg_r": method_bg_r,
        "ladybug_video_device::set_gfxdecode_tag": method_ladybug_video_device__set_gfxdecode_tag,
        "ladybug_video_device::spr_r": method_ladybug_video_device__spr_r,
        "ladybug_video_device::spr_w": method_ladybug_video_device__spr_w,
        "ladybug_video_device::bg_r": method_ladybug_video_device__bg_r
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_gfxdecode.gfx", "m_gfxdecode.set_tag", "std::forward"];
export const device = definition;
export default device;
