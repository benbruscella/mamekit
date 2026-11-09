import assert from 'node:assert/strict';
import { GeneratedRectangle } from './rectangle.ts';
import { presentVectorDisplay } from './vector-display.ts';

// A 16x16 screen whose visible area starts at (2, 2). As in MAME's
// screen_update, beam coordinates are 16.16 scaled by the visible size, and
// min_x is subtracted unscaled: a beam at x = 2 lands at pixel 2, not 0.
const pixels = new Uint32Array(16 * 16);
const bitmap = { direct: { pixels, width: 16, height: 16 } };
const screen = { visible_area: () => new GeneratedRectangle(2, 17, 2, 17) };
const at = (x: number, y: number) => pixels[y * 16 + x]!;
const fixed = (value: number) => value * 65536;

// Move to (2,2) dark, then a full-intensity white line to (12,2); a dark move
// to (2,10) draws nothing.
const result = presentVectorDisplay([
  fixed(2), fixed(2), 0xffffffff, 0,
  fixed(12), fixed(2), 0xffffffff, 255,
  fixed(2), fixed(10), 0xffffffff, 0,
], screen, bitmap);

assert.equal(result, 0);
assert.equal(at(2, 2) & 0xffffff, 0xffffff, 'the line starts at its own beam coordinate');
assert.equal(at(12, 2) & 0xffffff, 0xffffff, 'and ends ten pixels along');
assert.equal(at(0, 0), 0xff000000, 'the visible corner is not the origin');
assert.equal(at(2, 10), 0xff000000, 'a move with no intensity draws nothing');
assert.ok((at(5, 3) & 0xff) > 0, 'the beam glows into its neighbours');

// A coloured beam scales each channel; the list is redrawn from black.
presentVectorDisplay([fixed(2), fixed(4), 0xff0000ff, 0, fixed(6), fixed(4), 0xff0000ff, 128], screen, bitmap);
assert.equal(at(12, 2), 0xff000000, 'the previous frame is cleared');
assert.equal(at(4, 4) & 0xffff00, 0, 'red only');
assert.ok((at(4, 4) & 0xff) >= 128, 'at least the beam intensity');

// No direct pixels: not presentable here.
assert.equal(presentVectorDisplay([], screen, {}), undefined);

console.log('vector-display.spec: beam list drawn additively at MAME scale');
