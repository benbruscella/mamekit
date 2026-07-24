import assert from 'node:assert/strict';
import { decodeGfx } from './gfx.ts';

const onePlane = decodeGfx({
  width: 2,
  height: 2,
  total: 1,
  planes: 1,
  planeOffsets: [0],
  xOffsets: [0, 1],
  yOffsets: [0, 2],
  charIncrement: 4,
}, Uint8Array.of(0xa0));
assert.deepEqual(
  { count: onePlane.count, width: onePlane.width, height: onePlane.height, pixels: [...onePlane.pixels] },
  { count: 1, width: 2, height: 2, pixels: [1, 0, 1, 0] },
);

const twoPlane = decodeGfx({
  width: 2,
  height: 1,
  total: 1,
  planes: 2,
  planeOffsets: [0, 4],
  xOffsets: [0, 1],
  yOffsets: [0],
  charIncrement: 8,
}, Uint8Array.of(0x84));
assert.deepEqual([...twoPlane.pixels], [2, 1], 'plane zero must be the most significant bit');

const fractional = decodeGfx({
  width: 1,
  height: 1,
  total: 'RGN_FRAC(1,1)',
  planes: 1,
  planeOffsets: ['RGN_FRAC(1,2)'],
  xOffsets: [0],
  yOffsets: [0],
  charIncrement: 8,
}, Uint8Array.of(0, 0x80));
assert.equal(fractional.count, 2);
assert.deepEqual([...fractional.pixels], [1, 0]);

assert.throws(() => decodeGfx({
  width: 2,
  height: 1,
  total: 1,
  planes: 1,
  planeOffsets: [0],
  xOffsets: [0],
  yOffsets: [0],
  charIncrement: 8,
}, Uint8Array.of(0)), /xOffsets shorter/);

console.log('gfx.spec: planes, MAME bit order, RGN_FRAC and validation passed');
