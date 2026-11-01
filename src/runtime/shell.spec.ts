import assert from 'node:assert/strict';
import {
  applyRomTransforms,
  assembleRegions,
  clearOutdatedRomSet,
  dependencyRomSets,
  requiredRomRegions,
  romRequirements,
  unresolvedDependencyRomSets,
  type RomRegionSpec,
} from './shell.ts';
import { sampleSetKey, type RomRecord, type RomStore } from './romstore.ts';
import { crc32 } from './zip.ts';
import { writeZip } from '../../tools/rom-library/library.ts';
import type { Regions } from './types.ts';

const regions = assembleRegions(
  [
    { region: 'eraseff', size: 4, fill: 0xff, loads: [] },
    { region: 'erase00', size: 4, fill: 0x00, loads: [] },
    { region: 'inverted', size: 4, invert: true, loads: [] },
    { region: 'socket', size: 4, fills: [{ offset: 2, size: 2, value: 0xff }], loads: [] },
  ],
  new Map(),
  () => {},
);

assert.deepEqual([...regions.eraseff!], [0xff, 0xff, 0xff, 0xff]);
assert.deepEqual([...regions.erase00!], [0x00, 0x00, 0x00, 0x00]);
assert.deepEqual([...regions.inverted!], [0xff, 0xff, 0xff, 0xff]);
assert.deepEqual([...regions.socket!], [0x00, 0x00, 0xff, 0xff]);

const splitSetSpecs = [
  { region: 'maincpu', size: 1, loads: [{ file: 'game.bin', offset: 0, size: 1, crc: '00' }] },
  { region: 'io:mcu', size: 1, romSet: 'deviceio', loads: [{ file: 'io.bin', offset: 0, size: 1, crc: '00' }] },
  { region: 'undumped:mcu', size: 1, romSet: 'prototype', loads: [{ file: 'none.bin', offset: 0, size: 1, crc: '00', status: 'nodump' as const }] },
];
assert.deepEqual([...requiredRomRegions(splitSetSpecs, ['maincpu'])].sort(), ['io:mcu', 'maincpu']);
assert.deepEqual(dependencyRomSets(splitSetSpecs, 'game'), ['deviceio']);
const bundledDeviceRom = Uint8Array.of(0x42);
const bundledSpecs = [{
  region: 'io:mcu',
  size: 1,
  romSet: 'parent',
  loads: [{
    file: 'parent.bin',
    offset: 0,
    size: 1,
    crc: crc32(bundledDeviceRom).toString(16).padStart(8, '0'),
  }],
}];
assert.deepEqual(
  unresolvedDependencyRomSets(
    bundledSpecs,
    'clone',
    new Map([['parent.bin', bundledDeviceRom]]),
  ),
  [],
  'a merged primary archive must satisfy parent-set dependencies by CRC',
);
assert.deepEqual(
  unresolvedDependencyRomSets(bundledSpecs, 'clone', new Map()),
  ['parent'],
);
const splitFile = Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8]);
const splitRegions = assembleRegions(
  [{
    region: 'gfx2',
    size: 4,
    loads: [{
      file: 'graphics.bin',
      offset: 0,
      size: 4,
      crc: '3fca88c5',
      continueSegments: [{ offset: 0, size: 4, fileOffset: 4 }],
    }],
  }],
  new Map([['graphics.bin', splitFile]]),
  () => {},
);
assert.deepEqual([...splitRegions.gfx2!], [5, 6, 7, 8]);

const invertedLoad = assembleRegions(
  [{
    region: 'gfx1',
    size: 4,
    invert: true,
    loads: [{
      file: 'graphics.bin',
      offset: 0,
      size: 4,
      crc: '32d988a9',
    }],
  }],
  new Map([['graphics.bin', Uint8Array.from([0x00, 0x55, 0xaa, 0xff])]]),
  () => {},
);
assert.deepEqual([...invertedLoad.gfx1!], [0xff, 0xaa, 0x55, 0x00]);

const interleaved = assembleRegions(
  [{
    region: 'maincpu',
    size: 8,
    loads: [
      { file: 'even.bin', offset: 0, size: 4, crc: 'b63cfbcd', skip: 1 },
      { file: 'odd.bin', offset: 1, size: 4, crc: '538d4d69', skip: 1 },
    ],
  }],
  new Map([
    ['even.bin', Uint8Array.from([0x10, 0x20, 0x30, 0x40])],
    ['odd.bin', Uint8Array.from([0x11, 0x21, 0x31, 0x41])],
  ]),
  () => {},
);
assert.deepEqual([...interleaved.maincpu!], [0x10, 0x11, 0x20, 0x21, 0x30, 0x31, 0x40, 0x41]);

const wordSwapped = assembleRegions(
  [{
    region: 'words',
    size: 4,
    loads: [{
      file: 'words.bin', offset: 0, size: 4, crc: 'f626d399', groupSize: 2, reverse: true,
    }],
  }],
  new Map([['words.bin', Uint8Array.from([1, 2, 3, 4])]]),
  () => {},
);
assert.deepEqual([...wordSwapped.words!], [2, 1, 4, 3]);

const nibbleMerged = assembleRegions(
  [{
    region: 'palette',
    size: 3,
    loads: [
      { file: 'low.bin', offset: 0, size: 3, crc: '55bc801d', nibbleShift: 0 as const },
      { file: 'high.bin', offset: 0, size: 3, crc: '1894c924', nibbleShift: 4 as const },
    ],
  }],
  new Map([
    ['low.bin', Uint8Array.from([1, 2, 3])],
    ['high.bin', Uint8Array.from([10, 11, 12])],
  ]),
  () => {},
);
assert.deepEqual([...nibbleMerged.palette!], [0xa1, 0xb2, 0xc3]);

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

