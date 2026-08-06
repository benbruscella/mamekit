import assert from 'node:assert/strict';
import { applyRomTransforms, assembleRegions } from './shell.ts';
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
