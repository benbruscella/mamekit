import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { cachedDriverGitHistory, historyFromLog } from './driver-history.ts';

// --- historyFromLog digests newest-first git log lines ---------------------

assert.equal(historyFromLog([]), undefined);

const digest = historyFromLog([
  '2024-05-01|Alice',
  '2023-01-15|Bob',
  '2020-03-02|Alice',
]);
assert.deepEqual(digest, {
  firstCommit: '2020-03-02',
  lastCommit: '2024-05-01',
  commits: 3,
  contributors: 2,
  topAuthors: ['Alice', 'Bob'],
  authorStats: [
    { name: 'Alice', commits: 2, firstCommit: '2020-03-02', lastCommit: '2024-05-01' },
    { name: 'Bob', commits: 1, firstCommit: '2023-01-15', lastCommit: '2023-01-15' },
  ],
});

// --- cache is tagged with the MAME revision and reused on hits -------------

const scratch = mkdtempSync(join(tmpdir(), 'driver-history-spec-'));
const repo = join(scratch, 'mame');
const cacheRoot = join(scratch, 'cache');
mkdirSync(join(repo, 'src/mame/pacman'), { recursive: true });
const git = (...args: string[]): string => execFileSync(
  'git',
  ['-C', repo, '-c', 'user.name=Spec', '-c', 'user.email=spec@example.invalid', ...args],
  { encoding: 'utf8' },
).trim();
git('init', '-q');
writeFileSync(join(repo, 'src/mame/pacman/pacman.cpp'), '// v1\n');
git('add', '.');
git('commit', '-q', '-m', 'one');
const head = git('rev-parse', 'HEAD');

const first = cachedDriverGitHistory(repo, 'src/mame/pacman/pacman.cpp', cacheRoot);
assert.equal(first?.commits, 1);
assert.equal(first?.topAuthors[0], 'Spec');

const entryFile = join(cacheRoot, head, 'src_mame_pacman_pacman.cpp.json');
const entry = JSON.parse(readFileSync(entryFile, 'utf8'));
assert.equal(entry.mameRevision, head, 'cache entry must record the MAME revision it came from');
assert.equal(entry.driverFile, 'src/mame/pacman/pacman.cpp');

// A hit reads the cache, not git: a doctored entry comes back verbatim.
entry.history.commits = 99;
writeFileSync(entryFile, JSON.stringify(entry));
const second = cachedDriverGitHistory(repo, 'src/mame/pacman/pacman.cpp', cacheRoot);
assert.equal(second?.commits, 99);

// --- a moved HEAD invalidates: stale revision trees are pruned -------------

writeFileSync(join(repo, 'src/mame/pacman/pacman.cpp'), '// v2\n');
git('add', '.');
git('commit', '-q', '-m', 'two');
const movedHead = git('rev-parse', 'HEAD');
const moved = cachedDriverGitHistory(repo, 'src/mame/pacman/pacman.cpp', cacheRoot);
assert.equal(moved?.commits, 2, 'stale entry must be recomputed after a MAME update');
assert.deepEqual(readdirSync(cacheRoot), [movedHead], 'old-revision cache trees are pruned');

// --- a driver file with no history caches the miss too ---------------------

assert.equal(cachedDriverGitHistory(repo, 'src/mame/none/none.cpp', cacheRoot), undefined);
const missFile = join(cacheRoot, movedHead, 'src_mame_none_none.cpp.json');
assert.equal(JSON.parse(readFileSync(missFile, 'utf8')).history, null);
assert.equal(cachedDriverGitHistory(repo, 'src/mame/none/none.cpp', cacheRoot), undefined);

// --- outside a git checkout the lookup still works, uncached ---------------

const bare = join(scratch, 'not-a-repo');
mkdirSync(bare, { recursive: true });
const uncachedRoot = join(scratch, 'cache-bare');
assert.equal(cachedDriverGitHistory(bare, 'whatever.cpp', uncachedRoot), undefined);
assert.equal(existsSync(uncachedRoot), false, 'no cache is written without a revision to tag it');

rmSync(scratch, { recursive: true, force: true });
console.log('driver-history.spec: revision-tagged cache and log digest passed');
