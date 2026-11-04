import assert from 'node:assert/strict';
import * as ts from 'typescript';
import {
  compileAy8910,
  compileMameSpeakerFilter,
  compileMsm5205,
  compileNamcoWsg,
  generatedAy8910WorkletSource,
  generatedNamcoWsgWorkletSource,
} from './audio-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';

const definition: MameHardwareDefinition = {
  type: 'NAMCO_WSG',
  className: 'namco_wsg_device',
  shortName: 'namco_wsg',
  description: 'Namco WSG',
  sourceFile: 'src/devices/sound/namco.cpp',
  sourceLine: 52,
  sourceColumn: 1,
  macro: 'DEFINE_DEVICE_TYPE',
};
const mameSrc = process.env.MAME_SRC ?? '../mame';
assert.deepEqual(compileMameSpeakerFilter(mameSrc), {
  type: 'highpass',
  frequency: 20,
  q: 0.7071067,
  source: {
    file: 'src/emu/audio_effects/filter.cpp',
    line: 67,
  },
});
const plan = compileNamcoWsg(mameSrc, definition);
assert.equal(plan.internalRate, 192_000);
assert.equal(plan.voices, 3);
assert.equal(plan.registerCount, 0x20);

const poleposPlan = compileNamcoWsg(mameSrc, {
  ...definition,
  type: 'POLEPOS_WSG',
  className: 'polepos_wsg_device',
});
assert.equal(poleposPlan.voices, 8);
assert.equal(poleposPlan.registerCount, 0x40);
assert.equal(poleposPlan.writeMethod, 'polepos_sound_w');
assert.equal(poleposPlan.readMethod, 'polepos_sound_r');
assert.equal(poleposPlan.engine?.outputRate, 24_000);
assert.equal(poleposPlan.engine?.filters.length, 3);
assert.deepEqual(poleposPlan.engine?.volumeTable, [
  0.28, 0.36, 0.48, 0.56, 0.73, 0.81, 0.93, 1.01,
]);
const poleposSource = generatedNamcoWsgWorkletSource(poleposPlan);
assert.doesNotMatch(
  poleposSource,
  /auxiliarySelect/,
  'Pole Position 52XX/54XX channels must be synthesized only by their hosted MCU DAC path',
);

const source = generatedNamcoWsgWorkletSource(plan)
  .replace(
    "import { executeGeneratedProgram } from '../../core/generated-handler.js';",
    'const executeGeneratedProgram = () => ({ returned: false });',
  );
const javaScript = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
}).outputText;

const globals = globalThis as Record<string, unknown>;
interface WorkletHarness {
  port: { onmessage: ((event: { data: unknown }) => void) | null };
  process(inputs: Float32Array[][], outputs: Float32Array[][]): boolean;
}
let registeredWsgProcessor: (new () => WorkletHarness) | undefined;
let registeredAyProcessor: (new () => WorkletHarness) | undefined;
globals.AudioWorkletProcessor = class {
  readonly port = { onmessage: null };
};
globals.sampleRate = 48_000;
globals.registerProcessor = (
  name: string,
  processor: new () => WorkletHarness,
) => {
  if (name === 'wsg') registeredWsgProcessor = processor;
  if (name === 'ay8910') registeredAyProcessor = processor;
};
const module = await import(
  `data:text/javascript;base64,${Buffer.from(javaScript).toString('base64')}`
) as {
  GeneratedNamcoWsgCore: new (
    waveRom: Uint8Array,
    clock: number,
  ) => {
    sampleRate: number;
    render(output: Float32Array): void;
    renderFrame(
      output: Float32Array,
      writes: { offset: number; data: number; frac?: number; method?: string }[],
    ): void;
  };
  GeneratedNamcoWsgFrameRenderer: new (
    core: {
      sampleRate: number;
      renderFrame(
        output: Float32Array,
        writes: { offset: number; data: number; frac?: number; method?: string }[],
      ): void;
    },
    refresh: number,
  ) => {
    render(
      writes: { offset: number; data: number; frac?: number; method?: string }[],
    ): Float32Array;
  };
};
const core = new module.GeneratedNamcoWsgCore(new Uint8Array(0x100), 96_000);

