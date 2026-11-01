import assert from 'node:assert/strict';
import { indexMameHardware } from './hardware.ts';
import { compileMameDevice } from './device-compiler.ts';
import { clearGeneratedDevices, createDevice, registerGeneratedDevice } from '../runtime/generated-device.ts';

// samples_device compiled whole from samples.cpp (#228): the driver's `start`
// and `playing`, its own WAV reader and its sample path are MAME's source.
const mameSrc = process.env.MAME_SRC ?? '../mame';
const definition = compileMameDevice(mameSrc, indexMameHardware(mameSrc).get('SAMPLES')!, 'SAMPLES');
assert.equal(definition.summary.diagnostics, 0, 'samples.cpp and samples_iterator lower whole');

function wav(rate: number, bits: 8 | 16, data: readonly number[]): Uint8Array {
  const bytes = bits === 8
    ? Uint8Array.from(data)
    : new Uint8Array(Int16Array.from(data).buffer);
  const header = new DataView(new ArrayBuffer(44));
  const tag = (at: number, text: string) => [...text].forEach((c, i) => header.setUint8(at + i, c.charCodeAt(0)));
  tag(0, 'RIFF');
  header.setUint32(4, 36 + bytes.length, true);
  tag(8, 'WAVE');
  tag(12, 'fmt ');
  header.setUint32(16, 16, true);
  header.setUint16(20, 1, true);
  header.setUint16(22, 1, true);
  header.setUint32(24, rate, true);
  header.setUint32(28, rate * bits / 8, true);
  header.setUint16(32, bits / 8, true);
  header.setUint16(34, bits, true);
  tag(36, 'data');
  header.setUint32(40, bytes.length, true);
  const file = new Uint8Array(44 + bytes.length);
  file.set(new Uint8Array(header.buffer));
  file.set(bytes, 44);
  return file;
}

clearGeneratedDevices();
registerGeneratedDevice(definition as never);

interface SamplesDevice {
  invoke(method: string, ...args: unknown[]): unknown;
  call(method: string, ...args: number[]): number;
  streams(): { rate: number; samples: () => number; put: (c: number, i: number, v: number) => number }[];
}

const build = (machineName: string, names: readonly (string | number)[] | undefined, samplePath: object): SamplesDevice =>
  createDevice('SAMPLES', {
    clock: 0, machineName, samplePath,
    configure: (device: SamplesDevice) => {
      device.invoke('set_channels', 3);
      if (names) device.invoke('set_samples_names', names);
    },
  } as never) as unknown as SamplesDevice;

const render = (device: SamplesDevice, channel: number, count: number): number[] => {
  const stream = device.streams()[channel]!;
  const output = new Array<number>(count).fill(0);
  stream.samples = () => count;
  stream.put = (_c, index, value) => { output[index] = value; return 0; };
  device.invoke('sound_stream_update', stream);
  return output;
};

const sixteen = [1000, -2000, 3000, -4000];
const device = build('game', ['*game', 'tone', 'gone', 'byte', 0], {
  game: { 'tone.wav': wav(22050, 16, sixteen), 'byte.wav': wav(11025, 8, [0x80, 0xc0, 0x40]) },
});
assert.equal(device.streams().length, 3, 'one stream a channel');

// Starting a sample moves its channel's stream, and only its, to the recording's rate.
assert.equal(device.call('playing', 1), 0);
device.invoke('start', 1, 0, 0);
assert.deepEqual(device.streams().map(stream => stream.rate), [48000, 22050, 48000]);
assert.equal(device.call('playing', 1), 1, 'a one-shot counts as playing, which zaxxon_a.cpp reads back');
assert.equal(device.call('base_frequency', 1), 22050);
// The other channels' streams are handed nothing.
assert.deepEqual(render(device, 0, 2), [0, 0]);
assert.deepEqual(render(device, 1, 2), sixteen.slice(0, 2).map(value => value / 32768), 'signed, scaled as MAME scales them');
assert.deepEqual(render(device, 1, 4), [...sixteen.slice(2).map(value => value / 32768), 0, 0], 'it ends, and the rest is silence');
assert.equal(device.call('playing', 1), 0, 'and is no longer playing');

// A looping sample wraps, and stop ends it.
device.invoke('start', 2, 0, 1);
assert.deepEqual(render(device, 2, 6), [...sixteen, ...sixteen.slice(0, 2)].map(value => value / 32768));
assert.equal(device.call('playing', 2), 1);
device.invoke('stop', 2);
assert.equal(device.call('playing', 2), 0);

// An 8-bit file is unsigned and scales up, read into the same 16-bit storage.
device.invoke('start', 0, 2, 0);
assert.equal(device.streams()[0]!.rate, 11025);
assert.deepEqual(render(device, 0, 3), [0, 0.5, -0.5], '0x80 is zero; 0xc0 up, 0x40 down');

// A sample that is not in the set stays empty and the machine keeps running.
device.invoke('start', 0, 1, 0);
assert.equal(device.call('playing', 0), 0);
assert.deepEqual(render(device, 0, 2), [0, 0]);

// A clone finds its parent's set through the table's `*set`.
const clone = build('gameb', ['*game', 'tone', 0], { game: { 'tone.wav': wav(44100, 16, [500]) } });
clone.invoke('start', 0, 0, 0);
assert.equal(clone.streams()[0]!.rate, 44100);

// No set at all: every sample empty, as MAME runs without one.
const none = build('game', ['*game', 'tone', 0], {});
none.invoke('start', 0, 0, 0);
assert.equal(none.call('playing', 0), 0);

// start_raw takes no set: tmnt has no names and hands over what it decoded.
const raw = build('tmnt', undefined, {});
const decoded = Int16Array.from([100, 200, 300]);
raw.invoke('start_raw', 0, decoded, 3, 20000, 0);
assert.equal(raw.streams()[0]!.rate, 20000);
assert.equal(raw.call('playing', 0), 1);
assert.deepEqual(render(raw, 0, 3), [...decoded].map(value => value / 32768));
raw.invoke('stop_all');
assert.equal(raw.call('playing', 0), 0);

console.log('samples-device.spec: samples.cpp loads, plays and reports as MAME source says');
