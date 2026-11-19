// Cover archives match shelf titles by name, keep an inlay's front panel, and
// hold a re-release whose label disagrees with MAME's publisher for review.

import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chooseScan, coverKey, frontCrop, frontScans, imageSize, planCovers, scanContradicts, shelfTitle } from './covers.ts';

// Both spellings reduce to one key: articles, underscores, notes and scan kinds go.
assert.equal(coverKey('Scroll_of_Akbar_Khan_The'), coverKey('The Scroll of Akbar Khan'));
assert.equal(coverKey('Dig_Dug_(Thunder_Mountain)'), 'digdug');
assert.equal(coverKey('Bible_Search_[Back]'), 'biblesearch');
assert.equal(shelfTitle('Dig Dug (Euro, Rev 1) [cr]'), 'Dig Dug');

// Back scans are never fronts; every front of a title is a candidate.
const fronts = frontScans(['Cover/D/', 'Cover/D/Dig_Dug_(Thunder_Mountain).jpg', 'Cover/D/Dig_Dug_[Back].jpg', 'Cover/S/Scrabble_(Tape).jpg', 'Cover/S/Scrabble.jpg']);
assert.deepEqual(fronts.get('digdug'), ['Cover/D/Dig_Dug_(Thunder_Mountain).jpg']);
assert.deepEqual(fronts.get('scrabble'), ['Cover/S/Scrabble.jpg', 'Cover/S/Scrabble_(Tape).jpg']);

// A label is a publisher; version and medium notes are not labels.
assert.equal(scanContradicts('Cover/D/Dig_Dug_(Thunder_Mountain).jpg', 'Atarisoft'), true);
assert.equal(scanContradicts('Cover/C/Crystal_Castles_(US_Gold).jpg', 'U.S. Gold'), false);
assert.equal(scanContradicts('Cover/B/Beamrider_(Firebird).jpg', 'Firebird Software'), false);
assert.equal(scanContradicts('Cover/M/Money_Wars_(MAX_v2).jpg', 'Commodore'), false);
assert.equal(scanContradicts('Cover/C/Choplifter_(Br0derbund).jpg', 'Brøderbund'), false);

// The plainest fitting scan wins; only contradicting scans go to review.
assert.deepEqual(chooseScan(['a/Scrabble.jpg', 'a/Scrabble_(Tape).jpg'], 'Leisure Genius'), { scan: 'a/Scrabble.jpg', review: false });
assert.deepEqual(chooseScan(['a/SDI_(Activision).jpg', 'a/SDI_(Hit_Squad).jpg'], 'The Hit Squad'), { scan: 'a/SDI_(Hit_Squad).jpg', review: false });
assert.deepEqual(chooseScan(['a/Head_Over_Heels.jpg', 'a/Head_Over_Heels_(Hit_Squad).jpg'], 'The Hit Squad'), { scan: 'a/Head_Over_Heels_(Hit_Squad).jpg', review: false });
assert.deepEqual(chooseScan(['a/Dig_Dug_(Thunder_Mountain).jpg'], 'Atarisoft'), { scan: 'a/Dig_Dug_(Thunder_Mountain).jpg', review: true });
assert.equal(chooseScan([], 'Anyone'), undefined);

// An unfolded inlay keeps its right-hand J-card front; a real cover stays whole.
assert.deepEqual(frontCrop(1608, 1187), { x: 1608 - 742, width: 742 });
assert.equal(frontCrop(1267, 1229), undefined);
assert.equal(frontCrop(376, 600), undefined);

// Sizes come from the header alone.
const png = new Uint8Array(32);
png.set([0x89, 0x50, 0x4e, 0x47]);
new DataView(png.buffer).setUint32(16, 640);
new DataView(png.buffer).setUint32(20, 480);
assert.deepEqual(imageSize(png), { width: 640, height: 480 });
const gif = Uint8Array.from([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x2c, 0x01, 0xc8, 0x00, 0, 0]);
assert.deepEqual(imageSize(gif), { width: 300, height: 200 });
// SOI, an APP0 segment, a DHT (C4, not a frame), then SOF0 with 100x200.
const jpeg = Uint8Array.from([
  0xff, 0xd8, 0xff, 0xe0, 0x00, 0x04, 0x00, 0x00,
  0xff, 0xc4, 0x00, 0x03, 0x00,
  0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0xc8, 0x00, 0x64, 0x01, 0x01, 0x11, 0x00,
]);
assert.deepEqual(imageSize(jpeg), { width: 100, height: 200 });

// A plan: an existing cover wins, a fitting scan is written, a contradicting one is reviewed.
const root = mkdtempSync(join(tmpdir(), 'covers-spec-'));
mkdirSync(join(root, 'carts', 'c64_cart'), { recursive: true });
writeFileSync(join(root, 'carts', 'c64_cart', 'held.webp'), '');
const plan = planCovers(
  ['Cover/H/Held.jpg', 'Cover/D/Dig_Dug_(Thunder_Mountain).jpg', 'Cover/S/Scrabble.jpg'],
  [
    { list: 'c64_cart', name: 'held', description: 'Held', publisher: 'Acme' },
    { list: 'c64_cart', name: 'digdug', description: 'Dig Dug', publisher: 'Atarisoft' },
    { list: 'c64_cass', name: 'scrabble', description: 'Scrabble (Euro)', publisher: 'Leisure Genius' },
    { list: 'c64_cass', name: 'nothing', description: 'Nothing Like It', publisher: 'Acme' },
  ],
  join(root, 'carts'), join(root, '_review'),
);
assert.deepEqual(plan.present.map(want => want.name), ['held']);
assert.deepEqual(plan.write.map(item => [item.want.name, item.dest]), [['scrabble', join(root, 'carts', 'c64_cass', 'scrabble.webp')]]);
assert.deepEqual(plan.review.map(item => [item.want.name, item.dest]), [['digdug', join(root, '_review', 'c64_cart', 'digdug.webp')]]);
assert.deepEqual(plan.unmatched.map(want => want.name), ['nothing']);

console.log('covers: ok');
