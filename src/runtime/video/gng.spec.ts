// Structural self-test for the Ghosts'n Goblins video renderer.
// Run with: node src/runtime/video/gng.spec.ts   (plain Node, no DOM)
// Exit code 0 = all PASS.
//
// Ground truth: src/mame/capcom/gng.cpp (tile callbacks, video_start,
// draw_sprites, screen_update, gfx layouts, GFXDECODE) and src/emu/emupal
// (RGBx_444 with split base/ext palette memory: raw = base | ext << 8,
// R = raw 15-12, G = 11-8, B = 7-4, pal4bit expansion).

import { readFileSync } from 'node:fs';
import { decodeGfx } from '../gfx.ts';
import type { GfxLayout } from '../gfx.ts';
import {
  GngVideo,
  buildGngPens,
  GNG_CHAR_LAYOUT,
  GNG_TILE_LAYOUT,
  GNG_SPRITE_LAYOUT,
  GNG_BG_FRONT_MASKS,
  GNG_BG_BACK_MASKS,
} from './gng.ts';

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
// (a) layouts + decode entries against the knowledge graph (dist/gng/graph.json
//     is the source of truth; skip gracefully if generation hasn't run)
{
  interface GraphNode { id: string; label: string; props: Record<string, unknown>; }
  const layoutKey = (l: {
    width: number; height: number; total: number | string; planes: number;
    planeOffsets: unknown[]; xOffsets: unknown[]; yOffsets: unknown[]; charIncrement: number;
  }): string => JSON.stringify(
    [l.width, l.height, l.total, l.planes, l.planeOffsets, l.xOffsets, l.yOffsets, l.charIncrement]);

  try {
    const graph = JSON.parse(
      readFileSync(new URL('../../../dist/gng/graph.json', import.meta.url), 'utf8'),
    ) as { nodes: GraphNode[] };
    const node = (id: string): GraphNode | undefined => graph.nodes.find((n) => n.id === id);

    const charNode = node('gfxlayout:charlayout');
    const tileNode = node('gfxlayout:tilelayout');
    const sprNode = node('gfxlayout:spritelayout');
    check('graph charlayout matches GNG_CHAR_LAYOUT',
      !!charNode && layoutKey(charNode.props as never) === layoutKey(GNG_CHAR_LAYOUT as never),
      charNode ? layoutKey(charNode.props as never) : 'node missing');
    check('graph tilelayout matches GNG_TILE_LAYOUT',
      !!tileNode && layoutKey(tileNode.props as never) === layoutKey(GNG_TILE_LAYOUT as never),
      tileNode ? layoutKey(tileNode.props as never) : 'node missing');
    check('graph spritelayout matches GNG_SPRITE_LAYOUT',
      !!sprNode && layoutKey(sprNode.props as never) === layoutKey(GNG_SPRITE_LAYOUT as never),
      sprNode ? layoutKey(sprNode.props as never) : 'node missing');

    const e0 = node('gfxdecode:gfx_gng/e0');
    const e1 = node('gfxdecode:gfx_gng/e1');
    const e2 = node('gfxdecode:gfx_gng/e2');
    check('graph decode e0: chars, color base 0x80, 16 codes',
      !!e0 && e0.props.region === 'chars' && e0.props.layout === 'charlayout' &&
      e0.props.colorBase === 0x80 && e0.props.colorCount === 16);
    check('graph decode e1: tiles, color base 0x00, 8 codes',
      !!e1 && e1.props.region === 'tiles' && e1.props.layout === 'tilelayout' &&
      e1.props.colorBase === 0x00 && e1.props.colorCount === 8);
    check('graph decode e2: sprites, color base 0x40, 4 codes',
      !!e2 && e2.props.region === 'sprites' && e2.props.layout === 'spritelayout' &&
      e2.props.colorBase === 0x40 && e2.props.colorCount === 4);
  } catch {
    console.log('SKIP  graph cross-check (dist/gng/graph.json not found)');
  }
}

