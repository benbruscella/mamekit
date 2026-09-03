import assert from 'node:assert/strict';
import { join } from 'node:path';
import { compileDriverRomTransforms } from './driver-rom-compiler.ts';
import { applyRomTransforms } from '../runtime/shell.ts';

const mameSrc = process.env.MAME_SRC ?? join(import.meta.dirname, '../../../mame');
const transforms = compileDriverRomTransforms(
  mameSrc,
  'src/mame/nintendo/popeye.cpp',
  'tpp2_state',
  { maincpu: 0x8000 },
);
assert.equal(transforms.length, 1);
assert.equal(transforms[0]?.region, 'maincpu');
assert.equal(transforms[0]?.kind, 'address-byte-bitswap');
assert.ok(transforms[0]?.kind === 'address-byte-bitswap');
assert.equal(transforms[0]?.addressBits.length, 16);
assert.equal(transforms[0]?.dataBits.length, 8);
const bytes = Uint8Array.from({ length: 0x8000 }, (_, index) => index);
applyRomTransforms({ maincpu: bytes }, transforms);
assert.notDeepEqual([...bytes.slice(0, 16)], [...Array(16).keys()]);

const konami = compileDriverRomTransforms(
  mameSrc,
  'src/mame/konami/tmnt.cpp',
  'tmnt_state',
  { k052109: 0x100000, k051960: 0x200000, proms: 0x200 },
  'init_tmnt',
);
assert.deepEqual(konami.map(transform => [transform.kind, transform.region]), [
  ['word-bitswap', 'k052109'],
  ['word-bitswap', 'k051960'],
  ['prom-word-address', 'k051960'],
]);
assert.ok(konami.slice(0, 2).every(transform =>
  transform.kind === 'word-bitswap' && transform.wordBits === 32 && transform.bits.length === 32));
assert.equal(konami[2]?.kind, 'prom-word-address');
assert.ok(konami[2]?.kind === 'prom-word-address');
assert.deepEqual(konami[2].bitPickTable[0], [3, 3, 3, 3, 3, 3, 3, 3]);

console.log('driver-rom-compiler.spec: source ROM bitswap transforms passed');
