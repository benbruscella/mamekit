import assert from 'node:assert/strict';
import {
  audioLevelDb, audioMeasure, audioVerdict, baselineUnits, comparedFrames, compareUnit, pixelsMeasure, pixelsVerdict, ramMeasure, ramVerdict, ramWindow,
  RAM_BUDGET_BYTES, selectUnits, unitPlan,
  type AudioResult, type Measure, type PixelsResult, type RamSummary,
} from './baseline.ts';
import type { RunReport } from './report.ts';

// The set is the contracts, one unit per scenario, keyed so a single-scenario target reads as itself.
const units = baselineUnits([
  { game: 'pacman', category: 'arcade', frames: 600 },
  { game: 'nes', category: 'consoles', scenarioId: 'smb1', frames: 1200 },
  { game: 'c64', category: 'computers', scenarioId: 'tape', frames: 5000 },
]);
assert.deepEqual(units.map(unit => unit.key), ['pacman', 'nes/smb1', 'c64/tape']);
assert.deepEqual(selectUnits(units, ['nes']).map(unit => unit.key), ['nes/smb1']);
assert.deepEqual(selectUnits(units, ['c64/tape']).map(unit => unit.key), ['c64/tape']);
assert.equal(selectUnits(units, []).length, 3);
assert.throws(() => selectUnits(units, ['galaga']), /no contract scenario galaga/);

// Compared frames: every 300 and the contract's last; at most eight past 2400 frames.
assert.deepEqual(comparedFrames(1200), [300, 600, 900, 1200]);
assert.deepEqual(comparedFrames(761), [300, 600, 761]);
assert.deepEqual(comparedFrames(400), [300, 400]);
assert.deepEqual(comparedFrames(3600), [600, 1200, 1800, 2400, 3000, 3600]);
assert.ok(comparedFrames(16500).length <= 8);
assert.equal(comparedFrames(16500).at(-1), 16500);

// RAM: the whole run unless a side would dump more than the budget.
assert.equal(ramWindow(3088, 600), 600);
assert.equal(ramWindow(264192, 3600), Math.floor(RAM_BUDGET_BYTES / 264192));

// The plan: the oracle twice, with no input and with the contract's, both with audio.
const pacman = unitPlan(units[0]!, 3088);
assert.deepEqual(pacman.none.args,
  ['tools/mame-oracle.ts', 'pacman', '--input', 'none', '--frames', '300,600', '--audio', '--timeout', '1800', '--ram', '--ram-frames', '1-600']);
assert.deepEqual(pacman.contract.args.slice(2, 4), ['--input', 'contract']);
assert.ok(pacman.contract.args.includes('--audio') && !pacman.contract.args.includes('--ram'));
const smb1 = unitPlan(units[1]!, 2048);
assert.deepEqual(smb1.none.args.slice(2, 4), ['--scenario', 'smb1'], 'a console title is its scenario, cartridge and all');
const tape = unitPlan(units[2]!, 0);
assert.equal(tape.ramSkipped, 'the generated board maps no RAM range');
assert.ok(!tape.none.args.includes('--ram'), 'no --ram for a board that maps none, or the oracle refuses the run');

// --- what is kept of a run --------------------------------------------------

const run = (overrides: Partial<RunReport>): RunReport => ({
  input: 'none',
  checkedAt: '2026-10-27T00:00:00.000Z',
  mame: '0.289',
  mamekit: { commit: 'abc1234', dirty: false },
  mameCommand: '',
  ours: { frames: 600 },
  pixels: { offset: 0, tied: [0], frames: [{ frame: 300, mame: 300, pixels: 0 }, { frame: 600, mame: 600, pixels: 40 }], exact: [300], firstDivergence: 600, images: [] },
  ...overrides,
});
assert.deepEqual(pixelsMeasure(run({})).result?.exact, [300]);
assert.equal(pixelsMeasure(run({ ours: { frames: 12, error: 'RangeError' } })).status, 'failed');
assert.match(pixelsMeasure(run({ mameError: 'MAME exited 1' })).reason ?? '', /^MAME: /);
const ram = ramMeasure(run({
  ram: {
    offset: 0, bytesPerFrame: 16, compared: 3, differing: { 1: 0, 2: 4, 3: 6 }, nearest: {},
    firstDivergence: { frame: 2, mame: 2, bytes: 4, addresses: [{ cpu: 'maincpu', address: '4df9', mame: 1, ours: 0 }] },
  },
}));
assert.deepEqual(ram.result, { compared: 3, bytesPerFrame: 16, offset: 0, total: 10, firstDivergence: { frame: 2, bytes: 4, addresses: ['maincpu:4df9'] } });
assert.equal(ramMeasure(run({})).status, 'failed', 'a run without RAM has nothing to keep');
assert.equal(ramMeasure(run({ ram: { offset: 0, bytesPerFrame: 0, compared: 0, differing: {}, nearest: {} } })).status, 'skipped',
  'a boot without the processors the board maps RAM on has none to compare');