// ---------------------------------------------------------------------------
// (b) charlayout decode: 8x8x2 packed nibbles {4,0}, x 0-3 in the high
// nibble-pair then bits 8-11 of the same row-pair, 16 bytes per char.
{
  const rom = new Uint8Array(0x4000);
  // char 1 (bytes 16..31), row 0 left half: 0b10100101
  //   bits 0..3 (masks 0x80..0x10) = plane 1 (LSB) of x0..x3 -> 1,0,1,0
  //   bits 4..7 (masks 0x08..0x01) = plane 0 (MSB) of x0..x3 -> 0,1,0,1
  //   pixels x0..x3 = 1,2,1,2
  rom[16] = 0b10100101;
  // row 0 right half (xOffsets 8..11 -> byte 17): 0xf0 -> LSB=1111, MSB=0000
  rom[17] = 0xf0;
  // row 3 (yOffset 48 -> byte 16+6): 0x0f -> LSB=0000, MSB=1111 -> pen 2
  rom[22] = 0x0f;

  const set = decodeGfx(GNG_CHAR_LAYOUT, rom);
  const px = (e: number, x: number, y: number): number => set.pixels[e * 64 + y * 8 + x]!;
  check('char decode: RGN_FRAC(1,1) of 0x4000 = 1024 8x8 chars',
    set.count === 1024 && set.width === 8 && set.height === 8, `count=${set.count}`);
  check('char plane order {4,0}: row0 x0..3 = 1,2,1,2',
    px(1, 0, 0) === 1 && px(1, 1, 0) === 2 && px(1, 2, 0) === 1 && px(1, 3, 0) === 2,
    `${px(1, 0, 0)},${px(1, 1, 0)},${px(1, 2, 0)},${px(1, 3, 0)}`);
  check('char x4..7 from bit offsets 8..11 (next byte)',
    px(1, 4, 0) === 1 && px(1, 7, 0) === 1 && px(1, 4, 1) === 0);
  check('char yOffsets step 16 bits: row 3 from byte base+6',
    px(1, 0, 3) === 2 && px(1, 3, 3) === 2 && px(1, 0, 2) === 0);
}

// (b2) tilelayout decode: 16x16x3 planar at RGN_FRAC thirds (plane 0 = MSB =
// third 2), right half from byte +16, 32 bytes per tile per plane.
{
  const rom = new Uint8Array(0x18000);
  // element 1 base = 32 bytes into each 0x8000-byte third
  rom[0x10000 + 32] = 0x80; // plane 0 (MSB) pixel (0,0) -> bit 2
  rom[0x00000 + 32] |= 0x80; // plane 2 (LSB) pixel (0,0) -> bit 0 => pen 5
  rom[32 + 16] = 0x80;      // xOffset 128 -> byte +16: pixel (8,0) pen 1
  rom[0x08000 + 32 + 5] = 0x80; // plane 1, yOffset 40 -> pixel (0,5) pen 2

  const set = decodeGfx(GNG_TILE_LAYOUT, rom);
  const px = (e: number, x: number, y: number): number => set.pixels[e * 256 + y * 16 + x]!;
  check('tile decode: RGN_FRAC(1,3) of 0x18000 = 1024 16x16 tiles',
    set.count === 1024 && set.width === 16 && set.height === 16, `count=${set.count}`);
  check('tile planes at region thirds, plane 0 = MSB: (0,0) = pen 5',
    px(1, 0, 0) === 5, `pen=${px(1, 0, 0)}`);
  check('tile right half from xOffset 16*8: (8,0) = pen 1', px(1, 8, 0) === 1 && px(1, 7, 0) === 0);
  check('tile yOffsets step 8 bits: (0,5) = pen 2', px(1, 0, 5) === 2 && px(1, 0, 4) === 0);
}

// (b3) spritelayout decode: 16x16x4, planes {half+4, half+0, 4, 0} (packed
// nibble pairs in each region half), 64 bytes per element per half.
{
  const rom = new Uint8Array(0x20000);
  // element 1 base = 64 bytes; second half starts at byte 0x10000
  rom[0x10000 + 64] = 0x08; // plane 0 = RGN_FRAC(1,2)+4 -> bit 3
  rom[64] = 0x08;           // plane 2 = +4 -> bit 1     => pen 0b1010 = 10
  rom[65] = 0x80;           // plane 3, xOffset 8: pixel (4,0) pen 1
  rom[64 + 32] = 0x80;      // plane 3, xOffset 32*8: pixel (8,0) pen 1
  rom[66] = 0x80;           // plane 3, yOffset 16: pixel (0,1) pen 1

  const set = decodeGfx(GNG_SPRITE_LAYOUT, rom);
  const px = (e: number, x: number, y: number): number => set.pixels[e * 256 + y * 16 + x]!;
  check('sprite decode: RGN_FRAC(1,2) of 0x20000 = 1024 16x16 sprites',
    set.count === 1024 && set.width === 16 && set.height === 16, `count=${set.count}`);
  check('sprite planes split across halves + nibbles: (0,0) = pen 10',
    px(1, 0, 0) === 10, `pen=${px(1, 0, 0)}`);
  check('sprite xOffset 8 -> byte +1: (4,0) = pen 1', px(1, 4, 0) === 1 && px(1, 5, 0) === 0);
  check('sprite xOffset 32*8 -> byte +32: (8,0) = pen 1', px(1, 8, 0) === 1);
  check('sprite yOffset 16 -> byte +2: (0,1) = pen 1', px(1, 0, 1) === 1);
}

