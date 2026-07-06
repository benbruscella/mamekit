// Capcom Ghosts'n Goblins board video renderer.
//
// Hand-transpiled from MAME ground truth (all video code lives in the driver
// file src/mame/capcom/gng.cpp; there is no gng_v.cpp in the modern tree):
//   - get_fg_tile_info (gng.cpp:116-123): code = fgvideoram[i] +
//     ((attr & 0xc0) << 2), attr = fgvideoram[i + 0x400], color = attr & 0x0f,
//     TILE_FLIPYX((attr & 0x30) >> 4) (bit 4 = flipx, bit 5 = flipy).
//   - get_bg_tile_info (gng.cpp:125-134): same code/flip extraction from
//     bgvideoram, color = attr & 0x07, tileinfo.group = (attr & 0x08) >> 3.
//   - video_start (gng.cpp:143-152): fg = 32x32 TILEMAP_SCAN_ROWS of 8x8
//     chars with transparent pen 3; bg = 32x32 TILEMAP_SCAN_COLS of 16x16
//     tiles, split type: set_transmask(0, 0xff, 0x00) (group 0 totally
//     transparent in the front half, fully drawn in the back half) and
//     set_transmask(1, 0x41, 0xbe) (group 1: pens 0 and 6 transparent in
//     front, drawn in back; the complement the other way round).
//     tilemap.cpp:574-585: pen drawn in a half iff its mask bit is CLEAR.
//   - bgscrollx_w / bgscrolly_w (gng.cpp:180-190): two latched bytes each,
//     set_scrollx/y(0, lo + 256 * hi) — the board combines them and hands
//     the 0..511 value to scrollx()/scrolly().
//   - draw_sprites (gng.cpp:195-221): from the BUFFERED spriteram copy
//     (0x200 bytes; buffered_spriteram8_device, DMA triggered by the 0x3c00
//     write — the board owns the buffering), offs from END down to 0 step 4
//     (LOWER offsets drawn later, i.e. on top):
//       attr  = sr[offs + 1]
//       sx    = sr[offs + 3] - 0x100 * (attr & 0x01)
//       sy    = sr[offs + 2]                    (full-bitmap coordinates)
//       flipx = attr & 0x04, flipy = attr & 0x08
//       code  = sr[offs] + ((attr << 2) & 0x300)
//       color = (attr >> 4) & 3, transpen 15
//     flip_screen: sx = 240 - sx, sy = 240 - sy, flips inverted.
//   - screen_update (gng.cpp:222-229): bg LAYER1 (back halves) -> sprites ->
//     bg LAYER0 (front halves) -> fg.
//   - gfx layouts + gfx_gng (gng.cpp:494-536): charlayout 8x8x2 packed
//     nibbles {4,0}; tilelayout 16x16x3 RGN_FRAC(1,3) planar; spritelayout
//     16x16x4 RGN_FRAC(1,2)+{4,0}.  Palette bases: tiles 0x00 (8 colors x 8
//     pens), sprites 0x40 (4 x 16), chars 0x80 (16 x 4).
//   - palette (gng.cpp:602): PALETTE(...).set_format(palette_device::RGBx_444,
//     256) with split basemem/extmem shares ("palette" at 0x3900-0x39ff,
//     "palette_ext" at 0x3800-0x38ff).  emupal.h:355-362 (read_entry):
//     raw = base[i] | (ext[i] << 8); emupal.cpp:211-215: RGBx_444 =
//     RRRRGGGGBBBBxxxx = standard_rgb_decoder<4,4,4, 12,8,4>, so R = ext
//     high nibble, G = ext low nibble, B = base high nibble (base low nibble
//     unused), each expanded with pal4bit (n -> n * 17).
//   - screen (gng.cpp:595): set_raw(12MHz/2, 384, 0, 256, 262, 16, 240):
//     visible x 0..255, y 16..239 — the framebuffer holds the 256x224
//     visible window; tilemap/sprite coordinates are in full-bitmap space,
//     so fb y = bitmap y - 16.
//   - tilemap scroll semantics (tilemap.cpp:27-73, 1011-1017, 1064-1074):
//     source = (screen + scroll) mod size; flipped (flip_screen sets
//     TILEMAP_FLIPX|FLIPY on both layers): source = (xextent - 1 + scroll -
//     screen) mod size with xextent = yextent = visarea sum + 1 = 256 for
//     both axes here (dx/dy are 0), which also mirrors per-tile flips.
//
// Native (pre-rotation) resolution 256x224, ROT0.  Output pixels are packed
// 0xAABBGGRR (canvas ImageData byte order), alpha always 0xff.

