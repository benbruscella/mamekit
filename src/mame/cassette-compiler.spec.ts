import assert from 'node:assert/strict';
import ts from 'typescript';
import { compileCbmTapeFormat, compileDatassetteOptions, compileWavTapeFormat } from './cassette-compiler.ts';
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

// A .wav tape: MAME's wavfile.cpp walks the RIFF chunks and picks the waveform
// flags, compiled; the cassette image it fills is the host's. An 8-bit file is
// unsigned, so 0x00 is the most negative sample and 0xff the most positive.
{
  const wav = compileWavTapeFormat(source);
  assert.equal(wav.summary.diagnostics, 0);
  assert.equal(wav.extension, 'wav');
  const riff = (rate: number, bits: number, samples: number[]): Uint8Array => {
    const bytesPerSample = bits / 8;
    const data = samples.length * bytesPerSample;
    const file = new Uint8Array(44 + data);
    const view = new DataView(file.buffer);
    file.set([...'RIFF'].map(character => character.charCodeAt(0)), 0);
    view.setUint32(4, 36 + data, true);
    file.set([...'WAVEfmt '].map(character => character.charCodeAt(0)), 8);
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, rate, true);
    view.setUint32(28, rate * bytesPerSample, true);
    view.setUint16(32, bytesPerSample, true);
    view.setUint16(34, bits, true);
    file.set([...'data'].map(character => character.charCodeAt(0)), 36);
    view.setUint32(40, data, true);
    samples.forEach((sample, index) => bits === 8
      ? view.setUint8(44 + index, sample)
      : view.setInt16(44 + index * 2, sample, true));
    return file;
  };
  for (const implementation of [port, emittedPort.default]) {
    registerGeneratedDevice(implementation);
    const device = createDevice(port.type, { slot: 'c1530', calls: { 'machine().time': () => 0 } });
    const cassette = device.findDevice!('cassette')!;
    cassette.mountImage!('wav', riff(1000, 8, [...Array(10).fill(0x00), ...Array(10).fill(0xff)]));
    assert.equal(cassette.invoke('get_length'), 0.02, 'twenty samples at 1 kHz');
    const sample = (time: number): number => {
      const image = (cassette.instance!() as { m_cassette: { get_sample(channel: number, time: number, period: number, out: unknown): number } }).m_cassette;
      let value = 0;
      image.get_sample(0, time, 0, { generatedPointer: true, target: { get: () => value, set: (next: number) => { value = next; } }, offset: 0 });
      return value;
    };
    assert.equal(sample(0.005), -0x80000000, 'unsigned 8-bit, extrapolated to the top byte');
    assert.equal(sample(0.015), 0x7f000000);
    assert.equal(sample(0.0094), -0x80000000, 'the time rounds to the nearest sample, as compute_manipulation_ranges does');
    assert.equal(sample(0.0096), 0x7f000000);
    cassette.mountImage!('wav', riff(2000, 16, [1000, -1000]));
    assert.equal(cassette.invoke('get_length'), 0.001);
    assert.equal(sample(0.0005), -1000 * 65536, '16-bit little-endian, extrapolated to 32 bits');
    assert.throws(() => cassette.mountImage!('wav', new Uint8Array(44)), /WAV|cassette/i);
  }
  console.log('cassette-compiler.spec: MAME WAV tapes passed in IR and generated code');
}