// ---------------------------------------------------------------------------
// (c) RGBx_444 palette assembly from the split byte planes.
// emupal.h read_entry: raw = base | ext << 8; RGBx_444 (RRRRGGGGBBBBxxxx,
// standard_rgb_decoder<4,4,4, 12,8,4>): R = ext >> 4, G = ext & 0xf,
// B = base >> 4; base low nibble unused; pal4bit: n -> n * 17.
{
  const base = new Uint8Array(0x100);
  const ext = new Uint8Array(0x100);
  ext[0] = 0xf0;               // R = 15
  ext[1] = 0x0f;               // G = 15
  base[2] = 0xf0;              // B = 15
  base[3] = 0x0f;              // unused low nibble only -> black
  ext[4] = 0x12; base[4] = 0x30; // R=1 G=2 B=3 -> 17,34,51

  const pens = new Uint32Array(256);
  buildGngPens(base, ext, pens);

  const r = (v: number): number => v & 0xff;
  const g = (v: number): number => (v >>> 8) & 0xff;
  const b = (v: number): number => (v >>> 16) & 0xff;
  const a = (v: number): number => (v >>> 24) & 0xff;

  check('ext high nibble = R (raw bits 15-12)',
    r(pens[0]!) === 255 && g(pens[0]!) === 0 && b(pens[0]!) === 0, hex(pens[0]!));
  check('ext low nibble = G (raw bits 11-8)',
    g(pens[1]!) === 255 && r(pens[1]!) === 0 && b(pens[1]!) === 0);
  check('base high nibble = B (raw bits 7-4)',
    b(pens[2]!) === 255 && r(pens[2]!) === 0 && g(pens[2]!) === 0);
  check('base low nibble (raw bits 3-0) is unused (the "x" in RGBx)',
    pens[3] === 0xff000000);
  check('pal4bit expansion: nibble n -> n*17',
    r(pens[4]!) === 17 && g(pens[4]!) === 34 && b(pens[4]!) === 51,
    `${r(pens[4]!)},${g(pens[4]!)},${b(pens[4]!)}`);
  check('palette alpha always 0xff', a(pens[0]!) === 0xff && a(pens[255]!) === 0xff);
}

// (c2) the transmask tables themselves (video_start, gng.cpp:150-151)
{
  const drawn = (mask: number, pen: number): boolean => ((mask >> pen) & 1) === 0;
  check('group 0 back half draws every pen (bgmask 0x00)',
    GNG_BG_BACK_MASKS[0] === 0x00 && drawn(GNG_BG_BACK_MASKS[0]!, 0) && drawn(GNG_BG_BACK_MASKS[0]!, 7));
  check('group 0 front half draws nothing (fgmask 0xff)',
    GNG_BG_FRONT_MASKS[0] === 0xff && !drawn(GNG_BG_FRONT_MASKS[0]!, 0) && !drawn(GNG_BG_FRONT_MASKS[0]!, 7));
  check('group 1 front half: pens 0 and 6 transparent, others drawn (0x41)',
    GNG_BG_FRONT_MASKS[1] === 0x41 &&
    !drawn(GNG_BG_FRONT_MASKS[1]!, 0) && !drawn(GNG_BG_FRONT_MASKS[1]!, 6) &&
    drawn(GNG_BG_FRONT_MASKS[1]!, 1) && drawn(GNG_BG_FRONT_MASKS[1]!, 5) && drawn(GNG_BG_FRONT_MASKS[1]!, 7));
  check('group 1 back half is the complement (0xbe)',
    GNG_BG_BACK_MASKS[1] === 0xbe &&
    drawn(GNG_BG_BACK_MASKS[1]!, 0) && drawn(GNG_BG_BACK_MASKS[1]!, 6) && !drawn(GNG_BG_BACK_MASKS[1]!, 1));
}

