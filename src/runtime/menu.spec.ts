import assert from 'node:assert/strict';
import {
  menuEntries,
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

// A computer's regional versions -- MAME's clones of one parent -- are one box:
// named without the region, ready when any version is accepted, counting every
// version's shelf; arcade clones stay boxes of their own.
{
  type Entry = {
    game: string; kind: 'computer' | 'arcade'; fullname: string; title: string; supported: boolean; hasRom: boolean;
    hasPhoto: boolean; generationGaps: string[]; cloneof?: string; preview?: boolean; variants?: string[];
  };
  const entry = (game: string, kind: 'computer' | 'arcade', extra: Partial<Entry> = {}): Entry => ({
    game, kind, fullname: `Machine ${game} (${game.toUpperCase()})`, title: game, supported: true, hasRom: false,
    hasPhoto: game === 'base', generationGaps: [], ...extra,
  });
  const shelved = menuEntries([
    entry('pac', 'arcade'),
    entry('pacclone', 'arcade', { cloneof: 'pac' }),
    entry('base', 'computer', { preview: true }),
    entry('basepal', 'computer', { cloneof: 'base', hasRom: true }),
    entry('alone', 'computer'),
  ]);
  assert.deepEqual(shelved.map(item => item.game), ['pac', 'pacclone', 'base', 'alone']);
  const family = shelved.find(item => item.game === 'base')!;
  assert.equal(family.fullname, 'Machine base');
  assert.deepEqual(family.variants, ['base', 'basepal']);
  assert.equal(family.preview, false, 'an accepted version makes the box ready');
  assert.equal(family.hasRom, true);
  assert.equal(family.hasPhoto, true, 'the box shows its parent\'s photograph');
  assert.equal(menuTileSash(family)?.text, 'PLAY');
  assert.equal(shelved.find(item => item.game === 'alone')!.variants, undefined);
  const unready = menuEntries([entry('base', 'computer', { preview: true }), entry('basepal', 'computer', { cloneof: 'base', preview: true })]);
  assert.equal(menuTileSash(unready[0]!)?.text, 'EXPERIMENTAL');
}
