import assert from 'node:assert/strict';
import type { GameAcceptanceGolden } from '../../src/games/types.ts';
import { classify, describe, type SweepRun } from './sweep-plan.ts';

const golden: GameAcceptanceGolden = {
  regions: { maincpu: 'r1' },
  checkpoints: { title: { video: 'v1', state: 's1' }, play: { video: 'v2', state: 's2' } },
  audio: { writes: 1000, nonzeroWrites: 900, writeHash: 'w', pcmHash: 'p', rms: 0.1 },
};
const run = (change: (result: GameAcceptanceGolden) => void, extra: Partial<SweepRun> = {}): SweepRun => {
  const result = structuredClone(golden);
  change(result);
  return { key: 'dkong', result, golden, durationMs: 1000, ...extra };
};

assert.deepEqual(classify(run(() => {})), { key: 'dkong', class: 'unchanged' });
assert.equal(classify({ key: 'dkong', golden, durationMs: 5, error: 'RangeError: x' }).class, 'failed', 'no result is a failure');
assert.equal(classify({ key: 'dkong', durationMs: 5, result: golden }).class, 'failed', 'no golden to compare');

// The worst change decides: a picture over state over sound.
const video = classify(run(result => { result.checkpoints.play!.video = 'x'; result.checkpoints.play!.state = 'y'; result.audio.writes = 990; }));
assert.deepEqual(video, { key: 'dkong', class: 'video', checkpoints: ['play'], writes: -10 });
assert.deepEqual(classify(run(result => { result.checkpoints.title!.state = 'y'; })), { key: 'dkong', class: 'state', checkpoints: ['title'] });

// Sound: the count or the level is a change; the same writes at other times are stamps.
assert.deepEqual(classify(run(result => { result.audio.writes = 1012; result.audio.writeHash = 'z'; })), { key: 'dkong', class: 'audio', writes: 12 });
assert.deepEqual(classify(run(result => { result.audio.rms = 0.05; result.audio.pcmHash = 'z'; })), { key: 'dkong', class: 'audio', rmsDb: -6.02 });
assert.deepEqual(classify(run(result => { result.audio.writeHash = 'z'; result.audio.pcmHash = 'q'; result.audio.rms = 0.1003; })),
  { key: 'dkong', class: 'stamps' }, 'a level within rounding with every write still there');
assert.deepEqual(classify(run(result => { result.regions.maincpu = 'r2'; })), { key: 'dkong', class: 'regions', detail: 'maincpu' });

// A slow run is noted, never failed.
const slow = classify(run(() => {}, { emulatedFps: 40, minimumFps: 55 }));
assert.deepEqual(slow, { key: 'dkong', class: 'unchanged', slow: true });
assert.match(describe(slow), /below its fps floor/);
assert.match(describe(video), /^VIDEO\s+dkong\s+checkpoints play\s+writes -10$/);

console.log('sweep-plan.spec: ok');
