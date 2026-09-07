import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileSid } from './sid-compiler.ts';
import { generatedDeviceMethodsSource } from './device-codegen.ts';
import { createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

const definition = compileSid(process.env.MAME_SRC ?? '../mame', {
  type: 'MOS6581', className: 'mos6581_device', sourceFile: 'src/devices/sound/mos6581.cpp',
  sourceLine: 1, sourceColumn: 1, macro: 'DEFINE_DEVICE_TYPE',
});
assert.equal(definition.summary.diagnostics, 0);
const emitted = generatedDeviceMethodsSource(definition);
assert.deepEqual(new Set(emitted.methods), new Set(definition.methods.map(method => method.name)),
  'every SID oscillator, envelope and mixer helper must have executable output');
assert.ok(definition.sourceFiles.includes('src/devices/sound/sidw6581.h'));
assert.ok(definition.structs?.sidOperator.some(field => field.name === 'modulator' && field.valueType === 'sidOperator *'));
registerGeneratedDevice({ ...definition, compiledMethods: Function(`return ${emitted.source}`)() });
const sid = createDevice('MOS6581', { clock: 985248 });
sid.reset();
assert.equal(sid.get('PCMfreq'), 48000);
assert.equal(sid.get('PCMsid'), 817364);
let updates = 0;
sid.bindCall('stream.update', () => { updates++; return 0; });
// Sawtooth, approximately 481 Hz, fast attack and sustained maximum envelope.
for (const [offset, value] of [[24, 15], [0, 0], [1, 32], [5, 9], [6, 240], [4, 33]]) {
  sid.invoke('write', offset, value);
}
assert.equal(updates, 6, 'register writes flush elapsed samples before changing chip state');
assert.equal(sid.invoke('read', 1), 32);
const pcm = new Float32Array(48000);
sid.invoke('sound_stream_update', { samples: () => pcm.length,
  put: (_channel: number, index: number, value: number) => { pcm[index] = value; } });
// Independently checked against native MAME sid.cpp/sidvoice.cpp/sidenvel.cpp.
assert.deepEqual(Array.from(pcm.slice(0, 8)), [
  -0.44140625, -0.443359375, -0.4443359375, -0.447265625,
  -0.4482421875, -0.44921875, -0.4501953125, -0.451171875,
]);
assert.ok(pcm.every(Number.isFinite));
assert.equal(Math.min(...pcm), -0.52734375);
assert.equal(Math.max(...pcm), -0.35546875);
// The other voices retain independent state while the first oscillator runs.
assert.equal(sid.invoke('read', 27), 0);
assert.equal(sid.invoke('read', 28), 0);
console.log('sid-compiler.spec: source-generated SID waveform, envelope, independent voices and stream flush passed');

// Native C++ reference catches missing host math, incorrect sizeof(array),
// and silent waveform/envelope lookup failures across all three voices.
const reference = JSON.parse(readFileSync(new URL('./fixtures/sid-native.json', import.meta.url), 'utf8'));
for (const entry of reference.cases) {
  const chip = createDevice('MOS6581', { clock: reference.clock });
  chip.reset();
  for (const [offset, value] of [[24, 15 | entry.filter], [23, entry.filter ? 0x57 : 0], [21, 7], [22, 0x20]]) chip.invoke('write', offset, value);
  for (let voice = 0; voice < 3; voice++) {
    for (const [offset, value] of [[0, 0x31 + voice * 3], [1, 0x20 + voice * 7], [2, 0], [3, 8], [5, 9], [6, 0xf0], [4, entry.mode]]) chip.invoke('write', voice * 7 + offset, value);
  }
  const samples = new Float32Array(reference.frames);
  chip.invoke('sound_stream_update', { samples: () => samples.length,
    put: (_channel: number, index: number, value: number) => { samples[index] = value; } });
  for (let index = 0; index < entry.samples.length; index++) {
    // JS intermediates are double precision; MAME's float filter can differ
    // by one quantisation step per voice (the mix has three voices).
    assert.ok(Math.abs(samples[index * reference.stride]! - entry.samples[index]) <= 3 / 1024,
      `SID native comparison: mode ${entry.mode}, filter ${entry.filter}, sample ${index * reference.stride}`);
  }
}
console.log('sid-compiler.spec: 36 native waveform/filter comparisons passed');

sid.invoke('write', 4, 0x20);
const released = new Float32Array(4800);
sid.invoke('sound_stream_update', { samples: () => released.length,
  put: (_channel: number, index: number, value: number) => { released[index] = value; } });
assert.ok(released.slice(-64).every(value => value === -0.44140625),
  'gate off must traverse the release table and settle at the silent mixer level');