// MAME doubles Pac-Man's 96 kHz device clock to its 192 kHz internal stream.
// Keeping the 16-bit phase divider while rendering at 96 kHz lowers every
// oscillator by exactly one octave.
assert.equal(core.sampleRate, 192_000);
assert.equal(
  0x1000 * core.sampleRate / (2 ** 16 * 32),
  375,
);
assert.match(source, /this\.step = this\.core\.sampleRate \/ sampleRate/);

// A stream mixed beside the voices (the DISCRETE the 54XX drives) arrives as
// `stream.pcm` writes, one sample each at the rate in the offset, and is added
// to the voices across the frame it arrives with.
const streamRenderer = new module.GeneratedNamcoWsgFrameRenderer(
  new module.GeneratedNamcoWsgCore(new Uint8Array(0x100), 96_000),
  60,
);
const streamSamples = streamRenderer.render(Array.from({ length: 800 }, (_unused, index) => ({
  offset: 48_000,
  data: index < 400 ? 0.25 : -0.25,
  frac: index / 800,
  method: 'stream.pcm',
})));
assert.equal(streamSamples.length, 3_200);
assert.ok(Math.abs(streamSamples[100]! - 0.25) < 1e-6);
assert.ok(Math.abs(streamSamples[3_000]! + 0.25) < 1e-6);
assert.match(source, /write\.frac/);
assert.ok(registeredWsgProcessor);
const processor = new registeredWsgProcessor();
processor.port.onmessage?.({
  data: { type: 'init', waveRom: new Uint8Array(0x100), clock: 96_000, refresh: 60 },
});
processor.port.onmessage?.({
  data: {
    type: 'batch',
    writes: Array.from({ length: 800 }, () => ({ offset: 48_000, data: 0.25, frac: 0, method: 'stream.pcm' })),
  },
});
const workletSamples = new Float32Array(800);
for (let offset = 0; offset < workletSamples.length; offset += 128) {
  const block = workletSamples.subarray(offset, Math.min(offset + 128, workletSamples.length));
  assert.equal(processor.process([], [[block]]), true);
}
assert.ok(
  workletSamples.some(sample => sample !== 0),
  'generated WSG worklet must play the streams mixed beside it',
);

const ayPlan = compileAy8910(mameSrc, {
  ...definition,
  type: 'AY8910',
  className: 'ay8910_device',
  sourceFile: 'src/devices/sound/ay8910.cpp',
});
assert.equal(ayPlan.clockDivider, 8);
assert.equal(ayPlan.envelopeMask, 0x0f);
assert.equal(ayPlan.envelopeStep, 2);
assert.deepEqual(ayPlan.noiseTaps, [0, 3]);
assert.deepEqual(ayPlan.readMasks.slice(0, 8), [
  0xff, 0x0f, 0xff, 0x0f, 0xff, 0x0f, 0x1f, 0xff,
]);
assert.equal(ayPlan.singleOutput.resistances.length, 16);
assert.equal(ayPlan.mosfet.kn.length, 16);
assert.equal(ayPlan.outputFlags.AY8910_LEGACY_OUTPUT, 1);
assert.equal(ayPlan.outputFlags.AY8910_RESISTOR_OUTPUT, 8);
assert.deepEqual(ayPlan.filterTypes, { lowpass3r: 0, lowpass: 2, highpass: 3, ac: 4 });
const msmPlan = compileMsm5205(mameSrc, {
  ...definition,
  type: 'MSM5205',
  className: 'msm5205_device',
  sourceFile: 'src/devices/sound/msm5205.cpp',
});
assert.deepEqual(msmPlan.indexShift, [-1, -1, -1, -1, 2, 4, 6, 8]);
assert.equal(msmPlan.diffLookup.length, 49 * 16);
assert.equal(msmPlan.modes.S96_4B, 4);
assert.equal(msmPlan.maximumSignal, 2047);
assert.equal(msmPlan.minimumSignal, -2048);

