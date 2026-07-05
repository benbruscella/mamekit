// Structural self-test for the Galaga video renderer.
// Run with: node src/runtime/video/galaga.spec.ts   (plain Node, no DOM)
// Exit code 0 = all PASS.

import { decodeGfx } from '../gfx.ts';
import type { GfxLayout } from '../gfx.ts';
import { getNextLfsrState, Starfield05xx } from '../starfield05xx.ts';
import { buildGalagaPalette, tilemapScan, GalagaVideo } from './galaga.ts';

let failures = 0;
function check(name: string, cond: boolean, detail: string = ''): void {
  if (cond) {
    console.log(`PASS  ${name}${detail ? `  (${detail})` : ''}`);
  } else {
    console.error(`FAIL  ${name}${detail ? `  (${detail})` : ''}`);
    failures++;
  }
}

const hex = (v: number): string => '0x' + (v >>> 0).toString(16);

// ---------------------------------------------------------------------------
// (a) decodeGfx: hand-built 2bpp layout, exact pixel positions
{
  // 4x2 pixels, 2 planes at bit offsets 0 and 4, one row per byte.
  const layout: GfxLayout = {
    width: 4, height: 2, total: 2, planes: 2,
    planeOffsets: [0, 4],
    xOffsets: [0, 1, 2, 3],
    yOffsets: [0, 8],
    charIncrement: 16,
  };
  const rom = new Uint8Array([0b10100101, 0b11110000, 0b01010000, 0b00001111]);
  const set = decodeGfx(layout, rom);

  check('decodeGfx count/size', set.count === 2 && set.width === 4 && set.height === 2,
    `count=${set.count}`);
  // Element 0 row 0 (byte 0b10100101, MSB first):
  //   plane0 (MSB of pixel) bits 0..3 = 1,0,1,0 ; plane1 bits 4..7 = 0,1,0,1
  const e0r0 = [2, 1, 2, 1];
  const e0r1 = [2, 2, 2, 2]; // 0b11110000: plane0=1111, plane1=0000
  const e1r0 = [0, 2, 0, 2]; // 0b01010000
  const e1r1 = [1, 1, 1, 1]; // 0b00001111
  const expect = [...e0r0, ...e0r1, ...e1r0, ...e1r1];
  let ok = true;
  for (let i = 0; i < expect.length; i++) if (set.pixels[i] !== expect[i]) ok = false;
  check('decodeGfx exact pixels', ok, `[${Array.from(set.pixels).join(',')}]`);
}

// (a2) decodeGfx: RGN_FRAC total and RGN_FRAC(a,b)+n plane offset
{
  const layout: GfxLayout = {
    width: 4, height: 1, total: 'RGN_FRAC(1,2)', planes: 2,
    planeOffsets: [0, 'RGN_FRAC(1,2)+4'],
    xOffsets: [0, 1, 2, 3],
    yOffsets: [0],
    charIncrement: 4,
  };
  // regionBits = 16, RGN_FRAC(1,2) = 8 bits -> total = 8/4 = 2 elements.
  // Element 0: plane0 = bits 0..3 of byte0 (0xC3 -> 1,1,0,0),
  //            plane1 = bits 12..15 (byte1=0x0A -> 1,0,1,0)  => pixels 3,2,1,0
  const rom = new Uint8Array([0xc3, 0x0a]);
  const set = decodeGfx(layout, rom);
  check('decodeGfx RGN_FRAC total', set.count === 2, `count=${set.count}`);
  check('decodeGfx RGN_FRAC(1,2)+4 plane offset',
    set.pixels[0] === 3 && set.pixels[1] === 2 && set.pixels[2] === 1 && set.pixels[3] === 0,
    `[${set.pixels[0]},${set.pixels[1]},${set.pixels[2]},${set.pixels[3]}]`);
}

