import assert from 'node:assert/strict';
import * as ts from 'typescript';
import {
  compileMameSpeakerFilter,
  compileNamcoWsg,
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

console.log('audio-compiler.spec: generated audio cores passed');
