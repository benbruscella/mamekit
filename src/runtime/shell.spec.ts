import assert from 'node:assert/strict';
import { applyRomTransforms, assembleRegions } from './shell.ts';

const regions = assembleRegions(
  [
    { region: 'eraseff', size: 4, fill: 0xff, loads: [] },
    { region: 'erase00', size: 4, fill: 0x00, loads: [] },
  ],
  new Map(),
  () => {},
);

assert.deepEqual([...regions.eraseff!], [0xff, 0xff, 0xff, 0xff]);
assert.deepEqual([...regions.erase00!], [0x00, 0x00, 0x00, 0x00]);

const transformed = { gfx1: Uint8Array.from({ length: 32 }, (_, index) => index) };
applyRomTransforms(transformed, [{
  kind: 'conditional-byte-swap',
  region: 'gfx1',
  indexMask: 0x08,
  indexValue: 0,
  displacement: 8,
}]);
assert.deepEqual(
  [...transformed.gfx1],
  [8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7,
    24, 25, 26, 27, 28, 29, 30, 31, 16, 17, 18, 19, 20, 21, 22, 23],
);

console.log('shell.spec: MAME ROM region fill and driver-init transform semantics passed');
