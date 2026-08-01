import assert from 'node:assert/strict';
import { compileDiscreteEffects } from '../mame/audio-compiler.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { dkong } from './dkong.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(dkong);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === dkong.machine.className &&
  node.props.name === dkong.machine.name);
assert.ok(machine);
for (const type of ['Z80', 'I8257', 'MB8884', 'DISCRETE']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.deepEqual(video.plan.palette?.forceBlack, { mask: 0x03, value: 0x00 });
assert.deepEqual(video.plan.palette?.resNet?.amplifiers, [
  'darlington',
  'darlington',
  'emitter',
]);
assert.deepEqual(video.plan.palette?.normalize, {
  start: 0,
  end: 255,
  lumMin: 0,
  lumMax: 255,
});
const audio = compileDiscreteEffects(
  mameSourceRoot(),
  [
    dkong.driver,
    ...graph.nodes
      .filter(node => node.label === 'SourceFile')
      .map(node => String(node.props.path)),
  ],
  'dkong2b_discrete',
);
assert.ok(audio);
assert.equal(audio.type, 'DISCRETE_EFFECTS');
assert.equal(audio.inputNodes.DS_DAC, 7);
assert.equal(audio.inputNodes.DS_SOUND0_INP, 1);
assert.equal(audio.voices.length, 3);
assert.ok(audio.voices.some(voice => voice.mode === 'noise'));
const tones = audio.voices.filter(voice => voice.mode === 'tone');
assert.equal(tones.length, 2);
assert.ok(tones.every(voice => voice.activeLow === false));
assert.ok(tones.every(voice => voice.vco));
assert.equal(audio.outputNetwork, 'dkong2b');
assert.deepEqual(
  tones.map(voice => voice.network).sort(),
  ['dkong-jump', 'dkong-walk'],
);
assert.deepEqual(
  tones.map(voice => voice.vco!.modulationType).sort(),
  [1, 2],
);
assert.ok(tones.some(voice => Math.abs(voice.release - 0.047) < 1e-9));
assert.ok(tones.every(voice =>
  voice.vco!.modulationFrequency > 8 &&
  voice.vco!.modulationFrequency < 12));
assert.ok(audio.dac.filterFrequency > 1_500 && audio.dac.filterFrequency < 2_500);

(globalThis as Record<string, unknown>).AudioWorkletProcessor = class {};
(globalThis as Record<string, unknown>).registerProcessor = () => {};
const { GeneratedDiscreteAudioCore } = await import(
  '../hardware/discrete-effects/discrete-effects-worklet.ts'
);
const isolatedEffect = (node: number, seconds: number): number[] => {
  const core = new GeneratedDiscreteAudioCore(48_000, 1, audio);
  for (let index = 0; index < 48_000 * 5; index++) core.sample();
  core.write(node, 1);
  const samples: number[] = [];
  for (let index = 0; index < Math.round(48_000 * seconds); index++) {
    if (index === 8_000) core.write(node, 0);
    samples.push(core.sample());
  }
  return samples;
};
const rms = (samples: readonly number[]): number => Math.sqrt(
  samples.reduce((sum, sample) => sum + sample * sample, 0) / samples.length,
);
const dominantBand = (
  samples: readonly number[],
  start: number,
  end: number,
): number => {
  let bestFrequency = start;
  let bestPower = -1;
  for (let frequency = start; frequency <= end; frequency += 2) {
    let real = 0;
    let imaginary = 0;
    for (let index = 0; index < samples.length; index += 4) {
      const phase = 2 * Math.PI * frequency * index / 48_000;
      real += samples[index]! * Math.cos(phase);
      imaginary -= samples[index]! * Math.sin(phase);
    }
    const power = real * real + imaginary * imaginary;
    if (power > bestPower) {
      bestPower = power;
      bestFrequency = frequency;
    }
  }
  return bestFrequency;
};
const walk = isolatedEffect(1, 0.5);
const jump = isolatedEffect(2, 0.6);
assert.ok(rms(walk) > 0.025 && rms(walk) < 0.037);
assert.ok(rms(jump) > 0.035 && rms(jump) < 0.050);
assert.ok(dominantBand(walk, 450, 550) >= 480);
assert.ok(dominantBand(jump, 300, 420) >= 330);

console.log('dkong.spec: DMA, modulated discrete sound and Nintendo video passed');
