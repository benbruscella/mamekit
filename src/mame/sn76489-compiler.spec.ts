import assert from 'node:assert/strict';
import * as ts from 'typescript';
import {
  compileSn76489,
  generatedSn76489WorkletSource,
} from './sn76489-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';

const definition: MameHardwareDefinition = {
  type: 'SN76489A',
  className: 'sn76489a_device',
  shortName: 'sn76489a',
  description: 'SN76489A',
  sourceFile: 'src/devices/sound/sn76496.cpp',
  sourceLine: 195,
  sourceColumn: 1,
  macro: 'DEFINE_DEVICE_TYPE',
};
const plan = compileSn76489(process.env.MAME_SRC ?? '../mame', definition);
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

const transpiled = ts.transpileModule(generatedSn76489WorkletSource(plan), {
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

console.log('sn76489-compiler.spec: source-derived SN76489A plan and worklet passed');
