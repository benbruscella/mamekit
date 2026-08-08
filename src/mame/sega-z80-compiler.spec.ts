import assert from 'node:assert/strict';
import { join } from 'node:path';
import { compileSegaZ80RomTransform } from './sega-z80-compiler.ts';
import { applyRomTransforms } from '../runtime/shell.ts';
import type { Regions } from '../runtime/types.ts';

const mameSrc = join(import.meta.dirname, '../../../mame');
const old = compileSegaZ80RomTransform(
  mameSrc, 'SEGA_315_5098', 'maincpu', 'decrypted_opcodes',
);
assert.equal(old?.algorithm, 'segacrpt');
assert.equal(old?.convtable?.length, 128);
const oldRegions: Regions = { maincpu: Uint8Array.from({ length: 0x8000 }, (_, i) => i) };
applyRomTransforms(oldRegions, [old!]);
assert.equal(oldRegions.decrypted_opcodes?.length, 0x8000);
assert.notDeepEqual(oldRegions.maincpu.slice(0, 32), oldRegions.decrypted_opcodes?.slice(0, 32));

const newer = compileSegaZ80RomTransform(
  mameSrc, 'SEGA_315_5177', 'maincpu', 'decrypted_opcodes',
);
assert.equal(newer?.algorithm, 'segacrp2');
assert.equal(newer?.xorTable?.length, 128);
assert.equal(newer?.swapTable?.length, 128);
const newRegions: Regions = { maincpu: Uint8Array.from({ length: 0x8000 }, (_, i) => i) };
applyRomTransforms(newRegions, [newer!]);
assert.equal(newRegions.decrypted_opcodes?.length, 0x8000);
assert.notDeepEqual(newRegions.maincpu.slice(0, 32), newRegions.decrypted_opcodes?.slice(0, 32));
assert.deepEqual([...newRegions.maincpu.slice(0, 8)], [84, 20, 86, 22, 80, 16, 82, 18]);
assert.deepEqual([...newRegions.decrypted_opcodes!.slice(0, 8)], [4, 80, 6, 82, 0, 84, 2, 86]);

console.log('sega-z80-compiler.spec: old and System 2 source-derived decryptors passed');
