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

console.log('sn76489-compiler.spec: source-derived SN76489/SN76489A plans and worklet passed');
