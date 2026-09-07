import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  emitHomePage,
  featuredCovers,
  homePageHtml,
  homeTitle,
  keycap,
  readHomeMachines,
  type HomeMachine,
} from './home.ts';

// Titles read the way the shelf reads them: no alias list, no maker/year tail.
assert.equal(homeTitle({ fullname: 'Traverse USA / Zippy Race', kind: 'arcade' }), 'Traverse USA');
assert.equal(homeTitle({ fullname: 'Nintendo Entertainment System / Famicom (NTSC)', kind: 'console' }), 'Nintendo Entertainment System');
assert.equal(homeTitle({ fullname: 'Commodore 64 (PAL)', kind: 'computer' }), 'Commodore 64');
assert.equal(homeTitle({ title: 'Pac-Man (Midway, 1980)', game: 'pacman' }), 'Pac-Man');

assert.equal(keycap('ArrowLeft'), '←');
assert.equal(keycap('KeyX'), 'X');
assert.equal(keycap('Digit5'), '5');
assert.equal(keycap('Space'), 'Space');

const machine = (game: string, year: string, kind: HomeMachine['kind'] = 'arcade', cover = true): HomeMachine =>
  ({ game, title: game.toUpperCase(), year, manufacturer: 'Maker', kind, cover });

// The strip is a timeline: evenly spaced through the years, never the first N.
const many = Array.from({ length: 30 }, (_, i) => machine(`g${String(i).padStart(2, '0')}`, String(1978 + i)));
const featured = featuredCovers(many, 4);
assert.deepEqual(featured.map(m => m.game), ['g00', 'g09', 'g19', 'g29']);
assert.deepEqual(featuredCovers([machine('a', '1980'), machine('b', '1981', 'arcade', false)]).map(m => m.game), ['a'],
  'only machines with a flyer are featured');

const keyFor = (type: string): string[] | undefined => ({
  IPT_JOYSTICK_LEFT: ['ArrowLeft'], IPT_JOYSTICK_RIGHT: ['ArrowRight'],
  IPT_JOYSTICK_UP: ['ArrowUp'], IPT_JOYSTICK_DOWN: ['ArrowDown'],
  IPT_BUTTON1: ['Space', 'KeyX'], IPT_BUTTON2: ['KeyZ'], IPT_START1: ['Digit1'], IPT_COIN1: ['Digit5'],
} as Record<string, string[]>)[type];

const html = homePageHtml({
  machines: [
    { ...machine('pacman', '1980'), title: 'Pac-Man' },
    { ...machine('nes', '1985', 'console'), title: 'Nintendo <NES>' },
    machine('c64', '1982', 'computer', false),
  ],
  mameRevision: 'f34f02505e32c1993c6a782b6814232cbfc74e36',
  keyFor,
});

// Counts, span and the kinds present come from the machines, not from prose.
assert.match(html, /1 arcade machine · 1 console · 1 computer · 1980–1985/);
assert.match(html, /compiled from MAME f34f02505e/);
// Relative routes only: the page must work under a Pages base path.
assert.match(html, /href="app\/"/);
assert.match(html, /href="app\/browse\/"/);
assert.match(html, /href="app\/g\/pacman\/"/);
assert.match(html, /src="artwork\/covers\/pacman\.webp"/);
assert.doesNotMatch(html, /covers\/c64\.webp/, 'no flyer, no strip entry');
assert.doesNotMatch(html, /href="\//, 'no root-absolute URLs');
// Titles are escaped on the way in.
assert.match(html, /Nintendo &lt;NES&gt;/);
assert.doesNotMatch(html, /<NES>/);
// The keyboard legend is the generator's table, printed as keycaps.
assert.match(html, /<kbd>←<\/kbd><kbd>→<\/kbd><kbd>↑<\/kbd><kbd>↓<\/kbd><\/dt><dd>Move<\/dd>/);
assert.match(html, /<kbd>Space<\/kbd><kbd>X<\/kbd><\/dt><dd>Button 1 \/ fire<\/dd>/);
assert.match(html, /<kbd>5<\/kbd><\/dt><dd>Insert coin<\/dd>/);
assert.doesNotMatch(html, /Button 3<\/dd>/, 'a role with no key is left out');
// The fight box legend is the runtime's own standard mapping.
assert.match(html, />LP<\/text>/);
assert.match(html, />X<\/text>/, 'light punch sits on X');
assert.match(html, />RT<\/text>/, 'heavy kick sits on RT');
assert.match(html, />START<\/text>/);
assert.match(html, />COIN<\/text>/);
assert.match(html, /FightBox R10-Pro/);

// Emitting reads the generated tree: meta.json per machine, covers by file.
const outRoot = mkdtempSync(join(tmpdir(), 'mamekit-home-'));
try {
  for (const [category, game, meta] of [
    ['arcade', 'pacman', { fullname: 'Pac-Man (Midway)', year: '1980', manufacturer: 'Midway' }],
    ['arcade', 'broken', null],
    ['consoles', 'nes', { fullname: 'Nintendo Entertainment System / Famicom (NTSC)', year: 1985, kind: 'console' }],
  ] as const) {
    const dir = join(outRoot, 'games', category, game);
    mkdirSync(dir, { recursive: true });
    if (meta) writeFileSync(join(dir, 'meta.json'), JSON.stringify(meta));
  }
  mkdirSync(join(outRoot, 'artwork', 'covers'), { recursive: true });
  writeFileSync(join(outRoot, 'artwork', 'covers', 'pacman.webp'), '');
  const machines = readHomeMachines(outRoot);
  assert.deepEqual(machines.map(m => [m.game, m.title, m.year, m.kind, m.cover]), [
    ['pacman', 'Pac-Man', '1980', 'arcade', true],
    ['nes', 'Nintendo Entertainment System', '1985', 'console', false],
  ], 'a directory without meta.json is skipped, not fatal');
  const written = emitHomePage(outRoot, { keyFor, mameRevision: 'abc' });
  assert.deepEqual(written, { machines: 2, covers: 1 });
  const page = readFileSync(join(outRoot, 'index.html'), 'utf8');
  assert.match(page, /^<!doctype html>/);
  assert.match(page, /1 arcade machine · 1 console · 1980–1985/);
  assert.equal(readHomeMachines(outRoot, new Set(['nes'])).length, 1, 'a --targets subset narrows the page');
} finally {
  rmSync(outRoot, { recursive: true, force: true });
}

console.log('home.spec: titles, featured flyers, legends, escaping and emit from the generated tree passed');
