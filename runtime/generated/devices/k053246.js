import deviceData from './k053246.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    const __mame_table_0 = [0, 1, 4, 5, 16, 17, 20, 21];
    const __mame_table_1 = [0, 2, 8, 10, 32, 34, 40, 42];
    function method_k053246_read_register(runtime, offset) {
        const members = runtime.members;
        return (members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[offset];
    }
    function method_k053247_read_register(runtime, offset) {
        const members = runtime.members;
        const h_m_kx47_regs = members.m_kx47_regs ?? runtime.member("m_kx47_regs");
        return h_m_kx47_regs[offset];
    }
    function method_k055673_reg_word_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        const h_m_kx47_regs = members.m_kx47_regs ?? runtime.member("m_kx47_regs");
        runtime.combineData(((h_m_kx47_regs) + (offset)), data, mem_mask);
    }
    function method_k053247_word_r(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_k053247_word_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        runtime.combineData(((members.m_ram) + (offset)), data, mem_mask);
    }
    function method_k053247_r(runtime, offset) {
        const members = runtime.members;
        let offs = ((((offset) >>> (1))) | 0);
        if (((offset) & (1))) {
            return ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255));
        }
        else {
            return ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) >>> (8));
        }
    }
    function method_k053247_w(runtime, offset, data) {
        const members = runtime.members;
        let offs = ((((offset) >>> (1))) | 0);
        if (((offset) & (1))) {
            runtime.writeIndex(runtime.writableMember("m_ram"), offs, ((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (65280))) | (data)));
        }
        else {
            runtime.writeIndex(runtime.writableMember("m_ram"), offs, ((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255))) | (((data) << (8)))));
        }
    }
    function method_k055673_5bpp_rom_word_r(runtime, offset) {
        const members = runtime.members;
        const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
        let ROM8 = runtime.addressOf(h_m_gfxrom, 0);
        let ROM = runtime.addressOf(h_m_gfxrom, 0);
        let size4 = ((runtime.divide(runtime.divide((members.m_gfxrom).length, 1048576), 5)) | 0);
        let romofs = ((0) | 0);
        size4 = ((((size4) * (4194304))) | 0);
        ROM8 = ({ ...(ROM8), offset: ((ROM8).offset + (size4)) });
        romofs = (((((((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[6]) << (16))) | ((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[7]) << (8))))) | ((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[4]))) | 0);
        switch (offset) {
            case 0:
                {
                    return runtime.readIndex(ROM, ((romofs) + (2)));
                }
            case 1:
                {
                    return runtime.readIndex(ROM, ((romofs) + (3)));
                }
            case 2:
            case 3:
                {
                    romofs = ((((romofs) / (2))) | 0);
                    return runtime.readIndex(ROM8, ((romofs) + (1)));
                }
            case 4:
                {
                    return runtime.readIndex(ROM, romofs);
                }
            case 5:
                {
                    return runtime.readIndex(ROM, ((romofs) + (1)));
                }
            case 6:
            case 7:
                {
                    romofs = ((((romofs) / (2))) | 0);
                    return runtime.readIndex(ROM8, romofs);
                }
            default:
                {
                    0;
                    break;
                }
        }
        return 0;
    }
    function method_k055673_rom_word_r(runtime, offset) {
        const members = runtime.members;
        const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
        if (((Number((members.m_bpp ?? runtime.member("m_bpp"))) === Number(5)) ? 1 : 0)) {
            return method_k055673_5bpp_rom_word_r(runtime, offset);
        }
        let ROM = runtime.addressOf(h_m_gfxrom, 0);
        let romofs = ((0) | 0);
        romofs = (((((((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[6]) << (16))) | ((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[7]) << (8))))) | ((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[4]))) | 0);
        romofs = ((((((romofs) >>> (2))) * ((members.m_bpp ?? runtime.member("m_bpp"))))) | 0);
        if (((Number(((offset) & (4))) === Number(0)) ? 1 : 0)) {
            romofs = ((((romofs) + ((((members.m_bpp ?? runtime.member("m_bpp"))) >>> (1))))) | 0);
        }
        return runtime.readIndex(ROM, ((romofs) + (((offset) & (3)))));
    }
    function method_k055673_ps_rom_word_r(runtime, offset) {
        const members = runtime.members;
        const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
        let ROM = runtime.addressOf(h_m_gfxrom, 0);
        let romofs = ((0) | 0);
        let magic = ((((offset) & (1))) | 0);
        romofs = (((((((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[6]) << (16))) | ((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[7]) << (8))))) | ((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[4]))) | 0);
        offset = ((((offset) & (4))) >>> (1));
        let finoffs = ((((runtime.add(((romofs) * (2)), ((offset) * (2)))) + (magic))) | 0);
        return ((runtime.readIndex(ROM, ((finoffs) + (2)))) | (((runtime.readIndex(ROM, finoffs)) << (8))));
    }
    function method_k055673_gr_rom_word_r(runtime, offset) {
        const members = runtime.members;
        const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
        let ROM = runtime.addressOf(h_m_gfxrom, 0);
        let romofs = (((((((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[6]) << (16))) | ((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[7]) << (8))))) | ((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[4]))) | 0);
        offset = ((((offset) & (4))) >>> (1));
        let finoffs = ((runtime.add(((romofs) * (2)), ((offset) * (2)))) | 0);
        return ((runtime.readIndex(ROM, ((finoffs) + (1)))) | (((runtime.readIndex(ROM, finoffs)) << (8))));
    }
    function method_k053246_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
        if (((Number((members.m_objcha_line ?? runtime.member("m_objcha_line"))) === Number(1)) ? 1 : 0)) {
            let addr = (((((((((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[6]) << (17))) | ((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[7]) << (9))))) | ((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[4]) << (1))))) | (((((offset) & (1))) ^ (1))))) | 0);
            (__l["assert"] ? __l["assert"]((((((members.m_gfxrom).length) & ((((members.m_gfxrom).length) - (1))))) ? 0 : 1)) : runtime.macro("assert", (((((members.m_gfxrom).length) & ((((members.m_gfxrom).length) - (1))))) ? 0 : 1)));
            addr = ((runtime.andAssign(addr, (((members.m_gfxrom).length) - (1)))) | 0);
            return runtime.readIndex(h_m_gfxrom, addr);
        }
        else {
            return 0;
        }
    }
    function method_k053246_w(runtime, offset, data) {
        const members = runtime.members;
        (members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[offset] = data;
    }
    function method_k053247_sprites_draw_common(runtime, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_kx47_regs = members.m_kx47_regs ?? runtime.member("m_kx47_regs");
        let NUM_SPRITES = ((256) | 0);
        let code = ((0) | 0);
        let color = ((0) | 0);
        let x = ((0) | 0);
        let y = ((0) | 0);
        let shadow = ((0) | 0);
        let shdmask = ((0) | 0);
        let count = ((0) | 0);
        let temp = ((0) | 0);
        let primask = ((0) | 0);
        let sortedlist = new Int32Array(new Uint8Array(Math.max(0, Number(NUM_SPRITES))));
        let offs = ((0) | 0);
        let zcode = ((0) | 0);
        let drawmode_table = new Uint8Array(Math.max(0, Number(256)));
        let shadowmode_table = new Uint8Array(Math.max(0, Number(256)));
        (() => { const target = drawmode_table; const bytes = Number(((drawmode_table)?.byteLength ?? 1)); if (target?.generatedPointer) {
            const width = target.source.BYTES_PER_ELEMENT ?? 1;
            target.source.fill(1, target.offset, target.offset + Math.ceil(bytes / width));
            return target;
        } target.fill(1, 0, bytes); return target; })();
        runtime.writeIndex(drawmode_table, 0, 0);
        (() => { const target = shadowmode_table; const bytes = Number(((shadowmode_table)?.byteLength ?? 1)); if (target?.generatedPointer) {
            const width = target.source.BYTES_PER_ELEMENT ?? 1;
            target.source.fill(2, target.offset, target.offset + Math.ceil(bytes / width));
            return target;
        } target.fill(2, 0, bytes); return target; })();
        runtime.writeIndex(shadowmode_table, 0, 0);
        shdmask = ((-1) | 0);
        zcode = (((members.m_z_rejection ?? runtime.member("m_z_rejection"))) | 0);
        offs = (((count = ((0) | 0))) | 0);
        if (((Number(zcode) === Number(-1)) ? 1 : 0)) {
            for (; ((Number(offs) < Number(2048)) ? 1 : 0); offs = ((((offs) + (8))) | 0)) {
                if (((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (32768))) {
                    runtime.writeIndex(sortedlist, (() => { const previous = count; count = ((((count) + (1))) | 0); return previous; })(), offs);
                }
            }
        }
        else {
            for (; ((Number(offs) < Number(2048)) ? 1 : 0); offs = ((((offs) + (8))) | 0)) {
                if ((((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (32768))) && (((Number(((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255))) !== Number(zcode)) ? 1 : 0))) ? 1 : 0)) {
                    runtime.writeIndex(sortedlist, (() => { const previous = count; count = ((((count) + (1))) | 0); return previous; })(), offs);
                }
            }
        }
        let w = ((count) | 0);
        count = ((((count) - (1))) | 0);
        let h = ((count) | 0);
        if (((((h_m_kx47_regs[runtime.divide(12, 2)]) & (16))) ? 0 : 1)) {
            for (y = ((0) | 0); ((Number(y) < Number(h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                offs = ((runtime.readIndex(sortedlist, y)) | 0);
                zcode = ((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255))) | 0);
                for (x = ((((y) + (1))) | 0); ((Number(x) < Number(w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                    temp = ((runtime.readIndex(sortedlist, x)) | 0);
                    code = ((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), temp)) & (255))) | 0);
                    if (((Number(zcode) <= Number(code)) ? 1 : 0)) {
                        zcode = ((code) | 0);
                        runtime.writeIndex(sortedlist, x, offs);
                        runtime.writeIndex(sortedlist, y, (offs = ((temp) | 0)));
                    }
                }
            }
        }
        else {
            for (y = ((0) | 0); ((Number(y) < Number(h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                offs = ((runtime.readIndex(sortedlist, y)) | 0);
                zcode = ((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255))) | 0);
                for (x = ((((y) + (1))) | 0); ((Number(x) < Number(w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                    temp = ((runtime.readIndex(sortedlist, x)) | 0);
                    code = ((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), temp)) & (255))) | 0);
                    if (((Number(zcode) >= Number(code)) ? 1 : 0)) {
                        zcode = ((code) | 0);
                        runtime.writeIndex(sortedlist, x, offs);
                        runtime.writeIndex(sortedlist, y, (offs = ((temp) | 0)));
                    }
                }
            }
        }
        for (; ((Number(count) >= Number(0)) ? 1 : 0); count = ((((count) - (1))) | 0)) {
            offs = ((runtime.readIndex(sortedlist, count)) | 0);
            code = ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), ((offs) + (1)))) | 0);
            shadow = (((color = ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), ((offs) + (6)))) | 0))) | 0);
            primask = ((0) | 0);
            (__l["m_k053247_cb"] ? __l["m_k053247_cb"](({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => primask, set: (value) => { primask = ((value) | 0); } })) : runtime.macro("m_k053247_cb", ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => primask, set: (value) => { primask = ((value) | 0); } })));
            method_k053247_draw_single_sprite_gxcore(runtime, bitmap, cliprect, 0, 0, code, members.m_ram, offs, color, 0, 0, 0, 0, primask, shadow, drawmode_table, shadowmode_table, shdmask);
        }
    }
    function method_k053247_draw_single_sprite_gxcore(runtime, bitmap, cliprect, gx_objzbuf, gx_shdzbuf, code, gx_spriteram, offs, color, alpha, drawmode, zcode, pri, primask, shadow, drawmode_table, shadowmode_table, shdmask) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let xa = ((0) | 0);
        let ya = ((0) | 0);
        let ox = ((0) | 0);
        let oy = ((0) | 0);
        let flipx = ((0) | 0);
        let flipy = ((0) | 0);
        let mirrorx = ((0) | 0);
        let mirrory = ((0) | 0);
        let zoomx = ((0) | 0);
        let zoomy = ((0) | 0);
        let scalex = ((0) | 0);
        let scaley = ((0) | 0);
        let nozoom = ((0) | 0);
        let temp = ((0) | 0);
        let temp4 = ((0) | 0);
        let flipscreenx = (((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[5]) & (1))) | 0);
        let flipscreeny = (((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[5]) & (2))) | 0);
        xa = (((ya = ((0) | 0))) | 0);
        if (((code) & (1))) {
            xa = ((((xa) + (1))) | 0);
        }
        if (((code) & (2))) {
            ya = ((((ya) + (1))) | 0);
        }
        if (((code) & (4))) {
            xa = ((((xa) + (2))) | 0);
        }
        if (((code) & (8))) {
            ya = ((((ya) + (2))) | 0);
        }
        if (((code) & (16))) {
            xa = ((((xa) + (4))) | 0);
        }
        if (((code) & (32))) {
            ya = ((((ya) + (4))) | 0);
        }
        code = ((runtime.andAssign(code, -64)) | 0);
        temp4 = ((runtime.readIndex(gx_spriteram, offs)) | 0);
        oy = ((((runtime.readIndex(gx_spriteram, ((offs) + (2)))) & (1023))) | 0);
        ox = ((((runtime.readIndex(gx_spriteram, ((offs) + (3)))) & (1023))) | 0);
        scaley = (((zoomy = ((((runtime.readIndex(gx_spriteram, ((offs) + (4)))) & (1023))) | 0))) | 0);
        if (zoomy) {
            zoomy = ((runtime.divide(runtime.add(4194304, ((zoomy) >>> (1))), zoomy)) | 0);
        }
        else {
            zoomy = ((8388608) | 0);
        }
        if (((((temp4) & (16384))) ? 0 : 1)) {
            scalex = (((zoomx = ((((runtime.readIndex(gx_spriteram, ((offs) + (5)))) & (1023))) | 0))) | 0);
            if (zoomx) {
                zoomx = ((runtime.divide(runtime.add(4194304, ((zoomx) >>> (1))), zoomx)) | 0);
            }
            else {
                zoomx = ((8388608) | 0);
            }
        }
        else {
            zoomx = ((zoomy) | 0);
            scalex = ((scaley) | 0);
        }
        nozoom = (((((((Number(scalex) === Number(64)) ? 1 : 0)) && (((Number(scaley) === Number(64)) ? 1 : 0))) ? 1 : 0)) | 0);
        flipx = ((((temp4) & (4096))) | 0);
        flipy = ((((temp4) & (8192))) | 0);
        temp = ((runtime.readIndex(gx_spriteram, ((offs) + (6)))) | 0);
        mirrorx = ((((temp) & (16384))) | 0);
        if (mirrorx) {
            flipx = ((0) | 0);
        }
        mirrory = ((((temp) & (32768))) | 0);
        let objset1 = ((method_k053246_read_register(runtime, 5)) | 0);
        if (((objset1) & (8))) {
            let screenwidth = (((__l["screen().width"]?.() ?? 0)) | 0);
            zoomx = ((((zoomx) >>> (1))) | 0);
            ox = ((runtime.add(((ox) >>> (1)), 1)) | 0);
            if (flipscreenx) {
                ox = ((((ox) + (screenwidth))) | 0);
            }
            nozoom = ((0) | 0);
        }
        if (flipscreenx) {
            ox = (((-ox)) | 0);
            if (((mirrorx) ? 0 : 1)) {
                flipx = ((((flipx) ? 0 : 1)) | 0);
            }
        }
        if (flipscreeny) {
            oy = (((-oy)) | 0);
            if (((mirrory) ? 0 : 1)) {
                flipy = ((((flipy) ? 0 : 1)) | 0);
            }
        }
        let k053247_opset = ((method_k053247_read_register(runtime, runtime.divide(12, 2))) | 0);
        let wrapsize = ((0) | 0);
        let xwraplim = ((0) | 0);
        let ywraplim = ((0) | 0);
        if (((k053247_opset) & (64))) {
            wrapsize = ((512) | 0);
            xwraplim = ((448) | 0);
            ywraplim = ((384) | 0);
        }
        else {
            wrapsize = ((1024) | 0);
            xwraplim = ((640) | 0);
            ywraplim = ((512) | 0);
        }
        let offx = (((__l["short"] ? __l["short"]((((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[0]) << (8))) | ((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[1]))) : runtime.macro("short", (((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[0]) << (8))) | ((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[1]))))) | 0);
        let offy = (((__l["short"] ? __l["short"]((((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[2]) << (8))) | ((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[3]))) : runtime.macro("short", (((((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[2]) << (8))) | ((members.m_kx46_regs ?? runtime.member("m_kx46_regs"))[3]))))) | 0);
        temp = ((((wrapsize) - (1))) | 0);
        if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
            ox = ((((ox) + ((members.m_dx ?? runtime.member("m_dx"))))) | 0);
            oy = ((((oy) - ((members.m_dy ?? runtime.member("m_dy"))))) | 0);
        }
        ox = ((((((ox) - (offx))) & (temp))) | 0);
        oy = (((((((-oy)) - (offy))) & (temp))) | 0);
        if (((Number(ox) >= Number(xwraplim)) ? 1 : 0)) {
            ox = ((((ox) - (wrapsize))) | 0);
        }
        if (((Number(oy) >= Number(ywraplim)) ? 1 : 0)) {
            oy = ((((oy) - (wrapsize))) | 0);
        }
        temp = ((((((temp4) >>> (8))) & (15))) | 0);
        let width = ((((1) << (((temp) & (3))))) | 0);
        let height = ((((1) << (((((temp) >>> (2))) & (3))))) | 0);
        if ((((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) ? 0 : 1)) {
            ox = ((((ox) + ((members.m_dx ?? runtime.member("m_dx"))))) | 0);
            oy = ((((oy) - ((members.m_dy ?? runtime.member("m_dy"))))) | 0);
        }
        ox = ((((ox) - (((((zoomx) * (width))) >>> (13))))) | 0);
        oy = ((((oy) - (((((zoomy) * (height))) >>> (13))))) | 0);
        if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
            method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, pri, zcode, alpha, drawmode, gx_objzbuf, gx_shdzbuf, 0, 0);
        }
        else {
            let whichtable = drawmode_table;
            if (((Number(color) === Number(-1)) ? 1 : 0)) {
                if (((Number(shdmask) < Number(0)) ? 1 : 0)) {
                    return;
                }
                color = ((0) | 0);
                shadow = ((-1) | 0);
                whichtable = shadowmode_table;
                (__l["palette().set_shadow_mode"]?.(0) ?? 0);
            }
            else {
                if (((Number(shdmask) >= Number(0)) ? 1 : 0)) {
                    shadow = ((((((color) & (536870912))) ? (((color) >>> (20))) : (((shadow) >>> (10))))) | 0);
                    if ((shadow = ((runtime.andAssign(shadow, 3)) | 0))) {
                        (__l["palette().set_shadow_mode"]?.(((((shadow) - (1))) & (shdmask))) ?? 0);
                    }
                }
                else {
                    shadow = ((0) | 0);
                }
            }
            color = ((runtime.andAssign(color, 65535)) | 0);
            runtime.writeIndex(drawmode_table, (((typeof (runtime.dereference(members.m_gfx)).granularity === 'function' ? (runtime.dereference(members.m_gfx)).granularity() : typeof (runtime.dereference(members.m_gfx)).granularity === 'number' || typeof (runtime.dereference(members.m_gfx)).granularity === 'boolean' ? (runtime.dereference(members.m_gfx)).granularity : runtime.container(members.m_gfx, "granularity"))) - (1)), ((shadow) ? (2) : (1)));
            method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, 0, 0, 0, 0, 0, 0, primask, whichtable);
        }
    }
    function method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, pri, zcode, alpha, drawmode, gx_objzbuf, gx_shdzbuf, primask, whichtable) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let zw = ((0) | 0);
        let zh = ((0) | 0);
        let fx = ((0) | 0);
        let fy = ((0) | 0);
        let sx = ((0) | 0);
        let sy = ((0) | 0);
        let tempcode = ((0) | 0);
        for (let y = ((0) | 0); ((Number(y) < Number(height)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            sy = ((((oy) + (((runtime.add(((zoomy) * (y)), 2048)) >>> (12))))) | 0);
            zh = ((((((oy) + (((runtime.add(((zoomy) * (((y) + (1)))), 2048)) >>> (12))))) - (sy))) | 0);
            for (let x = ((0) | 0); ((Number(x) < Number(width)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                sx = ((((ox) + (((runtime.add(((zoomx) * (x)), 2048)) >>> (12))))) | 0);
                zw = ((((((ox) + (((runtime.add(((zoomx) * (((x) + (1)))), 2048)) >>> (12))))) - (sx))) | 0);
                tempcode = ((code) | 0);
                if (mirrorx) {
                    if (((((flipx) ? 0 : 1)) ^ (((Number(((x) << (1))) < Number(width)) ? 1 : 0)))) {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fx = ((1) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fx = ((0) | 0);
                    }
                }
                else {
                    if (flipx) {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    fx = ((flipx) | 0);
                }
                if (mirrory) {
                    if (((((flipy) ? 0 : 1)) ^ (((Number(((y) << (1))) >= Number(height)) ? 1 : 0)))) {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fy = ((1) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fy = ((0) | 0);
                    }
                }
                else {
                    if (flipy) {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    fy = ((flipy) | 0);
                }
                if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
                    if (nozoom) {
                        zw = (((zh = ((16) | 0))) | 0);
                    }
                    method_zdrawgfxzoom32GP(runtime, bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf);
                }
                else {
                    if (nozoom) {
                        ((runtime.dereference(members.m_gfx)).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, (__l["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
                    }
                    else {
                        ((runtime.dereference(members.m_gfx)).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), (__l["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
                    }
                    if ((((mirrory) && (((Number(height) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                        if (nozoom) {
                            ((runtime.dereference(members.m_gfx)).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, (__l["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
                        }
                        else {
                            ((runtime.dereference(members.m_gfx)).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, ((zw) << (12)), ((zh) << (12)), (__l["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
                        }
                    }
                }
            }
        }
    }
    function method_zdrawgfxzoom32GP(runtime, bitmap, cliprect, code, color, flipx, flipy, sx, sy, scalex, scaley, alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["fatalerror"] ? __l["fatalerror"]("no zdrawgfxzoom32GP for bitmap_ind16\n") : runtime.macro("fatalerror", "no zdrawgfxzoom32GP for bitmap_ind16\n"));
    }
    function method_k053247_sprites_draw(runtime, bitmap, cliprect) {
        const members = runtime.members;
        method_k053247_sprites_draw_common(runtime, bitmap, cliprect);
    }
    function method_k053247_device__k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, pri, zcode, alpha, drawmode, gx_objzbuf, gx_shdzbuf, primask, whichtable) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let zw = ((0) | 0);
        let zh = ((0) | 0);
        let fx = ((0) | 0);
        let fy = ((0) | 0);
        let sx = ((0) | 0);
        let sy = ((0) | 0);
        let tempcode = ((0) | 0);
        for (let y = ((0) | 0); ((Number(y) < Number(height)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            sy = ((((oy) + (((runtime.add(((zoomy) * (y)), 2048)) >>> (12))))) | 0);
            zh = ((((((oy) + (((runtime.add(((zoomy) * (((y) + (1)))), 2048)) >>> (12))))) - (sy))) | 0);
            for (let x = ((0) | 0); ((Number(x) < Number(width)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                sx = ((((ox) + (((runtime.add(((zoomx) * (x)), 2048)) >>> (12))))) | 0);
                zw = ((((((ox) + (((runtime.add(((zoomx) * (((x) + (1)))), 2048)) >>> (12))))) - (sx))) | 0);
                tempcode = ((code) | 0);
                if (mirrorx) {
                    if (((((flipx) ? 0 : 1)) ^ (((Number(((x) << (1))) < Number(width)) ? 1 : 0)))) {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fx = ((1) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fx = ((0) | 0);
                    }
                }
                else {
                    if (flipx) {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    fx = ((flipx) | 0);
                }
                if (mirrory) {
                    if (((((flipy) ? 0 : 1)) ^ (((Number(((y) << (1))) >= Number(height)) ? 1 : 0)))) {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fy = ((1) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fy = ((0) | 0);
                    }
                }
                else {
                    if (flipy) {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    fy = ((flipy) | 0);
                }
                if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
                    if (nozoom) {
                        zw = (((zh = ((16) | 0))) | 0);
                    }
                    method_zdrawgfxzoom32GP(runtime, bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf);
                }
                else {
                    if (nozoom) {
                        ((runtime.dereference(members.m_gfx)).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, (__l["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
                    }
                    else {
                        ((runtime.dereference(members.m_gfx)).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), (__l["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
                    }
                    if ((((mirrory) && (((Number(height) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                        if (nozoom) {
                            ((runtime.dereference(members.m_gfx)).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, (__l["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
                        }
                        else {
                            ((runtime.dereference(members.m_gfx)).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, ((zw) << (12)), ((zh) << (12)), (__l["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
                        }
                    }
                }
            }
        }
    }
    return {
        "k053246_read_register": method_k053246_read_register,
        "k053247_read_register": method_k053247_read_register,
        "k055673_reg_word_w": method_k055673_reg_word_w,
        "k053247_word_r": method_k053247_word_r,
        "k053247_word_w": method_k053247_word_w,
        "k053247_r": method_k053247_r,
        "k053247_w": method_k053247_w,
        "k055673_5bpp_rom_word_r": method_k055673_5bpp_rom_word_r,
        "k055673_rom_word_r": method_k055673_rom_word_r,
        "k055673_ps_rom_word_r": method_k055673_ps_rom_word_r,
        "k055673_gr_rom_word_r": method_k055673_gr_rom_word_r,
        "k053246_r": method_k053246_r,
        "k053246_w": method_k053246_w,
        "k053247_sprites_draw_common": method_k053247_sprites_draw_common,
        "k053247_draw_single_sprite_gxcore": method_k053247_draw_single_sprite_gxcore,
        "k053247_draw_yxloop_gx": method_k053247_draw_yxloop_gx,
        "zdrawgfxzoom32GP": method_zdrawgfxzoom32GP,
        "k053247_sprites_draw": method_k053247_sprites_draw,
        "k053247_device::k053247_draw_yxloop_gx": method_k053247_device__k053247_draw_yxloop_gx
    };
})();
definition.compiledMethodLinks = ["assert", "fatalerror", "m_k053247_cb", "palette", "palette().set_shadow_mode", "screen", "screen().priority", "screen().width", "short"];
export const device = definition;
export default device;
