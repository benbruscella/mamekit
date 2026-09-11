import assert from 'node:assert/strict';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  aggregateArchive,
  archiveGame,
  emitArchiveRoutes,
  stableSlug,
} from './archive.ts';
import type { DossierData } from './dossier.ts';

assert.equal(stableSlug('Aaron Giles'), 'aaron-giles');
assert.equal(stableSlug('src/mame/irem/m62.cpp'), 'src-mame-irem-m62-cpp');
assert.equal(stableSlug('Écran & vidéo'), 'ecran-and-video');
assert.equal(stableSlug('---'), 'unknown');

const config = {
  board: {
    cpus: [{ type: 'z80' }],
    screen: { width: 256, height: 224, refresh: 60, rotate: 0 },
  },
  sound: { kind: 'ay8910', chips: 2 },
};
const credits = {
  people: [{
    name: 'Aaron Giles',
    headerCredit: true,
    machineCredit: false,
    notes: 3,
    firstRelease: '0.120',
    lastRelease: '0.289',
  }],
  source: 'MAME driver header (copyright-holders) and MAMEDEV release notes',
};
const kungfum = archiveGame('arcade', 'kungfum', {
  game: 'kungfum',
  title: 'Kung-Fu Master',
  fullname: 'Kung-Fu Master (World)',
  year: '1984',
  manufacturer: 'Irem',
  driverFile: 'src/mame/irem/m62.cpp',
  copyrightHolders: 'Aaron Giles',
  license: 'BSD-3-Clause',
  credits,
}, config);
const testGame = archiveGame('arcade', 'test', {
  game: 'test',
  title: 'Test',
  fullname: 'Test Machine',
  year: '1985',
  manufacturer: 'Test Co.',
  driverFile: 'src/mame/test.cpp',
  credits,
}, config);
const aggregate = aggregateArchive([testGame, kungfum]);
assert.deepEqual(
  aggregate.facets.author.find(group => group.value === 'Aaron Giles')?.games.map(game => game.game),
  ['kungfum', 'test'],
);
assert.equal(aggregate.facets.cpu[0]?.value, 'Z80');
assert.equal(aggregate.facets.manufacturer.length, 2);

const root = mkdtempSync(join(tmpdir(), 'mamekit-archive-'));
const appDir = join(root, 'app');
const dossier: DossierData = {
  game: 'kungfum',
  title: 'Kung-Fu Master',
  fullname: 'Kung-Fu Master (World)',
  year: '1984',
  company: 'Irem',
  family: 'm62',
  driverFile: 'src/mame/irem/m62.cpp',
  license: 'BSD-3-Clause',
  copyrightHolders: 'Aaron Giles',
  cpus: [{ tag: 'maincpu', type: 'z80', clock: 3_000_000, ranges: [] }],
  sound: { kind: 'ay8910', chips: 2 },
  screen: { width: 256, height: 224, refresh: 60 },
  roms: [],
  bindings: [],
  dipDefaults: [],
  credits,
  commitActivity: {
    commits: 7,
    authors: 1,
    firstCommit: '2001-01-01',
    lastCommit: '2025-01-01',
    method: 'git log --follow over the driver file',
  },
  historyText: '',
  historyCredit: '',
};
for (const game of [kungfum, testGame]) {
  const dir = join(root, 'games', 'arcade', game.game);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'meta.json'), JSON.stringify({
    ...game,
    credits,
  }));
  writeFileSync(join(dir, 'config.json'), JSON.stringify(config));
  if (game.game === 'kungfum') {
    writeFileSync(join(dir, 'dossier.json'), JSON.stringify(dossier));
  }
}
const emitted = emitArchiveRoutes(root, appDir);
assert.equal(emitted.games, 2);
assert.equal(emitted.dossiers, 1);
assert.equal(existsSync(join(appDir, 'browse', 'index.html')), true);
assert.equal(existsSync(join(appDir, 'browse', 'cpu', 'z80', 'index.html')), true);
const authorHtml = readFileSync(
  join(appDir, 'browse', 'author', 'aaron-giles', 'index.html'),
  'utf8',
);
assert.match(authorHtml, /src\/mame\/irem\/m62\.cpp/);
assert.match(authorHtml, /src\/mame\/test\.cpp/);
// The page states what the credit rests on, and never a commit tally.
assert.match(authorHtml, /driver-header credit · 3 release notes · 0\.120–0\.289/);
assert.match(authorHtml, /Credited by MAMEDEV/);
assert.match(authorHtml, /never from commit history/);
assert.doesNotMatch(authorHtml, /contributors?<|top contributor|commits/i);
const dossierHtml = readFileSync(
  join(appDir, 'g', 'kungfum', 'dossier', 'index.html'),
  'utf8',
);
assert.match(dossierHtml, /Download kungfum-dossier\.md/);
assert.match(dossierHtml, /games\/arcade\/kungfum\/kungfum-dossier\.md/);
rmSync(root, { recursive: true, force: true });

console.log('archive.spec: facets, stable slugs, routes, authors, and dossier passed');