const aySource = generatedAy8910WorkletSource(ayPlan, msmPlan);
const ayOnlySource = generatedAy8910WorkletSource(ayPlan);
assert.match(
  ayOnlySource,
  /const msmPlan: GeneratedMsm5205PlanData \| null = null;/,
  'AY-only worklets must retain the optional MSM plan type instead of narrowing it to never',
);
const ayJavaScript = ts.transpileModule(aySource, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
}).outputText;
const ayModule = await import(
  `data:text/javascript;base64,${Buffer.from(ayJavaScript).toString('base64')}`
) as {
  GeneratedAy8910Core: new (clock: number) => {
    nativeRate: number;
    write(register: number, data: number): void;
    sample(): number;
  };
  GeneratedAy8910Mixer: new (
    clock: number,
    chips: number,
    outputRate: number,
    routes?: { chip: number; channel: number; gain: number; target: string; filter?: {
      index: number; bank: number; channel: number;
    } }[],
    auxiliaryDevices?: {
      type: string;
      deviceTag: string;
      clock: number;
      initialMode?: string;
      gain: number;
      target: string;
      writeMethods: string[];
    }[],
    deviceTags?: string[],
  ) => { write(offset: number, data: number, method?: string): void; sample(): number };
  GeneratedAy8910FrameRenderer: new (
    mixer: { write(offset: number, data: number): void; sample(): number },
    outputRate: number,
    refresh: number,
  ) => { render(writes: {
    offset: number; data: number; frac?: number; method?: string;
  }[]): Float32Array };
};
const ay = new ayModule.GeneratedAy8910Core(1_789_772);
assert.equal(ay.nativeRate, 1_789_772 / 8);
ay.write(0, 1);
ay.write(7, 0x3e);
ay.write(8, 0x0f);
assert.ok(Array.from({ length: 64 }, () => ay.sample()).some(sample => sample !== 0));

const composite = new ayModule.GeneratedAy8910Mixer(
  894_886.25,
  2,
  48_000,
  [
    { chip: 0, channel: -1, gain: 1, target: 'filtermix' },
    { chip: 1, channel: -1, gain: 1, target: 'filtermix' },
  ],
  [{
    type: 'MSM5205',
    deviceTag: 'msm1',
    clock: 384_000,
    initialMode: 'S96_4B',
    gain: 1,
    target: 'filtermix',
    writeMethods: ['data_w', 'reset_w', 'playmode_w'],
  }],
);
composite.write(0, 7, 'msm1.data_w');
for (let index = 0; index < 16; index++) composite.write(0, 1, 'msm1.vck');
assert.notEqual(composite.sample(), 0, 'routed MSM5205 stream must reach the AY mixer');

const slaveMsm = new ayModule.GeneratedAy8910Mixer(
  894_886.25,
  2,
  48_000,
  [],
  [{
    type: 'MSM5205',
    deviceTag: 'msm2',
    clock: 384_000,
    initialMode: 'SEX_4B',
    gain: 1,
    target: 'filtermix',
    writeMethods: ['data_w', 'reset_w', 'playmode_w', 'vclk_w'],
  }],
);
slaveMsm.write(0, 7, 'msm2.data_w');
for (let index = 0; index < 16; index++) slaveMsm.write(0, 1, 'msm2.vclk_w');
assert.notEqual(
  slaveMsm.sample(),
  0,
  'slave MSM5205 vclk_w must advance its routed ADPCM stream',
);