assert.equal(audioMeasure(run({ audioError: 'no MAME recording' })).reason, 'no MAME recording');
assert.deepEqual(audioMeasure(run({
  audio: { seconds: 10, rms: { ours: 0.1, ref: 0.2, ratioDb: -6 }, bands: [{ hz: 125, ours: 0.5, ref: 0.4, diffDb: 1 }], onsets: { ours: 2, ref: 2 } },
})).result?.bands, [{ hz: 125, diffDb: 1 }]);

// --- verdicts ---------------------------------------------------------------

const pixels = (exact: number[], counts: number[], extra: Partial<PixelsResult> = {}): Measure<PixelsResult> => {
  const frames = counts.map((pixels, index) => ({ frame: (index + 1) * 300, mame: (index + 1) * 300, pixels }));
  const first = frames.find(frame => frame.pixels !== 0)?.frame;
  return { status: 'ok', result: { offset: 0, frames, exact, ...(first ? { firstDivergence: first } : {}), ...extra } };
};
assert.equal(pixelsVerdict(pixels([300], [0, 40]), pixels([300], [0, 40])).verdict, 'same');
assert.equal(pixelsVerdict(pixels([300], [0, 40]), pixels([300, 600], [0, 0])).verdict, 'better');
assert.deepEqual(pixelsVerdict(pixels([300], [0, 40]), pixels([600], [5, 0])),
  { verdict: 'worse', detail: 'no longer exact at 300, exact at 600' }, 'losing an exact frame is worse, whatever is gained');
assert.equal(pixelsVerdict(pixels([300], [0, 40, 900]), pixels([300], [0, 39, 5000])).verdict, 'better', 'the first differing frame decides');
assert.equal(pixelsVerdict(pixels([300], [0, 40, 900]), pixels([300], [0, 40, 800])).verdict, 'better', 'then the total');
assert.equal(pixelsVerdict(pixels([], [10]), { status: 'ok', result: { offset: 0, frames: [{ frame: 300, mame: 300, size: '256x240 vs 256x224' }], exact: [], firstDivergence: 300 } }).verdict,
  'worse', 'a picture of the wrong size is worse than any count');
assert.equal(pixelsVerdict(pixels([300], [0, 40]), pixels([300], [0, 40], { inputsDiffering: 3 })).verdict, 'worse',
  'MAME reading different input makes the run worthless');
assert.match(pixelsVerdict(pixels([300], [0, 40]), pixels([300], [0, 40], { offset: 1 })).detail ?? '', /offset 0 -> 1/);
// A size mismatch compared at MAME's scale (#207) has counts at last, and says so.
const sized: Measure<PixelsResult> = { status: 'ok', result: { offset: 0, frames: [{ frame: 300, mame: 300, size: '224x768 vs 224x256' }], exact: [], firstDivergence: 300 } };
assert.deepEqual(pixelsVerdict(sized, pixels([], [40], { scale: 3 })),
  { verdict: 'better', detail: 'pixels at 300 Infinity -> 40; compared at 1x -> 3x' });
assert.equal(pixelsVerdict(sized, sized).verdict, 'same', 'a size mismatch that did not change is the same');

// A run that fails is worse than one that ran; two failures are the same; a skip is not judged.
const failed: Measure<PixelsResult> = { status: 'failed', reason: 'ours: RangeError' };
assert.equal(pixelsVerdict(pixels([300], [0]), failed).verdict, 'worse');
assert.equal(pixelsVerdict(failed, pixels([300], [0])).verdict, 'better');
assert.equal(pixelsVerdict(failed, failed).verdict, 'same');
assert.equal(pixelsVerdict({ status: 'skipped', reason: 'x' }, pixels([], [1])).verdict, 'n/a');
assert.equal(pixelsVerdict(undefined, pixels([], [1])).verdict, 'n/a');

