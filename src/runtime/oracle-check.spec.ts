import assert from 'node:assert/strict';
import { oracleFacet, oracleLines, type OracleCheck } from './oracle-check.ts';

const base = { mame: '0.289', mamekit: { commit: 'abc1234', dirty: false }, checkedAt: '2026-10-22T10:00:00.000Z' };

const arcade: OracleCheck = {
  ...base,
  verdict: 'exact',
  runs: [{ input: 'none', frames: [300, 600, 900], exact: [300, 600, 900] }],
};
assert.equal(oracleFacet(arcade), 'Pixel-exact against MAME 0.289');
assert.deepEqual(oracleLines(arcade), [
  'Pixel-exact against MAME 0.289 at frames 300, 600, 900 (no input)',
  'Checked 2026-10-22 on build abc1234',
]);

const nes: OracleCheck = {
  ...base,
  mamekit: { commit: 'abc1234', dirty: true },
  verdict: 'diverges',
  runs: [
    { title: 'cvania3u', input: 'start', frames: [1500], exact: [], divergesAt: 1500 },
    { title: 'erika', input: 'start', frames: [], exact: [], failed: 'ours' },
    { title: 'smb1', input: 'start', frames: [1500], exact: [1500] },
  ],
  survey: { frame: 1500, boards: 344, exact: 200 },
};
assert.equal(oracleFacet(nes), 'Differs from MAME 0.289');
assert.deepEqual(oracleLines(nes), [
  '1 of 3 titles pixel-exact against MAME 0.289 at frame 1500',
  'cvania3u: differs from frame 1500',
  'erika: did not run (here)',
  'Board survey: 200 of 344 boards pixel-exact at frame 1500',
  'Checked 2026-10-22 on build abc1234 (with local changes)',
]);

// A machine run that differs says where, and which frames still match.
assert.equal(oracleLines({
  ...base,
  verdict: 'diverges',
  runs: [{ input: 'none', frames: [300, 600], exact: [300], divergesAt: 600 }],
})[0], 'Differs from MAME 0.289 at frame 600; exact at 300 (no input)');

console.log('oracle-check.spec: ok');