const bitswapped: Regions = { audiocpu: Uint8Array.from([0x01, 0x02, 0x81, 0xff]) };
applyRomTransforms(bitswapped, [{
  kind: 'byte-bitswap',
  region: 'audiocpu',
  start: 0,
  end: 3,
  bits: [7, 6, 5, 4, 3, 2, 0, 1],
}]);
assert.deepEqual([...bitswapped.audiocpu!], [0x02, 0x01, 0x82, 0xff]);

const splitOpcodes: Regions = { maincpu: Uint8Array.from([0x80, 0x02, 0x11]) };
const substitution = Array.from({ length: 256 }, (_unused, value) =>
  (value & 0x11) | ((value & 0xe0) >> 4) | ((value & 0x0e) << 4));
applyRomTransforms(splitOpcodes, [{
  kind: 'byte-substitution',
  sourceRegion: 'maincpu',
  targetRegion: 'decrypted_opcodes',
  start: 1,
  end: 3,
  table: substitution,
}]);
assert.deepEqual([...splitOpcodes.maincpu], [0x80, 0x02, 0x11]);
assert.deepEqual([...splitOpcodes.decrypted_opcodes!], [0x80, 0x20, 0x11]);

console.log('shell.spec: MAME ROM region fill and driver-init transform semantics passed');

// --- a kept set against what the machine requires (issue #232) ---------------

const chip = (file: string, bytes: number[]): RomRegionSpec['loads'][number] => ({
  file, offset: 0, size: bytes.length, crc: crc32(new Uint8Array(bytes)).toString(16).padStart(8, '0'),
} as RomRegionSpec['loads'][number]);
const CODE = [1, 2], PROM = [3, 4], DRIVE = [5, 6];
const base: RomRegionSpec[] = [
  { region: 'maincpu', size: 2, loads: [chip('code.bin', CODE)] },
  { region: 'proms', size: 2, loads: [chip('prom.bin', PROM)] },
];
const withDrive: RomRegionSpec[] = [...base, { region: 'iec8:c1541:drive', size: 2, romSet: 'c1541', loads: [chip('drive.bin', DRIVE)] }];
const samples = [{ tag: 'samples', set: 'carnival', names: ['bear'] }];

function keptStore(members: Record<string, number[]>, requires?: number): RomStore & { map: Map<string, RomRecord> } {
  const bytes = writeZip(new Map(Object.entries(members).map(([name, chipBytes]) => [name, new Uint8Array(chipBytes)])));
  const map = new Map<string, RomRecord>([['game', {
    game: 'game',
    zips: [{ name: 'game.zip', bytes: new Uint8Array(bytes).buffer as ArrayBuffer }],
    addedAt: 0,
    ...(requires === undefined ? {} : { requires }),
  }]]);
  return {
    map,
    persistent: true,
    get: async game => map.get(game) ?? null,
    put: async record => { map.set(record.game, record); },
    remove: async game => { map.delete(game); },
    games: async () => [...map.keys()],
  };
}
const whole = { 'code.bin': CODE, 'prom.bin': PROM };
const requires = romRequirements(base, undefined, []);

// The number moves with the chips and sample sets, not with their order or a media slot.
assert.equal(romRequirements([...base].reverse(), undefined, []), requires);
assert.equal(romRequirements(withDrive, undefined, ['iec8']), requires, 'a slot a title may leave empty is no requirement');
assert.notEqual(romRequirements(withDrive, undefined, []), requires);
assert.notEqual(romRequirements(base, samples, []), requires);

// Unchanged requirements: a set accepted short stays, or it is asked for on every boot.
{
  const store = keptStore({ 'code.bin': CODE }, requires);
  assert.equal(await clearOutdatedRomSet(store, 'game', base, undefined, []), false);
  assert.ok(store.map.has('game'));
}
// Changed, and the set does not meet them: a chip missing, or one unlike the dump.
for (const members of [{ 'code.bin': CODE }, { 'code.bin': CODE, 'prom.bin': [9, 9] }] as Record<string, number[]>[]) {
  const store = keptStore(members, requires + 1);
  assert.equal(await clearOutdatedRomSet(store, 'game', base, undefined, []), true);
  assert.equal(store.map.has('game'), false);
}
// Changed, and the set still meets them: kept, and recorded against them.
{
  const store = keptStore(whole);
  assert.equal(await clearOutdatedRomSet(store, 'game', base, undefined, []), false);
  assert.equal(store.map.get('game')!.requires, requires);
}
// Carnival: kept before the machine played samples, and no sample set here.
{
  const store = keptStore(whole);
  assert.equal(await clearOutdatedRomSet(store, 'game', base, samples, []), true);
  // Kept again without the optional samples: not cleared a second time.
  const again = keptStore(whole, romRequirements(base, samples, []));
  assert.equal(await clearOutdatedRomSet(again, 'game', base, samples, []), false);
  // With the sample set kept, the ROM stays through the change.
  const held = keptStore(whole);
  held.map.set(sampleSetKey('carnival'), { game: sampleSetKey('carnival'), zips: [], addedAt: 0 });
  assert.equal(await clearOutdatedRomSet(held, 'game', base, samples, []), false);
}
// The C64: firmware kept by a tape title survives a disk title asking for its drive.
{
  const store = keptStore(whole);
  assert.equal(await clearOutdatedRomSet(store, 'game', withDrive, undefined, ['iec8']), false);
  assert.ok(store.map.has('game'));
}

console.log('shell.spec: a kept set is cleared only when the machine moved past it');
