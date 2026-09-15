import assert from 'node:assert/strict';
import {
  browseSlug,
  matchesMenuEntry,
  menuShelfMaxWidth,
  menuTabs,
  menuTileSash,
  menuTitle,
  runMenu,
} from './menu.ts';

const pacman = {
  game: 'pacman',
  title: 'Pac-Man',
  manufacturer: 'Namco',
  year: '1980',
};
assert.equal(menuTitle({ fullname: 'Commodore 64 (PAL)', kind: 'computer' }), 'Commodore 64 (PAL)');
assert.equal(menuTitle({ fullname: 'Commodore 64 (NTSC)', kind: 'computer' }), 'Commodore 64 (NTSC)');
assert.equal(menuTitle({ fullname: 'Pac-Man (Midway)' }), 'Pac-Man');
assert.equal(matchesMenuEntry(pacman, 'arcade', ''), true);
assert.equal(matchesMenuEntry(pacman, 'arcade', 'NAMCO'), true);
assert.equal(matchesMenuEntry(pacman, 'arcade', '1980'), true);
assert.equal(matchesMenuEntry(pacman, 'console', 'pac'), false);
assert.equal(matchesMenuEntry({ ...pacman, kind: 'console' }, 'console', 'pac'), true);
assert.equal(matchesMenuEntry({ ...pacman, kind: 'computer' }, 'computer', 'pac'), true);
assert.equal(matchesMenuEntry(pacman, 'arcade', 'galaga'), false);
// A category with no generated target must not get a tab: issue #53 dropped
// the console build, and an empty CONSOLES shelf is worse than no pill.
assert.deepEqual(menuTabs([{}, {}]), ['arcade']);
assert.deepEqual(menuTabs([{ kind: 'console' }]), ['console']);
assert.deepEqual(menuTabs([{}, { kind: 'console' }]), ['arcade', 'console']);
assert.deepEqual(menuTabs([{}, { kind: 'computer' }]), ['arcade', 'computer']);
assert.deepEqual(menuTabs([{ kind: 'console' }, { kind: 'computer' }]), ['console', 'computer']);
assert.deepEqual(menuTabs([]), []);
assert.equal(browseSlug('Aaron Giles'), 'aaron-giles');
assert.equal(browseSlug('src/mame/irem/m62.cpp'), 'src-mame-irem-m62-cpp');
assert.equal(menuShelfMaxWidth('arcade'), '1470px');
assert.equal(menuShelfMaxWidth('console'), '1280px');
assert.equal(menuShelfMaxWidth('computer'), '1280px');
assert.equal(typeof runMenu, 'function');

console.log('menu.spec: generated entry tab and search filtering passed');

// The shelf box wears one corner sash, and which one is a precedence, not a
// pile of independent conditions. A candidate that plays and whose set the
// visitor already keeps still says EXPERIMENTAL -- issue #142's three games
// wore nothing at all while the label was gated on `supported === false`.
assert.equal(menuTileSash({ supported: true, hasRom: true })?.text, 'PLAY');
assert.equal(menuTileSash({ supported: true, hasRom: false })?.text, 'INSERT ROM');
// A console has no romset of its own, so neither half of that pair applies.
assert.equal(menuTileSash({ supported: true, hasRom: false, kind: 'console' }), undefined);
assert.equal(menuTileSash({ supported: true, hasRom: true, kind: 'console' }), undefined);
assert.equal(menuTileSash({ supported: true, hasRom: true, preview: true })?.text, 'EXPERIMENTAL');
assert.equal(menuTileSash({ supported: true, hasRom: false, preview: true })?.text, 'EXPERIMENTAL');
assert.equal(menuTileSash({ supported: false, hasRom: true, preview: true })?.text, 'EXPERIMENTAL');
assert.equal(
  menuTileSash({ supported: false, hasRom: true, generationGaps: ['a', 'b'] })?.text,
  'BLOCKED · 2',
);
assert.equal(menuTileSash({ supported: false, hasRom: true })?.text, 'BLOCKED');
