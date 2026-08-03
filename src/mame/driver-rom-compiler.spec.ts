import assert from 'node:assert/strict';
import { join } from 'node:path';
import { compileDriverRomTransforms } from './driver-rom-compiler.ts';
import { applyRomTransforms } from '../runtime/shell.ts';

const mameSrc = join(import.meta.dirname, '../../../mame');
const transforms = compileDriverRomTransforms(
  mameSrc,
  'src/mame/nintendo/popeye.cpp',
  'tpp2_state',
  { maincpu: 0x8000 },
);
assert.equal(transforms.length, 1);
assert.equal(transforms[0]?.region, 'maincpu');
assert.equal(transforms[0]?.addressBits.length, 16);
assert.equal(transforms[0]?.dataBits.length, 8);
const bytes = Uint8Array.from({ length: 0x8000 }, (_, index) => index);
applyRomTransforms({ maincpu: bytes }, transforms);
assert.notDeepEqual([...bytes.slice(0, 16)], [...Array(16).keys()]);

console.log('driver-rom-compiler.spec: virtual driver_start bitswap decrypt passed');