// ---------------------------------------------------------------------------
// (b) palette decode on a synthetic PROM
{
  const proms = new Uint8Array(0x220);
  proms[0] = 0x01; // red bit 0 (1 kohm)
  proms[1] = 0x02; // red bit 1 (470 ohm)
  proms[2] = 0x04; // red bit 2 (220 ohm)
  proms[3] = 0xff; // everything
  proms[4] = 0x40; // blue bit 0 (470 ohm)
  proms[5] = 0x80; // blue bit 1 (220 ohm)
  const pal = buildGalagaPalette(proms);

  const r = (v: number): number => v & 0xff;
  const g = (v: number): number => (v >>> 8) & 0xff;
  const b = (v: number): number => (v >>> 16) & 0xff;
  const a = (v: number): number => (v >>> 24) & 0xff;

  // Independently computed expectations (voltage dividers, autoscaled):
  //   Rn weight = 255 * (others||pd) / ((others||pd) + Rn), scale = 255/maxSum
  const par2 = (x: number, y: number): number => (x * y) / (x + y);
  const w1k = 255 * (par2(470, 220) / (par2(470, 220) + 1000));
  const w470 = 255 * (par2(1000, 220) / (par2(1000, 220) + 470));
  const w220 = 255 * (par2(1000, 470) / (par2(1000, 470) + 220));
  const scale = 255 / (w1k + w470 + w220); // R/G net has the largest sum
  const exp1k = Math.floor(w1k * scale + 0.5);
  const exp470 = Math.floor(w470 * scale + 0.5);
  const exp220 = Math.floor(w220 * scale + 0.5);
  const bLo = Math.floor(255 * (220 / 690) * scale + 0.5);
  const bHi = Math.floor(255 * (470 / 690) * scale + 0.5);

  // The classic MAME galaga weights: 0x21 / 0x47 / 0x97
  check('palette red weights are 0x21/0x47/0x97',
    exp1k === 0x21 && exp470 === 0x47 && exp220 === 0x97,
    `${hex(exp1k)},${hex(exp470)},${hex(exp220)}`);
  check('palette prom 0x01 -> r=0x21',
    r(pal.core[0]!) === exp1k && g(pal.core[0]!) === 0 && b(pal.core[0]!) === 0,
    `r=${hex(r(pal.core[0]!))}`);
  check('palette prom 0x02 -> r=0x47', r(pal.core[1]!) === exp470, `r=${hex(r(pal.core[1]!))}`);
  check('palette prom 0x04 -> r=0x97', r(pal.core[2]!) === exp220, `r=${hex(r(pal.core[2]!))}`);
  check('palette prom 0xff -> white',
    r(pal.core[3]!) === 255 && g(pal.core[3]!) === 255 && b(pal.core[3]!) === 255,
    hex(pal.core[3]!));
  check('palette blue weights', b(pal.core[4]!) === bLo && b(pal.core[5]!) === bHi,
    `${b(pal.core[4]!)},${b(pal.core[5]!)} expected ${bLo},${bHi}`);
  check('palette alpha always 0xff', a(pal.core[0]!) === 0xff && a(pal.stars[0]!) === 0xff);

  // Star palette: r/g nets have a 1k pulldown, blue does not; blue net sums
  // to exactly 255 and is the autoscale reference.
  const sLo = 255 * (par2(1000, 220) / (par2(1000, 220) + 470)); // 470 with pd
  const sHi = 255 * (par2(1000, 470) / (par2(1000, 470) + 220)); // 220 with pd
  const starWhiteRG = Math.floor(sLo + sHi + 0.5); // scale = 255/255 = 1
  check('star palette 0x3f',
    r(pal.stars[63]!) === starWhiteRG && g(pal.stars[63]!) === starWhiteRG && b(pal.stars[63]!) === 255,
    `rg=${r(pal.stars[63]!)} expected ${starWhiteRG}, b=${b(pal.stars[63]!)}`);
  check('star palette 0x00 is black', pal.stars[0] === 0xff000000, hex(pal.stars[0]!));

  // Transparency: char lut nibble 0x0f -> transparent (indirect pen 0x1f),
  // sprite lut nibble 0x0f -> transparent (indirect pen 0x0f).
  proms[0x020] = 0x0f;
  proms[0x021] = 0x0e;
  proms[0x120] = 0x1f; // & 0x0f == 0x0f -> transparent
  proms[0x121] = 0x00;
  const pal2 = buildGalagaPalette(proms);
  check('char/sprite transparency from lut nibble 0x0f',
    pal2.charTrans[0] === 1 && pal2.charTrans[1] === 0 &&
    pal2.spriteTrans[0] === 1 && pal2.spriteTrans[1] === 0);
  check('char lut maps into core 0x10..0x1f', pal2.charColor[1] === pal2.core[0x0e | 0x10]);
}

