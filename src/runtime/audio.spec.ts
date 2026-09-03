import assert from 'node:assert/strict';
import { AudioOutput } from './audio.ts';

const messages: unknown[] = [];
const connections: string[] = [];
let createdFilter: BiquadFilterNode | undefined;
let createdAnalyser: AnalyserNode | undefined;

class TestAudioContext {
  readonly audioWorklet = { addModule: async () => {} };
  readonly destination = {};
  readonly state = 'running';
  readonly sampleRate = 48_000;
  readonly baseLatency = 0;

  createGain(): GainNode {
    return {
      gain: { value: 1 },
      connect: (target: unknown) => connections.push(
        target === createdAnalyser ? 'gain->analyser' : 'gain->destination'),
    } as unknown as GainNode;
  }

  createAnalyser(): AnalyserNode {
    createdAnalyser = { fftSize: 0 } as unknown as AnalyserNode;
    return createdAnalyser;
  }

  createBiquadFilter(): BiquadFilterNode {
    createdFilter = {
      type: 'lowpass',
      frequency: { value: 0 },
      Q: { value: 0 },
      connect: () => connections.push('filter->gain'),
    } as unknown as BiquadFilterNode;
    return createdFilter;
  }

  async resume(): Promise<void> {}
  addEventListener(): void {}
}

class TestAudioWorkletNode {
  readonly port = {
    postMessage(message: unknown) {
      messages.push(message);
    },
  };

  constructor() {}
  connect(target: unknown): void {
    connections.push(target === createdFilter ? 'node->filter' : 'node->gain');
  }
}

Object.assign(globalThis, {
  AudioContext: TestAudioContext,
  AudioWorkletNode: TestAudioWorkletNode,
});

const output = new AudioOutput();
output.write(3, 7, 0.25);
output.flush();
output.flush();
await output.start({
  sampleRate: 48_000,
  refresh: 60,
  speakerFilter: {
    type: 'highpass',
    frequency: 20,
    q: 0.7071067,
    source: { file: 'src/emu/audio_effects/filter.cpp', line: 70 },
  },
}, 'test-worklet.js', 'test');
assert.equal(createdFilter?.type, 'highpass');
assert.equal(createdFilter?.frequency.value, 20);
assert.equal(createdFilter?.Q.value, 0.7071067);
assert.deepEqual(connections, [
  'node->filter',
  'filter->gain',
  'gain->destination',
]);

// Frames emulated before start() are history: they collapse into ONE batch so
// the worklet never boots with a multi-frame backlog of permanent latency.
assert.deepEqual(messages.slice(1), [
  { type: 'batch', writes: [{ offset: 3, data: 7, frac: 0.25 }] },
]);

// Post-start frames keep their boundaries, and writes carry the routing
// method name when the board supplies one.
output.write(1, 2, 0.5, 'sound_w');
output.flush();
output.flush();
assert.deepEqual(messages.slice(2), [
  { type: 'batch', writes: [{ offset: 1, data: 2, frac: 0.5, method: 'sound_w' }] },
  { type: 'batch', writes: [] },
]);

// Fast-forward mutes presentation, but the worklet must still receive chip
// state. Dropping a one-time K053260 mode write makes every later fight sample
// silent after using F to skip the Simpsons intro.
output.write(0x2f, 6, 0.75, 'k053260.write');
output.discard();
assert.deepEqual(messages.at(-1), {
  type: 'batch',
  writes: [{ offset: 0x2f, data: 6, frac: 0.75, method: 'k053260.write' }],
});

// The QA tap hangs off the post-gain mix and never re-routes the speakers.
const analyser = output.monitor();
assert.equal(analyser?.fftSize, 2048);
assert.deepEqual(connections.slice(3), ['gain->analyser']);
assert.equal(new AudioOutput().monitor(), null); // nothing to tap before start()

console.log('audio.spec: 5 passed');
