// What a room says about firmware before anything boots: each set, the slot
// it is limited to, and whether this browser holds every dumped chip of it.

import assert from 'node:assert/strict';
import { firmwareSets, holdsFirmware } from './firmware-status.ts';
import type { RomRegionSpec } from './shell.ts';
import { crc32 } from './zip.ts';

const chip = (text: string) => new TextEncoder().encode(text);
const crcOf = (bytes: Uint8Array) => crc32(bytes).toString(16).padStart(8, '0');
const kernal = chip('kernal'), basic = chip('basic'), drive = chip('dos');
const region = (name: string, file: string, bytes: Uint8Array, romSet?: string): RomRegionSpec => ({
  region: name, size: bytes.length,
  loads: [{ file, offset: 0, size: bytes.length, crc: crcOf(bytes), ...(romSet ? { romSet } : {}) }],
}) as unknown as RomRegionSpec;
const roms = [
  region('kernal', 'kernal.u4', kernal),
  region('basic', 'basic.u3', basic),
  region('iec8:c1541:ucd5', 'dos.uab5', drive, 'c1541'),
];

// Nothing kept: both sets missing, the drive's limited to its slot.
assert.deepEqual(firmwareSets(roms, 'c64', new Map(), ['tape', 'iec8']), [
  { name: 'c64', kept: false },
  { name: 'c1541', slot: 'iec8', kept: false },
]);
// Half a set is not a set: BASIC without the KERNAL is still missing.
assert.equal(firmwareSets(roms, 'c64', new Map([['basic.u3', basic]]), ['iec8'])[0]!.kept, false);
assert.deepEqual(firmwareSets(roms, 'c64', new Map([['kernal.u4', kernal], ['basic.u3', basic]]), ['iec8'])
  .map(set => set.kept), [true, false]);

// A zip is firmware when any member is one of the machine's chips.
assert.equal(holdsFirmware(new Map([['x.bin', drive]]), roms), true);
assert.equal(holdsFirmware(new Map([['game.tap', chip('tape')]]), roms), false);

console.log('firmware-status.spec: sets, slots, kept chips and firmware zips passed');
