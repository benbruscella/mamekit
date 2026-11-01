import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { IrEmuFile, IrFlacDecoder, mameStringFormat, samplePathMembers } from './sample-path.ts';
import { crc32 } from './zip.ts';

const member = (byte: number) => new Uint8Array([byte]);

// A zip may file a set's members in a folder and in any case; the path doesn't care.
assert.deepEqual(Object.keys(samplePathMembers([['zaxxon/ELEC.WAV', member(1)], ['boom.wav', member(2)]])), ['elec.wav', 'boom.wav']);

// emu_file's error condition: 0 opened, anything else is the next name to try.
const path = { zaxxon: { 'elec.wav': new Uint8Array([1, 2, 3, 4, 5, 6]) } };
const file = new IrEmuFile(path);
assert.notEqual(file.open('zaxxon/missing.wav'), 0);
assert.notEqual(file.open('nosuchset/elec.wav'), 0);
assert.equal(file.open('zaxxon/ELEC.wav'), 0, 'members match without regard to case');
assert.equal(file.filename(), 'zaxxon/ELEC.wav');

const buffer = new Uint8Array(2);
assert.equal(file.read(buffer, 2), 2);
assert.deepEqual([...buffer], [1, 2]);
file.seek(1, 1);
assert.equal(file.read(buffer, 2), 2);
assert.deepEqual([...buffer], [4, 5]);
file.seek(0, 0);
assert.equal(file.read(new Uint8Array(16), 16), 6, 'a short read says how much it got');
assert.equal(file.read(buffer, 2), 0);

assert.equal(mameStringFormat('%s/%s.wav', 'qbert', 'knocker'), 'qbert/knocker.wav');
assert.equal(
  mameStringFormat('%s/%s.flac', { generatedPointer: true, source: '*congo', offset: 1 }, 'gorilla'),
  'congo/gorilla.flac',
  'a char pointer into a string is the rest of it',
);

// Real encoder output: both predictor families, and constant and verbatim
// subframes, over several frames each.
const fixture = JSON.parse(readFileSync(new URL('./fixtures/flac-mono16.json', import.meta.url), 'utf8')) as {
  samples: number; rate: number; pcmCrc32: number; fixed: string; lpc: string;
};
for (const encoding of ['fixed', 'lpc'] as const) {
  const flac = new IrEmuFile({ set: { 'x.flac': new Uint8Array(Buffer.from(fixture[encoding], 'base64')) } });
  assert.equal(flac.open('set/x.flac'), 0);
  const decoder = new IrFlacDecoder(flac);
  assert.equal(decoder.sample_rate(), fixture.rate);
  assert.equal(decoder.channels(), 1);
  assert.equal(decoder.bits_per_sample(), 16);
  assert.equal(decoder.total_samples(), fixture.samples);
  const decoded = new Int16Array(fixture.samples);
  assert.equal(decoder.decode_interleaved({ generatedPointer: true, source: decoded, offset: 0 }, decoded.length), 1);
  assert.equal(crc32(new Uint8Array(decoded.buffer)), fixture.pcmCrc32, `${encoding}: decoded as the encoder was given`);
}

console.log('sample-path.spec: the sample path answers as emu_file does, and FLAC decodes bit-exact');
