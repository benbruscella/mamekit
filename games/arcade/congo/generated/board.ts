// GENERATED executable machine composition from src/mame/sega/zaxxon.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'congo');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {

  function method_zaxxon_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_bg_position_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if (((Number(offset) === Number(0)) ? 1 : 0)) {
      members.m_bg_position = (((((((members.m_bg_position ?? runtime.member("m_bg_position"))) & (1792))) | (((((data) << (0))) & (255))))) & 0xffff);
    } else {
      members.m_bg_position = (((((((members.m_bg_position ?? runtime.member("m_bg_position"))) & (255))) | (((((data) << (8))) & (1792))))) & 0xffff);
    }
  }

  function method_congo_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_congo_sprite_custom_w(runtime: any, space: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_congo_custom"), offset, data);
    if ((((((Number(offset) === Number(3)) ? 1 : 0)) && (((Number(data) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
      let saddr: any = ((((runtime.readIndex((members.m_congo_custom ?? runtime.member("m_congo_custom")), 0)) | (((runtime.readIndex((members.m_congo_custom ?? runtime.member("m_congo_custom")), 1)) << (8))))) & 0xffff);
      let count: any = ((runtime.readIndex((members.m_congo_custom ?? runtime.member("m_congo_custom")), 2)) | 0);
      (__l["m_maincpu.adjust_icount"] ? __l["m_maincpu.adjust_icount"]((((-count)) * (5))) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).adjust_icount?.((((-count)) * (5))) ?? 0) : 0);
      while (((Number((() => { const previous = count; count = ((((count) - (1))) | 0); return previous; })()) >= Number(0)) ? 1 : 0)) {
        let daddr: any = (((((__l["space.read_byte"] ? __l["space.read_byte"](((saddr) + (0))) : (space) != null ? ((runtime.dereference(space)).read_byte?.(((saddr) + (0))) ?? 0) : (__l["read_byte"]?.(((saddr) + (0))) ?? 0))) * (4))) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_spriteram"), ((((daddr) + (0))) & (255)), (__l["space.read_byte"] ? __l["space.read_byte"](((saddr) + (1))) : (space) != null ? ((runtime.dereference(space)).read_byte?.(((saddr) + (1))) ?? 0) : (__l["read_byte"]?.(((saddr) + (1))) ?? 0)));
        runtime.writeIndex(runtime.writableMember("m_spriteram"), ((((daddr) + (1))) & (255)), (__l["space.read_byte"] ? __l["space.read_byte"](((saddr) + (2))) : (space) != null ? ((runtime.dereference(space)).read_byte?.(((saddr) + (2))) ?? 0) : (__l["read_byte"]?.(((saddr) + (2))) ?? 0)));
        runtime.writeIndex(runtime.writableMember("m_spriteram"), ((((daddr) + (2))) & (255)), (__l["space.read_byte"] ? __l["space.read_byte"](((saddr) + (3))) : (space) != null ? ((runtime.dereference(space)).read_byte?.(((saddr) + (3))) ?? 0) : (__l["read_byte"]?.(((saddr) + (3))) ?? 0)));
        runtime.writeIndex(runtime.writableMember("m_spriteram"), ((((daddr) + (3))) & (255)), (__l["space.read_byte"] ? __l["space.read_byte"](((saddr) + (4))) : (space) != null ? ((runtime.dereference(space)).read_byte?.(((saddr) + (4))) ?? 0) : (__l["read_byte"]?.(((saddr) + (4))) ?? 0)));
        saddr = ((((saddr) + (32))) & 0xffff);
      }
    }
  }

  function method_flipscreen_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_flip_screen = ((((state) ? 0 : 1)) ? 1 : 0);
    (__l["m_fg_tilemap.set_flip"] ? __l["m_fg_tilemap.set_flip"]((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (((1) | (2))) : (0))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_flip?.((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (((1) | (2))) : (0))) ?? 0) : (__l["set_flip"]?.((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (((1) | (2))) : (0))) ?? 0));
  }

  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_int_enabled = ((state) & 0xff);
    if ((((members.m_int_enabled ?? runtime.member("m_int_enabled"))) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : 0);
    }
  }

  function method_fg_color_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_fg_color = ((((state) * (128))) & 0xff);
    (__l["m_fg_tilemap.set_palette_offset"] ? __l["m_fg_tilemap.set_palette_offset"](runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_palette_offset?.(runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) ?? 0) : (__l["set_palette_offset"]?.(runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) ?? 0));
  }

  function method_bg_color_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_bg_color = ((((state) * (128))) & 0xff);
  }

  function method_bg_enable_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_bg_enable = ((state) & 0xff);
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any, skew: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((members.m_bg_enable ?? runtime.member("m_bg_enable"))) {
      let pixmap: any = (__l["m_bg_tilemap.pixmap"] ? __l["m_bg_tilemap.pixmap"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).pixmap === 'function' ? (runtime.dereference(members.m_bg_tilemap)).pixmap() : typeof (runtime.dereference(members.m_bg_tilemap)).pixmap === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).pixmap === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).pixmap : runtime.container(members.m_bg_tilemap, "pixmap")) : (__l["pixmap"]?.() ?? 0));
      let colorbase: any = ((runtime.add((members.m_bg_color ?? runtime.member("m_bg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) | 0);
      let xmask: any = (((((__l["pixmap.width"] ? __l["pixmap.width"]() : (pixmap) != null ? (typeof (runtime.dereference(pixmap)).width === 'function' ? (runtime.dereference(pixmap)).width() : typeof (runtime.dereference(pixmap)).width === 'number' || typeof (runtime.dereference(pixmap)).width === 'boolean' ? (runtime.dereference(pixmap)).width : runtime.container(pixmap, "width")) : (__l["width"]?.() ?? 0))) - (1))) | 0);
      let ymask: any = (((((__l["pixmap.height"] ? __l["pixmap.height"]() : (pixmap) != null ? (typeof (runtime.dereference(pixmap)).height === 'function' ? (runtime.dereference(pixmap)).height() : typeof (runtime.dereference(pixmap)).height === 'number' || typeof (runtime.dereference(pixmap)).height === 'boolean' ? (runtime.dereference(pixmap)).height : runtime.container(pixmap, "height")) : (__l["height"]?.() ?? 0))) - (1))) | 0);
      let flipmask: any = (((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (255) : (0))) | 0);
      let flipoffs: any = (((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (56) : (64))) | 0);
      if ((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? 0 : 1)) {
        flipoffs = ((((flipoffs) - (1))) | 0);
      } else {
        flipoffs = ((((flipoffs) + (7))) | 0);
      }
      for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let dst: any = bitmap["pix&"](y);
        let vf: any = ((((y) ^ (flipmask))) | 0);
        let srcy: any = ((runtime.add(((vf) + ((((((members.m_bg_position ?? runtime.member("m_bg_position"))) << (1))) ^ (4095)))), 1)) | 0);
        let src: any = pixmap["pix&"](((srcy) & (ymask)));
        for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          let srcx: any = ((((x) ^ (flipmask))) | 0);
          if (skew) {
            srcx = ((((srcx) + (runtime.add(((((vf) >>> (1))) ^ (255)), 1)))) | 0);
            srcx = ((((srcx) + (flipoffs))) | 0);
          }
          runtime.writeIndex(dst, x, ((runtime.readIndex(src, ((srcx) & (xmask)))) + (colorbase)));
        }
      }
    } else {
      (__l["bitmap.fill"] ? __l["bitmap.fill"]((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) ?? 0) : (__l["fill"]?.((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) ?? 0));
    }
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, flipxmask: any, flipymask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let spriteram: any = (members.m_spriteram ?? runtime.member("m_spriteram"));
    let gfx: any = (__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : 0);
    let flip: any = (((members.m_flip_screen ?? runtime.member("m_flip_screen"))) | 0);
    let flipmask: any = ((((flip) ? (255) : (0))) | 0);
    let offs: any = ((0) | 0);
    for (offs = ((124) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
      let sy: any = (((runtime.overrides["find_minimum_y"] ? runtime.overrides["find_minimum_y"](runtime.readIndex(spriteram, offs), flip) : method_find_minimum_y(runtime, runtime.readIndex(spriteram, offs), flip))) | 0);
      let flipy: any = ((((((runtime.readIndex(spriteram, ((offs) + (((flipymask) >>> (8)))))) ^ (flipmask))) & (flipymask))) | 0);
      let flipx: any = ((((((runtime.readIndex(spriteram, ((offs) + (((flipxmask) >>> (8)))))) ^ (flipmask))) & (flipxmask))) | 0);
      let code: any = ((runtime.readIndex(spriteram, ((offs) + (1)))) | 0);
      let color: any = ((runtime.add(((runtime.readIndex(spriteram, ((offs) + (2)))) & (31)), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (5)))) | 0);
      let sx: any = (((runtime.overrides["find_minimum_x"] ? runtime.overrides["find_minimum_x"](runtime.readIndex(spriteram, ((offs) + (3))), flip) : method_find_minimum_x(runtime, runtime.readIndex(spriteram, ((offs) + (3))), flip))) | 0);
      (__l["gfx.transpen"] ? __l["gfx.transpen"](bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0) ?? 0) : (__l["transpen"]?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0) ?? 0));
      (__l["gfx.transpen"] ? __l["gfx.transpen"](bitmap, cliprect, code, color, flipx, flipy, sx, ((sy) - (256)), 0) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, code, color, flipx, flipy, sx, ((sy) - (256)), 0) ?? 0) : (__l["transpen"]?.(bitmap, cliprect, code, color, flipx, flipy, sx, ((sy) - (256)), 0) ?? 0));
      (__l["gfx.transpen"] ? __l["gfx.transpen"](bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, 0) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, 0) ?? 0) : (__l["transpen"]?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, 0) ?? 0));
      (__l["gfx.transpen"] ? __l["gfx.transpen"](bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), ((sy) - (256)), 0) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), ((sy) - (256)), 0) ?? 0) : (__l["transpen"]?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), ((sy) - (256)), 0) ?? 0));
    }
  }

  function method_find_minimum_y(runtime: any, value: any, flip: any): any {
    const members = runtime.members;

    let flipmask: any = ((((flip) ? (255) : (0))) | 0);
    let flipconst: any = ((((flip) ? (239) : (241))) | 0);
    let y: any = ((0) | 0);
    for (y = ((0) | 0); ((Number(y) < Number(256)) ? 1 : 0); y = ((((y) + (16))) | 0)) {
      let sum: any = ((runtime.add(runtime.add(((value) + (flipconst)), 1), ((y) ^ (flipmask)))) | 0);
      if (((Number(((sum) & (224))) === Number(224)) ? 1 : 0)) {
        break;
      }
    }
    while (1) {
      let sum: any = ((runtime.add(runtime.add(((value) + (flipconst)), 1), ((((y) - (1))) ^ (flipmask)))) | 0);
      if (((Number(((sum) & (224))) !== Number(224)) ? 1 : 0)) {
        break;
      }
      y = ((((y) - (1))) | 0);
    }
    return ((((y) + (1))) & (255));
  }

  function method_find_minimum_x(runtime: any, value: any, flip: any): any {
    const members = runtime.members;

    let flipmask: any = ((((flip) ? (255) : (0))) | 0);
    let x: any = ((0) | 0);
    x = ((((runtime.add(((value) + (239)), 1)) ^ (flipmask))) | 0);
    if (flipmask) {
      x = ((((x) - (31))) | 0);
    }
    return ((x) & (255));
  }

  function method_vblank_int(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_int_enabled ?? runtime.member("m_int_enabled")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : 0);
    }
  }

  function method_congo_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let code: any = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), (((members.m_congo_fg_bank ?? runtime.member("m_congo_fg_bank"))) << (8)))) | 0);
    let color: any = ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (31))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, ((color) * (2)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, ((color) * (2)), 0) ?? 0) : (__l["set"]?.(0, code, ((color) * (2)), 0) ?? 0));
  }

  function method_congo_sound_b_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let diff: any = ((((data) ^ (runtime.readIndex((members.m_sound_state ?? runtime.member("m_sound_state")), 1)))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_sound_state"), 1, data);
    if (((((((((diff) & (2))) && (((((data) & (2))) ? 0 : 1))) ? 1 : 0)) && ((((__l["m_samples.playing"] ? __l["m_samples.playing"](0) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).playing?.(0) ?? 0) : 0)) ? 0 : 1))) ? 1 : 0)) {
      (__l["m_samples.start"] ? __l["m_samples.start"](0, 0) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(0, 0) ?? 0) : 0);
    }
  }

  function method_congo_sound_c_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let diff: any = ((((data) ^ (runtime.readIndex((members.m_sound_state ?? runtime.member("m_sound_state")), 2)))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_sound_state"), 2, data);
    if ((((((diff) & (1))) && (((((data) & (1))) ? 0 : 1))) ? 1 : 0)) {
      (__l["m_samples.start"] ? __l["m_samples.start"](1, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(1, 1) ?? 0) : 0);
    }
    if ((((((diff) & (1))) && (((data) & (1)))) ? 1 : 0)) {
      (__l["m_samples.stop"] ? __l["m_samples.stop"](1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(1) ?? 0) : 0);
    }
    if ((((((diff) & (2))) && (((((data) & (2))) ? 0 : 1))) ? 1 : 0)) {
      (__l["m_samples.start"] ? __l["m_samples.start"](2, 2) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(2, 2) ?? 0) : 0);
    }
    if ((((((diff) & (2))) && (((data) & (2)))) ? 1 : 0)) {
      (__l["m_samples.stop"] ? __l["m_samples.stop"](2) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(2) ?? 0) : 0);
    }
    if ((((((diff) & (4))) && (((((data) & (4))) ? 0 : 1))) ? 1 : 0)) {
      (__l["m_samples.start"] ? __l["m_samples.start"](3, 3) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(3, 3) ?? 0) : 0);
    }
    if ((((((diff) & (4))) && (((data) & (4)))) ? 1 : 0)) {
      (__l["m_samples.stop"] ? __l["m_samples.stop"](3) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(3) ?? 0) : 0);
    }
    if ((((((diff) & (8))) && (((((data) & (8))) ? 0 : 1))) ? 1 : 0)) {
      (__l["m_samples.start"] ? __l["m_samples.start"](4, 4) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(4, 4) ?? 0) : 0);
    }
    if ((((((diff) & (8))) && (((data) & (8)))) ? 1 : 0)) {
      (__l["m_samples.stop"] ? __l["m_samples.stop"](4) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(4) ?? 0) : 0);
    }
  }

  function method_congo_fg_bank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_congo_fg_bank = ((state) & 0xff);
    (__l["m_fg_tilemap.mark_all_dirty"] ? __l["m_fg_tilemap.mark_all_dirty"]() : (members.m_fg_tilemap) != null ? (typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty : runtime.container(members.m_fg_tilemap, "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
  }

  function method_congo_color_bank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_congo_color_bank = ((state) & 0xff);
    (__l["m_fg_tilemap.set_palette_offset"] ? __l["m_fg_tilemap.set_palette_offset"](runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_palette_offset?.(runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) ?? 0) : (__l["set_palette_offset"]?.(runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) ?? 0));
  }

  function method_screen_update_congo(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, 1) : method_draw_background(runtime, bitmap, cliprect, 1));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 640, 384) : method_draw_sprites(runtime, bitmap, cliprect, 640, 384));
    (__l["m_fg_tilemap.draw"] ? __l["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    return 0;
  }
  return {
    "zaxxon_videoram_w": method_zaxxon_videoram_w,
    "bg_position_w": method_bg_position_w,
    "congo_colorram_w": method_congo_colorram_w,
    "congo_sprite_custom_w": method_congo_sprite_custom_w,
    "flipscreen_w": method_flipscreen_w,
    "int_enable_w": method_int_enable_w,
    "fg_color_w": method_fg_color_w,
    "bg_color_w": method_bg_color_w,
    "bg_enable_w": method_bg_enable_w,
    "draw_background": method_draw_background,
    "draw_sprites": method_draw_sprites,
    "find_minimum_y": method_find_minimum_y,
    "find_minimum_x": method_find_minimum_x,
    "vblank_int": method_vblank_int,
    "congo_get_fg_tile_info": method_congo_get_fg_tile_info,
    "congo_sound_b_w": method_congo_sound_b_w,
    "congo_sound_c_w": method_congo_sound_c_w,
    "congo_fg_bank_w": method_congo_fg_bank_w,
    "congo_color_bank_w": method_congo_color_bank_w,
    "screen_update_congo": method_screen_update_congo
  };
})();
    return {
      "zaxxon_state.zaxxon_videoram_w": methods["zaxxon_videoram_w"],
      "zaxxon_state.bg_position_w": methods["bg_position_w"],
      "zaxxon_state.congo_colorram_w": methods["congo_colorram_w"],
      "zaxxon_state.congo_sprite_custom_w": methods["congo_sprite_custom_w"],
      "zaxxon_state.flipscreen_w": methods["flipscreen_w"],
      "zaxxon_state.int_enable_w": methods["int_enable_w"],
      "zaxxon_state.fg_color_w": methods["fg_color_w"],
      "zaxxon_state.bg_color_w": methods["bg_color_w"],
      "zaxxon_state.bg_enable_w": methods["bg_enable_w"],
      "zaxxon_state.draw_background": methods["draw_background"],
      "zaxxon_state.draw_sprites": methods["draw_sprites"],
      "zaxxon_state.find_minimum_y": methods["find_minimum_y"],
      "zaxxon_state.find_minimum_x": methods["find_minimum_x"],
      "zaxxon_state.vblank_int": methods["vblank_int"],
      "zaxxon_state.congo_get_fg_tile_info": methods["congo_get_fg_tile_info"],
      "zaxxon_state.congo_sound_b_w": methods["congo_sound_b_w"],
      "zaxxon_state.congo_sound_c_w": methods["congo_sound_c_w"],
      "zaxxon_state.congo_fg_bank_w": methods["congo_fg_bank_w"],
      "zaxxon_state.congo_color_bank_w": methods["congo_color_bank_w"],
      "zaxxon_state.screen_update_congo": methods["screen_update_congo"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fill","gfx.transpen","height","m_bg_tilemap.pixmap","m_fg_tilemap.draw","m_fg_tilemap.mark_all_dirty","m_fg_tilemap.mark_tile_dirty","m_fg_tilemap.set_flip","m_fg_tilemap.set_palette_offset","m_gfxdecode.gfx","m_maincpu.adjust_icount","m_maincpu.set_input_line","m_palette.black_pen","m_samples.playing","m_samples.start","m_samples.stop","mark_all_dirty","mark_tile_dirty","pixmap","pixmap.height","pixmap.width","read_byte","set","set_flip","set_palette_offset","space.read_byte","tileinfo.set","transpen","width"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
