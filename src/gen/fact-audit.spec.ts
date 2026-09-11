import assert from 'node:assert/strict';
import {
  loadNames,
  loadedBytes,
  machineFactFindings,
  normaliseDriverFile,
  normaliseTag,
  scaledScreen,
} from './fact-audit.ts';
import type { ListXmlMachine } from './listxml.ts';

const machine = (over: Partial<ListXmlMachine> = {}): ListXmlMachine => ({
  name: 'demo',
  sourcefile: 'maker/demo.cpp',
  isdevice: false,
  description: 'Demo Game',
  year: '1982',
  manufacturer: 'Maker',
  roms: [],
  chips: [],
  displays: [],
  ...over,
});

// --- shapes that differ without disagreeing -------------------------------

assert.equal(normaliseDriverFile('src/mame/pacman/pacman.cpp'), 'pacman/pacman.cpp');
assert.equal(normaliseTag('^maincpu'), 'maincpu');
assert.equal(normaliseTag(':soundbd:audiocpu'), 'soundbd:audiocpu');

// MAME states one size per chip: first slice + ROM_CONTINUE + ROM_IGNORE.
assert.equal(loadedBytes({ size: 0x8000 }), 0x8000);
assert.equal(
  loadedBytes({ size: 0x8000, continueSegments: [{ size: 0x8000 }] }),
  0x10000,
  'a continued chip is as long as both halves',
);
assert.equal(
  loadedBytes({ size: 0x800, ignoredBytes: 0x800 }),
  0x1000,
  'an ignored half still comes off the chip',
);
assert.deepEqual(
  loadNames({ file: 'a.bin', alt: [{ file: 'b.bin' }, {}] }),
  ['a.bin', 'b.bin'],
);

// --- a clean fact comparison ----------------------------------------------

const clean = machineFactFindings(
  'demo',
  { fullname: 'Demo Game', year: '1982', manufacturer: 'Maker', driverFile: 'src/mame/maker/demo.cpp' },
  {
    board: {
      // MAME's clock is u32 and prints truncated; ours stays fractional.
      cpus: [{ tag: '^maincpu', clock: 1789772.625 }],
      screen: { width: 256, height: 224, rotate: 0, htotal: 384, vtotal: 264, vbstart: 224, vbend: 0, refresh: 60.60606060606061 },
    },
    roms: [{
      region: 'maincpu',
      loads: [{ file: 'demo.1a', offset: 0, size: 0x8000, crc: 'AABBCCDD', continueSegments: [{ size: 0x8000 }] }],
    }],
  },
  machine({
    chips: [{ type: 'cpu', tag: 'maincpu', name: 'Z80', clock: 1789772 }],
    displays: [{ type: 'raster', width: 256, height: 224, rotate: 0, htotal: 384, vtotal: 264, vbstart: 224, vbend: 0, refresh: 60.606061 }],
    roms: [
      { name: 'demo.1a', size: 0x10000, region: 'maincpu', offset: 0, crc: 'aabbccdd' },
      // A selectable BIOS is not a load the board omitted.
      { name: 'bios-a.bin', size: 0x2000, region: 'mainbios', offset: 0, crc: '11111111', bios: 'euro' },
      // Nothing can supply an undumped chip, so there is nothing to compare.
      { name: 'prom.7f', size: 32, region: 'proms', offset: 0 },
    ],
  }),
);
assert.deepEqual(clean, { failures: [], divergences: [] });

// --- real disagreements ---------------------------------------------------

const wrong = machineFactFindings(
  'demo',
  { fullname: 'Demo Game (bootleg)', year: '1983', manufacturer: 'Maker', driverFile: 'src/mame/maker/other.cpp' },
  {
    board: {
      cpus: [{ tag: 'maincpu', clock: 4000000 }],
      screen: { width: 256, height: 240, rotate: 0, htotal: 384, vtotal: 264, vbstart: 224, vbend: 0 },
    },
    roms: [{ region: 'maincpu', loads: [{ file: 'demo.1a', offset: 0, size: 0x4000, crc: 'aabbccdd' }] }],
  },
  machine({
    chips: [{ type: 'cpu', tag: 'maincpu', name: 'Z80', clock: 3072000 }],
    displays: [{ type: 'raster', width: 256, height: 224, rotate: 0, htotal: 384, vtotal: 264, vbstart: 224, vbend: 0 }],
    roms: [
      { name: 'demo.1a', size: 0x8000, region: 'maincpu', offset: 0, crc: 'aabbccdd' },
      { name: 'demo.2a', size: 0x8000, region: 'maincpu', offset: 0x8000, crc: '99999999' },
    ],
  }),
);
const joined = wrong.failures.join('\n');
assert.match(joined, /fullname is "Demo Game \(bootleg\)" but MAME reports "Demo Game"/);
assert.match(joined, /year is "1983" but MAME reports "1982"/);
assert.match(joined, /driver file is "maker\/other\.cpp" but MAME reports "maker\/demo\.cpp"/);
assert.match(joined, /screen height is 240 but MAME reports 224/);
assert.match(joined, /cpu maincpu clock is 4000000 but MAME reports 3072000/);
// A dropped ROM_CONTINUE is exactly the silent bug this audit exists to catch.
assert.match(joined, /rom maincpu\/demo\.1a size is 16384 but MAME reports 32768/);
assert.match(joined, /MAME loads maincpu\/demo\.2a, which the board never loads/);
assert.equal(wrong.divergences.length, 0);

// --- a scaled screen is a divergence, not a failure -----------------------

assert.equal(scaledScreen({ width: 256, htotal: 384 }, { type: 'raster', width: 768, htotal: 1152 }), 3);
assert.equal(
  scaledScreen({ width: 256, htotal: 1152 }, { type: 'raster', width: 768, htotal: 1152 }),
  3,
  'a board that already carries MAME’s htotal is still a scaled screen',
);
assert.equal(
  scaledScreen({ width: 224, htotal: 384 }, { type: 'raster', width: 256, htotal: 384 }),
  undefined,
  'a plain width error is not an integer scale',
);
assert.equal(
  scaledScreen({ width: 256, htotal: 384 }, { type: 'raster', width: 768, htotal: 400 }),
  undefined,
  'only the whole horizontal axis scaling counts',
);

const scaled = machineFactFindings(
  'galaxian',
  { fullname: 'Demo Game', year: '1982', manufacturer: 'Maker', driverFile: 'src/mame/maker/demo.cpp' },
  { board: { screen: { width: 256, height: 224, htotal: 384, vtotal: 264 } } },
  machine({ displays: [{ type: 'raster', width: 768, height: 224, htotal: 1152, vtotal: 264 }] }),
);
assert.deepEqual(scaled.failures, [], 'a scaled screen is not a failure');
assert.match(scaled.divergences[0], /MAME renders this screen 3× wide/);

console.log('fact-audit.spec: ok');
