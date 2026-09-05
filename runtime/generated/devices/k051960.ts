// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './k051960.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_k051960_fetchromdata(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_sprite_rom = members.m_sprite_rom ?? runtime.member("m_sprite_rom");
    let addr: any = runtime.add((((members.m_romoffset ?? runtime.member("m_romoffset"))) + (((runtime.readIndex((members.m_spriterombank ?? runtime.member("m_spriterombank")), 0)) << (8)))), ((((runtime.readIndex((members.m_spriterombank ?? runtime.member("m_spriterombank")), 1)) & (3))) << (16)));
    let code: any = ((((addr) & (262112))) >>> (5));
    let off1: any = ((addr) & (31));
    let color: any = runtime.add(((((runtime.readIndex((members.m_spriterombank ?? runtime.member("m_spriterombank")), 1)) & (252))) >>> (2)), ((((runtime.readIndex((members.m_spriterombank ?? runtime.member("m_spriterombank")), 2)) & (3))) << (6)));
    let pri: any = 0;
    let shadow: any = ((0) ? 1 : 0);
    (runtime.calls["m_k051960_cb"] ? runtime.calls["m_k051960_cb"](({ generatedLValue: true, get: () => code, set: (value: any) => { code = value; } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = value; } }), ({ generatedLValue: true, get: () => pri, set: (value: any) => { pri = value; } }), ({ generatedLValue: true, get: () => shadow, set: (value: any) => { shadow = ((value) ? 1 : 0); } })) : runtime.macro("m_k051960_cb", ({ generatedLValue: true, get: () => code, set: (value: any) => { code = value; } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = value; } }), ({ generatedLValue: true, get: () => pri, set: (value: any) => { pri = value; } }), ({ generatedLValue: true, get: () => shadow, set: (value: any) => { shadow = ((value) ? 1 : 0); } })));
    addr = ((((((code) << (7))) | (((off1) << (2))))) | (offset));
    addr = runtime.andAssign(addr, (((members.m_sprite_rom).length) - (1)));
    return runtime.readIndex(h_m_sprite_rom, addr);
  }

  function method_k051960_r(runtime: any, offset: any) {
    const members = runtime.members;
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (5)) & 1)) {
      if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
        members.m_romoffset = ((((((offset) & (1020))) >>> (2))) & 0xff);
      }
      return method_k051960_fetchromdata(runtime, ((offset) & (3)));
    } else {
      return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
  }

  function method_k051960_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
  }

  function method_k051937_r(runtime: any, offset: any) {
    const members = runtime.members;
    offset = runtime.andAssign(offset, 7);
    if ((((((((members.m_control ?? runtime.member("m_control"))) >>> (5)) & 1)) && (((offset) & (4)))) ? 1 : 0)) {
      return method_k051960_fetchromdata(runtime, ((offset) & (3)));
    } else {
      if (((Number(offset) === Number(0)) ? 1 : 0)) {
        return (((typeof (runtime.dereference(members.m_sprites_busy)).enabled === 'function' ? (runtime.dereference(members.m_sprites_busy)).enabled() : typeof (runtime.dereference(members.m_sprites_busy)).enabled === 'number' || typeof (runtime.dereference(members.m_sprites_busy)).enabled === 'boolean' ? (runtime.dereference(members.m_sprites_busy)).enabled : runtime.container(members.m_sprites_busy, "enabled"))) ? (1) : (0));
      }
    }
    return 0;
  }

  function method_k051937_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    offset = runtime.andAssign(offset, 7);
    if (((Number(offset) === Number(0)) ? 1 : 0)) {
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (0)) & 1)) {
        runtime.invoke("m_irq_handler", 0);
      }
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (1)) & 1)) {
        runtime.invoke("m_firq_handler", 0);
      }
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (2)) & 1)) {
        runtime.invoke("m_nmi_handler", 0);
      }
      members.m_control = ((data) & 0xff);
    } else {
      if (((Number(offset) === Number(1)) ? 1 : 0)) {
        if (0) {
          0;
        }
        if ((((((data) ^ ((members.m_shadow_config ?? runtime.member("m_shadow_config"))))) >>> (0)) & 1)) {
          runtime.invoke("m_shadow_config_cb", ((data) & (1)));
        }
        members.m_shadow_config = ((((data) & (7))) & 0xff);
      } else {
        if ((((((Number(offset) >= Number(2)) ? 1 : 0)) && (((Number(offset) < Number(5)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(runtime.writableMember("m_spriterombank"), ((offset) - (2)), data);
        } else {
        }
      }
    }
  }

  function method_k051960_sprites_draw(runtime: any, bitmap: any, cliprect: any, priority_bitmap: any, min_priority: any, max_priority: any) {
    const members = runtime.members;
    const h_m_buffer = members.m_buffer ?? runtime.member("m_buffer");
    let NUM_SPRITES: any = 128;
    let offs: any = 0;
    let pri_code: any = 0;
    let sortedlist: any = new Int32Array(new Uint8Array(Math.max(0, Number(NUM_SPRITES))));
    let drawmode_table: any = new Uint8Array(Math.max(0, Number(256)));
    (() => { const target = drawmode_table; const bytes = Number(((drawmode_table)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(1, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(1, 0, bytes); return target; })();
    runtime.writeIndex(drawmode_table, 0, 0);
    let shadow_mode: any = ((((((((members.m_priority_shadows ?? runtime.member("m_priority_shadows"))) || ((runtime.calls["palette().shadow_mode"]?.() ?? 0))) ? 1 : 0)) ? (3) : (2))) >>> 0);
    for (offs = 0; ((Number(offs) < Number(NUM_SPRITES)) ? 1 : 0); offs = ((offs) + (1))) {
      runtime.writeIndex(sortedlist, offs, (-1));
    }
    for (offs = 0; ((Number(offs) < Number(1024)) ? 1 : 0); offs = ((offs) + (8))) {
      if (((runtime.readIndex(h_m_buffer, offs)) & (128))) {
        pri_code = ((runtime.readIndex(h_m_buffer, offs)) & (127));
        if (((Number(max_priority) === Number((-1))) ? 1 : 0)) {
          pri_code = ((pri_code) ^ (127));
        }
        runtime.writeIndex(sortedlist, pri_code, offs);
      }
    }
    for (pri_code = 0; ((Number(pri_code) < Number(NUM_SPRITES)) ? 1 : 0); pri_code = ((pri_code) + (1))) {
      let ox: any = 0;
      let oy: any = 0;
      let size: any = 0;
      let w: any = 0;
      let h: any = 0;
      let x: any = 0;
      let y: any = 0;
      let flipx: any = 0;
      let flipy: any = 0;
      let zoomx: any = 0;
      let zoomy: any = 0;
      offs = runtime.readIndex(sortedlist, pri_code);
      if (((Number(offs) === Number((-1))) ? 1 : 0)) {
        continue;
      }
      let code: any = runtime.add(runtime.readIndex(h_m_buffer, ((offs) + (2))), ((((runtime.readIndex(h_m_buffer, ((offs) + (1)))) & (31))) << (8)));
      let color: any = ((runtime.readIndex(h_m_buffer, ((offs) + (3)))) & (255));
      let pri: any = 0;
      let shadow: any = (((((((((((members.m_shadow_config ?? runtime.member("m_shadow_config"))) >>> (2)) & 1)) ? 0 : 1)) && ((((((((members.m_shadow_config ?? runtime.member("m_shadow_config"))) >>> (1)) & 1)) || ((((color) >>> (7)) & 1))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
      (runtime.calls["m_k051960_cb"] ? runtime.calls["m_k051960_cb"](({ generatedLValue: true, get: () => code, set: (value: any) => { code = value; } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = value; } }), ({ generatedLValue: true, get: () => pri, set: (value: any) => { pri = value; } }), ({ generatedLValue: true, get: () => shadow, set: (value: any) => { shadow = ((value) ? 1 : 0); } })) : runtime.macro("m_k051960_cb", ({ generatedLValue: true, get: () => code, set: (value: any) => { code = value; } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = value; } }), ({ generatedLValue: true, get: () => pri, set: (value: any) => { pri = value; } }), ({ generatedLValue: true, get: () => shadow, set: (value: any) => { shadow = ((value) ? 1 : 0); } })));
      if (((Number(max_priority) !== Number((-1))) ? 1 : 0)) {
        if ((((((Number(pri) < Number(min_priority)) ? 1 : 0)) || (((Number(pri) > Number(max_priority)) ? 1 : 0))) ? 1 : 0)) {
          continue;
        }
      }
      size = ((((runtime.readIndex(h_m_buffer, ((offs) + (1)))) & (224))) >>> (5));
      w = ([1, 2, 1, 2, 4, 2, 4, 8][(((size) % 8) + 8) % 8] ?? 0);
      h = ([1, 1, 2, 2, 2, 4, 4, 8][(((size) % 8) + 8) % 8] ?? 0);
      if (((Number(w) >= Number(2)) ? 1 : 0)) {
        code = runtime.andAssign(code, (~1));
      }
      if (((Number(h) >= Number(2)) ? 1 : 0)) {
        code = runtime.andAssign(code, (~2));
      }
      if (((Number(w) >= Number(4)) ? 1 : 0)) {
        code = runtime.andAssign(code, (~4));
      }
      if (((Number(h) >= Number(4)) ? 1 : 0)) {
        code = runtime.andAssign(code, (~8));
      }
      if (((Number(w) >= Number(8)) ? 1 : 0)) {
        code = runtime.andAssign(code, (~16));
      }
      if (((Number(h) >= Number(8)) ? 1 : 0)) {
        code = runtime.andAssign(code, (~32));
      }
      ox = ((runtime.add(((256) * (runtime.readIndex(h_m_buffer, ((offs) + (6))))), runtime.readIndex(h_m_buffer, ((offs) + (7))))) & (511));
      oy = ((256) - (((runtime.add(((256) * (runtime.readIndex(h_m_buffer, ((offs) + (4))))), runtime.readIndex(h_m_buffer, ((offs) + (5))))) & (511))));
      flipx = ((runtime.readIndex(h_m_buffer, ((offs) + (6)))) & (2));
      flipy = ((runtime.readIndex(h_m_buffer, ((offs) + (4)))) & (2));
      zoomx = ((((runtime.readIndex(h_m_buffer, ((offs) + (6)))) & (252))) >>> (2));
      zoomx = ((runtime.divide(65536, 128)) * (((128) - (zoomx))));
      zoomy = ((((runtime.readIndex(h_m_buffer, ((offs) + (4)))) & (252))) >>> (2));
      zoomy = ((128) - (([0, 1, 3, 5, 7, 9, 10, 12, 14, 15, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 46, 47, 48, 49, 49, 50, 51, 52, 52, 53, 54, 54, 55, 56, 56, 57, 57, 58, 59, 59, 60, 60, 61, 61, 62, 62, 63][(((zoomy) % 64) + 64) % 64] ?? 0)));
      for (let i: any = 0; ((Number(i) < Number(3)) ? 1 : 0); i = ((i) + (1))) {
        if (((Number(h) <= Number(((1) << (i)))) ? 1 : 0)) {
          zoomy = runtime.divide(((zoomy) + (1)), 2);
        }
      }
      zoomy = ((zoomy) * (runtime.divide(8, h)));
      zoomy = ((runtime.divide(65536, 128)) * (zoomy));
      if (((((members.m_control ?? runtime.member("m_control"))) >>> (3)) & 1)) {
        ox = ((((512) - (((((zoomx) * (w))) >>> (12))))) - (ox));
        oy = ((((256) - (((((zoomy) * (h))) >>> (12))))) - (oy));
        flipx = ((flipx) ? 0 : 1);
        flipy = ((flipy) ? 0 : 1);
      }
      runtime.writeIndex(drawmode_table, ((((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).granularity?.() ?? runtime.container((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)), "granularity"))) - (1)), ((shadow) ? (shadow_mode) : (1)));
      if ((((((Number(zoomx) === Number(65536)) ? 1 : 0)) && (((Number(zoomy) === Number(65536)) ? 1 : 0))) ? 1 : 0)) {
        let sx: any = 0;
        let sy: any = 0;
        for (y = 0; ((Number(y) < Number(h)) ? 1 : 0); y = ((y) + (1))) {
          sy = ((oy) + (((16) * (y))));
          for (x = 0; ((Number(x) < Number(w)) ? 1 : 0); x = ((x) + (1))) {
            let c: any = code;
            sx = ((ox) + (((16) * (x))));
            if (flipx) {
              c = ((c) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((w) - (1))) - (x))) % 8) + 8) % 8] ?? 0)));
            } else {
              c = ((c) + (([0, 1, 4, 5, 16, 17, 20, 21][(((x) % 8) + 8) % 8] ?? 0)));
            }
            if (flipy) {
              c = ((c) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((h) - (1))) - (y))) % 8) + 8) % 8] ?? 0)));
            } else {
              c = ((c) + (([0, 2, 8, 10, 32, 34, 40, 42][(((y) % 8) + 8) % 8] ?? 0)));
            }
            if (((Number(max_priority) === Number((-1))) ? 1 : 0)) {
              ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).prio_transtable?.(bitmap, cliprect, c, color, flipx, flipy, ((((sx) & (511))) - (96)), sy, priority_bitmap, pri, drawmode_table) ?? 0);
            } else {
              ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).transtable?.(bitmap, cliprect, c, color, flipx, flipy, ((((sx) & (511))) - (96)), sy, drawmode_table) ?? 0);
            }
          }
        }
      } else {
        let sx: any = 0;
        let sy: any = 0;
        let zw: any = 0;
        let zh: any = 0;
        for (y = 0; ((Number(y) < Number(h)) ? 1 : 0); y = ((y) + (1))) {
          sy = ((oy) + (((runtime.add(((zoomy) * (y)), ((1) << (11)))) >>> (12))));
          zh = ((((oy) + (((runtime.add(((zoomy) * (((y) + (1)))), ((1) << (11)))) >>> (12))))) - (sy));
          for (x = 0; ((Number(x) < Number(w)) ? 1 : 0); x = ((x) + (1))) {
            let c: any = code;
            sx = ((ox) + (((runtime.add(((zoomx) * (x)), ((1) << (11)))) >>> (12))));
            zw = ((((ox) + (((runtime.add(((zoomx) * (((x) + (1)))), ((1) << (11)))) >>> (12))))) - (sx));
            if (flipx) {
              c = ((c) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((w) - (1))) - (x))) % 8) + 8) % 8] ?? 0)));
            } else {
              c = ((c) + (([0, 1, 4, 5, 16, 17, 20, 21][(((x) % 8) + 8) % 8] ?? 0)));
            }
            if (flipy) {
              c = ((c) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((h) - (1))) - (y))) % 8) + 8) % 8] ?? 0)));
            } else {
              c = ((c) + (([0, 2, 8, 10, 32, 34, 40, 42][(((y) % 8) + 8) % 8] ?? 0)));
            }
            if (((Number(max_priority) === Number((-1))) ? 1 : 0)) {
              ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).prio_zoom_transtable?.(bitmap, cliprect, c, color, flipx, flipy, ((((sx) & (511))) - (96)), sy, runtime.divide(((zw) << (16)), 16), runtime.divide(((zh) << (16)), 16), priority_bitmap, pri, drawmode_table) ?? 0);
            } else {
              ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).zoom_transtable?.(bitmap, cliprect, c, color, flipx, flipy, ((((sx) & (511))) - (96)), sy, runtime.divide(((zw) << (16)), 16), runtime.divide(((zh) << (16)), 16), drawmode_table) ?? 0);
            }
          }
        }
      }
    }
  }

  function method_firq_scanline(runtime: any, param: any) {
    const members = runtime.members;
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (1)) & 1)) {
      runtime.invoke("m_firq_handler", 1);
    }
    ((runtime.dereference(members.m_firq_scanline)).adjust?.((runtime.calls["screen().time_until_pos"]?.(runtime.add((runtime.calls["screen().vpos"]?.() ?? 0), 2)) ?? 0)) ?? 0);
  }

  function method_nmi_scanline(runtime: any, param: any) {
    const members = runtime.members;
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (2)) & 1)) {
      runtime.invoke("m_nmi_handler", 1);
    }
    ((runtime.dereference(members.m_nmi_scanline)).adjust?.((runtime.calls["screen().time_until_pos"]?.(runtime.add((runtime.calls["screen().vpos"]?.() ?? 0), 32)) ?? 0)) ?? 0);
  }
  return {
    "k051960_fetchromdata": method_k051960_fetchromdata,
    "k051960_r": method_k051960_r,
    "k051960_w": method_k051960_w,
    "k051937_r": method_k051937_r,
    "k051937_w": method_k051937_w,
    "k051960_sprites_draw": method_k051960_sprites_draw,
    "firq_scanline": method_firq_scanline,
    "nmi_scanline": method_nmi_scanline
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
