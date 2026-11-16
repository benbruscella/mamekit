import assert from 'node:assert/strict';
import { gradeRun, pickSurveyTitles, surveyGroups, type RunReport, type SurveyEntry } from './report.ts';

const run = (overrides: Partial<RunReport>): RunReport => ({
  input: 'start',
  checkedAt: '2026-10-22T10:00:00.000Z',
  mame: '0.289',
  mamekit: { commit: 'abc1234', dirty: false },
  mameCommand: '',
  grade: { samples: 50, drawn: 50, changes: 30, colours: 12 },
  pixels: { offset: 0, tied: [0], frames: [{ frame: 1500, mame: 1500, pixels: 0 }], exact: [1500], images: [] },
  ...overrides,
});

// The comparison, once both sides ran and the picture moved.
assert.deepEqual(gradeRun(run({})), { cause: 'exact' });
assert.deepEqual(gradeRun(run({ pixels: { offset: -1, tied: [-1], frames: [{ frame: 1500, mame: 1499, pixels: 278 }], exact: [], images: [] } })),
  { cause: 'diverges' });
assert.deepEqual(gradeRun(run({ pixels: { offset: 0, tied: [0], frames: [{ frame: 1500, mame: 1500, size: '256x240 vs 256x224' }], exact: [], images: [] } })),
  { cause: 'size', detail: '256x240 vs 256x224' });
assert.deepEqual(gradeRun(run({ pixels: undefined })), { cause: 'no-picture' });

// Our side's failure outranks everything after it: nothing it left is evidence.
assert.deepEqual(gradeRun(run({ ours: { frames: 0, error: 'timed out or crashed (limit 900 s)' }, mameError: 'x' })), { cause: 'timeout' });
assert.deepEqual(gradeRun(run({ ours: { frames: 12, error: 'RangeError: bad bank 0x3f at 512' } })),
  { cause: 'error', detail: 'RangeError: bad bank N at N' }, 'numbers are dropped so one fault reads as one cause');
// A board that never drew or never moved is graded before MAME is consulted.
assert.deepEqual(gradeRun(run({ grade: { samples: 50, drawn: 0, changes: 1, colours: 1 }, mameError: 'x' })), { cause: 'blank' });
assert.deepEqual(gradeRun(run({ grade: { samples: 50, drawn: 50, changes: 2, colours: 9 } })), { cause: 'static' });
assert.deepEqual(gradeRun(run({ mameError: 'MAME stopped at frame 415 of 1502' })),
  { cause: 'mame-error', detail: 'MAME stopped at frame 415 of 1502' });
// A retried failure that passed the second time is graded on the second run.
assert.deepEqual(gradeRun(run({ ours: { frames: 1500, retried: 'RangeError: Maximum call stack size exceeded' } })), { cause: 'exact' });

const entry = (board: string, cause: string, detail?: string): SurveyEntry =>
  ({ board, title: board, cause, ...(detail ? { detail } : {}), mamekit: 'abc1234' });
const groups = surveyGroups([
  entry('vrc4', 'diverges'),
  entry('jf13', 'error', 'no cartridge'),
  entry('nrom', 'exact'),
  entry('jf17', 'error', 'no cartridge'),
  entry('mmc5', 'diverges'),
  entry('jf19', 'error', 'bad bank N'),
  entry('sxrom', 'exact'),
  entry('jf24', 'blank'),
]);
assert.deepEqual(groups.map(([key, list]) => [key, list.map(item => item.board)]), [
  ['exact', ['nrom', 'sxrom']],
  ['diverges', ['vrc4', 'mmc5']],
  ['blank', ['jf24']],
  ['error: no cartridge', ['jf13', 'jf17']],
  ['error: bad bank N', ['jf19']],
], 'by cause in reading order, errors by message, the larger group first');

// One title per board: the first in catalogue order that is dumped.
assert.deepEqual(pickSurveyTitles([
  { name: 'smb1', slot: 'nrom' },
  { name: 'zelda', slot: 'sxrom' },
  { name: 'metroid', slot: 'sxrom' },
  { name: 'lone' },
  { name: 'kirby', slot: 'txrom' },
], name => name !== 'zelda' && name !== 'kirby'), [
  { board: 'default', title: 'lone' },
  { board: 'nrom', title: 'smb1' },
  { board: 'sxrom', title: 'metroid' },
]);

console.log('oracle report.spec: ok');
