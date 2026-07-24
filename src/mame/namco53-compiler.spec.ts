import assert from 'node:assert/strict';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../runtime/generated-device.ts';
import { compileNamco53Protocol } from './namco53-compiler.ts';

const generated = compileNamco53Protocol();
assert.equal(generated.type, 'NAMCO_53XX');
assert.equal(generated.summary.diagnostics, 0);
assert.equal(generated.summary.compiledMethods, generated.summary.methods);
assert.ok(generated.sourceFiles.some(file => file.includes('namcoio.c@')));
assert.ok(generated.sourceFiles.includes('src/mame/namco/namco53.cpp'));
assert.equal(
  generated.callbacks.find(callback => callback.signal === 'input_callback')?.slots,
  4,
);

clearGeneratedDevices();
registerGeneratedDevice(generated);
const device = createDevice('NAMCO_53XX');
for (const [slot, value] of [[0, 9], [1, 9], [2, 4], [3, 2]] as const) {
  device.on('input_callback', () => value, slot);
}

assert.equal(device.call('read'), 0x99);
assert.equal(device.call('read'), 0x24);
device.call('reset', 0);
assert.equal(device.call('read'), 0x99);

console.log('namco53-compiler.spec: historical MAME protocol lowers to device IR');