// ---------------------------------------------------------------------------
// (d) GngVideo end-to-end on synthetic regions.
{
  const chars = new Uint8Array(0x4000);
  const tiles = new Uint8Array(0x18000);
  const sprites = new Uint8Array(0x20000);
  const regions: Record<string, Uint8Array> = { chars, tiles, sprites };

  // Inverse of decodeGfx's bit addressing, driven by the real layouts
  // (RGN_FRAC offsets resolved against the region size, like gfx.ts).
  const resolveOff = (v: number | string, regionBits: number): number => {
    if (typeof v === 'number') return v;
    const m = /^RGN_FRAC\((\d+),(\d+)\)(?:\s*([+-])\s*(\d+))?$/.exec(v)!;
    let bits = Math.floor((regionBits * Number(m[1])) / Number(m[2]));
    if (m[3] !== undefined) bits += (m[3] === '-' ? -1 : 1) * Number(m[4]);
    return bits;
  };
  function poke(rom: Uint8Array, layout: GfxLayout, elem: number, x: number, y: number, pen: number): void {
    const regionBits = rom.length * 8;
    for (let p = 0; p < layout.planes; p++) {
      if (((pen >> (layout.planes - 1 - p)) & 1) === 0) continue;
      const off = elem * layout.charIncrement +
        resolveOff(layout.planeOffsets[p]!, regionBits) +
        resolveOff(layout.yOffsets[y]!, regionBits) +
        resolveOff(layout.xOffsets[x]!, regionBits);
      rom[off >> 3] = rom[off >> 3]! | (0x80 >> (off & 7));
    }
  }
  const fillElem = (rom: Uint8Array, layout: GfxLayout, elem: number, pen: number): void => {
    for (let y = 0; y < layout.height; y++) {
      for (let x = 0; x < layout.width; x++) poke(rom, layout, elem, x, y, pen);
    }
  };

  // chars: char 0 = solid pen 3 (fg transparent -> default fgram shows bg);
  // char 1 = solid pen 1; chars 2, 3 = pen 3 everywhere except a pen-1
  // pixel at (0,0); char 0x102 = pen 3 except a pen-1 pixel at (7,0) —
  // distinct from char 2 so the code-high-bits test discriminates.
  // (poke only ORs bits, so the pen-1 pixel is skipped during the pen-3 fill.)
  fillElem(chars, GNG_CHAR_LAYOUT, 0, 3);
  fillElem(chars, GNG_CHAR_LAYOUT, 1, 1);
  for (const [c, px1, py1] of [[2, 0, 0], [3, 0, 0], [0x102, 7, 0]] as const) {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (!(x === px1 && y === py1)) poke(chars, GNG_CHAR_LAYOUT, c, x, y, 3);
      }
    }
    poke(chars, GNG_CHAR_LAYOUT, c, px1, py1, 1);
  }

  // tiles: tile 0 = solid pen 0 (nothing to poke); tile 1 = solid pen 1;
  // tile 2 = pixel (0,0) pen 1; tile 0x102 = pixel (15,0) pen 1;
  // tile 3 = solid pen 5; tile 4 = solid pen 6; tile 5 = pen 5 with a pen-6
  // pixel at (0,0) and a pen-0 pixel at (1,0).
  fillElem(tiles, GNG_TILE_LAYOUT, 1, 1);
  poke(tiles, GNG_TILE_LAYOUT, 2, 0, 0, 1);
  poke(tiles, GNG_TILE_LAYOUT, 0x102, 15, 0, 1);
  fillElem(tiles, GNG_TILE_LAYOUT, 3, 5);
  fillElem(tiles, GNG_TILE_LAYOUT, 4, 6);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    const pen = (x === 0 && y === 0) ? 6 : (x === 1 && y === 0) ? 0 : 5;
    if (pen) poke(tiles, GNG_TILE_LAYOUT, 5, x, y, pen);
  }

  // sprites: sprite 1 = solid pen 1; sprite 2 = pixel (0,0) pen 1, rest pen
  // 15 (transparent); sprite 0x102 = pixel (3,3) pen 1, rest pen 15.
  fillElem(sprites, GNG_SPRITE_LAYOUT, 1, 1);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    poke(sprites, GNG_SPRITE_LAYOUT, 2, x, y, (x === 0 && y === 0) ? 1 : 15);
    poke(sprites, GNG_SPRITE_LAYOUT, 0x102, x, y, (x === 3 && y === 3) ? 1 : 15);
  }
  // NOTE: the ERASEFF gap windows (0xc000-0xffff, 0x1c000-0x1ffff) are left
  // all-zero here; the renderer must restore the hardware 0xff fill so codes
  // 0x300-0x3ff decode to pen 15 (transparent).

  // palette RAM: ext = R<<4|G, base = B<<4 (RGBx_444 split planes)
  const palBase = new Uint8Array(0x100);
  const palExt = new Uint8Array(0x100);
  const setPal = (i: number, r: number, g: number, b: number): void => {
    palExt[i] = (r << 4) | g;
    palBase[i] = b << 4;
  };
  const col = (r: number, g: number, b: number): number =>
    (0xff000000 | ((b * 17) << 16) | ((g * 17) << 8) | (r * 17)) >>> 0;

  // tiles color 0 -> pens 0x00-0x07, color 1 -> 0x08-0x0f
  setPal(0x00, 1, 0, 0); const BG_P0 = col(1, 0, 0);
  setPal(0x01, 2, 0, 0); const BG_P1 = col(2, 0, 0);
  setPal(0x05, 3, 0, 0); const BG_P5 = col(3, 0, 0);
  setPal(0x06, 4, 0, 0); const BG_P6 = col(4, 0, 0);
  setPal(0x08 + 1, 5, 0, 0); const BG1_P1 = col(5, 0, 0);
  // sprites color 0 -> pens 0x40-0x4f, color 2 -> 0x60-0x6f
  setPal(0x40 + 1, 0, 1, 0); const SP_P1 = col(0, 1, 0);
  setPal(0x60 + 1, 0, 3, 0); const SP2_P1 = col(0, 3, 0);
  // chars color 0 -> pens 0x80-0x83, color 5 -> 0x94-0x97
  setPal(0x80 + 1, 0, 0, 2); const FG_P1 = col(0, 0, 2);
  setPal(0x94 + 1, 0, 0, 4); const FG5_P1 = col(0, 0, 4);
  check('fixture colors are pairwise distinct',
    new Set([BG_P0, BG_P1, BG_P5, BG_P6, BG1_P1, SP_P1, SP2_P1, FG_P1, FG5_P1]).size === 9);

  const fgram = new Uint8Array(0x800);
  const bgram = new Uint8Array(0x800);
  const sbuf = new Uint8Array(0x200);
  const state = { scrollx: 0, scrolly: 0, flip: false };

  const video = new GngVideo({
    regions,
    fgram: () => fgram,
    bgram: () => bgram,
    spriteBuffer: () => sbuf,
    scrollx: () => state.scrollx,
    scrolly: () => state.scrolly,
    paletteBase: () => palBase,
    paletteExt: () => palExt,
    flip: () => state.flip,
  });
  check('GngVideo native size 256x224 (visible window of the 262-line raster)',
    video.width === 256 && video.height === 224);

  let threw = false;
  try {
    void new GngVideo({
      regions: { chars, tiles }, fgram: () => fgram, bgram: () => bgram,
      spriteBuffer: () => sbuf, scrollx: () => 0, scrolly: () => 0,
      paletteBase: () => palBase, paletteExt: () => palExt, flip: () => false,
    });
  } catch {
    threw = true;
  }
  check('missing region throws', threw);

  const fb = new Uint32Array(256 * 224);
  const at = (x: number, y: number): number => fb[y * 256 + x]! >>> 0;
  const render = (): void => { video.vblank(); video.render(fb); };

  // sprite entry encoder (draw_sprites, gng.cpp:195-221)
  function setSprite(slot: number, o: { x: number; y: number; code: number;
    color?: number; fx?: boolean; fy?: boolean; xhigh?: boolean }): void {
    const offs = slot * 4;
    sbuf[offs] = o.code & 0xff;
    sbuf[offs + 1] = (o.xhigh ? 0x01 : 0) | (o.fx ? 0x04 : 0) | (o.fy ? 0x08 : 0) |
      ((o.color ?? 0) << 4) | (((o.code >> 8) & 3) << 6);
    sbuf[offs + 2] = o.y;      // full-bitmap y
    sbuf[offs + 3] = o.x & 0xff;
  }

  // --- (d1) baseline: bg tile 0 (group 0, pen 0) covers everything ---
  render();
  check('baseline: bg pen 0 everywhere (fg char 0 = pen 3 transparent)',
    at(0, 0) === BG_P0 && at(255, 223) === BG_P0 && at(128, 100) === BG_P0, hex(at(0, 0)));

  // --- (d2) fg tilemap: SCAN_ROWS, attributes, y offset ---
  fgram[2 * 32 + 3] = 1;                              // solid tile
  fgram[2 * 32 + 5] = 2; fgram[0x400 + 2 * 32 + 5] = 0x40; // code high -> 0x102
  fgram[2 * 32 + 6] = 1; fgram[0x400 + 2 * 32 + 6] = 0x05; // color 5
  fgram[2 * 32 + 7] = 2; fgram[0x400 + 2 * 32 + 7] = 0x10; // flip x
  fgram[2 * 32 + 8] = 2; fgram[0x400 + 2 * 32 + 8] = 0x20; // flip y
  fgram[2 * 32 + 9] = 3;                              // pen-3 hole at (1,0)
  fgram[0 * 32 + 12] = 1;                             // rows 0,1,30,31 fall
  fgram[1 * 32 + 12] = 1;                             // outside the visible
  fgram[30 * 32 + 12] = 1;                            // window (bitmap y
  fgram[31 * 32 + 12] = 1;                            // 16..239)
  render();

  check('fg SCAN_ROWS + y offset: tile (row 2, col 3) -> fb (24..31, 0..7)',
    at(24, 0) === FG_P1 && at(31, 7) === FG_P1 && at(23, 0) === BG_P0 && at(24, 8) === BG_P0);
  check('fg code = tile + ((attr & 0xc0) << 2): char 0x102 pixel (7,0)',
    at(47, 0) === FG_P1 && at(40, 0) === BG_P0);
  check('fg color = attr & 0x0f', at(48, 0) === FG5_P1);
  check('fg flip x (attr bit 4)', at(56 + 7, 0) === FG_P1 && at(56, 0) === BG_P0);
  check('fg flip y (attr bit 5)', at(64, 7) === FG_P1 && at(64, 0) === BG_P0);
  check('fg transparent pen 3: char 3 shows bg at its pen-3 pixel',
    at(72, 0) === FG_P1 && at(73, 0) === BG_P0);
  {
    let strays = 0;
    for (let y = 0; y < 224; y++) {
      for (let x = 96; x < 104; x++) if (at(x, y) !== BG_P0) strays++;
    }
    check('fg tile rows 0,1,30,31 are outside the visible window', strays === 0,
      `strays=${strays}`);
  }
  fgram.fill(0);

  // --- (d3) bg tilemap: SCAN_COLS, attributes, scroll ---
  bgram[2 * 32 + 3] = 1; // SCAN_COLS: index = col*32 + row -> col 2, row 3
  render();
  check('bg SCAN_COLS: index 67 = (col 2, row 3) -> bitmap (32..47, 48..63) -> fb y 32..47',
    at(32, 32) === BG_P1 && at(47, 47) === BG_P1 && at(31, 32) === BG_P0 && at(32, 48) === BG_P0);
  check('bg SCAN_COLS is not row-major (index 67 under SCAN_ROWS would be fb (48..63, 16..31))',
    at(48, 16) === BG_P0 && at(63, 31) === BG_P0);

  bgram.fill(0);
  bgram[4 * 32 + 3] = 2; bgram[0x400 + 4 * 32 + 3] = 0x40; // code high -> 0x102
  bgram[5 * 32 + 3] = 2; bgram[0x400 + 5 * 32 + 3] = 0x01; // color 1
  bgram[6 * 32 + 3] = 2; bgram[0x400 + 6 * 32 + 3] = 0x10; // flip x
  bgram[7 * 32 + 3] = 2; bgram[0x400 + 7 * 32 + 3] = 0x20; // flip y
  render();
  check('bg code = tile + ((attr & 0xc0) << 2): tile 0x102 pixel (15,0)',
    at(64 + 15, 32) === BG_P1 && at(64, 32) === BG_P0);
  check('bg color = attr & 0x07', at(80, 32) === BG1_P1);
  check('bg flip x (attr bit 4): pixel (0,0) -> x+15', at(96 + 15, 32) === BG_P1 && at(96, 32) === BG_P0);
  check('bg flip y (attr bit 5): pixel (0,0) -> y+15', at(112, 32 + 15) === BG_P1 && at(112, 32) === BG_P0);

  bgram.fill(0);
  bgram[2 * 32 + 3] = 1; // solid tile at tilemap (32..47, 48..63)
  state.scrollx = 16;
  render();
  check('bg scrollx shifts content left', at(16, 32) === BG_P1 && at(31, 47) === BG_P1 && at(32, 32) === BG_P0);
  state.scrollx = 0;
  state.scrolly = 16;
  render();
  check('bg scrolly shifts content up', at(32, 16) === BG_P1 && at(47, 31) === BG_P1 && at(32, 32) === BG_P0);
  state.scrolly = 0;

  bgram.fill(0);
  bgram[20 * 32 + 3] = 1; // tilemap x 320..335
  state.scrollx = 0x140;  // 320: 9-bit scroll (lo + 256*hi)
  render();
  check('bg 9-bit scrollx (lo + 256*hi) wraps the 512px map', at(0, 32) === BG_P1 && at(15, 47) === BG_P1);
  state.scrollx = 0;

  // --- (d4) sprites ---
  bgram.fill(0);
  setSprite(0, { x: 100, y: 100, code: 1 });
  render();
  check('sprite placement: bitmap (sx, sy) -> fb y = sy - 16',
    at(100, 84) === SP_P1 && at(115, 99) === SP_P1);
  check('sprite bounds', at(99, 84) === BG_P0 && at(116, 84) === BG_P0 &&
    at(100, 83) === BG_P0 && at(100, 100) === BG_P0);

  sbuf.fill(0);
  setSprite(0, { x: 0, y: 16, code: 1 });
  render();
  check('sprite at sy=16 lands on fb row 0 (visible window top)', at(0, 0) === SP_P1);
  sbuf.fill(0);
  setSprite(0, { x: 50, y: 0, code: 1 });
  render();
  check('sprite at sy=0 (bitmap rows 0..15) is fully above the window',
    at(50, 0) === BG_P0 && at(65, 0) === BG_P0);

  sbuf.fill(0);
  setSprite(0, { x: 250, y: 100, code: 1, xhigh: true }); // sx = 250 - 256 = -6
  render();
  check('sprite x-256 (attr bit 0): sx=-6 clips to columns 0..9',
    at(0, 84) === SP_P1 && at(9, 84) === SP_P1 && at(10, 84) === BG_P0);

  sbuf.fill(0);
  setSprite(0, { x: 100, y: 100, code: 2 });
  render();
  check('sprite transpen 15: only the pen-1 pixel of sprite 2 is drawn',
    at(100, 84) === SP_P1 && at(101, 84) === BG_P0 && at(115, 99) === BG_P0);

  sbuf.fill(0);
  setSprite(0, { x: 100, y: 100, code: 2, fx: true });
  render();
  check('sprite flip x (attr bit 2)', at(115, 84) === SP_P1 && at(100, 84) === BG_P0);
  sbuf.fill(0);
  setSprite(0, { x: 100, y: 100, code: 2, fy: true });
  render();
  check('sprite flip y (attr bit 3)', at(100, 99) === SP_P1 && at(100, 84) === BG_P0);

  sbuf.fill(0);
  setSprite(0, { x: 100, y: 100, code: 0x102 }); // attr bits 6-7 -> code high
  render();
  check('sprite code high bits from ((attr << 2) & 0x300)',
    at(103, 87) === SP_P1 && at(100, 84) === BG_P0);

  sbuf.fill(0);
  setSprite(0, { x: 100, y: 100, code: 1, color: 2 });
  render();
  check('sprite color = (attr >> 4) & 3', at(100, 84) === SP2_P1);

  sbuf.fill(0);
  setSprite(0, { x: 100, y: 100, code: 1 });           // offs 0: drawn LAST
  setSprite(1, { x: 100, y: 100, code: 1, color: 2 }); // offs 4: drawn first
  render();
  check('sprite priority: lower offsets drawn last (on top)', at(100, 84) === SP_P1);

  sbuf.fill(0);
  setSprite(127, { x: 200, y: 100, code: 1 }); // offs 0x1fc, last of 0x200 bytes
  render();
  check('all 128 sprite slots scanned (offs 0x1fc)', at(200, 84) === SP_P1);

  sbuf.fill(0);
  setSprite(0, { x: 100, y: 100, code: 0x300 }); // ERASEFF gap element
  render();
  check('ERASEFF gap sprites (codes 0x300+) decode to pen 15 = invisible',
    at(100, 84) === BG_P0 && at(115, 99) === BG_P0);

  // --- (d5) bg split groups vs sprites (screen_update draw order) ---
  sbuf.fill(0);
  bgram.fill(0);
  setSprite(0, { x: 100, y: 100, code: 1 }); // fb (100..115, 84..99)
  // group 0 tile (solid pen 1) under the sprite: col 6 row 6 -> bitmap
  // (96..111, 96..111) -> fb y 80..95
  bgram[6 * 32 + 6] = 1;
  render();
  check('group 0 bg tile: fully behind sprites (back half draws all pens)',
    at(100, 84) === SP_P1 && at(97, 81) === BG_P1);
  // group 1 solid pen-5 tile: front half draws pen 5 OVER the sprite
  bgram[6 * 32 + 6] = 3; bgram[0x400 + 6 * 32 + 6] = 0x08;
  render();
  check('group 1 pen 5: front half covers the sprite',
    at(100, 84) === BG_P5 && at(97, 81) === BG_P5);
  // group 1 solid pen-6 tile: pen 6 lives in the BACK half only -> the
  // sprite shows through where it overlaps, pen 6 shows elsewhere
  bgram[6 * 32 + 6] = 4;
  render();
  check('group 1 pen 6: sprite shows through the front half',
    at(100, 84) === SP_P1 && at(97, 81) === BG_P6);
  // mixed tile 5: pen 6 at (0,0), pen 0 at (1,0), pen 5 elsewhere; put the
  // sprite exactly on the tile so all three pens overlap it
  bgram[6 * 32 + 6] = 5;
  sbuf.fill(0);
  setSprite(0, { x: 96, y: 96, code: 1 });
  render();
  check('group 1 mixed tile: pens 0 and 6 let the sprite through, pen 5 wins',
    at(96, 80) === SP_P1 && at(97, 80) === SP_P1 && at(98, 80) === BG_P5);
  sbuf.fill(0);
  render();
  check('group 1 mixed tile without sprite: back half supplies pens 0 and 6',
    at(96, 80) === BG_P6 && at(97, 80) === BG_P0 && at(98, 80) === BG_P5);

  // fg on top of everything
  setSprite(0, { x: 96, y: 96, code: 1 });
  fgram[12 * 32 + 12] = 1; // fb (96..103, 80..87)
  render();
  check('fg tilemap draws over sprites and bg front half',
    at(96, 80) === FG_P1 && at(98, 80) === FG_P1 && at(103, 87) === FG_P1);
  fgram.fill(0);
  sbuf.fill(0);
  bgram.fill(0);

  // --- (d6) flip screen ---
  state.flip = true;
  fgram[2 * 32 + 3] = 2; // char 2, pixel (0,0) at tilemap (24, 16)
  render();
  check('flip: fg pixel (24,16) lands at fb (231, 223) (mirror about the visible centre)',
    at(231, 223) === FG_P1 && at(24, 0) === BG_P0, hex(at(231, 223)));
  fgram.fill(0);

  bgram[2 * 32 + 3] = 1; // tilemap (32..47, 48..63)
  render();
  check('flip: bg tile mirrors to fb (208..223, 176..191)',
    at(208, 176) === BG_P1 && at(223, 191) === BG_P1 && at(32, 32) === BG_P0);
  state.scrollx = 16;
  render();
  check('flip: scrollx shifts the flipped bg the other way (fb x 224..239)',
    at(224, 176) === BG_P1 && at(239, 191) === BG_P1 && at(208, 176) === BG_P0);
  state.scrollx = 0;
  bgram.fill(0);

  setSprite(0, { x: 100, y: 100, code: 1 });
  render();
  check('flip: sprite at (240-sx, 240-sy) -> fb (140..155, 124..139)',
    at(140, 124) === SP_P1 && at(155, 139) === SP_P1 && at(100, 84) === BG_P0);
  sbuf.fill(0);
  setSprite(0, { x: 100, y: 100, code: 2 });
  render();
  check('flip: sprite flips inverted (pixel (0,0) -> far corner)',
    at(155, 139) === SP_P1 && at(140, 124) === BG_P0);
  sbuf.fill(0);
  state.flip = false;

  // --- (d7) palette RAM is live (recomputed per render) ---
  render();
  check('palette baseline restored', at(0, 0) === BG_P0);
  setPal(0x00, 7, 7, 7);
  render();
  check('palette RAM writes take effect on the next render',
    at(0, 0) === col(7, 7, 7), hex(at(0, 0)));
  setPal(0x00, 1, 0, 0);

  // --- (d8) smoke: alpha + determinism ---
  bgram[3 * 32 + 4] = 3; bgram[0x400 + 3 * 32 + 4] = 0x09;
  fgram[10 * 32 + 10] = 1; fgram[0x400 + 10 * 32 + 10] = 0x35;
  setSprite(5, { x: 60, y: 120, code: 1, color: 2, fx: true, fy: true });
  state.scrollx = 0x23; state.scrolly = 0x101;
  render();
  let opaque = true;
  for (const v of fb) if (((v >>> 24) & 0xff) !== 0xff) { opaque = false; break; }
  check('alpha always 0xff', opaque);

  const fb2 = new Uint32Array(256 * 224);
  video.vblank();
  video.render(fb2);
  let same = true;
  for (let i = 0; i < fb.length; i++) if (fb[i] !== fb2[i]) { same = false; break; }
  check('render is deterministic', same);
}

// ---------------------------------------------------------------------------
console.log('');
if (failures === 0) {
  console.log('ALL PASS');
} else {
  console.error(`${failures} FAILURE(S)`);
  process.exitCode = 1;
}
