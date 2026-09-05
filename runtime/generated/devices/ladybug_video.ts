// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './ladybug_video.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_bg_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_bg_ram"), ((offset) & (2047)), data);
    ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0);
  }

  function method_draw(runtime: any, screen: any, bitmap: any, cliprect: any, flip: any) {
    const members = runtime.members;
    for (let offs: any = 0; ((Number(offs) < Number(32)) ? 1 : 0); offs = ((offs) + (1))) {
      let scroll: any = runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), ((((((offs) & (3))) << (5))) | (((offs) >>> (2)))));
      ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(offs, ((flip) ? ((-scroll)) : (scroll))) ?? 0);
    }
    ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0) ?? 0);
    method_draw_sprites(runtime, bitmap, cliprect);
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    for (let offs: any = ((1024) - (((64) << (1)))); ((Number(((64) << (1))) <= Number(offs)) ? 1 : 0); offs = ((offs) - (64))) {
      let i: any = 0;
      while ((((((Number(64) > Number(i)) ? 1 : 0)) && (runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), ((offs) + (i))))) ? 1 : 0)) {
        i = ((i) + (4));
      }
      while (((Number(0) < Number(i)) ? 1 : 0)) {
        i = ((i) - (4));
        if (((runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), ((offs) + (i)))) & (128))) {
          let big: any = ((((((runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), ((offs) + (i)))) & (64))) ? 1 : 0)) ? 1 : 0);
          let xflip: any = ((((((runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), ((offs) + (i)))) & (32))) ? 1 : 0)) ? 1 : 0);
          let yflip: any = ((((((runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), ((offs) + (i)))) & (16))) ? 1 : 0)) ? 1 : 0);
          let code: any = ((runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), runtime.add(((offs) + (i)), 1))) | ((((((runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), runtime.add(((offs) + (i)), 2))) >>> (4)) & 1)) << (8))));
          let color: any = ((runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), runtime.add(((offs) + (i)), 2))) & (15));
          let xpos: any = runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), runtime.add(((offs) + (i)), 3));
          let ypos: any = ((((offs) >>> (2))) | (((runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), ((offs) + (i)))) & (15))));
          if (big) {
            ((runtime.dereference(((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0))).transpen?.(bitmap, cliprect, ((code) >>> (2)), color, xflip, yflip, xpos, ((ypos) - (8)), 0) ?? 0);
          } else {
            ((runtime.dereference(((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0))).transpen?.(bitmap, cliprect, code, color, xflip, yflip, xpos, ypos, 0) ?? 0);
          }
        }
      }
    }
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let code: any = runtime.add(runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), tile_index), (((((runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), ((1024) | (tile_index)))) >>> (3)) & 1)) << (8)));
    let color: any = ((runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), ((1024) | (tile_index)))) & (7));
    ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0);
  }

  function method_spr_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), ((offset) & (1023)));
  }

  function method_spr_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_spr_ram"), ((offset) & (1023)), data);
  }

  function method_bg_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), ((offset) & (2047)));
  }

  function method_ladybug_video_device__spr_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_spr_ram ?? runtime.member("m_spr_ram")), ((offset) & (1023)));
  }

  function method_ladybug_video_device__spr_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_spr_ram"), ((offset) & (1023)), data);
  }

  function method_ladybug_video_device__bg_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), ((offset) & (2047)));
  }
  return {
    "bg_w": method_bg_w,
    "draw": method_draw,
    "draw_sprites": method_draw_sprites,
    "get_bg_tile_info": method_get_bg_tile_info,
    "spr_r": method_spr_r,
    "spr_w": method_spr_w,
    "bg_r": method_bg_r,
    "ladybug_video_device::spr_r": method_ladybug_video_device__spr_r,
    "ladybug_video_device::spr_w": method_ladybug_video_device__spr_w,
    "ladybug_video_device::bg_r": method_ladybug_video_device__bg_r
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
