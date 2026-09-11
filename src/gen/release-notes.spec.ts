import assert from 'node:assert/strict';
import {
  buildReleaseNoteIndex,
  couldBeDriverPath,
  creditsFromIndex,
  driverCredits,
  joinWrappedLines,
  machineShortNames,
  parseReleaseNotes,
  pathStem,
} from './release-notes.ts';

// --- the modern shapes (0.289) --------------------------------------------

const modern = `0.289 2026-07-31
----------------

MAME Testers bugs fixed
-----------------------
- 03342: [Graphics] (gaelco/gaelco2.cpp) radikalb, surfplnt40: Some graphics are misaligned. (Jos van Mourik)

New working systems
-------------------
Busch Microtronic 2090 [hap, Jason T. Jacques, Decle]

New working software list items
------------------------------
pacman: Pac-Man (Atari 2600) [TOSEC]

Merged pull requests
--------------------
- 15355: zaccaria/zaccaria.cpp: Added an additional version of Money Money. [Luis Arrufat, ClawGrip]
- 15136: ui/viewgfx.cpp: Made text detailed; emu/drawgfx.h: Added helpers. [cam900]
`;

const credits = parseReleaseNotes('0.289', modern);

const bug = credits.find(credit => credit.kind === 'bug-fix');
assert.deepEqual(bug?.names, ['Jos van Mourik']);
assert.deepEqual(bug?.paths, ['gaelco/gaelco2.cpp']);
assert.deepEqual(bug?.machines, ['radikalb', 'surfplnt40'], 'the sets it was fixed in');

const machine = credits.find(credit => credit.kind === 'machine');
assert.deepEqual(machine?.names, ['hap', 'Jason T. Jacques', 'Decle']);
assert.deepEqual(machine?.machines, ['Busch Microtronic 2090']);

// A software list item that shares an arcade machine's name must never be
// attributable to that machine's driver.
const software = credits.find(credit => credit.kind === 'software');
assert.deepEqual(software?.names, ['TOSEC']);
assert.equal(software?.machines.length, 1);

const pull = credits.find(credit => credit.names.includes('ClawGrip'));
assert.deepEqual(pull?.paths, ['zaccaria/zaccaria.cpp']);
assert.deepEqual(pull?.names, ['Luis Arrufat', 'ClawGrip']);
assert.deepEqual(
  credits.find(credit => credit.names.includes('cam900'))?.paths,
  ['ui/viewgfx.cpp', 'emu/drawgfx.h'],
  'both halves of a two-file entry are read',
);

// --- older shapes ---------------------------------------------------------

// 0.1xx folds one entry over several lines, credit last.
assert.deepEqual(
  joinWrappedLines('- 00421: [Graphics] fghthist: Some\n         priority problems. (Pierpaolo Prazzoli)\nnext'),
  ['- 00421: [Graphics] fghthist: Some priority problems. (Pierpaolo Prazzoli)', '', 'next'],
);
const wrapped = parseReleaseNotes('0.130', `0.130
-----

MAMETesters Bugs Fixed
----------------------
- 00421: [Graphics] fghthist, fghthsta: Some
         priority problems in Ryoko's stage. (Pierpaolo Prazzoli)
`);
assert.deepEqual(wrapped[0]?.names, ['Pierpaolo Prazzoli'], 'a folded credit is still read');
assert.deepEqual(wrapped[0]?.machines, ['fghthist', 'fghthsta']);

// MESS listed machines with a leading dash and its own heading wording.
const mess = parseReleaseNotes('0.161', `0.161
-----

New System Drivers Supported:
-----------------------------
-Bambino Basketball - Dribble Away [hap, Kevin Horton]
`);
assert.deepEqual(mess[0]?.names, ['hap', 'Kevin Horton']);
assert.deepEqual(mess[0]?.machines, ['Bambino Basketball - Dribble Away']);

assert.deepEqual(machineShortNames('sms, smspal and clones'), ['sms', 'smspal']);
assert.deepEqual(machineShortNames('Some prose about a fix'), []);

// --- what may be treated as a driver path --------------------------------

assert.equal(pathStem('src/drivers/pacman.c'), 'pacman');
assert.equal(pathStem('pacman/pacman.cpp'), 'pacman');
assert.equal(couldBeDriverPath('pacman/pacman.cpp'), true);
assert.equal(couldBeDriverPath('hornet.c'), true, 'the old bare-filename form');
assert.equal(couldBeDriverPath('sound/gb.cpp'), false, 'a device shares the GB driver stem');
assert.equal(couldBeDriverPath('nes.xml'), false, 'a software list is not a driver');
assert.equal(couldBeDriverPath('hash/a2600.xml'), false);

// --- aggregation ----------------------------------------------------------

const index = buildReleaseNoteIndex(credits);
assert.equal(index.releases, 1);
assert.deepEqual(index.span, { first: '0.289', last: '0.289' });

const zaccaria = creditsFromIndex(index, 'src/mame/zaccaria/zaccaria.cpp'.replace(/^src\/mame\//, ''));
assert.deepEqual(zaccaria.map(credit => credit.name), ['ClawGrip', 'Luis Arrufat']);
assert.equal(zaccaria[0].entries, 1);
assert.equal(zaccaria[0].firstRelease, '0.289');

// The old path spelling resolves to the same driver.
assert.deepEqual(
  creditsFromIndex(index, 'src/drivers/zaccaria.c').map(credit => credit.name),
  ['ClawGrip', 'Luis Arrufat'],
);

// A machine list credit outranks a change, and says which it was.
const both = buildReleaseNoteIndex([
  { release: '0.200', kind: 'machine', names: ['Maker'], paths: [], machines: ['Demo Game'], summary: '' },
  { release: '0.210', kind: 'source-change', names: ['Fixer'], paths: ['maker/demo.cpp'], machines: [], summary: '' },
  { release: '0.220', kind: 'source-change', names: ['Fixer'], paths: ['maker/demo.cpp'], machines: [], summary: '' },
]);
const ranked = creditsFromIndex(both, 'maker/demo.cpp', ['Demo Game']);
assert.deepEqual(ranked.map(credit => [credit.name, credit.entries, credit.machineCredit]), [
  ['Maker', 1, true],
  ['Fixer', 2, false],
]);
assert.equal(ranked[1].firstRelease, '0.210');
assert.equal(ranked[1].lastRelease, '0.220');

// A note naming both the driver and the machine is one credit, not two.
const once = driverCredits([
  { release: '0.240', kind: 'machine', names: ['Both'], paths: ['maker/demo.cpp'], machines: ['Demo Game'], summary: '' },
], 'maker/demo.cpp', ['Demo Game']);
assert.deepEqual(once, [
  { name: 'Both', entries: 1, firstRelease: '0.240', lastRelease: '0.240', machineCredit: true },
]);

// A software credit is never attributed to a driver, by either key.
const softwareOnly = buildReleaseNoteIndex([
  { release: '0.250', kind: 'software', names: ['Dumper'], paths: [], machines: ['Pac-Man'], summary: '' },
]);
assert.deepEqual(creditsFromIndex(softwareOnly, 'pacman/pacman.cpp', ['Pac-Man']), []);

console.log('release-notes.spec: ok');