const ramAt = (frame: number | undefined, bytes = 4, total = 100, compared = 600): Measure<RamSummary> => ({
  status: 'ok',
  result: { compared, bytesPerFrame: 16, offset: 0, total, ...(frame ? { firstDivergence: { frame, bytes, addresses: [] } } : {}) },
});
assert.equal(ramVerdict(ramAt(13), ramAt(13)).verdict, 'same');
assert.equal(ramVerdict(ramAt(13), ramAt(40)).verdict, 'better');
assert.equal(ramVerdict(ramAt(13), ramAt(2)).verdict, 'worse');
assert.equal(ramVerdict(ramAt(13), ramAt(undefined, 0, 0)).verdict, 'better');
assert.equal(ramVerdict(ramAt(undefined, 0, 0), ramAt(500)).verdict, 'worse');
assert.equal(ramVerdict(ramAt(13, 4), ramAt(13, 2)).verdict, 'better');
assert.equal(ramVerdict(ramAt(13, 4, 100), ramAt(13, 4, 120)).verdict, 'worse');
assert.equal(ramVerdict(ramAt(13), ramAt(13, 4, 100, 300)).verdict, 'worse', 'fewer frames compared is a shorter run');

const audio = (ratioDb: number, bands: number[], onsets: number, ref = 0.1): Measure<AudioResult> => ({
  status: 'ok',
  result: { seconds: 30, rms: { ours: ref * 10 ** (ratioDb / 20), ref, ratioDb }, bands: bands.map((diffDb, index) => ({ hz: 125 << index, diffDb })), onsets: { ours: onsets, ref: 2 } },
});
assert.deepEqual(audioVerdict(audio(-1.2, [1, -2], 2.5), audio(-1.2, [1, -2], 2.5)), { verdict: 'same' });
assert.equal(audioVerdict(audio(-1.2, [1, -2], 2.5), audio(0.5, [1, -2], 2.5)).verdict, 'better', '+0.5 dB is nearer MAME than -1.2 dB');
const mixed = audioVerdict(audio(-1.2, [1, -2], 2.5), audio(0.5, [3, -2], 2.1));
assert.equal(mixed.verdict, 'worse', 'a nearer level cannot buy back a wider spectrum');
assert.match(mixed.detail ?? '', /level \|dB\| 1\.20 -> 0\.50 \(better\); bands \|dB\| 3 -> 5 \(worse\); onsets\/s off MAME 0\.50 -> 0\.10 \(better\)/);
assert.equal(audioVerdict(audio(-1.2, [1], 2), audio(-1.23, [1.05], 2.01)).verdict, 'same', 'rounding is not a change');
assert.match(audioVerdict(audio(-1, [1], 2), audio(-1, [1], 2, 0.2)).detail ?? '', /MAME's recording differs/);

// Silence is clamped: both silent is 0 dB, and a quiet side reads above silence, not above 0.
const silence = (ours: number, ref: number): AudioResult => ({ seconds: 30, rms: { ours, ref, ratioDb: 0 }, bands: [], onsets: { ours: 0, ref: 0 } });
assert.equal(audioLevelDb(silence(0, 0)), 0);
assert.equal(Math.round(audioLevelDb(silence(0.001, 0))), 20);
assert.equal(Math.round(audioLevelDb(silence(0.01, 0.1))), -20);

// A unit compares only the measures asked for.
const record = { plan: unitPlan(units[0]!, 16), pixelsNone: pixels([300], [0]), ram: ramAt(13), audioContract: audio(0, [0], 2) };
assert.deepEqual(Object.keys(compareUnit(record, record, ['ram', 'audio:contract'])), ['ram', 'audio:contract']);
assert.equal(compareUnit(record, record)['audio:contract']?.verdict, 'same');
assert.equal(compareUnit(record, { plan: record.plan }, ['pixels:contract'])['pixels:contract']?.verdict, 'n/a');

console.log('baseline.spec.ts passed');