// ---------------------------------------------------------------------------
// (c) tilemap_scan mapper spot checks (derived from galaga_v.cpp:120-128)
{
  // Main window: col 2..33 -> offset (col-2) + (row+2)*32
  check('tilemap_scan (2,0) -> 64', tilemapScan(2, 0) === 64, `${tilemapScan(2, 0)}`);
  check('tilemap_scan (33,27) -> 959', tilemapScan(33, 27) === 959, `${tilemapScan(33, 27)}`);
  // Left wrap columns: col 0 -> (col-2)&0x1f = 30, col 1 -> 31
  check('tilemap_scan (0,0) -> 962', tilemapScan(0, 0) === 2 + (30 << 5), `${tilemapScan(0, 0)}`);
  check('tilemap_scan (1,27) -> 1021', tilemapScan(1, 27) === 29 + (31 << 5), `${tilemapScan(1, 27)}`);
  // Right wrap columns: col 34 -> 0, col 35 -> 1
  check('tilemap_scan (34,5) -> 7', tilemapScan(34, 5) === 7, `${tilemapScan(34, 5)}`);
  check('tilemap_scan (35,0) -> 34', tilemapScan(35, 0) === 34, `${tilemapScan(35, 0)}`);

  // Structural: all 36x28 cells map to unique offsets within 0..0x3ff
  const seen = new Set<number>();
  let inRange = true;
  for (let row = 0; row < 28; row++) {
    for (let col = 0; col < 36; col++) {
      const offs = tilemapScan(col, row);
      if (offs < 0 || offs > 0x3ff) inRange = false;
      seen.add(offs);
    }
  }
  check('tilemap_scan injective over 36x28', seen.size === 36 * 28 && inRange,
    `${seen.size} unique`);
}

// ---------------------------------------------------------------------------
// (d) starfield LFSR: first values, full period, hit count
{
  // First steps from seed 0x7fff, computed by hand from the Fibonacci
  // definition (bit_in = b0 ^ b3 ^ b5 ^ b10, shift right, bit_in -> b15):
  const expected = [0x3fff, 0x1fff, 0x0fff, 0x07ff, 0x03ff, 0x81ff, 0xc0ff, 0xe07f];
  let lfsr = 0x7fff;
  let seqOk = true;
  for (const e of expected) {
    lfsr = getNextLfsrState(lfsr);
    if (lfsr !== e) { seqOk = false; break; }
  }
  check('LFSR first 8 states', seqOk, expected.map(hex).join(','));

  // Maximal period of 65,535 (never revisits the seed earlier), and exactly
  // 256 hits ((lfsr & 0xFA14) == 0x7800) per period.
  lfsr = 0x7fff;
  let period = 0;
  let hits = 0;
  do {
    if ((lfsr & 0xfa14) === 0x7800) hits++;
    lfsr = getNextLfsrState(lfsr);
    period++;
  } while (lfsr !== 0x7fff && period <= 70000);
  check('LFSR period is 65535', period === 65535, `period=${period}`);
  check('LFSR 256 hits per period', hits === 256, `hits=${hits}`);
}

// (d2) starfield draw: stars land only inside x [16, 272) and are < 128
{
  const sf = new Starfield05xx(16, 0, 256 + 16);
  const colors = new Uint32Array(64);
  for (let i = 0; i < 64; i++) colors[i] = 0xff000000 | (i + 1);
  sf.setColorTable(colors);
  sf.setControl(0x20); // Q5=1 enable, speed 0, sets (0, 2)
  sf.vblank();
  const frame = new Uint32Array(288 * 224);
  sf.draw(frame, 288, 224);
  let stars = 0;
  let outOfBand = 0;
  for (let y = 0; y < 224; y++) {
    for (let x = 0; x < 288; x++) {
      if (frame[y * 288 + x] !== 0) {
        stars++;
        if (x < 16 || x >= 272) outOfBand++;
      }
    }
  }
  check('starfield draws stars when enabled', stars > 0 && stars < 128, `stars=${stars}`);
  check('starfield respects x offset/limit', outOfBand === 0, `outOfBand=${outOfBand}`);

  // Disabled starfield draws nothing and resets its LFSR.
  const sf2 = new Starfield05xx();
  sf2.setControl(0x00);
  sf2.vblank();
  const frame2 = new Uint32Array(288 * 224);
  sf2.draw(frame2, 288, 224);
  check('starfield disabled draws nothing', frame2.every((v) => v === 0));
}

