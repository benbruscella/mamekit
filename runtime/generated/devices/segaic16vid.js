import deviceData from './segaic16vid.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_tilemap_16b_fill_latch(runtime, i, latched_pageselect, latched_yscroll, latched_xscroll, textram) {
        const members = runtime.members;
        runtime.writeIndex(latched_pageselect, i, runtime.readIndex(textram, ((runtime.divide(3712, 2)) + (i))));
        runtime.writeIndex(latched_yscroll, i, runtime.readIndex(textram, ((runtime.divide(3728, 2)) + (i))));
        runtime.writeIndex(latched_xscroll, i, runtime.readIndex(textram, ((runtime.divide(3736, 2)) + (i))));
    }
    function method_tilemap_draw(runtime, screen, bitmap, cliprect, which, map, priority, priority_mark) {
        const members = runtime.members;
        let info = runtime.addressOf((members.m_bg_tilemap ?? 0), which);
        if (((Number(map) === Number(2)) ? 1 : 0)) {
            ((runtime.dereference(runtime.dereference(info).textmap)).draw?.(screen, bitmap, cliprect, priority, priority_mark) ?? 0);
        }
        else {
            runtime.dereference(runtime.dereference(info).draw_layer)(screen, info, bitmap, cliprect, map, priority, priority_mark);
        }
    }
    function method_tileram_r(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_tileram ?? 0), offset)) & 0xffff);
    }
    function method_tileram_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        runtime.combineData(runtime.addressOf((members.m_tileram ?? 0), offset), data, mem_mask);
        ((runtime.dereference((members.m_bg_tilemap ?? 0)[0].tilemaps[runtime.divide(offset, 2048)])).mark_tile_dirty?.(((offset) % (2048))) ?? 0);
    }
    function method_textram_r(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_textram ?? 0), offset)) & 0xffff);
    }
    function method_rotate_draw(runtime, which, bitmap, cliprect, priority_bitmap, srcbitmap) {
        const members = runtime.members;
        let info = runtime.addressOf((members.m_rotate ?? 0), which);
        let currx = ((((((runtime.readIndex(runtime.dereference(info).buffer, 1008)) << (16))) | (runtime.readIndex(runtime.dereference(info).buffer, 1009)))) | 0);
        let curry = ((((((runtime.readIndex(runtime.dereference(info).buffer, 1010)) << (16))) | (runtime.readIndex(runtime.dereference(info).buffer, 1011)))) | 0);
        let dyy = ((((((runtime.readIndex(runtime.dereference(info).buffer, 1012)) << (16))) | (runtime.readIndex(runtime.dereference(info).buffer, 1013)))) | 0);
        let dxx = ((((((runtime.readIndex(runtime.dereference(info).buffer, 1014)) << (16))) | (runtime.readIndex(runtime.dereference(info).buffer, 1015)))) | 0);
        let dxy = ((((((runtime.readIndex(runtime.dereference(info).buffer, 1016)) << (16))) | (runtime.readIndex(runtime.dereference(info).buffer, 1017)))) | 0);
        let dyx = ((((((runtime.readIndex(runtime.dereference(info).buffer, 1018)) << (16))) | (runtime.readIndex(runtime.dereference(info).buffer, 1019)))) | 0);
        currx = ((((currx) + (runtime.add(((dxx) * (runtime.add(cliprect.min_x, 27))), ((dxy) * (cliprect.min_y)))))) | 0);
        curry = ((((curry) + (runtime.add(((dyx) * (runtime.add(cliprect.min_x, 27))), ((dyy) * (cliprect.min_y)))))) | 0);
        for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            let dest = bitmap["pix&"](y);
            let src = srcbitmap["pix&"](0);
            let pri = priority_bitmap["pix&"](y);
            let tx = ((currx) | 0);
            let ty = ((curry) | 0);
            for (let x = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                let sx = ((((runtime.shiftRight(tx, 14)) & (511))) | 0);
                let sy = ((((runtime.shiftRight(ty, 14)) & (511))) | 0);
                let pix = ((runtime.readIndex(src, ((((sy) * ((typeof (runtime.dereference(srcbitmap)).rowpixels === 'function' ? (runtime.dereference(srcbitmap)).rowpixels() : typeof (runtime.dereference(srcbitmap)).rowpixels === 'number' || typeof (runtime.dereference(srcbitmap)).rowpixels === 'boolean' ? (runtime.dereference(srcbitmap)).rowpixels : runtime.container(srcbitmap, "rowpixels"))))) + (sx)))) | 0);
                if (((Number(pix) !== Number(65535)) ? 1 : 0)) {
                    runtime.pointerStore((() => { const previous = dest; dest = runtime.add(dest, 1); return previous; })(), ((((((((pix) & (511))) | (((runtime.shiftRight(pix, 6)) & (512))))) | (((runtime.shiftRight(pix, 3)) & (3072))))) | (4096)));
                    runtime.pointerStore((() => { const previous = pri; pri = runtime.add(pri, 1); return previous; })(), ((runtime.shiftRight(pix, 8)) | (1)));
                }
                else {
                    runtime.pointerStore((() => { const previous = dest; dest = runtime.add(dest, 1); return previous; })(), ((runtime.dereference(info).colorbase) + (sy)));
                    runtime.pointerStore((() => { const previous = pri; pri = runtime.add(pri, 1); return previous; })(), 255);
                }
                tx = ((((tx) + (dxx))) | 0);
                ty = ((((ty) + (dyx))) | 0);
            }
            currx = ((((currx) + (dxy))) | 0);
            curry = ((((curry) + (dyy))) | 0);
        }
    }
    function method_rotate_control_r(runtime) {
        const members = runtime.members;
        let info = runtime.addressOf((members.m_rotate ?? 0), 0);
        if (runtime.dereference(info).buffer) {
            let src = runtime.dereference(info).rotateram;
            let dst = runtime.dereference(info).buffer;
            for (let i = ((0) | 0); ((Number(i) < Number(runtime.divide(runtime.dereference(info).ramsize, 4))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let temp = ((runtime.dereference(src)) >>> 0);
                runtime.pointerStore((() => { const previous = src; src = runtime.add(src, 1); return previous; })(), runtime.dereference(dst));
                runtime.pointerStore((() => { const previous = dst; dst = runtime.add(dst, 1); return previous; })(), temp);
            }
        }
        return ((65535) & 0xffff);
    }
    function method_tilemap_16b_latch_values(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let info = runtime.addressOf((members.m_bg_tilemap ?? 0), param);
        let textram = runtime.dereference(info).textram;
        let i = ((0) | 0);
        for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (__l["m_pagelatch_cb"] ? __l["m_pagelatch_cb"](({ generatedLValue: true, get: () => i, set: (value) => { i = ((value) | 0); } }), ({ generatedLValue: true, get: () => runtime.dereference(info).latched_pageselect, set: (value) => { runtime.dereference(info).latched_pageselect = value; } }), ({ generatedLValue: true, get: () => runtime.dereference(info).latched_yscroll, set: (value) => { runtime.dereference(info).latched_yscroll = value; } }), ({ generatedLValue: true, get: () => runtime.dereference(info).latched_xscroll, set: (value) => { runtime.dereference(info).latched_xscroll = value; } }), ({ generatedLValue: true, get: () => textram, set: (value) => { textram = value; } })) : runtime.macro("m_pagelatch_cb", ({ generatedLValue: true, get: () => i, set: (value) => { i = ((value) | 0); } }), ({ generatedLValue: true, get: () => runtime.dereference(info).latched_pageselect, set: (value) => { runtime.dereference(info).latched_pageselect = value; } }), ({ generatedLValue: true, get: () => runtime.dereference(info).latched_yscroll, set: (value) => { runtime.dereference(info).latched_yscroll = value; } }), ({ generatedLValue: true, get: () => runtime.dereference(info).latched_xscroll, set: (value) => { runtime.dereference(info).latched_xscroll = value; } }), ({ generatedLValue: true, get: () => textram, set: (value) => { textram = value; } })));
        }
        ((runtime.dereference(runtime.dereference(info).latch_timer)).adjust?.(((__l["screen().time_until_pos"] ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(261) ?? 0), param) ?? 0);
    }
    return {
        "tilemap_16b_fill_latch": method_tilemap_16b_fill_latch,
        "tilemap_draw": method_tilemap_draw,
        "tileram_r": method_tileram_r,
        "tileram_w": method_tileram_w,
        "textram_r": method_textram_r,
        "rotate_draw": method_rotate_draw,
        "rotate_control_r": method_rotate_control_r,
        "tilemap_16b_latch_values": method_tilemap_16b_latch_values
    };
})();
definition.compiledMethodLinks = ["m_pagelatch_cb", "screen", "screen().time_until_pos"];
export const device = definition;
export default device;
