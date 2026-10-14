import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { deviceDefinitionsFromSource } from '../../mame/hardware.ts';
import { generatedDeviceMethodsSource } from '../../mame/device-codegen.ts';
import { createDevice, registerGeneratedDevice, type GeneratedDeviceMethodMap } from '../../runtime/generated-device.ts';
import { captureState, restoreState } from '../../runtime/machine-state.ts';
import { compileSerialEeprom } from './extract.ts';

const mame = process.env.MAME_SRC ?? '../mame';
const file = 'src/devices/machine/eepromser.cpp';
const definition = deviceDefinitionsFromSource(file, readFileSync(join(mame, file), 'utf8'))
  .find(definition => definition.type === 'EEPROM_ER5911_8BIT');
assert.ok(definition);
const ir = compileSerialEeprom(mame, definition);
assert.equal(ir.summary.diagnostics, 0);
assert.equal(ir.members.find(member => member.name === 'm_command_address_bits')?.initial, 9);
assert.equal(ir.members.find(member => member.name === 'm_address_bits')?.initial, 7);
assert.ok(ir.methods.find(method => method.name === 'handle_event')?.source.file.endsWith('eepromser.cpp'));
const codegen = generatedDeviceMethodsSource(ir);
assert.ok(codegen.methods.includes('clk_write'));
registerGeneratedDevice({ ...ir, type: 'EEPROM_INTERPRETED' });
registerGeneratedDevice({ ...ir, type: 'EEPROM_COMPILED',
  compiledMethods: (0, eval)(`(${codegen.source})`) as GeneratedDeviceMethodMap });
let time = 1;
const memories = [Uint8Array.from({ length: 128 }, (_, i) => i), Uint8Array.from({ length: 128 }, (_, i) => i)];
const devices = ['EEPROM_INTERPRETED', 'EEPROM_COMPILED'].map((type, index) =>
  createDevice(type, { tag: 'eeprom', regions: { eeprom: memories[index]! },
    calls: { 'machine().time': () => time } }));
function call(method: string, ...args: number[]): number {
  time += 0.00001;
  const results = devices.map(device => Number(device.invoke(method, ...args)) || 0);
  assert.equal(results[0], results[1], method);
  assert.deepEqual(memories[0], memories[1]);
  return results[0]!;
}
function bit(value: number): void {
  call('clk_write', 0); call('di_write', value); call('clk_write', 1);
}
function command(opcode: number, address: number): void {
  call('cs_write', 0); call('cs_write', 1); bit(1);
  const value = (opcode << 9) | address;
  for (let shift = 10; shift >= 0; shift--) bit((value >>> shift) & 1);
}
assert.equal(call('ready_read'), 1);
command(2, 20);
assert.equal(call('do_read'), 0, 'a read starts with MAME\'s dummy zero bit');
let read = 0;
for (let i = 0; i < 8; i++) { bit(0); read = (read << 1) | call('do_read'); }
assert.equal(read, 20);
command(1, 20);
for (let i = 7; i >= 0; i--) bit((0xa5 >>> i) & 1);
assert.equal(memories[0]![20], 20, 'locked writes must leave NVRAM untouched');
command(0, 3 << 7);
command(1, 20);
for (let i = 7; i >= 0; i--) bit((0xa5 >>> i) & 1);
assert.equal(memories[0]![20], 0xa5);
assert.equal(call('ready_read'), 0, 'source write latency drives the busy pin');
time += 0.002;
assert.equal(call('ready_read'), 1);
const saved = devices.map(device => captureState(device));
call('di_write', 1);
devices.forEach((device, index) => assert.deepEqual(restoreState(device, saved[index]), []));
assert.deepEqual(captureState(devices[0]!), saved[0]);
assert.deepEqual(captureState(devices[1]!), saved[1]);
// A save made by the handwritten EEPROM that preceded this device has no
// generated members, so it is refused rather than restored into half a device.
const handwritten = { data: memories[0]!.slice(), state: 'read', cs: 1, clk: 1, di: 0,
  bits: 0, accumulator: 0, address: 20, shift: 0, locked: false };
assert.notDeepEqual(restoreState(devices[0]!, handwritten), []);

console.log('serial-eeprom.spec: source protocol, compiled/interpreted execution, NVRAM and save state passed');
