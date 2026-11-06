import assert from 'node:assert/strict';
import { GeneratedGfxElement, GeneratedPaletteShadows } from './generated-video.ts';

// dipalette.cpp's indexed shadow and highlight groups, after 2048 base colours.
const shadows = new GeneratedPaletteShadows({ entries: 2048, shadows: true, highlights: true });
const colors = new Uint32Array(2048);
colors[5] = 0xff64c8ff; // r 255, g 200, b 100 (ABGR)

// Preset 0 (and 2) is the shadow table, 1 (and 3) the highlight table, and a
// pen past the base colours maps to itself.
assert.equal(shadows.shadow_table()![5], 5 + 2048);
assert.equal(shadows.shadow_table()![3000], 3000);
shadows.set_shadow_mode(1);
assert.equal(shadows.shadow_table()![5], 5 + 4096);
shadows.set_shadow_mode(0);

// PALETTE_DEFAULT_SHADOW_FACTOR 0.6f and its reciprocal, truncated in float as
// adjust_palette_entry does: 255 * 0.6f is 153, 200 * (1 / 0.6f) clamps.
assert.equal(shadows.resolve(colors, 5 + 2048), 0xff3c7899);
assert.equal(shadows.resolve(colors, 5 + 4096), 0xffa6ffff);
// A driver's own factor (TMNT's set_shadow_factor(0.75)).
shadows.set_shadow_factor(0.75);
assert.equal(shadows.resolve(colors, 5 + 2048), 0xff4b96bf);
// palette_t keeps black, then white, after the last group.
assert.equal(shadows.resolve(colors, 2048 * 3), 0xff000000);
assert.equal(shadows.resolve(colors, 2048 * 3 + 1), 0xffffffff);

// PIXEL_OP_REBASE_TRANSTABLE16: a source pen paints `color + pen`, and a
// shadow pen sends what the destination holds through the shadow table.
const palette = {
  colors,
  shadows,
  transpen_mask: () => 0,
  black_pen: () => 0,
  pens: () => colors,
};
const element = new GeneratedGfxElement(
  {
    region: '', offset: 0, colorBase: 0, colorCount: 128, xscale: 1, yscale: 1,
    layout: { width: 2, height: 1, total: 1, planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4], yOffsets: [0], charIncrement: 8 },
  },
  { count: 1, width: 2, height: 1, pixels: Uint8Array.from([1, 15]) },
  palette,
  true,
);
const pixels = [7, 9];
const bitmap = {
  pix: (_y: number, x = 0) => pixels[x]!,
  'pix=': (_y: number, x: number, value: number) => { pixels[x] = value; },
  fill: () => {},
};
const drawModes = new Uint8Array(16).fill(1);
drawModes[0] = 0;
drawModes[15] = 2;
element.transtable(bitmap, { min_x: 0, max_x: 1, min_y: 0, max_y: 0 } as never, 0, 3, 0, 0, 0, 0, drawModes);
assert.deepEqual(pixels, [3 * 16 + 1, 9 + 2048]);

console.log('palette shadows spec: groups, tables and shadow draws follow dipalette.cpp and drawgfxt.ipp');
