import assert from 'node:assert/strict';
import { mergeShardReports, parseShard, shardContracts } from './acceptance-shards.ts';

const contracts = Array.from({ length: 40 }, (_, index) => `game${String(index).padStart(2, '0')}`);
// One long contract, a few heavy ones, the rest light: the shape of the real set.
const durations = Object.fromEntries(contracts.map((contract, index) =>
  [contract, index === 7 ? 210 : index % 9 === 0 ? 90 : 10 + index % 5]));

for (const measured of [undefined, durations, { game03: 50 }]) {
  for (const count of [1, 3, 8, 16]) {
    const shards = Array.from({ length: count }, (_, index) => shardContracts(contracts, `${index + 1}/${count}`, measured));
    const all = shards.flat();
    assert.equal(all.length, contracts.length, 'every contract is on one shard');
    assert.equal(new Set(all).size, contracts.length, 'and on only one');
    for (const shard of shards) {
      assert.deepEqual(shard, contracts.filter(contract => shard.includes(contract)), 'a shard keeps list order');
    }
  }
}

// Balanced: the heaviest shard is the longest contract or within one light
// contract of an even share, whichever is more.
const total = Object.values(durations).reduce((sum, seconds) => sum + seconds, 0);
for (const count of [4, 8]) {
  const loads = Array.from({ length: count }, (_, index) =>
    shardContracts(contracts, `${index + 1}/${count}`, durations).reduce((sum, contract) => sum + durations[contract]!, 0));
  assert.ok(Math.max(...loads) <= Math.max(210, total / count + 15), `${count} shards balance: ${loads.join(' ')}`);
}

assert.throws(() => parseShard('0/4'), /1 <= i <= n/);
assert.throws(() => parseShard('5/4'), /1 <= i <= n/);

const report = (targets: string[]) => ({ results: targets.map(target => ({ target, status: 'passed', durationMs: 1234 })) });
assert.deepEqual(mergeShardReports(['a', 'b'], [report(['a']), report(['b'])]), { durations: { a: 1.2, b: 1.2 }, problems: [] });
assert.deepEqual(mergeShardReports(['a', 'b', 'c'], [report(['a', 'b']), report(['b', 'x'])]).problems,
  ['c: no shard ran it', 'b: ran on 2 shards', 'x: not an accepted contract']);

console.log('acceptance-shards.spec: shards partition the contracts, balance by duration, and the gate catches a bad split');
