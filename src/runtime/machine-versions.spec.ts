// Which regional version plays a title: MAME's filter decides which versions
// list it, the visitor's choice wins among those, and on Auto the list's video
// note and then acceptance break the tie.

import assert from 'node:assert/strict';
import { chooseVersion, onlyVersion, versionFilters, versionLabel, type MachineVersion } from './machine-versions.ts';

assert.equal(versionLabel('Commodore 64 (PAL)', 'c64p'), 'PAL');
assert.equal(versionLabel('Commodore 64', 'c64'), 'c64');
assert.deepEqual(versionFilters([{ filter: 'PAL' }, { filter: 'PAL, X' }, {}]), ['PAL', 'X']);

const ntsc: MachineVersion = { game: 'ntsc', label: 'NTSC', filters: ['NTSC'], accepted: false };
const pal: MachineVersion = { game: 'pal', label: 'PAL', filters: ['PAL'], accepted: true };
const both = [ntsc, pal];

// Listed by one version only: that version, whatever was chosen.
assert.equal(chooseVersion(both, ['ntsc'], 'pal'), ntsc);
assert.equal(chooseVersion(both, ['pal'], 'auto'), pal);
// Listed by both: a hand-picked version wins, even over the list's note.
assert.equal(chooseVersion(both, ['ntsc', 'pal'], 'ntsc', 'PAL'), ntsc);
// On Auto: the version the note names, then the accepted one.
assert.equal(chooseVersion(both, ['ntsc', 'pal'], 'auto', 'NTSC'), ntsc);
assert.equal(chooseVersion(both, ['ntsc', 'pal'], 'auto'), pal);
// A set no catalogue identified may try any version; Power on is the same.
assert.equal(chooseVersion(both, undefined, 'ntsc'), ntsc);
assert.equal(chooseVersion(both, undefined, 'auto'), pal);

// Two accepted versions and nothing to go on: the one whose shelves hold more.
{
  const ntscReady = { ...ntsc, accepted: true, titles: 1676 };
  const palReady = { ...pal, titles: 1707 };
  assert.equal(chooseVersion([ntscReady, palReady], ['ntsc', 'pal'], 'auto'), palReady);
  assert.equal(chooseVersion([ntscReady, palReady], undefined, 'auto'), palReady, 'Power on too');
  assert.equal(chooseVersion([ntscReady, palReady], ['ntsc', 'pal'], 'auto', 'NTSC'), ntscReady, 'a note still wins');
}

assert.equal(onlyVersion(both, ['pal']), pal);
assert.equal(onlyVersion(both, ['ntsc', 'pal']), undefined);
assert.equal(onlyVersion([pal], ['pal']), undefined, 'one version restricts nothing');
assert.equal(onlyVersion(both, undefined), undefined);

console.log('machine-versions.spec: labels, filters and the version a title plays on passed');
