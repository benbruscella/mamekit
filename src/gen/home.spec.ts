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
  ({ game, title: game.toUpperCase(), year, manufacturer: 'Maker', kind, cover, cabinet: cover, photo: kind === 'console' });

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

const fighterKeyFor = (type: string): string[] | undefined => ({
  IPT_BUTTON1: ['KeyA', 'Space'], IPT_BUTTON2: ['KeyS'], IPT_BUTTON3: ['KeyD'],
  IPT_BUTTON4: ['KeyZ'], IPT_BUTTON5: ['KeyX'], IPT_BUTTON6: ['KeyC'],
} as Record<string, string[]>)[type];

const html = homePageHtml({
  machines: [
    { ...machine('pacman', '1980'), title: 'Pac-Man' },
    { ...machine('nes', '1985', 'console'), title: 'Nintendo <NES>' },
    machine('c64', '1982', 'computer', false),
  ],
  mameRevision: 'f34f02505e32c1993c6a782b6814232cbfc74e36',
  keyFor,
  fighterKeyFor,
  now: new Date('2026-09-08'),
});

// Counts, span and the kinds present come from the machines, not from prose.
assert.match(html, /1 arcade machine · 1 console · 1 computer · 1980–1985/);
assert.match(html, /compiled from MAME f34f02505e/);
assert.match(html, /<h1>Retro gaming, <em>transpiled\.<\/em><\/h1>/);
assert.match(html, /<b>46<\/b><span>years of nostalgia/, 'the oldest machine is from 1980; the build is 2026');
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
// The keyboard legend is a drawn keyboard with the generator's keys lit:
// arrows move, Space and X fire, 5 coins; a key the table lacks stays dark.
assert.match(html, /aria-label="Keyboard"/);
const keyCaptions = [...html.matchAll(/font-size="7"[^>]*fill="(#f2c200|#3ccf6a)"[^>]*>([^<]*)<\/text>/g)]
  .map(m => `${m[1] === '#f2c200' ? 'arcade' : 'fighter'}:${m[2]}`);
assert.equal(keyCaptions.filter(c => c === 'arcade:MOVE').length, 4, 'four arrows move');
assert.equal(keyCaptions.filter(c => c === 'arcade:FIRE').length, 2, 'Space and X both fire');
assert.ok(keyCaptions.includes('arcade:COIN'));
assert.ok(keyCaptions.includes('arcade:START'));
assert.ok(!keyCaptions.includes('arcade:FIRE 3'), 'a role with no key is left out');
// The six-button fighter rows light the home row and the row below it.
assert.deepEqual(keyCaptions.filter(c => c.startsWith('fighter:')), ['fighter:LP', 'fighter:MP', 'fighter:HP', 'fighter:LK', 'fighter:MK', 'fighter:HK']);
assert.doesNotMatch(homePageHtml({ machines: [machine('pacman', '1980')], keyFor }), /six-button fighters/, 'no fighter table, no fighter legend');
// The fight box legend is the runtime's own standard mapping.
assert.match(html, />LP<\/text>/);
assert.match(html, />X<\/text>/, 'light punch sits on X');
assert.match(html, />RT<\/text>/, 'heavy kick sits on RT');
assert.match(html, />START<\/text>/);
assert.match(html, />COIN<\/text>/);
assert.match(html, /FightBox R10-Pro/);
// One room per kind present, each a link into its tab of the app.
assert.match(html, /Three rooms/);
assert.match(html, /<h2>Arcade, Consoles and Computers\.<\/h2>/);
assert.match(html, /class="room" href="app\/"/);
assert.match(html, /class="room" href="app\/\?tab=consoles"/);
assert.match(html, /class="room" href="app\/\?tab=computers"/);
assert.match(html, /artwork\/media\/cabinets\/pacman\.webp/, 'the arcade room shows cabinets');
assert.match(html, /artwork\/media\/consoles\/nes\.webp/, 'the console room shows the hardware');
assert.match(html, /aria-label="Home computer"/, 'computers are drawn');
const arcadeOnly = homePageHtml({ machines: [machine('pacman', '1980')], keyFor });
assert.match(arcadeOnly, /One room/);
assert.doesNotMatch(arcadeOnly, /tab=consoles/, 'a room with nothing in it is not offered');
assert.match(html, /Unofficial\. We build and test on one; FightBox is not affiliated/, 'the partnership is plainly unofficial');
assert.match(html, />TRACKBALL<\/text>/);
assert.match(html, />SPINNER<\/text>/);

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
  mkdirSync(join(outRoot, 'artwork', 'media', 'consoles'), { recursive: true });
  writeFileSync(join(outRoot, 'artwork', 'media', 'consoles', 'nes.webp'), '');
  const machines = readHomeMachines(outRoot);
  assert.deepEqual(machines.map(m => [m.game, m.title, m.year, m.kind, m.cover, m.cabinet, m.photo]), [
    ['pacman', 'Pac-Man', '1980', 'arcade', true, false, false],
    ['nes', 'Nintendo Entertainment System', '1985', 'console', false, false, true],
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
