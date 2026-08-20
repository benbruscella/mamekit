import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  copyTree,
  entryTree,
  hashBytes,
  hashTree,
  readEntry,
  verifyGenCache,
  writeEntry,
} from './gen-cache.ts';

const scratch = mkdtempSync(join(tmpdir(), 'gen-cache-spec-'));
const identity = { mameRevision: 'a'.repeat(40), srcHash: 'b'.repeat(64) };
const other = { mameRevision: 'c'.repeat(40), srcHash: 'b'.repeat(64) };

// --- entries answer only to the exact identity that wrote them -------------

const entryDir = join(scratch, 'cache/targets/pacman');
writeEntry(entryDir, identity, { category: 'arcade' });
assert.equal(readEntry(entryDir, identity)?.category, 'arcade');
assert.equal(readEntry(entryDir, other), undefined, 'MAME revision drift must miss');
assert.equal(
  readEntry(entryDir, { ...identity, srcHash: 'd'.repeat(64) }),
  undefined,
  'mamekit source drift must miss',
);

// --- verify prunes exactly the drifted entries -----------------------------

const cacheRoot = join(scratch, 'cache');
const staleDir = join(cacheRoot, 'closure/deadbeef');
writeEntry(staleDir, other);
mkdirSync(join(cacheRoot, 'driver-history', identity.mameRevision), { recursive: true });
writeFileSync(join(cacheRoot, 'driver-history', identity.mameRevision, 'x.json'), '{}');
mkdirSync(join(cacheRoot, 'driver-history', other.mameRevision), { recursive: true });

const { valid, pruned } = verifyGenCache(identity, cacheRoot);
assert.equal(valid, 2, 'the matching target entry and history file stay');
assert.equal(pruned, 2, 'the drifted closure entry and history tree go');
assert.equal(existsSync(staleDir), false);
assert.equal(existsSync(join(cacheRoot, 'driver-history', other.mameRevision)), false);
assert.equal(existsSync(entryDir), true);

// --- payload trees round-trip ----------------------------------------------

const payload = join(scratch, 'payload/deep/nested');
mkdirSync(payload, { recursive: true });
writeFileSync(join(payload, 'board.ts'), 'export default 1;\n');
copyTree(join(scratch, 'payload'), entryTree(entryDir));
const restored = join(scratch, 'restored');
copyTree(entryTree(entryDir), restored);
assert.equal(
  readFileSync(join(restored, 'deep/nested/board.ts'), 'utf8'),
  'export default 1;\n',
);
// copyTree replaces: stale files in the destination must not survive.
writeFileSync(join(restored, 'stale.js'), 'old');
copyTree(entryTree(entryDir), restored);
assert.deepEqual(readdirSync(restored), ['deep']);

// --- content hashing is stable and input-sensitive -------------------------

assert.equal(hashBytes('a', 'b'), hashBytes('a', 'b'));
assert.notEqual(hashBytes('a', 'b'), hashBytes('ab'));
const treeHashBefore = hashTree(join(scratch, 'payload'));
assert.equal(treeHashBefore, hashTree(join(scratch, 'payload')));
writeFileSync(join(payload, 'board.ts'), 'export default 2;\n');
assert.notEqual(hashTree(join(scratch, 'payload')), treeHashBefore);

rmSync(scratch, { recursive: true, force: true });
console.log('gen-cache.spec: identity tagging, verification pruning and tree round-trip passed');
