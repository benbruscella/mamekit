import assert from 'node:assert/strict';
import { staleEntries, type CensusRun } from './stale.ts';

const known = ['live.call', 'rtype.timer', 'gone.call'];
const clean: CensusRun[] = [
  { contract: 'a', calls: { 'live.call': 3 } },
  { contract: 'rtype', calls: { 'rtype.timer': 9 } },
];

// A complete, clean census lists exactly the unreached entries.
assert.deepEqual(staleEntries(clean, known, true), { kind: 'complete', stale: ['gone.call'] });

// A filtered or shortened census never lists any.
assert.deepEqual(staleEntries(clean, known, false), { kind: 'partial', reason: 'filtered' });

// A run with no result at all: nothing is stale, and the run is named.
const noResult: CensusRun[] = [clean[0]!, { contract: 'rtype', calls: {}, error: 'no result (exit SIGSEGV)' }];
assert.deepEqual(staleEntries(noResult, known, true), {
  kind: 'partial', reason: 'ended-early', ended: [{ contract: 'rtype', error: 'no result (exit SIGSEGV)' }],
});

// A run that threw part way reported some calls but not its later ones
// (#237: rtype's scanline timer was listed for deletion). Still nothing stale.
const threw: CensusRun[] = [
  clean[0]!,
  { contract: 'rtype', calls: { 'other.call': 1 }, error: 'AssertionError: fps 8.1 below floor 10' },
];
const verdict = staleEntries(threw, known, true);
assert.equal(verdict.kind, 'partial');
assert.deepEqual(verdict.kind === 'partial' && verdict.reason === 'ended-early' && verdict.ended.map(run => run.contract), ['rtype']);

console.log('unresolved stale-entry spec passed');
