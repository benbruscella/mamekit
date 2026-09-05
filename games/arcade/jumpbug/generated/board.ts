// GENERATED executable machine composition from src/mame/galaxian/galaxian.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'jumpbug');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_galaxian_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_galaxian_objram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    const h_m_frogger_adjust = members.m_frogger_adjust ?? runtime.member("m_frogger_adjust");
    const h_m_sfx_adjust = members.m_sfx_adjust ?? runtime.member("m_sfx_adjust");
    const h_m_x_scale = members.m_x_scale ?? runtime.member("m_x_scale");
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data);
    if (((Number(offset) < Number(64)) ? 1 : 0)) {
      if (((Number(((offset) & (1))) === Number(0)) ? 1 : 0)) {
        if (h_m_frogger_adjust) {
          data = ((((((data) >>> (4))) | (((data) << (4))))) & 0xff);
        }
        if (((h_m_sfx_adjust) ? 0 : 1)) {
          (runtime.calls["m_bg_tilemap.set_scrolly"] ? runtime.calls["m_bg_tilemap.set_scrolly"](((offset) >>> (1)), data) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(((offset) >>> (1)), data) ?? 0) : (runtime.calls["set_scrolly"]?.(((offset) >>> (1)), data) ?? 0));
        } else {
          (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](((offset) >>> (1)), ((h_m_x_scale) * (data))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(((offset) >>> (1)), ((h_m_x_scale) * (data))) ?? 0) : (runtime.calls["set_scrollx"]?.(((offset) >>> (1)), ((h_m_x_scale) * (data))) ?? 0));
        }
      } else {
        for (offset = ((offset) >>> (1)); ((Number(offset) < Number(1024)) ? 1 : 0); offset = ((offset) + (32))) {
          (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
        }
      }
    }
  }

  function method_start_lamp_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_lamps"), offset, (((data) >>> (0)) & 1));
  }

  function method_irq_enable_w(runtime: any, data: any) {
    const members = runtime.members;
    const h_m_irq_line = members.m_irq_line ?? runtime.member("m_irq_line");
    members.m_irq_enabled = ((((data) & (1))) & 0xff);
    if ((((members.m_irq_enabled ?? runtime.member("m_irq_enabled"))) ? 0 : 1)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](h_m_irq_line, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(h_m_irq_line, 0) ?? 0) : (runtime.calls["set_input_line"]?.(h_m_irq_line, 0) ?? 0));
    }
  }

  function method_galaxian_stars_enable_w(runtime: any, data: any) {
    const members = runtime.members;
    if ((((((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) ^ (data))) & (1))) {
      (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    }
    if (((((((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) ? 0 : 1)) && (((data) & (1)))) ? 1 : 0)) {
      members.m_star_rng_origin = ((((131071) - (runtime.add((((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) * (512)), (runtime.calls["m_screen.hpos"] ? runtime.calls["m_screen.hpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).hpos === 'function' ? (runtime.dereference(members.m_screen)).hpos() : typeof (runtime.dereference(members.m_screen)).hpos === 'number' || typeof (runtime.dereference(members.m_screen)).hpos === 'boolean' ? (runtime.dereference(members.m_screen)).hpos : runtime.container(members.m_screen, "hpos")) : (runtime.calls["hpos"]?.() ?? 0)))))) >>> 0);
      members.m_star_rng_origin_frame = (((runtime.calls["m_screen.frame_number"] ? runtime.calls["m_screen.frame_number"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).frame_number === 'function' ? (runtime.dereference(members.m_screen)).frame_number() : typeof (runtime.dereference(members.m_screen)).frame_number === 'number' || typeof (runtime.dereference(members.m_screen)).frame_number === 'boolean' ? (runtime.dereference(members.m_screen)).frame_number : runtime.container(members.m_screen, "frame_number")) : (runtime.calls["frame_number"]?.() ?? 0))) >>> 0);
    }
    members.m_stars_enabled = ((((data) & (1))) & 0xff);
  }

  function method_galaxian_flip_screen_x_w(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) !== Number(((data) & (1)))) ? 1 : 0)) {
      (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
      (runtime.overrides["stars_update_origin"] ? runtime.overrides["stars_update_origin"]() : method_stars_update_origin(runtime));
      members.m_flipscreen_x = ((((data) & (1))) & 0xff);
      (runtime.calls["m_bg_tilemap.set_flip"] ? runtime.calls["m_bg_tilemap.set_flip"]((((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (0))) | ((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (2) : (0))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_flip?.((((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (0))) | ((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (2) : (0))))) ?? 0) : (runtime.calls["set_flip"]?.((((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (0))) | ((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (2) : (0))))) ?? 0));
    }
  }

  function method_stars_update_origin(runtime: any) {
    const members = runtime.members;
    let curframe: any = (runtime.calls["m_screen.frame_number"] ? runtime.calls["m_screen.frame_number"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).frame_number === 'function' ? (runtime.dereference(members.m_screen)).frame_number() : typeof (runtime.dereference(members.m_screen)).frame_number === 'number' || typeof (runtime.dereference(members.m_screen)).frame_number === 'boolean' ? (runtime.dereference(members.m_screen)).frame_number : runtime.container(members.m_screen, "frame_number")) : (runtime.calls["frame_number"]?.() ?? 0));
    if (((Number(curframe) !== Number((members.m_star_rng_origin_frame ?? runtime.member("m_star_rng_origin_frame")))) ? 1 : 0)) {
      let per_frame_delta: any = (((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : ((-1)));
      let total_delta: any = ((per_frame_delta) * (((curframe) - ((members.m_star_rng_origin_frame ?? runtime.member("m_star_rng_origin_frame"))))));
      while (((Number(total_delta) < Number(0)) ? 1 : 0)) {
        total_delta = ((total_delta) + (131071));
      }
      members.m_star_rng_origin = (((((((members.m_star_rng_origin ?? runtime.member("m_star_rng_origin"))) + (total_delta))) % (131071))) >>> 0);
      members.m_star_rng_origin_frame = ((curframe) >>> 0);
    }
  }

  function method_galaxian_flip_screen_y_w(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) !== Number(((data) & (1)))) ? 1 : 0)) {
      (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
      members.m_flipscreen_y = ((((data) & (1))) & 0xff);
      (runtime.calls["m_bg_tilemap.set_flip"] ? runtime.calls["m_bg_tilemap.set_flip"]((((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (0))) | ((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (2) : (0))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_flip?.((((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (0))) | ((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (2) : (0))))) ?? 0) : (runtime.calls["set_flip"]?.((((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (0))) | ((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (2) : (0))))) ?? 0));
    }
  }

  function method_galaxian_gfxbank_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((Number(runtime.readIndex((members.m_gfxbank ?? runtime.member("m_gfxbank")), offset)) !== Number(data)) ? 1 : 0)) {
      (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
      runtime.writeIndex(runtime.writableMember("m_gfxbank"), offset, data);
      (runtime.calls["m_bg_tilemap.mark_all_dirty"] ? runtime.calls["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
    }
  }

  function method_jumpbug_protection_r(runtime: any, offset: any) {
    const members = runtime.members;
    switch (offset) {
      case 276:
      {
        return 79;
      }
      case 280:
      {
        return 211;
      }
      case 532:
      {
        return 207;
      }
      case 565:
      {
        return 2;
      }
      case 785:
      {
        return 255;
      }
    }
    0;
    return 255;
  }

  function method_sprites_clip(runtime: any, screen: any, cliprect: any) {
    const members = runtime.members;
    const h_m_x_scale = members.m_x_scale ?? runtime.member("m_x_scale");
    let clip: any = Object.assign(Object.create(Object.getPrototypeOf((runtime.calls["screen.visible_area"] ? runtime.calls["screen.visible_area"]() : (screen) != null ? (typeof (runtime.dereference(screen)).visible_area === 'function' ? (runtime.dereference(screen)).visible_area() : typeof (runtime.dereference(screen)).visible_area === 'number' || typeof (runtime.dereference(screen)).visible_area === 'boolean' ? (runtime.dereference(screen)).visible_area : runtime.container(screen, "visible_area")) : (runtime.calls["visible_area"]?.() ?? 0)))), (runtime.calls["screen.visible_area"] ? runtime.calls["screen.visible_area"]() : (screen) != null ? (typeof (runtime.dereference(screen)).visible_area === 'function' ? (runtime.dereference(screen)).visible_area() : typeof (runtime.dereference(screen)).visible_area === 'number' || typeof (runtime.dereference(screen)).visible_area === 'boolean' ? (runtime.dereference(screen)).visible_area : runtime.container(screen, "visible_area")) : (runtime.calls["visible_area"]?.() ?? 0)));
    if ((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) {
      clip.max_x = ((((((256) - (runtime.add(16, 1)))) * (h_m_x_scale))) - (1));
    } else {
      clip.min_x = ((runtime.add(16, 1)) * (h_m_x_scale));
    }
    cliprect = runtime.andAssign(cliprect, clip);
    return cliprect;
  }

  function method_bullets_draw(runtime: any, screen: any, bitmap: any, cliprect: any, base: any) {
    const members = runtime.members;
    for (let y: any = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
      let shell: any = ((255) & 0xff);
      let missile: any = ((255) & 0xff);
      let effy: any = ((0) & 0xff);
      effy = (((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (((((y) - (1))) ^ (255))) : (((y) - (1))))) & 0xff);
      for (let which: any = 0; ((Number(which) < Number(3)) ? 1 : 0); which = ((which) + (1))) {
        if (((Number(((((runtime.readIndex(base, runtime.add(((which) * (4)), 1))) + (effy))) & 0xff)) === Number(255)) ? 1 : 0)) {
          shell = ((which) & 0xff);
        }
      }
      effy = (((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (((y) ^ (255))) : (y))) & 0xff);
      for (let which: any = 3; ((Number(which) < Number(8)) ? 1 : 0); which = ((which) + (1))) {
        if (((Number(((((runtime.readIndex(base, runtime.add(((which) * (4)), 1))) + (effy))) & 0xff)) === Number(255)) ? 1 : 0)) {
          if (((Number(which) !== Number(7)) ? 1 : 0)) {
            shell = ((which) & 0xff);
          } else {
            missile = ((which) & 0xff);
          }
        }
      }
      if (((Number(shell) !== Number(255)) ? 1 : 0)) {
        (runtime.calls["m_draw_bullet_ptr"] ? runtime.calls["m_draw_bullet_ptr"](bitmap, cliprect, shell, ((255) - (runtime.readIndex(base, runtime.add(((shell) * (4)), 3)))), y) : runtime.macro("m_draw_bullet_ptr", bitmap, cliprect, shell, ((255) - (runtime.readIndex(base, runtime.add(((shell) * (4)), 3)))), y));
      }
      if (((Number(missile) !== Number(255)) ? 1 : 0)) {
        (runtime.calls["m_draw_bullet_ptr"] ? runtime.calls["m_draw_bullet_ptr"](bitmap, cliprect, missile, ((255) - (runtime.readIndex(base, runtime.add(((missile) * (4)), 3)))), y) : runtime.macro("m_draw_bullet_ptr", bitmap, cliprect, missile, ((255) - (runtime.readIndex(base, runtime.add(((missile) * (4)), 3)))), y));
      }
    }
  }

  function method_vblank_interrupt_w(runtime: any, state: any) {
    const members = runtime.members;
    const h_m_irq_line = members.m_irq_line ?? runtime.member("m_irq_line");
    if ((((state) && ((members.m_irq_enabled ?? runtime.member("m_irq_enabled")))) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](h_m_irq_line, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(h_m_irq_line, 1) ?? 0) : (runtime.calls["set_input_line"]?.(h_m_irq_line, 1) ?? 0));
    }
  }

  function method_jumpbug_draw_background(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"]((((members.m_background_enable ?? runtime.member("m_background_enable"))) ? ((runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](0, 0, 86) : runtime.macro("rgb_t", 0, 0, 86))) : ((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")))), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((((members.m_background_enable ?? runtime.member("m_background_enable"))) ? ((runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](0, 0, 86) : runtime.macro("rgb_t", 0, 0, 86))) : ((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")))), cliprect) ?? 0) : (runtime.calls["fill"]?.((((members.m_background_enable ?? runtime.member("m_background_enable"))) ? ((runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](0, 0, 86) : runtime.macro("rgb_t", 0, 0, 86))) : ((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")))), cliprect) ?? 0));
    (runtime.overrides["stars_update_origin"] ? runtime.overrides["stars_update_origin"]() : method_stars_update_origin(runtime));
    if ((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) {
      for (let y: any = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
        let star_offs: any = ((runtime.add((members.m_star_rng_origin ?? runtime.member("m_star_rng_origin")), ((y) * (512)))) >>> 0);
        (runtime.overrides["stars_draw_row"] ? runtime.overrides["stars_draw_row"](bitmap, 232, y, star_offs, 255) : method_stars_draw_row(runtime, bitmap, 232, y, star_offs, 255));
      }
    }
  }

  function method_stars_draw_row(runtime: any, bitmap: any, maxx: any, y: any, star_offs: any, starmask: any) {
    const members = runtime.members;
    const h_m_x_scale = members.m_x_scale ?? runtime.member("m_x_scale");
    star_offs = ((((star_offs) % (131071))) >>> 0);
    for (let x: any = 0; ((Number(x) < Number(maxx)) ? 1 : 0); x = ((x) + (1))) {
      let enable_star: any = ((((y) ^ (((x) >>> (3))))) & (1));
      let star: any = ((0) & 0xff);
      star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (() => { const previous = star_offs; star_offs = ((((star_offs) + (1))) >>> 0); return previous; })())) & 0xff);
      if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
        star_offs = ((0) >>> 0);
      }
      if (((((((enable_star) && (((Number(((star) & (128))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(((star) & (starmask))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
        bitmap["pix="](y, runtime.add(((h_m_x_scale) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
      }
      star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (() => { const previous = star_offs; star_offs = ((((star_offs) + (1))) >>> 0); return previous; })())) & 0xff);
      if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
        star_offs = ((0) >>> 0);
      }
      if (((((((enable_star) && (((Number(((star) & (128))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(((star) & (starmask))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
        bitmap["pix="](y, runtime.add(((h_m_x_scale) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
        bitmap["pix="](y, runtime.add(((h_m_x_scale) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
      }
    }
  }
  return {
    "galaxian_videoram_w": method_galaxian_videoram_w,
    "galaxian_objram_w": method_galaxian_objram_w,
    "start_lamp_w": method_start_lamp_w,
    "irq_enable_w": method_irq_enable_w,
    "galaxian_stars_enable_w": method_galaxian_stars_enable_w,
    "galaxian_flip_screen_x_w": method_galaxian_flip_screen_x_w,
    "stars_update_origin": method_stars_update_origin,
    "galaxian_flip_screen_y_w": method_galaxian_flip_screen_y_w,
    "galaxian_gfxbank_w": method_galaxian_gfxbank_w,
    "jumpbug_protection_r": method_jumpbug_protection_r,
    "bullets_draw": method_bullets_draw,
    "vblank_interrupt_w": method_vblank_interrupt_w,
    "jumpbug_draw_background": method_jumpbug_draw_background,
    "stars_draw_row": method_stars_draw_row
  };
})();
    return {
      "galaxian_state.galaxian_videoram_w": methods["galaxian_videoram_w"],
      "galaxian_state.galaxian_objram_w": methods["galaxian_objram_w"],
      "galaxian_state.start_lamp_w": methods["start_lamp_w"],
      "galaxian_state.irq_enable_w": methods["irq_enable_w"],
      "galaxian_state.galaxian_stars_enable_w": methods["galaxian_stars_enable_w"],
      "galaxian_state.galaxian_flip_screen_x_w": methods["galaxian_flip_screen_x_w"],
      "galaxian_state.stars_update_origin": methods["stars_update_origin"],
      "galaxian_state.galaxian_flip_screen_y_w": methods["galaxian_flip_screen_y_w"],
      "galaxian_state.galaxian_gfxbank_w": methods["galaxian_gfxbank_w"],
      "galaxian_state.jumpbug_protection_r": methods["jumpbug_protection_r"],
      "galaxian_state.bullets_draw": methods["bullets_draw"],
      "galaxian_state.vblank_interrupt_w": methods["vblank_interrupt_w"],
      "galaxian_state.jumpbug_draw_background": methods["jumpbug_draw_background"],
      "galaxian_state.stars_draw_row": methods["stars_draw_row"],
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
