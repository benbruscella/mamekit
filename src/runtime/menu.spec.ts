import assert from 'node:assert/strict';
import {
  browseSlug,
  matchesMenuEntry,
  menuShelfMaxWidth,
  runMenu,
} from './menu.ts';

const pacman = {
  game: 'pacman',
  title: 'Pac-Man',
  manufacturer: 'Namco',
  year: '1980',
};
assert.equal(matchesMenuEntry(pacman, 'arcade', ''), true);
assert.equal(matchesMenuEntry(pacman, 'arcade', 'NAMCO'), true);
assert.equal(matchesMenuEntry(pacman, 'arcade', '1980'), true);
assert.equal(matchesMenuEntry(pacman, 'console', 'pac'), false);
assert.equal(matchesMenuEntry({ ...pacman, kind: 'console' }, 'console', 'pac'), true);
assert.equal(matchesMenuEntry(pacman, 'arcade', 'galaga'), false);
assert.equal(browseSlug('Aaron Giles'), 'aaron-giles');
assert.equal(browseSlug('src/mame/irem/m62.cpp'), 'src-mame-irem-m62-cpp');
assert.equal(menuShelfMaxWidth('arcade'), '1470px');
assert.equal(menuShelfMaxWidth('console'), '1280px');
assert.equal(typeof runMenu, 'function');

console.log('menu.spec: generated entry tab and search filtering passed');
