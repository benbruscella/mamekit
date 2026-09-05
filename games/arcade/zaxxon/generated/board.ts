// GENERATED executable machine composition from src/mame/sega/zaxxon.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'zaxxon');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_zaxxon_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_bg_position_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((Number(offset) === Number(0)) ? 1 : 0)) {
      members.m_bg_position = (((((((members.m_bg_position ?? runtime.member("m_bg_position"))) & (1792))) | (((((data) << (0))) & (255))))) & 0xffff);
    } else {
      members.m_bg_position = (((((((members.m_bg_position ?? runtime.member("m_bg_position"))) & (255))) | (((((data) << (8))) & (1792))))) & 0xffff);
    }
  }

  function method_zaxxon_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let sx: any = ((tile_index) % (32));
    let sy: any = runtime.divide(tile_index, 32);
    let code: any = runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index);
    let color: any = ((runtime.readIndex((members.m_color_codes ?? runtime.member("m_color_codes")), ((sx) + (((32) * (runtime.divide(sy, 4))))))) & (15));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, ((color) * (2)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, ((color) * (2)), 0) ?? 0) : (runtime.calls["set"]?.(0, code, ((color) * (2)), 0) ?? 0));
  }

  function method_zaxxon_sound_a_w(runtime: any, data: any) {
    const members = runtime.members;
    let diff: any = ((((data) ^ (runtime.readIndex((members.m_sound_state ?? runtime.member("m_sound_state")), 0)))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_sound_state"), 0, data);
    (runtime.calls["m_samples.set_volume"] ? runtime.calls["m_samples.set_volume"](10, runtime.add(0.5, ((0.157) * (((data) & (3)))))) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).set_volume?.(10, runtime.add(0.5, ((0.157) * (((data) & (3)))))) ?? 0) : (runtime.calls["set_volume"]?.(10, runtime.add(0.5, ((0.157) * (((data) & (3)))))) ?? 0));
    (runtime.calls["m_samples.set_volume"] ? runtime.calls["m_samples.set_volume"](11, runtime.add(0.5, ((0.157) * (((data) & (3)))))) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).set_volume?.(11, runtime.add(0.5, ((0.157) * (((data) & (3)))))) ?? 0) : (runtime.calls["set_volume"]?.(11, runtime.add(0.5, ((0.157) * (((data) & (3)))))) ?? 0));
    if ((((((diff) & (4))) && (((((data) & (4))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](10, 10, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(10, 10, 1) ?? 0) : (runtime.calls["start"]?.(10, 10, 1) ?? 0));
    }
    if ((((((diff) & (4))) && (((data) & (4)))) ? 1 : 0)) {
      (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](10) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(10) ?? 0) : (runtime.calls["stop"]?.(10) ?? 0));
    }
    if ((((((diff) & (8))) && (((((data) & (8))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](11, 11, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(11, 11, 1) ?? 0) : (runtime.calls["start"]?.(11, 11, 1) ?? 0));
    }
    if ((((((diff) & (8))) && (((data) & (8)))) ? 1 : 0)) {
      (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](11) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(11) ?? 0) : (runtime.calls["stop"]?.(11) ?? 0));
    }
    if ((((((diff) & (16))) && (((((data) & (16))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](0, 0, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(0, 0, 1) ?? 0) : (runtime.calls["start"]?.(0, 0, 1) ?? 0));
    }
    if ((((((diff) & (16))) && (((data) & (16)))) ? 1 : 0)) {
      (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](0) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(0) ?? 0) : (runtime.calls["stop"]?.(0) ?? 0));
    }
    if ((((((diff) & (32))) && (((((data) & (32))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](1, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(1, 1) ?? 0) : (runtime.calls["start"]?.(1, 1) ?? 0));
    }
    if ((((((diff) & (64))) && (((((data) & (64))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](2, 2, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(2, 2, 1) ?? 0) : (runtime.calls["start"]?.(2, 2, 1) ?? 0));
    }
    if ((((((diff) & (64))) && (((data) & (64)))) ? 1 : 0)) {
      (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](2) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(2) ?? 0) : (runtime.calls["stop"]?.(2) ?? 0));
    }
    if ((((((diff) & (128))) && (((((data) & (128))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](3, 3, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(3, 3, 1) ?? 0) : (runtime.calls["start"]?.(3, 3, 1) ?? 0));
    }
    if ((((((diff) & (128))) && (((data) & (128)))) ? 1 : 0)) {
      (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](3) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(3) ?? 0) : (runtime.calls["stop"]?.(3) ?? 0));
    }
  }

  function method_zaxxon_sound_b_w(runtime: any, data: any) {
    const members = runtime.members;
    let diff: any = ((((data) ^ (runtime.readIndex((members.m_sound_state ?? runtime.member("m_sound_state")), 1)))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_sound_state"), 1, data);
    if ((((((diff) & (16))) && (((((data) & (16))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](4, 4) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(4, 4) ?? 0) : (runtime.calls["start"]?.(4, 4) ?? 0));
    }
    if (((((((((diff) & (32))) && (((((data) & (32))) ? 0 : 1))) ? 1 : 0)) && ((((runtime.calls["m_samples.playing"] ? runtime.calls["m_samples.playing"](5) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).playing?.(5) ?? 0) : (runtime.calls["playing"]?.(5) ?? 0))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](5, 5) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(5, 5) ?? 0) : (runtime.calls["start"]?.(5, 5) ?? 0));
    }
    if ((((((diff) & (128))) && (((((data) & (128))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](6, 6) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(6, 6) ?? 0) : (runtime.calls["start"]?.(6, 6) ?? 0));
    }
  }

  function method_zaxxon_sound_c_w(runtime: any, data: any) {
    const members = runtime.members;
    let diff: any = ((((data) ^ (runtime.readIndex((members.m_sound_state ?? runtime.member("m_sound_state")), 2)))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_sound_state"), 2, data);
    if ((((((diff) & (1))) && (((((data) & (1))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](7, 7) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(7, 7) ?? 0) : (runtime.calls["start"]?.(7, 7) ?? 0));
    }
    if ((((((diff) & (4))) && (((((data) & (4))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](8, 8) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(8, 8) ?? 0) : (runtime.calls["start"]?.(8, 8) ?? 0));
    }
    if (((((((((diff) & (8))) && (((((data) & (8))) ? 0 : 1))) ? 1 : 0)) && ((((runtime.calls["m_samples.playing"] ? runtime.calls["m_samples.playing"](9) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).playing?.(9) ?? 0) : (runtime.calls["playing"]?.(9) ?? 0))) ? 0 : 1))) ? 1 : 0)) {
      (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](9, 9) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(9, 9) ?? 0) : (runtime.calls["start"]?.(9, 9) ?? 0));
    }
  }

  function method_flipscreen_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_flip_screen = ((((state) ? 0 : 1)) ? 1 : 0);
    (runtime.calls["m_fg_tilemap.set_flip"] ? runtime.calls["m_fg_tilemap.set_flip"]((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (((1) | (2))) : (0))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_flip?.((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (((1) | (2))) : (0))) ?? 0) : (runtime.calls["set_flip"]?.((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (((1) | (2))) : (0))) ?? 0));
  }

  function method_int_enable_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_int_enabled = ((state) & 0xff);
    if ((((members.m_int_enabled ?? runtime.member("m_int_enabled"))) ? 0 : 1)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
    }
  }

  function method_fg_color_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_fg_color = ((((state) * (128))) & 0xff);
    (runtime.calls["m_fg_tilemap.set_palette_offset"] ? runtime.calls["m_fg_tilemap.set_palette_offset"](runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_palette_offset?.(runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) ?? 0) : (runtime.calls["set_palette_offset"]?.(runtime.add((members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) ?? 0));
  }

  function method_bg_color_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_bg_color = ((((state) * (128))) & 0xff);
  }

  function method_bg_enable_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_bg_enable = ((state) & 0xff);
  }

  function method_screen_update_zaxxon(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, 1) : method_draw_background(runtime, bitmap, cliprect, 1));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 320, 384) : method_draw_sprites(runtime, bitmap, cliprect, 320, 384));
    (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    return 0;
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any, skew: any) {
    const members = runtime.members;
    if ((members.m_bg_enable ?? runtime.member("m_bg_enable"))) {
      let pixmap: any = (runtime.calls["m_bg_tilemap.pixmap"] ? runtime.calls["m_bg_tilemap.pixmap"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).pixmap === 'function' ? (runtime.dereference(members.m_bg_tilemap)).pixmap() : typeof (runtime.dereference(members.m_bg_tilemap)).pixmap === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).pixmap === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).pixmap : runtime.container(members.m_bg_tilemap, "pixmap")) : (runtime.calls["pixmap"]?.() ?? 0));
      let colorbase: any = runtime.add((members.m_bg_color ?? runtime.member("m_bg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)));
      let xmask: any = (((runtime.calls["pixmap.width"] ? runtime.calls["pixmap.width"]() : (pixmap) != null ? (typeof (runtime.dereference(pixmap)).width === 'function' ? (runtime.dereference(pixmap)).width() : typeof (runtime.dereference(pixmap)).width === 'number' || typeof (runtime.dereference(pixmap)).width === 'boolean' ? (runtime.dereference(pixmap)).width : runtime.container(pixmap, "width")) : (runtime.calls["width"]?.() ?? 0))) - (1));
      let ymask: any = (((runtime.calls["pixmap.height"] ? runtime.calls["pixmap.height"]() : (pixmap) != null ? (typeof (runtime.dereference(pixmap)).height === 'function' ? (runtime.dereference(pixmap)).height() : typeof (runtime.dereference(pixmap)).height === 'number' || typeof (runtime.dereference(pixmap)).height === 'boolean' ? (runtime.dereference(pixmap)).height : runtime.container(pixmap, "height")) : (runtime.calls["height"]?.() ?? 0))) - (1));
      let flipmask: any = (((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (255) : (0));
      let flipoffs: any = (((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (56) : (64));
      if ((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? 0 : 1)) {
        flipoffs = ((flipoffs) - (1));
      } else {
        flipoffs = ((flipoffs) + (7));
      }
      for (let y: any = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
        let dst: any = bitmap["pix&"](y);
        let vf: any = ((y) ^ (flipmask));
        let srcy: any = runtime.add(((vf) + ((((((members.m_bg_position ?? runtime.member("m_bg_position"))) << (1))) ^ (4095)))), 1);
        let src: any = pixmap["pix&"](((srcy) & (ymask)));
        for (let x: any = cliprect.min_x; ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((x) + (1))) {
          let srcx: any = ((x) ^ (flipmask));
          if (skew) {
            srcx = ((srcx) + (runtime.add(((((vf) >>> (1))) ^ (255)), 1)));
            srcx = ((srcx) + (flipoffs));
          }
          runtime.writeIndex(dst, x, ((runtime.readIndex(src, ((srcx) & (xmask)))) + (colorbase)));
        }
      }
    } else {
      (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"]((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) ?? 0) : (runtime.calls["fill"]?.((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) ?? 0));
    }
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, flipxmask: any, flipymask: any) {
    const members = runtime.members;
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let spriteram: any = h_m_spriteram;
    let gfx: any = (runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : (runtime.calls["gfx"]?.(2) ?? 0));
    let flip: any = (members.m_flip_screen ?? runtime.member("m_flip_screen"));
    let flipmask: any = ((flip) ? (255) : (0));
    let offs: any = 0;
    for (offs = 124; ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (4))) {
      let sy: any = (runtime.overrides["find_minimum_y"] ? runtime.overrides["find_minimum_y"](runtime.readIndex(spriteram, offs), flip) : method_find_minimum_y(runtime, runtime.readIndex(spriteram, offs), flip));
      let flipy: any = ((((runtime.readIndex(spriteram, ((offs) + (((flipymask) >>> (8)))))) ^ (flipmask))) & (flipymask));
      let flipx: any = ((((runtime.readIndex(spriteram, ((offs) + (((flipxmask) >>> (8)))))) ^ (flipmask))) & (flipxmask));
      let code: any = runtime.readIndex(spriteram, ((offs) + (1)));
      let color: any = runtime.add(((runtime.readIndex(spriteram, ((offs) + (2)))) & (31)), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (5)));
      let sx: any = (runtime.overrides["find_minimum_x"] ? runtime.overrides["find_minimum_x"](runtime.readIndex(spriteram, ((offs) + (3))), flip) : method_find_minimum_x(runtime, runtime.readIndex(spriteram, ((offs) + (3))), flip));
      (runtime.calls["gfx.transpen"] ? runtime.calls["gfx.transpen"](bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0) ?? 0) : (runtime.calls["transpen"]?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0) ?? 0));
      (runtime.calls["gfx.transpen"] ? runtime.calls["gfx.transpen"](bitmap, cliprect, code, color, flipx, flipy, sx, ((sy) - (256)), 0) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, code, color, flipx, flipy, sx, ((sy) - (256)), 0) ?? 0) : (runtime.calls["transpen"]?.(bitmap, cliprect, code, color, flipx, flipy, sx, ((sy) - (256)), 0) ?? 0));
      (runtime.calls["gfx.transpen"] ? runtime.calls["gfx.transpen"](bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, 0) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, 0) ?? 0) : (runtime.calls["transpen"]?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, 0) ?? 0));
      (runtime.calls["gfx.transpen"] ? runtime.calls["gfx.transpen"](bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), ((sy) - (256)), 0) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), ((sy) - (256)), 0) ?? 0) : (runtime.calls["transpen"]?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), ((sy) - (256)), 0) ?? 0));
    }
  }

  function method_find_minimum_y(runtime: any, value: any, flip: any) {
    const members = runtime.members;
    let flipmask: any = ((flip) ? (255) : (0));
    let flipconst: any = ((flip) ? (239) : (241));
    let y: any = 0;
    for (y = 0; ((Number(y) < Number(256)) ? 1 : 0); y = ((y) + (16))) {
      let sum: any = runtime.add(runtime.add(((value) + (flipconst)), 1), ((y) ^ (flipmask)));
      if (((Number(((sum) & (224))) === Number(224)) ? 1 : 0)) {
        break;
      }
    }
    while (1) {
      let sum: any = runtime.add(runtime.add(((value) + (flipconst)), 1), ((((y) - (1))) ^ (flipmask)));
      if (((Number(((sum) & (224))) !== Number(224)) ? 1 : 0)) {
        break;
      }
      y = ((y) - (1));
    }
    return ((((y) + (1))) & (255));
  }

  function method_find_minimum_x(runtime: any, value: any, flip: any) {
    const members = runtime.members;
    let flipmask: any = ((flip) ? (255) : (0));
    let x: any = 0;
    x = ((runtime.add(((value) + (239)), 1)) ^ (flipmask));
    if (flipmask) {
      x = ((x) - (31));
    }
    return ((x) & (255));
  }

  function method_vblank_int(runtime: any, state: any) {
    const members = runtime.members;
    if ((((state) && ((members.m_int_enabled ?? runtime.member("m_int_enabled")))) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
    }
  }
  return {
    "zaxxon_videoram_w": method_zaxxon_videoram_w,
    "bg_position_w": method_bg_position_w,
    "zaxxon_get_fg_tile_info": method_zaxxon_get_fg_tile_info,
    "zaxxon_sound_a_w": method_zaxxon_sound_a_w,
    "zaxxon_sound_b_w": method_zaxxon_sound_b_w,
    "zaxxon_sound_c_w": method_zaxxon_sound_c_w,
    "flipscreen_w": method_flipscreen_w,
    "int_enable_w": method_int_enable_w,
    "fg_color_w": method_fg_color_w,
    "bg_color_w": method_bg_color_w,
    "bg_enable_w": method_bg_enable_w,
    "screen_update_zaxxon": method_screen_update_zaxxon,
    "draw_background": method_draw_background,
    "draw_sprites": method_draw_sprites,
    "find_minimum_y": method_find_minimum_y,
    "find_minimum_x": method_find_minimum_x,
    "vblank_int": method_vblank_int
  };
})();
    return {
      "zaxxon_state.zaxxon_videoram_w": methods["zaxxon_videoram_w"],
      "zaxxon_state.bg_position_w": methods["bg_position_w"],
      "zaxxon_state.zaxxon_get_fg_tile_info": methods["zaxxon_get_fg_tile_info"],
      "zaxxon_state.zaxxon_sound_a_w": methods["zaxxon_sound_a_w"],
      "zaxxon_state.zaxxon_sound_b_w": methods["zaxxon_sound_b_w"],
      "zaxxon_state.zaxxon_sound_c_w": methods["zaxxon_sound_c_w"],
      "zaxxon_state.flipscreen_w": methods["flipscreen_w"],
      "zaxxon_state.int_enable_w": methods["int_enable_w"],
      "zaxxon_state.fg_color_w": methods["fg_color_w"],
      "zaxxon_state.bg_color_w": methods["bg_color_w"],
      "zaxxon_state.bg_enable_w": methods["bg_enable_w"],
      "zaxxon_state.screen_update_zaxxon": methods["screen_update_zaxxon"],
      "zaxxon_state.draw_background": methods["draw_background"],
      "zaxxon_state.draw_sprites": methods["draw_sprites"],
      "zaxxon_state.find_minimum_y": methods["find_minimum_y"],
      "zaxxon_state.find_minimum_x": methods["find_minimum_x"],
      "zaxxon_state.vblank_int": methods["vblank_int"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
