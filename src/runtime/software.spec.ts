import assert from 'node:assert/strict';
import { crc32 } from './zip.ts';
import {
  identifySet,
  mediaSvg,
  mediumNoun,
  entryPlayable,
  mountableImages,
  runSoftwareRoom,
  type SoftCatalog,
} from './software.ts';

assert.equal(typeof runSoftwareRoom, 'function');

// Every medium draws in the same tile so a mixed shelf lines up, and each
// drawing is its own silhouette rather than a recolour of one shape.
const art = { title: 'Nebulus', sub: 'Erbe · 1987', state: 'available' as const, artKey: 'nebulus', code: 'nebulus.zip' };
const drawings = (['cassette', 'floppy', 'cartridge', 'quickload'] as const).map(kind => mediaSvg(kind, art));
for (const [index, svg] of drawings.entries()) {
  assert.ok(svg.includes('viewBox="0 0 200 250"'), 'one tile geometry');
  assert.ok(svg.includes('data-label-bg'), 'the label is addressable');
  assert.ok(svg.includes('Nebulus'), 'the title is drawn');
  assert.ok(svg.includes('nebulus.zip'), 'the set name is printed');
  for (const other of drawings.slice(index + 1)) assert.notEqual(svg, other);
}
assert.ok(mediaSvg('cassette', art).includes('data-medium="cassette"'));
assert.ok(mediaSvg('cassette', { ...art, parts: 2 }).includes('×2'), 'a two-sided tape says so');
assert.ok(mediaSvg('cassette', { ...art, supported: 'no' }).includes('MAME: NOT WORKING'));
assert.ok(mediaSvg('cassette', { ...art, supported: 'partial' }).includes('MAME: PARTIAL'));
assert.ok(!mediaSvg('cassette', { ...art, state: 'catalog' }).includes('✓'), 'no seal without a dump');
assert.ok(mediaSvg('cassette', art).includes('✓'), 'an available dump carries the seal');

assert.equal(mediumNoun('cassette'), 'cassettes');
assert.equal(mediumNoun('floppy', 1), 'disk');
assert.equal(mediumNoun('quickload'), 'programs');
assert.equal(mediumNoun('cartridge', 1), 'cartridge');

// --- identification against several shelves -----------------------------------------
const side1 = new Uint8Array([1, 2, 3, 4]);
const side2 = new Uint8Array([5, 6, 7, 8]);
const other = new Uint8Array([9, 9, 9]);
const hex8 = (n: number) => n.toString(16).padStart(8, '0');
const tapes: SoftCatalog = {
  list: 'c64_cass', description: 'Commodore 64 cassettes', interface: 'cbm_cass',
  entries: [
    { name: '180', description: '180', year: '1986', publisher: 'Mastertronic', slot: '', parts: 2,
      prg: { size: 8, roms: [
        { size: 4, crc: hex8(crc32(side1)), offset: 0, file: '180.tap' },
        { size: 4, crc: hex8(crc32(side2)), offset: 0, file: '180_a1.tap' },
      ] } },
  ],
  crcIndex: { [hex8(crc32(side1))]: [0] },
};
const disks: SoftCatalog = {
  list: 'c64_flop_orig', description: 'Commodore 64 disks', interface: 'floppy_5_25',
  entries: [
    { name: 'aztecchl', description: 'Aztec Challenge', year: '1983', publisher: 'Cosmi', slot: '',
      prg: { size: 3, roms: [{ size: 3, crc: hex8(crc32(other)), offset: 0, file: 'aztec.g64' }] } },
  ],
  crcIndex: { [hex8(crc32(other))]: [0] },
};

const set = new Map([['180_a1.tap', side2], ['180.tap', side1], ['readme.txt', new Uint8Array([0])]]);
const found = identifySet(set, [disks, tapes]);
assert.equal(found?.list, 'c64_cass', 'the tape list claims the tape set');
assert.equal(found?.entry.name, '180');
assert.equal(found?.matched, 2, 'both sides counted');
assert.equal(identifySet(new Map([['x.g64', other]]), [tapes, disks])?.entry.name, 'aztecchl');
assert.equal(identifySet(new Map([['x.tap', new Uint8Array([7, 7])]]), [tapes, disks]), null);

// The images the shell mounts, in the list's own order, never the zip's.
const images = mountableImages(set, ['tap', 'wav'], found!.entry);
assert.deepEqual(images.map(image => image.name), ['180.tap', '180_a1.tap']);
assert.deepEqual(mountableImages(set, ['g64']), [], 'a disk shelf takes no tape');
assert.deepEqual(mountableImages(new Map([['dir/side.TAP', side1]]), ['tap']).map(i => i.name), ['side.TAP'],
  'extension match is case-insensitive and the folder is dropped');

// A merged set (MAME's own layout): the parent's tape at the root, a clone's
// two sides under the clone's folder. The zip is the parent, though the
// clone matches more images, and only the parent's tape is mounted.
const parentTape = new Uint8Array([4, 4, 4]);
const merged: SoftCatalog = {
  list: 'spectrum_cass', description: 'Sinclair ZX Spectrum cassettes', interface: 'spectrum_cass',
  entries: [
    { name: 'mminer', description: 'Manic Miner', year: '1983', publisher: 'Bug-Byte Software', slot: '',
      prg: { size: 3, roms: [{ size: 3, crc: hex8(crc32(parentTape)), offset: 0, file: 'manic miner.tzx' }] } },
    { name: 'mminers', cloneof: 'mminer', description: 'Manic Miner (Software Projects)', year: '1983',
      publisher: 'Software Projects', slot: '', parts: 2, prg: { size: 8, roms: [
        { size: 4, crc: hex8(crc32(side1)), offset: 0, file: 'side 1.tzx' },
        { size: 4, crc: hex8(crc32(side2)), offset: 0, file: 'side 2.tzx' },
      ] } },
  ],
  crcIndex: { [hex8(crc32(parentTape))]: [0], [hex8(crc32(side1))]: [1] },
};
const mergedSet = new Map([
  ['manic miner.tzx', parentTape], ['mminers/side 1.tzx', side1], ['mminers/side 2.tzx', side2],
]);
const parent = identifySet(mergedSet, [merged]);
assert.equal(parent?.entry.name, 'mminer', 'a merged zip is the set at its root');
assert.deepEqual(mountableImages(mergedSet, ['tzx'], parent!.entry).map(image => image.name), ['manic miner.tzx'],
  'the clones in a merged zip are not the parent\'s sides');

// A set is playable only through an image its shelf's transport reads: the
// misc disk list's .img set boots with the drive empty otherwise.
assert.equal(entryPlayable({ prg: { size: 1, roms: [{ size: 1, crc: '', offset: 0, file: 'dd001boot.img' }] } }, { extensions: ['d64'] }), false);
assert.equal(entryPlayable({ prg: { size: 1, roms: [{ size: 1, crc: '', offset: 0, file: 'Side A.D64' }] } }, { extensions: ['d64'] }), true);

console.log('software.spec: media tiles, set identification and mount order passed');