const unfiltered = new ayModule.GeneratedAy8910Mixer(1_789_772, 1, 48_000);
const filtered = new ayModule.GeneratedAy8910Mixer(1_789_772, 1, 48_000, [{
  chip: 0, channel: 0, gain: 1, target: 'filter.0.0',
  filter: { index: 0, bank: 0, channel: 0 },
}]);
for (const mixer of [unfiltered, filtered]) {
  mixer.write(0, 1);
  mixer.write(7, 0x3e);
  mixer.write(8, 0x0f);
}
const filterBase = 0x100;
[0, 1000, 5100, 0, 220000e-12].forEach((value, index) =>
  filtered.write(filterBase + index, value));
const raw = Array.from({ length: 256 }, () => unfiltered.sample());
const lowpass = Array.from({ length: 256 }, () => filtered.sample());
const variation = (values: number[]) => values.slice(1)
  .reduce((sum, value, index) => sum + Math.abs(value - values[index]!), 0);
assert.ok(variation(lowpass) < variation(raw));

const aliased = new ayModule.GeneratedAy8910Mixer(1_789_772, 1, 48_000);
const audible = new ayModule.GeneratedAy8910Mixer(1_789_772, 1, 48_000);
for (const [mixer, period] of [[aliased, 1], [audible, 16]] as const) {
  mixer.write(0, period);
  mixer.write(7, 0x3e);
  mixer.write(8, 0x0f);
}
const rms = (values: number[]) => Math.sqrt(
  values.reduce((sum, value) => sum + value * value, 0) / values.length,
);
const acRms = (values: number[]) => {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return rms(values.map(value => value - mean));
};
const aliasedRms = acRms(Array.from({ length: 4096 }, () => aliased.sample()).slice(256));
const audibleRms = acRms(Array.from({ length: 4096 }, () => audible.sample()).slice(256));
assert.ok(
  aliasedRms < audibleRms * 0.1,
  `native AY period 1 folded into 48 kHz output (${aliasedRms} vs ${audibleRms})`,
);

const gainControlled = new ayModule.GeneratedAy8910Mixer(
  1_789_772,
  1,
  48_000,
  [{ chip: 0, channel: 0, gain: 1, target: 'speaker' }],
  [],
  ['ay1'],
);
gainControlled.write(0, 16);
gainControlled.write(7, 0x3e);
gainControlled.write(8, 0x0f);
assert.ok(acRms(Array.from({ length: 1024 }, () => gainControlled.sample()).slice(256)) > 0.01);
gainControlled.write(0, 0, 'ay1.set_output_gain');
assert.ok(Array.from({ length: 64 }, () => gainControlled.sample()).every(sample => sample === 0));

// MAME's ALL_OUTPUTS (65535) turns every output of the chip down, not only
// the first: Gauntlet's mixer_w sets its YM2151's gain this way (#194).
const allOutputs = new ayModule.GeneratedAy8910Mixer(
  1_789_772,
  1,
  48_000,
  [0, 1, 2].map(channel => ({ chip: 0, channel, gain: 1, target: 'speaker' })),
  [],
  ['ay1'],
);
allOutputs.write(2, 16);
allOutputs.write(7, 0x3d);
allOutputs.write(9, 0x0f);
allOutputs.write(0, 0, 'ay1.set_output_gain');
assert.ok(
  acRms(Array.from({ length: 1024 }, () => allOutputs.sample()).slice(256)) > 0.01,
  'output 0 alone leaves channel B playing',
);
allOutputs.write(65535, 0, 'ay1.set_output_gain');
Array.from({ length: 64 }, () => allOutputs.sample());
assert.ok(Array.from({ length: 64 }, () => allOutputs.sample()).every(sample => sample === 0));