// ---------------------------------------------------------------------------
// (e) GalagaVideo end-to-end structural test
{
  const regions: Record<string, Uint8Array> = {
    gfx1: new Uint8Array(0x1000),  // all pen 0 chars
    gfx2: new Uint8Array(0x2000),
    proms: new Uint8Array(0x220),
  };
  // palette: entry 5 = red-ish (0x07 -> r=255)
  regions.proms![5] = 0x07;
  // char lut: everything transparent (nibble 0x0f)
  for (let i = 0; i < 0x100; i++) regions.proms![0x020 + i] = 0x0f;
  // sprite lut color 0: pen 0 transparent, pen 3 -> core entry 5
  for (let i = 0; i < 0x100; i++) regions.proms![0x120 + i] = 0x0f;
  regions.proms![0x120 + 3] = 0x05;
  // sprite 1: all pens = 3 (element 1 = bytes 64..127, both planes set)
  regions.gfx2!.fill(0xff, 64, 128);

  const videoram = new Uint8Array(0x800);
  const ram1 = new Uint8Array(0x400);
  const ram2 = new Uint8Array(0x400);
  const ram3 = new Uint8Array(0x400);
  let latch = 0;

  // Sprite slot 0: sprite 1, color 0, at sx=100, sy=50.
  //   sx = ram2[0x381] - 40 = 100  -> 140
  //   sy = ((256 - ram2[0x380] + 1) & 0xff) - 32 = 50 -> ram2[0x380] = 175
  ram1[0x380] = 1;
  ram2[0x380] = 175;
  ram2[0x381] = 140;
  // Park all other sprite slots offscreen in Y (sy = ((257-208)&0xff)-32 = 17
  // for slot 0 default 0 would be -31 = clipped anyway; leave zeros).

  const video = new GalagaVideo({ regions, videoram, ram1, ram2, ram3, videolatch: () => latch });
  check('GalagaVideo native size 288x224', video.width === 288 && video.height === 224);

  const frame = new Uint32Array(288 * 224);
  video.vblank();
  video.render(frame);

  const at = (x: number, y: number): number => frame[y * 288 + x]! >>> 0;
  const pal = buildGalagaPalette(regions.proms!);
  const red = pal.core[5]! >>> 0;

  check('render fills background with black', at(0, 0) === 0xff000000, hex(at(0, 0)));
  check('sprite pixel at (100,50)', at(100, 50) === red,
    `${hex(at(100, 50))} expected ${hex(red)}`);
  check('sprite pixel at (115,65)', at(115, 65) === red, hex(at(115, 65)));
  check('no sprite pixel at (99,50)', at(99, 50) === 0xff000000, hex(at(99, 50)));
  check('no sprite pixel at (116,50)', at(116, 50) === 0xff000000, hex(at(116, 50)));

  let opaque = true;
  for (const v of frame) if (((v >>> 24) & 0xff) !== 0xff) { opaque = false; break; }
  check('alpha always 0xff', opaque);

  // Tilemap: make char 1 all pen 1 (plane 1 only -> pixel value 1... plane
  // order: planeOffsets [0,4], plane 0 is MSB, so set only bit-plane at
  // offset 4 for value 1). Char 1 = bytes 16..31; plane1 bits are the low
  // nibble of each byte.
  regions.gfx1!.fill(0x0f, 16, 32);
  regions.proms![0x021] = 0x05; // char lut color 0 pen 1 -> core[0x15]
  regions.proms![0x15] = 0x07;  // core[0x15] = red 255
  videoram.fill(1, 0, 0x400);   // every tile = char 1
  videoram.fill(0, 0x400, 0x800); // color 0
  const video2 = new GalagaVideo({ regions, videoram, ram1, ram2, ram3, videolatch: () => latch });
  video2.vblank();
  video2.render(frame);
  const pal3 = buildGalagaPalette(regions.proms!);
  const charRed = pal3.core[0x15]! >>> 0;
  check('tilemap draws char pen through char lut', at(0, 0) === charRed && at(287, 223) === charRed,
    `${hex(at(0, 0))} expected ${hex(charRed)}`);
}

// ---------------------------------------------------------------------------
console.log('');
if (failures === 0) {
  console.log('ALL PASS');
} else {
  console.error(`${failures} FAILURE(S)`);
  process.exitCode = 1;
}
