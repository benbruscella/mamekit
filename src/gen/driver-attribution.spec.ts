import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  FULL_SOURCE,
  HEADER_ONLY_SOURCE,
  attributeDriver,
  headerNames,
  loadDriverCredits,
  resetReleaseNoteIndex,
} from './driver-attribution.ts';
import { buildReleaseNoteIndex } from './release-notes.ts';

// --- the driver header's own credit line -----------------------------------

assert.deepEqual(headerNames('Nicola Salmoria,Stephane Humbert'), ['Nicola Salmoria', 'Stephane Humbert']);
assert.deepEqual(headerNames('hap, Sean Riddle and others'), ['hap', 'Sean Riddle']);
assert.deepEqual(headerNames(''), []);

// --- header credit alone, when no notes have been fetched ------------------

const headerOnly = attributeDriver(null, {
  driverFile: 'src/mame/pacman/pacman.cpp',
  machineNames: ['pacman', 'Pac-Man (Midway)'],
  copyrightHolders: 'Nicola Salmoria',
});
assert.deepEqual(headerOnly?.people, [
  { name: 'Nicola Salmoria', headerCredit: true, machineCredit: false, notes: 0 },
]);
assert.equal(headerOnly?.source, HEADER_ONLY_SOURCE);
assert.equal(headerOnly?.releases, undefined, 'no notes means no release span claimed');

// A driver with neither header credit nor notes attributes nothing at all,
// rather than falling back to whoever committed to it.
assert.equal(attributeDriver(null, { driverFile: 'x/y.cpp', machineNames: [] }), undefined);

// --- header credit and release notes together -----------------------------

const index = buildReleaseNoteIndex([
  { release: '0.150', kind: 'machine', names: ['Maker'], paths: [], machines: ['Demo Game'], summary: '' },
  { release: '0.200', kind: 'source-change', names: ['Fixer'], paths: ['maker/demo.cpp'], machines: [], summary: '' },
  { release: '0.289', kind: 'source-change', names: ['Fixer'], paths: ['maker/demo.cpp'], machines: [], summary: '' },
  // The header spells a name differently from the notes; one person, not two.
  { release: '0.240', kind: 'source-change', names: ['nicola salmoria'], paths: ['maker/demo.cpp'], machines: [], summary: '' },
  // A software list item sharing the machine's title must not be attributed.
  { release: '0.260', kind: 'software', names: ['Dumper'], paths: [], machines: ['Demo Game'], summary: '' },
]);

const attributed = attributeDriver(index, {
  driverFile: 'src/mame/maker/demo.cpp',
  machineNames: ['demo', 'Demo Game'],
  copyrightHolders: 'Nicola Salmoria',
});
assert.deepEqual(attributed?.people.map(person => [
  person.name,
  person.headerCredit,
  person.machineCredit,
  person.notes,
]), [
  // Header credit first, then the working-machine credit, then changes.
  ['Nicola Salmoria', true, false, 1],
  ['Maker', false, true, 1],
  ['Fixer', false, false, 2],
]);
assert.equal(attributed?.source, FULL_SOURCE);
// The span describes the notes that were searched, not this driver's own
// credits: all five releases were read, including the software-list one.
assert.deepEqual(attributed?.releases, { first: '0.150', last: '0.289', count: 5 });
assert.equal(
  attributed?.people.some(person => person.name === 'Dumper'),
  false,
  'a software-list dump credit is not a driver credit',
);
assert.equal(attributed?.people.find(person => person.name === 'Fixer')?.firstRelease, '0.200');

// --- loading from the asset tree ------------------------------------------

const root = mkdtempSync(join(tmpdir(), 'mamekit-attribution-'));
mkdirSync(join(root, '.data/release-notes'), { recursive: true });
writeFileSync(join(root, '.data/release-notes/index.json'), JSON.stringify(index));
resetReleaseNoteIndex();
const loaded = loadDriverCredits(root, {
  driverFile: 'src/mame/maker/demo.cpp',
  machineNames: ['Demo Game'],
});
// No copyright-holders line is passed here, so the notes' own spelling stands
// on its own rather than being folded into a header name.
assert.deepEqual(loaded?.people.map(person => person.name), ['Maker', 'Fixer', 'nicola salmoria']);

// A checkout that has never fetched the notes still generates.
const bare = mkdtempSync(join(tmpdir(), 'mamekit-attribution-bare-'));
resetReleaseNoteIndex();
assert.equal(
  loadDriverCredits(bare, { driverFile: 'src/mame/maker/demo.cpp', machineNames: ['Demo Game'] }),
  undefined,
);
resetReleaseNoteIndex();

console.log('driver-attribution.spec: ok');