import type { Regions, VideoRenderer } from '../types.ts';
import { decodeGfx } from '../gfx.ts';
import type { GfxLayout, GfxSet } from '../gfx.ts';

export interface GngVideoDeps {
  /** ROM regions: 'chars' (0x4000), 'tiles' (0x18000), 'sprites' (0x20000). */
  regions: Regions;
  /** fgvideoram share, 0x800 bytes (0x2000-0x27ff): tile at [i], attr at [i+0x400]. */
  fgram: () => Uint8Array;
  /** bgvideoram share, 0x800 bytes (0x2800-0x2fff): same layout. */
  bgram: () => Uint8Array;
  /** BUFFERED spriteram copy, 0x200 bytes (the board owns the 0x3c00 DMA). */
  spriteBuffer: () => Uint8Array;
  /** combined bg x scroll = lo + 256 * hi (0x3b08/0x3b09 latches). */
  scrollx: () => number;
  /** combined bg y scroll = lo + 256 * hi (0x3b0a/0x3b0b latches). */
  scrolly: () => number;
  /** "palette" share, 0x100 bytes (0x3900-0x39ff): raw LOW byte (B nibble). */
  paletteBase: () => Uint8Array;
  /** "palette_ext" share, 0x100 bytes (0x3800-0x38ff): raw HIGH byte (R,G). */
  paletteExt: () => Uint8Array;
  /** flip_screen state (mainlatch Q0, inverted — gng.cpp:584). */
  flip: () => boolean;
}

// ---------------------------------------------------------------------------
// gfx layouts — gng.cpp:494-529, verbatim.

export const GNG_CHAR_LAYOUT: GfxLayout = {
  width: 8,
  height: 8,
  total: 'RGN_FRAC(1,1)',
  planes: 2,
  planeOffsets: [4, 0],                                // packed nibbles
  xOffsets: [0, 1, 2, 3, 8, 9, 10, 11],                // { 0..3, 8+0..8+3 }
  yOffsets: [0, 16, 32, 48, 64, 80, 96, 112],          // { 0*16..7*16 }
  charIncrement: 16 * 8,
};

export const GNG_TILE_LAYOUT: GfxLayout = {
  width: 16,
  height: 16,
  total: 'RGN_FRAC(1,3)',
  planes: 3,
  planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'],
  // { 0..7, 16*8+0..16*8+7 }
  xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 128, 129, 130, 131, 132, 133, 134, 135],
  // { 0*8..15*8 }
  yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120],
  charIncrement: 32 * 8,
};

export const GNG_SPRITE_LAYOUT: GfxLayout = {
  width: 16,
  height: 16,
  total: 'RGN_FRAC(1,2)',
  planes: 4,
  planeOffsets: ['RGN_FRAC(1,2)+4', 'RGN_FRAC(1,2)+0', 4, 0],
  // { 0..3, 8+0..8+3, 32*8+0..32*8+3, 33*8+0..33*8+3 }
  xOffsets: [0, 1, 2, 3, 8, 9, 10, 11, 256, 257, 258, 259, 264, 265, 266, 267],
  // { 0*16..15*16 }
  yOffsets: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240],
  charIncrement: 64 * 8,
};

// bg split-layer transmasks (video_start, gng.cpp:150-151), indexed by
// tileinfo.group.  A pen is drawn in a half iff its mask bit is CLEAR
// (tilemap.cpp:574-585).
export const GNG_BG_FRONT_MASKS: readonly number[] = [0xff, 0x41]; // LAYER0
export const GNG_BG_BACK_MASKS: readonly number[] = [0x00, 0xbe];  // LAYER1

// GFXDECODE palette bases (gng.cpp:531-535)
const TILE_PAL_BASE = 0x00;   // 8 colors x 8 pens  -> 0x00-0x3f
const SPRITE_PAL_BASE = 0x40; // 4 colors x 16 pens -> 0x40-0x7f
const CHAR_PAL_BASE = 0x80;   // 16 colors x 4 pens -> 0x80-0xbf

// ---------------------------------------------------------------------------
// palette — RGBx_444 with split ext memory (see header comment)

/**
 * Rebuild the 256 packed 0xAABBGGRR pens from the two palette RAM byte
 * planes.  raw16 = base | (ext << 8); RGBx_444 = RRRRGGGGBBBBxxxx
 * (standard_rgb_decoder<4,4,4, 12,8,4>), nibbles pal4bit-expanded (n * 17).
 */
