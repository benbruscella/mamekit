import assert from 'node:assert/strict';
import ts from 'typescript';
import { compileCbmTapeFormat, compileDatassetteOptions } from './cassette-compiler.ts';
import { compileMameDevice } from './device-compiler.ts';
import { indexMameHardware } from './hardware.ts';
import { generatedDeviceExecutableSource } from './device-codegen.ts';
import { createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

const definition = compileCbmTapeFormat(process.env.MAME_SRC ?? '../mame');
assert.equal(definition.summary.diagnostics, 0);
const js = ts.transpileModule(generatedDeviceExecutableSource(definition, 'tap.json')
  .replace("import deviceData from './tap.json' with { type: 'json' };", `const deviceData = ${JSON.stringify(definition)};`), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const emitted = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
for (const implementation of [definition, emitted.default]) {
  registerGeneratedDevice(implementation);
  const decoder = createDevice(definition.type);
  const tape = new Uint8Array(22);
  tape[12] = 1; tape[20] = 48; tape[21] = 64;
  const count = Number(decoder.invoke('cbm_tap_to_wav_size', tape, tape.length));
  assert.equal(count, 38, 'MAME truncates half-pulse sample counts before summing');
  const pcm = new Int16Array(count);
  assert.equal(decoder.invoke('cbm_tap_fill_wave', pcm, count, tape, 0), count);
  assert.deepEqual(Array.from(pcm), [
    ...Array(8).fill(-11599), ...Array(8).fill(11599),
    ...Array(11).fill(-11599), ...Array(11).fill(11599),
  ], 'the source decoder writes consecutive alternating half-pulses through its pointer-to-pointer');
  tape[12] = 2;
  assert.equal(decoder.invoke('cbm_tap_to_wav_size', tape, tape.length), 19,
    'TAP v2 stores individual half-waves');
}
console.log('cassette-compiler.spec: MAME TAP waveforms passed in IR and generated code');

const source = process.env.MAME_SRC ?? '../mame';
const port = compileMameDevice(source, indexMameHardware(source).get('PET_DATASSETTE_PORT')!, 'PET_DATASSETTE_PORT');
port.slot = { member: 'm_cart', options: compileDatassetteOptions(source) };
const portJs = ts.transpileModule(generatedDeviceExecutableSource(port, 'port.json')
  .replace("import deviceData from './port.json' with { type: 'json' };", `const deviceData = ${JSON.stringify(port)};`), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const emittedPort = await import(`data:text/javascript;base64,${Buffer.from(portJs).toString('base64')}`);
for (const implementation of [port, emittedPort.default]) {
  registerGeneratedDevice(implementation);
  let time = 0;
  const pcm = new Int16Array(44100).fill(100);
  const device = createDevice(port.type, { slot: 'c1530',
    regions: { 'cassette:pcm': new Uint8Array(pcm.buffer) },
    calls: { 'machine().time': () => ({ as_double: () => time, valueOf: () => time }) } });
  const cassette = device.findDevice!('cassette')!;
  assert.equal(device.call('sense_r'), 1);
  cassette.call('change_state', 1, 3);
  assert.equal(device.call('sense_r'), 0, 'Play closes the source cassette sense switch');
  device.call('motor_w', 0);
  time = 0.01; device.tick(0.01);
  assert.equal(device.call('read'), 1);
  assert.equal(cassette.get('m_position'), 0.01);
  device.call('motor_w', 1);
  time = 0.02; device.tick(0.01);
  assert.equal(cassette.invoke('get_position'), 0.01, 'motor-off pauses transport while machine time advances');
  cassette.call('seek', 0, cassette.constant('SEEK_SET')!);
  assert.equal(cassette.invoke('get_position'), 0, 'rewind uses the source seek implementation');
}
console.log('cassette-compiler.spec: Datassette Play, sense, sample reads and motor pause passed in IR and generated code');
