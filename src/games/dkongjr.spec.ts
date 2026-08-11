import assert from 'node:assert/strict';
import { compileDiscreteEffects } from '../mame/audio-compiler.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { dkongjr } from './dkongjr.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(dkongjr);
const graph = gameSourceGraph(dkongjr);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === dkongjr.machine.className &&
  node.props.name === dkongjr.machine.name);
assert.ok(machine);
const devices = graph.nodes.filter(node => node.label === 'Device');
assert.ok(devices.some(node => node.props.type === 'Z80' && node.props.tag === 'maincpu'));
assert.ok(devices.some(node => node.props.type === 'MB8884' && node.props.tag === 'soundcpu'));
assert.ok(devices.some(node => node.props.type === 'DISCRETE'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Donkey Kong Jr. video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
const audio = compileDiscreteEffects(
  mameSourceRoot(),
  [
    dkongjr.driver,
    ...graph.nodes
      .filter(node => node.label === 'SourceFile')
      .map(node => String(node.props.path)),
  ],
  'dkongjr_discrete',
);
assert.ok(audio, 'Donkey Kong Jr. discrete source must lower to executable audio IR');
const jump = audio.voices.find(voice => voice.node === audio.inputNodes.DS_SOUND1_INP);
assert.equal(jump?.mode, 'tone', 'the 74LS624 jump circuit must not become crash noise');
assert.equal(jump.network, 'dkongjr-jump');
assert.ok(jump.frequency >= 560 && jump.frequency <= 620);
assert.equal(jump.activeLow, true);
assert.ok(jump.release >= 0.25 && jump.release <= 0.3);

const walk = audio.voices.find(voice =>
  voice.node === audio.inputNodes.DS_SOUND0_INP);
assert.equal(walk?.mode, 'tone');
assert.equal(walk.network, 'dkongjr-walk');
assert.equal(walk.frequency, 2_105);
assert.equal(walk.activeLow, true);

const climb = audio.voices.find(voice =>
  voice.node === audio.inputNodes.DS_SOUND2_INP);
assert.equal(climb?.mode, 'noise');
assert.equal(climb.network, 'dkongjr-climb');
assert.equal(climb.frequency, 710);
assert.equal(climb.activeLow, true);
assert.ok(climb.release >= 0.25 && climb.release <= 0.28);

assert.equal(audio.inputNodes.DS_SOUND9_INP, 6);
const fall = audio.voices.find(voice =>
  voice.node === audio.inputNodes.DS_SOUND9_INP);
assert.equal(fall?.mode, 'tone');
assert.equal(fall.network, 'dkongjr-fall');
assert.equal(fall.frequency, 2_110);
assert.equal(fall.sustain, true);
const control = audio.voices.find(voice =>
  voice.node === audio.inputNodes.DS_SOUND7_INP);
assert.equal(control?.network, 'dkongjr-control');
assert.equal(control.gain, 0);
assert.equal(audio.outputNetwork, 'dkongjr');

(globalThis as Record<string, unknown>).AudioWorkletProcessor = class {};
(globalThis as Record<string, unknown>).registerProcessor = () => {};
const { GeneratedDiscreteAudioCore } = await import(
  '../hardware/discrete-effects/discrete-effects-worklet.ts'
);
const rms = (values: readonly number[]): number => Math.sqrt(
  values.reduce((sum, value) => sum + value * value, 0) / values.length,
);
const crossingFrequency = (values: readonly number[]): number => {
  let crossings = 0;
  for (let index = 1; index < values.length; index++) {
    if ((values[index - 1]! < 0) !== (values[index]! < 0)) crossings++;
  }
  return crossings / 2 / (values.length / 48_000);
};
const renderOneShot = (node: number, seconds = 0.8): number[] => {
  const effect = new GeneratedDiscreteAudioCore(48_000, undefined, audio);
  for (let sample = 0; sample < 48_000; sample++) effect.sample();
  effect.write(node, 1);
  for (let sample = 0; sample < 8_000; sample++) effect.sample();
  effect.write(node, 0);
  return Array.from(
    { length: Math.round(seconds * 48_000) },
    () => effect.sample(),
  );
};

const walkSamples = renderOneShot(walk.node);
assert.ok(rms(walkSamples.slice(0, 4_800)) >= 0.02);
assert.ok(rms(walkSamples.slice(0, 4_800)) <= 0.045);
assert.ok(rms(walkSamples.slice(14_400, 19_200)) < 0.001);
const jumpSamples = renderOneShot(jump.node);
assert.ok(rms(jumpSamples.slice(0, 4_800)) >= 0.11);
assert.ok(rms(jumpSamples.slice(0, 4_800)) <= 0.16);
assert.ok(crossingFrequency(jumpSamples.slice(0, 9_600)) >= 520);
assert.ok(crossingFrequency(jumpSamples.slice(0, 9_600)) <= 670);

const falling = new GeneratedDiscreteAudioCore(48_000, undefined, audio);
for (let sample = 0; sample < 48_000; sample++) falling.sample();
falling.write(fall.node, 1);
const fallSamples = Array.from({ length: 48_000 }, () => falling.sample());
falling.write(fall.node, 0);
const fallTail = Array.from({ length: 4_800 }, () => falling.sample());
assert.ok(crossingFrequency(fallSamples.slice(0, 4_800)) >= 1_800);
assert.ok(crossingFrequency(fallSamples.slice(-4_800)) <= 1_000);
assert.ok(rms(fallTail) < 0.005);

const startup = new GeneratedDiscreteAudioCore(48_000, undefined, audio);
const startupSamples = Array.from({ length: 9_600 }, () => startup.sample());
assert.ok(rms(startupSamples.slice(0, 4_800)) >= 0.25);
assert.ok(rms(startupSamples.slice(0, 4_800)) <= 0.35);
assert.ok(rms(startupSamples.slice(4_800)) >= 0.09);
assert.ok(rms(startupSamples.slice(4_800)) <= 0.14);

const core = new GeneratedDiscreteAudioCore(48_000, undefined, audio);
for (let sample = 0; sample < 5 * 48_000; sample++) core.sample();
const samples: number[] = [];
const samplesPerFrame = 800;
for (let frame = 0; frame < 120; frame++) {
  const phase = frame % 20;
  if (phase === 0) core.write(climb.node, 1);
  if (phase === 3) core.write(climb.node, 0);
  for (let sample = 0; sample < samplesPerFrame; sample++) {
    samples.push(core.sample());
  }
}
const climbRms = rms(samples);
let zeroCrossings = 0;
for (let index = 1; index < samples.length; index++) {
  if ((samples[index - 1]! < 0) !== (samples[index]! < 0)) zeroCrossings++;
}
const crossingsPerSecond = zeroCrossings / 2;
// Isolated MAME -wavwrite: RMS 0.1036 and 335.5 crossings/sec. This source
// circuit measures 0.0959 and 332.5; generic 4 kHz noise measured 1970.5.
assert.ok(climbRms >= 0.085 && climbRms <= 0.11);
assert.ok(crossingsPerSecond >= 300 && crossingsPerSecond <= 370);

console.log('dkongjr.spec: Z80, MB8884, discrete audio and video passed');
