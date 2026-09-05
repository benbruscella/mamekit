// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './segaic16vid.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_tilemap_16b_fill_latch(runtime: any, i: any, latched_pageselect: any, latched_yscroll: any, latched_xscroll: any, textram: any) {
    const members = runtime.members;
    runtime.writeIndex(latched_pageselect, i, runtime.readIndex(textram, ((runtime.divide(3712, 2)) + (i))));
    runtime.writeIndex(latched_yscroll, i, runtime.readIndex(textram, ((runtime.divide(3728, 2)) + (i))));
    runtime.writeIndex(latched_xscroll, i, runtime.readIndex(textram, ((runtime.divide(3736, 2)) + (i))));
  }

  function method_tilemap_draw(runtime: any, screen: any, bitmap: any, cliprect: any, which: any, map: any, priority: any, priority_mark: any) {
    const members = runtime.members;
    const h_m_bg_tilemap = members.m_bg_tilemap ?? runtime.member("m_bg_tilemap");
    let info: any = runtime.addressOf(h_m_bg_tilemap, which);
    if (((Number(map) === Number(2)) ? 1 : 0)) {
      ((runtime.dereference(info.textmap)).draw?.(screen, bitmap, cliprect, priority, priority_mark) ?? 0);
    } else {
      (info.draw_layer).source[(info.draw_layer).offset](screen, info, bitmap, cliprect, map, priority, priority_mark);
    }
  }

  function method_tileram_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_tileram = members.m_tileram ?? runtime.member("m_tileram");
    return runtime.readIndex(h_m_tileram, offset);
  }

  function method_tileram_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_tileram = members.m_tileram ?? runtime.member("m_tileram");
    const h_m_bg_tilemap = members.m_bg_tilemap ?? runtime.member("m_bg_tilemap");
    runtime.combineData(runtime.addressOf(h_m_tileram, offset), data, mem_mask);
    ((runtime.dereference(runtime.readIndex(runtime.readIndex(h_m_bg_tilemap, 0).tilemaps, runtime.divide(offset, ((64) * (32)))))).mark_tile_dirty?.(((offset) % (((64) * (32))))) ?? 0);
  }

  function method_textram_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_textram = members.m_textram ?? runtime.member("m_textram");
    return runtime.readIndex(h_m_textram, offset);
  }

  function method_rotate_draw(runtime: any, which: any, bitmap: any, cliprect: any, priority_bitmap: any, srcbitmap: any) {
    const members = runtime.members;
    const h_m_rotate = members.m_rotate ?? runtime.member("m_rotate");
    let info: any = runtime.addressOf(h_m_rotate, which);
    let currx: any = ((((((runtime.readIndex(info.buffer, 1008)) << (16))) | (runtime.readIndex(info.buffer, 1009)))) | 0);
    let curry: any = ((((((runtime.readIndex(info.buffer, 1010)) << (16))) | (runtime.readIndex(info.buffer, 1011)))) | 0);
    let dyy: any = ((((((runtime.readIndex(info.buffer, 1012)) << (16))) | (runtime.readIndex(info.buffer, 1013)))) | 0);
    let dxx: any = ((((((runtime.readIndex(info.buffer, 1014)) << (16))) | (runtime.readIndex(info.buffer, 1015)))) | 0);
    let dxy: any = ((((((runtime.readIndex(info.buffer, 1016)) << (16))) | (runtime.readIndex(info.buffer, 1017)))) | 0);
    let dyx: any = ((((((runtime.readIndex(info.buffer, 1018)) << (16))) | (runtime.readIndex(info.buffer, 1019)))) | 0);
    currx = ((((currx) + (runtime.add(((dxx) * (runtime.add(cliprect.min_x, 27))), ((dxy) * (cliprect.min_y)))))) | 0);
    curry = ((((curry) + (runtime.add(((dyx) * (runtime.add(cliprect.min_x, 27))), ((dyy) * (cliprect.min_y)))))) | 0);
    for (let y: any = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
      let dest: any = bitmap["pix&"](y);
      let src: any = srcbitmap["pix&"](0);
      let pri: any = priority_bitmap["pix&"](y);
      let tx: any = ((currx) | 0);
      let ty: any = ((curry) | 0);
      for (let x: any = cliprect.min_x; ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((x) + (1))) {
        let sx: any = ((((tx) >>> (14))) & (511));
        let sy: any = ((((ty) >>> (14))) & (511));
        let pix: any = runtime.readIndex(src, ((((sy) * ((typeof (runtime.dereference(srcbitmap)).rowpixels === 'function' ? (runtime.dereference(srcbitmap)).rowpixels() : typeof (runtime.dereference(srcbitmap)).rowpixels === 'number' || typeof (runtime.dereference(srcbitmap)).rowpixels === 'boolean' ? (runtime.dereference(srcbitmap)).rowpixels : runtime.container(srcbitmap, "rowpixels"))))) + (sx)));
        if (((Number(pix) !== Number(65535)) ? 1 : 0)) {
          runtime.pointerStore((() => { const previous = dest; dest = ({ ...(dest), offset: ((dest).offset + (1)) }); return previous; })(), ((((((((pix) & (511))) | (((((pix) >>> (6))) & (512))))) | (((((pix) >>> (3))) & (3072))))) | (4096)));
          runtime.pointerStore((() => { const previous = pri; pri = ({ ...(pri), offset: ((pri).offset + (1)) }); return previous; })(), ((((pix) >>> (8))) | (1)));
        } else {
          runtime.pointerStore((() => { const previous = dest; dest = ({ ...(dest), offset: ((dest).offset + (1)) }); return previous; })(), ((info.colorbase) + (sy)));
          runtime.pointerStore((() => { const previous = pri; pri = ({ ...(pri), offset: ((pri).offset + (1)) }); return previous; })(), 255);
        }
        tx = ((((tx) + (dxx))) | 0);
        ty = ((((ty) + (dyx))) | 0);
      }
      currx = ((((currx) + (dxy))) | 0);
      curry = ((((curry) + (dyy))) | 0);
    }
  }

  function method_tilemap_16b_latch_values(runtime: any, param: any) {
    const members = runtime.members;
    const h_m_bg_tilemap = members.m_bg_tilemap ?? runtime.member("m_bg_tilemap");
    let info: any = runtime.addressOf(h_m_bg_tilemap, param);
    let textram: any = info.textram;
    let i: any = 0;
    for (i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
      (runtime.calls["m_pagelatch_cb"] ? runtime.calls["m_pagelatch_cb"](({ generatedLValue: true, get: () => i, set: (value: any) => { i = value; } }), ({ generatedLValue: true, get: () => info.latched_pageselect, set: (value: any) => { info.latched_pageselect = value; } }), ({ generatedLValue: true, get: () => info.latched_yscroll, set: (value: any) => { info.latched_yscroll = value; } }), ({ generatedLValue: true, get: () => info.latched_xscroll, set: (value: any) => { info.latched_xscroll = value; } }), ({ generatedLValue: true, get: () => textram, set: (value: any) => { textram = value; } })) : runtime.macro("m_pagelatch_cb", ({ generatedLValue: true, get: () => i, set: (value: any) => { i = value; } }), ({ generatedLValue: true, get: () => info.latched_pageselect, set: (value: any) => { info.latched_pageselect = value; } }), ({ generatedLValue: true, get: () => info.latched_yscroll, set: (value: any) => { info.latched_yscroll = value; } }), ({ generatedLValue: true, get: () => info.latched_xscroll, set: (value: any) => { info.latched_xscroll = value; } }), ({ generatedLValue: true, get: () => textram, set: (value: any) => { textram = value; } })));
    }
    ((runtime.dereference(info.latch_timer)).adjust?.((runtime.calls["screen().time_until_pos"]?.(261) ?? 0), param) ?? 0);
  }
  return {
    "tilemap_16b_fill_latch": method_tilemap_16b_fill_latch,
    "tilemap_draw": method_tilemap_draw,
    "tileram_r": method_tileram_r,
    "tileram_w": method_tileram_w,
    "textram_r": method_textram_r,
    "rotate_draw": method_rotate_draw,
    "tilemap_16b_latch_values": method_tilemap_16b_latch_values
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
