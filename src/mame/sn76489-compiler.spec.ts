import assert from 'node:assert/strict';
import * as ts from 'typescript';
import {
  compileSn76489,
  generatedSn76489WorkletSource,
} from './sn76489-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';

const definition = (
  type: string,
  className: string,
  sourceLine: number,
): MameHardwareDefinition => ({
  type,
  className,
  shortName: className.replace(/_device$/, ''),
  description: type,
  sourceFile: 'src/devices/sound/sn76496.cpp',
  sourceLine,
  sourceColumn: 1,
  macro: 'DEFINE_DEVICE_TYPE',
});
const mameSrc = process.env.MAME_SRC ?? '../mame';
const plan = compileSn76489(mameSrc, definition('SN76489A', 'sn76489a_device', 195));
assert.deepEqual({
  feedbackMask: plan.feedbackMask,
  whiteNoiseTap1: plan.whiteNoiseTap1,
  whiteNoiseTap2: plan.whiteNoiseTap2,
  negate: plan.negate,
  clockDivider: plan.clockDivider,
}, {
  feedbackMask: 0x10000,
  whiteNoiseTap1: 0x04,
  whiteNoiseTap2: 0x08,
  negate: false,
  clockDivider: 8,
});

// The family shares one implementation but not its constructor arguments: the
// plain SN76489 clocks a 15-bit LFSR and inverts its output. A worklet built
// from one variant's plan therefore mis-renders every other variant's noise.
const plain = compileSn76489(mameSrc, definition('SN76489', 'sn76489_device', 190));
assert.deepEqual({
  feedbackMask: plain.feedbackMask,
  whiteNoiseTap1: plain.whiteNoiseTap1,
  whiteNoiseTap2: plain.whiteNoiseTap2,
  negate: plain.negate,
}, {
  feedbackMask: 0x4000,
  whiteNoiseTap1: 0x01,
  whiteNoiseTap2: 0x02,
  negate: true,
});

const transpiled = ts.transpileModule(generatedSn76489WorkletSource([plan, plain]), {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
  },
  reportDiagnostics: true,
});
assert.deepEqual(
  transpiled.diagnostics?.map(diagnostic => diagnostic.messageText) ?? [],
  [],
);
assert.match(transpiled.outputText, /class GeneratedSn76489Mixer/);
// Both variants have to reach the worklet, keyed by the MAME type a board's
// machine config declares, or a mixed-family catalog silently renders one of
// them with the other's noise generator.
assert.match(transpiled.outputText, /"type": "SN76489A"/);
assert.match(transpiled.outputText, /"type": "SN76489"/);
assert.match(transpiled.outputText, /planByType/);
assert.match(transpiled.outputText, /GeneratedSn76489SamplesCore/);
assert.match(transpiled.outputText, /this\.mixer\.write\(write\.offset, write\.data, write\.method\)/);

const globals = globalThis as Record<string, unknown>;
globals.sampleRate = 48_000;
globals.AudioWorkletProcessor = class { port = { onmessage: undefined }; };
globals.registerProcessor = () => {};
const generated = await import(
  `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString('base64')}`
) as {
  GeneratedSn76489Mixer: new (
    clock: number,
    chips: number,
    outputRate: number,
    routes?: unknown[],
    deviceTypes?: string[],
    clocks?: number[],
    auxiliaryDevices?: unknown[],
  ) => { write(chip: number, data: number, method?: string): void; sample(): number };
};
const plainMixer = new generated.GeneratedSn76489Mixer(
  4_000_000, 1, 48_000, [], ['SN76489A'], [4_000_000],
);
const protectedMixer = new generated.GeneratedSn76489Mixer(
  4_000_000, 1, 48_000, [], ['SN76489A'], [4_000_000],
);
protectedMixer.write(3, 0x85, 'samples.start');
for (let index = 0; index < 32; index++) {
  assert.equal(
    protectedMixer.sample(),
    plainMixer.sample(),
    'an unmatched auxiliary command must not become an SN register write',
  );
}
const samplesMixer = new generated.GeneratedSn76489Mixer(
  4_000_000,
  1,
  48_000,
  [],
  ['SN76489A'],
  [4_000_000],
  [{ type: 'SAMPLES', deviceTag: 'samples', gain: 0.25, writeMethods: ['start'] }],
);
samplesMixer.write(3, 0x85, 'samples.start');
assert.notEqual(
  samplesMixer.sample(),
  new generated.GeneratedSn76489Mixer(4_000_000, 1, 48_000).sample(),
  'a declared samples stream must be mixed independently',
);

console.log('sn76489-compiler.spec: source-derived SN76489/SN76489A plans and worklet passed');
