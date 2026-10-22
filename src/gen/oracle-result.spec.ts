import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { aggregateArchive, archiveGame, mameCheckFacet } from './archive.ts';
import { refreshOracleResult, summarizeOracleReport, type OracleReportFile, type OracleRunRecord } from './oracle-result.ts';

const run = (overrides: Partial<OracleRunRecord>): OracleRunRecord => ({
  input: 'start',
  checkedAt: '2026-10-22T10:00:00.000Z',
  mame: '0.289',
  mamekit: { commit: 'abc1234', dirty: false },
  pixels: {
    offset: 0,
    frames: [{ frame: 1500, mame: 1500, pixels: 0 }],
    exact: [1500],
  },
  ...overrides,
});

const report: OracleReportFile = {
  target: 'nes',
  runs: {
    smb1: run({ title: 'smb1' }),
    cvania3u: run({
      title: 'cvania3u',
      checkedAt: '2026-10-22T11:00:00.000Z',
      pixels: { offset: -1, frames: [{ frame: 120, mame: 119, pixels: 24 }, { frame: 1500, mame: 1499, pixels: 0 }], exact: [1500], firstDivergence: 120 },
    }),
    // Another release's answer is noise against a 0.289 checkout.
    old: run({ title: 'old', mame: '0.288' }),
  },
  survey: {
    frame: 1500,
    input: 'start',
    checkedAt: '2026-10-22T09:00:00.000Z',
    mame: '0.289',
    titles: {
      nrom: { board: 'nrom', title: 'smb1', cause: 'exact' },
      vrc4: { board: 'vrc4', title: 'biomirac', cause: 'diverges' },
      exrom: { board: 'exrom', title: 'cvania3u', cause: 'exact' },
    },
  },
};

const summary = summarizeOracleReport(report, '0.289')!;
assert.equal(summary.verdict, 'diverges', 'one title that differs makes the machine differ');
assert.deepEqual(summary.runs.map(entry => entry.title), ['cvania3u', 'smb1'], 'runs of another release are dropped');
assert.equal(summary.runs[0]!.divergesAt, 120);
assert.equal(summary.runs[0]!.offset, -1);
assert.equal(summary.checkedAt, '2026-10-22T11:00:00.000Z', 'the newest run dates the check');
assert.deepEqual(summary.survey, { frame: 1500, input: 'start', boards: 3, exact: 2, causes: { exact: 2, diverges: 1 } });

const exact = summarizeOracleReport({ target: 'pacman', runs: { machine: run({ input: 'none' }) } }, '0.289')!;
assert.equal(exact.verdict, 'exact');
assert.equal(exact.runs[0]!.title, undefined);

// A run whose side failed is never exact, whatever pictures it left.
const failed = summarizeOracleReport({ target: 'nes', runs: { erika: run({ title: 'erika', ours: { frames: 0, error: 'RangeError' } }) } }, '0.289')!;
assert.equal(failed.verdict, 'diverges');
assert.equal(failed.runs[0]!.failed, 'ours');

assert.equal(summarizeOracleReport(report, '0.290'), undefined, 'nothing from the checkout release, nothing to show');

// oracle.json follows the report: written while it says something, removed when it stops.
const dir = mkdtempSync(join(tmpdir(), 'oracle-result-'));
try {
  const reportPath = join(dir, 'nes.json');
  writeFileSync(reportPath, JSON.stringify(report));
  assert.equal(refreshOracleResult(dir, reportPath, '0.289'), true);
  assert.equal(JSON.parse(readFileSync(join(dir, 'oracle.json'), 'utf8')).verdict, 'diverges');
  assert.equal(refreshOracleResult(dir, reportPath, '0.290'), false);
  assert.equal(existsSync(join(dir, 'oracle.json')), false);
  assert.equal(refreshOracleResult(dir, join(dir, 'missing.json'), '0.289'), false);
} finally {
  rmSync(dir, { recursive: true, force: true });
}

// The archive files machines by it.
assert.equal(mameCheckFacet(exact), 'Pixel-exact against MAME 0.289');
assert.equal(mameCheckFacet(summary), 'Differs from MAME 0.289');
assert.equal(mameCheckFacet(undefined), undefined);
const config = { board: { cpus: [{ type: 'z80' }], screen: { width: 224, height: 288, refresh: 60, rotate: 90 } }, sound: { kind: 'wsg' } };
const index = aggregateArchive([
  archiveGame('arcade', 'pacman', { title: 'Pac-Man' }, config, exact),
  archiveGame('arcade', 'mspacman', { title: 'Ms. Pac-Man' }, config),
]);
assert.deepEqual(index.facets['mame-check'].map(value => [value.value, value.games.map(game => game.game)]),
  [['Pixel-exact against MAME 0.289', ['pacman']]], 'an unchecked machine is filed under nothing');

console.log('oracle-result.spec: ok');