export function buildGngPens(base: Uint8Array, ext: Uint8Array, out: Uint32Array): void {
  for (let i = 0; i < 256; i++) {
    const e = ext[i]!;
    const b = base[i]!;
    const r = (e >> 4) * 17;        // raw bits 15-12
    const g = (e & 0x0f) * 17;      // raw bits 11-8
    const bl = (b >> 4) * 17;       // raw bits 7-4 (bits 3-0 unused)
    out[i] = (0xff000000 | (bl << 16) | (g << 8) | r) >>> 0;
  }
}

// ---------------------------------------------------------------------------
// screen geometry (gng.cpp:595 set_raw): visible x 0..255, y 16..239

const VBEND = 16;
const NATIVE_W = 256;
const NATIVE_H = 224;
// flip pivot (tilemap.cpp:1011-1013): visarea.left+right+1 = visarea.top+
// bottom+1 = 256 for both axes
const XYEXTENT = 256;

const BLACK = 0xff000000;

/**
 * ROMREGION_ERASEFF normalization (gng.cpp ROM_START: the "sprites" region
 * is declared ROMREGION_ERASEFF and only loads 3 of 4 x 0x4000 chunks per
 * half — bytes 0xc000-0xffff and 0x1c000-0x1ffff are 0xff erase-fill on the
 * real board, which decodes sprite codes 0x300-0x3ff to solid pen 15 =
 * transparent).  A zero-filled loader would decode them to opaque pen 0
 * instead (and GnG does address that range — see the driver's "bad sprite"
 * note), so all-zero gap windows are restored to the hardware 0xff fill.
 * (A copy is normalized; the caller's region is never mutated.)
 */
function normalizeSpriteRegion(region: Uint8Array): Uint8Array {
  let copy: Uint8Array | null = null;
  for (const start of [0xc000, 0x1c000]) {
    let allZero = true;
    for (let i = start; i < start + 0x4000; i++) {
      if (region[i] !== 0) { allZero = false; break; }
    }
    if (allZero) {
      if (!copy) copy = region.slice(0, 0x20000);
      copy.fill(0xff, start, start + 0x4000);
    }
  }
  return copy ?? region;
}

// ---------------------------------------------------------------------------

export class GngVideo implements VideoRenderer {
  readonly width: number = NATIVE_W;
  readonly height: number = NATIVE_H;

  private readonly deps: GngVideoDeps;
  private readonly charGfx: GfxSet;    // 1024 8x8 2bpp chars
  private readonly tileGfx: GfxSet;    // 1024 16x16 3bpp tiles
  private readonly spriteGfx: GfxSet;  // 1024 16x16 4bpp sprites
  private readonly pens = new Uint32Array(256);

  constructor(deps: GngVideoDeps) {
    const chars = deps.regions['chars'];
    const tiles = deps.regions['tiles'];
    const sprites = deps.regions['sprites'];
    if (!chars || !tiles || !sprites) {
      throw new Error('gng video: missing chars/tiles/sprites region');
    }
    if (chars.length < 0x4000 || tiles.length < 0x18000 || sprites.length < 0x20000) {
      throw new Error('gng video: gfx region too small');
    }

    this.deps = deps;
    this.charGfx = decodeGfx(GNG_CHAR_LAYOUT, chars);
    this.tileGfx = decodeGfx(GNG_TILE_LAYOUT, tiles);
    this.spriteGfx = decodeGfx(GNG_SPRITE_LAYOUT, normalizeSpriteRegion(sprites));
  }

  /** Sprite buffering is the board's job (0x3c00 DMA); nothing to latch. */
  vblank(): void {}

  /** Port of gng_state::screen_update (gng.cpp:222-229). */
  render(frame: Uint32Array): void {
    const flip = this.deps.flip();
    buildGngPens(this.deps.paletteBase(), this.deps.paletteExt(), this.pens);

    // MAME leaves untouched bitmap pixels stale; in practice every pixel is
    // covered by the union of the two bg halves.  Fill black for determinism.
    frame.fill(BLACK);

    this.drawBg(frame, GNG_BG_BACK_MASKS, flip);   // TILEMAP_DRAW_LAYER1
    this.drawSprites(frame, flip);
    this.drawBg(frame, GNG_BG_FRONT_MASKS, flip);  // TILEMAP_DRAW_LAYER0
    this.drawFg(frame, flip);
  }

