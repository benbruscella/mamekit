import assert from 'node:assert/strict';
import type { MameHardwareDefinition } from './hardware.ts';
import { compileYm3526 } from './opl-compiler.ts';

const definition: MameHardwareDefinition = {
  type: 'YM3526',
  className: 'ym3526_device',
  sourceFile: 'src/devices/sound/ymopl.cpp',
  sourceLine: 12,
  sourceColumn: 1,
  macro: '',
};
const plan = compileYm3526(process.env.MAME_SRC ?? '../mame', definition);

assert.equal(plan.type, 'YM3526');
assert.equal(plan.channels, 9);
assert.equal(plan.operators, 18);
assert.equal(plan.registers, 0x100);
assert.equal(plan.waveformLength, 0x400);
assert.equal(plan.sampleRateDivider, 72);
assert.deepEqual(plan.operatorMap, [
  [0, 3], [1, 4], [2, 5],
  [6, 9], [7, 10], [8, 11],
  [12, 15], [13, 16], [14, 17],
]);
assert.deepEqual(plan.operatorOffsets, [
  0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21,
]);
assert.deepEqual(plan.multiples, [
  0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 12, 12, 15, 15,
]);

console.log('opl-compiler.spec: 12 passed, 0 failed');