const timedMixer = new ayModule.GeneratedAy8910Mixer(1_789_772, 1, 48_000);
const frameRenderer = new ayModule.GeneratedAy8910FrameRenderer(timedMixer, 48_000, 60);
const timed = frameRenderer.render([
  { offset: 7, data: 0x3f, frac: 0 },
  { offset: 8, data: 0x0f, frac: 0.5 },
]);
assert.equal(timed.length, 800);
assert.ok(acRms([...timed.slice(200, 380)]) < 1e-6);
assert.ok(acRms([...timed.slice(400)]) > 1e-4);
assert.match(aySource, /write\.frac/);

// A browser animation-frame catch-up can deliver several complete audio
// batches at once. The queue is elastic — a few frames of slack absorb rAF
// jitter without a discontinuity — but it must stay bounded so a stall never
// becomes permanent latency: bursting past the cap drops the oldest PCM.
assert.ok(registeredAyProcessor);
const queuedAy = new registeredAyProcessor();
queuedAy.port.onmessage?.({ data: {
  type: 'init', clock: 1_789_772, chips: 1, refresh: 60,
} });
queuedAy.port.onmessage?.({ data: { type: 'batch', writes: [
  { offset: 0, data: 16, frac: 0 },
  { offset: 7, data: 0x3f, frac: 0 },
  { offset: 8, data: 0, frac: 0 },
] } });
queuedAy.port.onmessage?.({ data: { type: 'batch', writes: [
  { offset: 7, data: 0x3e, frac: 0 },
  { offset: 8, data: 0x0f, frac: 0 },
] } });
queuedAy.port.onmessage?.({ data: { type: 'batch', writes: [] } });
queuedAy.port.onmessage?.({ data: { type: 'batch', writes: [] } });
const freshAudio = new Float32Array(256);
queuedAy.process([], [[freshAudio]]);
assert.ok(
  acRms([...freshAudio]) > 1e-4,
  'a burst past the queue cap must drop the oldest (silent) PCM frame',
);

// Starvation must hold the last sample rather than snap to 0: the Taito SJ
// analog AY mix idles well above 0, so a 0-fill is an audible pop.
const starvedTail = new Float32Array(800 * 3);
queuedAy.process([], [[starvedTail]]);
const starved = new Float32Array(256);
queuedAy.process([], [[starved]]);
const held = starvedTail[starvedTail.length - 1]!;
assert.notEqual(held, 0, 'the starved tail must already hold a real sample');
assert.ok(
  starved.every(sample => sample === held),
  'an underrun must hold the last rendered sample, not emit zeros',
);

const dacMixer = new ayModule.GeneratedAy8910Mixer(
  1_789_772,
  1,
  48_000,
  [{ chip: 0, channel: 0, gain: 0, target: 'speaker' }],
  [{
    type: 'DAC_8BIT_R2R', deviceTag: 'dac', clock: 0, gain: 1,
    target: 'speaker', writeMethods: ['data_w'],
  }],
);
const dacRenderer = new ayModule.GeneratedAy8910FrameRenderer(dacMixer, 48_000, 60);
const dacBaselineRenderer = new ayModule.GeneratedAy8910FrameRenderer(
  new ayModule.GeneratedAy8910Mixer(
    1_789_772,
    1,
    48_000,
    [{ chip: 0, channel: 0, gain: 0, target: 'speaker' }],
    [{
      type: 'DAC_8BIT_R2R', deviceTag: 'dac', clock: 0, gain: 1,
      target: 'speaker', writeMethods: ['data_w'],
    }],
  ),
  48_000,
  60,
);
const dacBaseline = dacBaselineRenderer.render([]);
const integrated = dacRenderer.render([
  { offset: 0, data: 0, frac: 0, method: 'dac.data_w' },
  { offset: 0, data: 0xff, frac: 0.5 / 800, method: 'dac.data_w' },
]);
assert.ok(
  Math.abs(integrated[0]! - dacBaseline[0]!) < 0.01,
  `sub-sample DAC writes must integrate instead of aliasing (${integrated[0]})`,
);
console.log('audio-compiler.spec: generated audio cores passed');
