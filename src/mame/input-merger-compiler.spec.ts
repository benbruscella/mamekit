import assert from 'node:assert/strict';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../runtime/generated-device.ts';
import { indexMameHardware } from './hardware.ts';
import { compileInputMerger } from './input-merger-compiler.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const definitions = indexMameHardware(mameSrc);

clearGeneratedDevices();
const anyHigh = compileInputMerger(
  mameSrc,
  definitions.get('INPUT_MERGER_ANY_HIGH')!,
);
const allHigh = compileInputMerger(
  mameSrc,
  definitions.get('INPUT_MERGER_ALL_HIGH')!,
);
assert.deepEqual(anyHigh.constants, { INITVAL: 0, XORVAL: 0, ACTIVE: 1 });
assert.deepEqual(allHigh.constants, {
  INITVAL: 0xffffffff,
  XORVAL: 0xffffffff,
  ACTIVE: 0,
});
assert.equal(anyHigh.summary.diagnostics, 0);
assert.equal(allHigh.summary.diagnostics, 0);
registerGeneratedDevice(anyHigh);
registerGeneratedDevice(allHigh);

const anyOutput: number[] = [];
const any = createDevice('INPUT_MERGER_ANY_HIGH');
any.on('output_handler', state => anyOutput.push(state));
any.call('in_set_0');
any.call('in_set_1');
any.call('in_clear_0');
any.call('in_clear_1');
assert.deepEqual(anyOutput, [1, 1, 1, 0]);

const allOutput: number[] = [];
const all = createDevice('INPUT_MERGER_ALL_HIGH');
all.on('output_handler', state => allOutput.push(state));
all.call('in_clear_0');
all.call('in_set_0');
assert.deepEqual(allOutput, [0, 1]);

console.log('input-merger-compiler.spec: 8 passed, 0 failed');
