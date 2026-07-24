import assert from 'node:assert/strict';
import { matchesMenuEntry, runMenu } from './menu.ts';

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
assert.equal(typeof runMenu, 'function');

console.log('menu.spec: generated entry tab and search filtering passed');