  /**
   * bg tilemap: 32x32 TILEMAP_SCAN_COLS (index = col * 32 + row) of 16x16
   * tiles = 512x512 px, scrolled by the combined latches; split draw with
   * the per-group transmasks (pen drawn iff its mask bit is clear).
   */
  private drawBg(frame: Uint32Array, masks: readonly number[], flip: boolean): void {
    const ram = this.deps.bgram();
    const pix = this.tileGfx.pixels;
    const pens = this.pens;
    const scrollx = this.deps.scrollx() & 0x1ff;
    const scrolly = this.deps.scrolly() & 0x1ff;

    for (let fby = 0; fby < NATIVE_H; fby++) {
      const sy = fby + VBEND; // full-bitmap y
      const srcY = (flip ? XYEXTENT - 1 + scrolly - sy : sy + scrolly) & 0x1ff;
      const rowInTile = srcY & 15;
      const tileRow = srcY >> 4;
      const dstRow = fby * NATIVE_W;

      for (let fbx = 0; fbx < NATIVE_W; fbx++) {
        const srcX = (flip ? XYEXTENT - 1 + scrollx - fbx : fbx + scrollx) & 0x1ff;
        const idx = ((srcX >> 4) << 5) | tileRow; // SCAN_COLS
        const attr = ram[idx + 0x400]!;
        const code = (ram[idx]! + ((attr & 0xc0) << 2)) & 0x3ff;
        const mask = masks[(attr & 0x08) >> 3]!;
        const px = (attr & 0x10) ? 15 - (srcX & 15) : srcX & 15;
        const py = (attr & 0x20) ? 15 - rowInTile : rowInTile;
        const pen = pix[(code << 8) | (py << 4) | px]!;
        if ((mask >> pen) & 1) continue;
        frame[dstRow + fbx] = pens[TILE_PAL_BASE + ((attr & 0x07) << 3) + pen]!;
      }
    }
  }

  /**
   * fg tilemap: 32x32 TILEMAP_SCAN_ROWS (index = row * 32 + col) of 8x8
   * chars = 256x256 px, no scroll, transparent pen 3.
   */
  private drawFg(frame: Uint32Array, flip: boolean): void {
    const ram = this.deps.fgram();
    const pix = this.charGfx.pixels;
    const pens = this.pens;

    for (let fby = 0; fby < NATIVE_H; fby++) {
      const sy = fby + VBEND;
      const srcY = (flip ? XYEXTENT - 1 - sy : sy) & 0xff;
      const rowInTile = srcY & 7;
      const rowBase = (srcY >> 3) << 5;
      const dstRow = fby * NATIVE_W;

      for (let fbx = 0; fbx < NATIVE_W; fbx++) {
        const srcX = (flip ? XYEXTENT - 1 - fbx : fbx) & 0xff;
        const idx = rowBase | (srcX >> 3); // SCAN_ROWS
        const attr = ram[idx + 0x400]!;
        const code = (ram[idx]! + ((attr & 0xc0) << 2)) & 0x3ff;
        const px = (attr & 0x10) ? 7 - (srcX & 7) : srcX & 7;
        const py = (attr & 0x20) ? 7 - rowInTile : rowInTile;
        const pen = pix[(code << 6) | (py << 3) | px]!;
        if (pen === 3) continue; // set_transparent_pen(3)
        frame[dstRow + fbx] = pens[CHAR_PAL_BASE + ((attr & 0x0f) << 2) + pen]!;
      }
    }
  }

  /** Port of gng_state::draw_sprites (gng.cpp:195-221). */
  private drawSprites(frame: Uint32Array, flip: boolean): void {
    const sr = this.deps.spriteBuffer();
    const pix = this.spriteGfx.pixels;
    const pens = this.pens;

    for (let offs = sr.length - 4; offs >= 0; offs -= 4) {
      const attr = sr[offs + 1]!;
      let sx = sr[offs + 3]! - 0x100 * (attr & 0x01);
      let sy = sr[offs + 2]!; // full-bitmap y
      let flipx = (attr & 0x04) !== 0;
      let flipy = (attr & 0x08) !== 0;

      if (flip) {
        sx = 240 - sx;
        sy = 240 - sy;
        flipx = !flipx;
        flipy = !flipy;
      }

      const code = (sr[offs]! + ((attr << 2) & 0x300)) & 0x3ff;
      const penBase = SPRITE_PAL_BASE + (((attr >> 4) & 3) << 4);
      const srcBase = code << 8;

      for (let py = 0; py < 16; py++) {
        const fby = sy + py - VBEND;
        if (fby < 0 || fby >= NATIVE_H) continue;
        const srcRow = srcBase + ((flipy ? 15 - py : py) << 4);
        const dstRow = fby * NATIVE_W;
        for (let px = 0; px < 16; px++) {
          const fbx = sx + px;
          if (fbx < 0 || fbx >= NATIVE_W) continue;
          const pen = pix[srcRow + (flipx ? 15 - px : px)]!;
          if (pen === 15) continue; // transpen 15
          frame[dstRow + fbx] = pens[penBase + pen]!;
        }
      }
    }
  }
}
