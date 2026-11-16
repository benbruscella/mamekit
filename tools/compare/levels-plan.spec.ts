import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { dbfs, FLAG_DB, levelsTable, readPcm16Wav, windowRms } from './levels-plan.ts';

// --- a PCM16 WAV, windowed ----------------------------------------------------
const scratch = mkdtempSync(join(tmpdir(), 'mamekit-levels-spec-'));
try {
  const rate = 1000;
  // One second of a half-scale square wave on a DC bias, then one of silence.
  const samples = Array.from({ length: rate * 2 }, (_, index) => index < rate ? 0.25 + (index % 2 ? 0.5 : -0.5) : 0.25);
  const body = Buffer.alloc(samples.length * 2);
  samples.forEach((value, index) => body.writeInt16LE(Math.round(value * 32767), index * 2));
  const header = Buffer.alloc(44);
  header.write('RIFF', 0); header.writeUInt32LE(36 + body.length, 4); header.write('WAVE', 8);
  header.write('fmt ', 12); header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22);
  header.writeUInt32LE(rate, 24); header.writeUInt32LE(rate * 2, 28); header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34);
  header.write('data', 36); header.writeUInt32LE(body.length, 40);
  const path = join(scratch, 'square.wav');
  writeFileSync(path, Buffer.concat([header, body]));

  const wav = readPcm16Wav(path);
  assert.equal(wav.rate, rate);
  assert.equal(wav.samples.length, rate * 2);
  const windows = windowRms(wav.samples, wav.rate, 1);
  assert.equal(windows.length, 2);
  assert.ok(Math.abs(windows[0]! - 0.5) < 1e-3, 'the bias is removed: a half-scale square is 0.5 RMS');
  assert.ok(windows[1]! < 1e-6, 'a constant bias is silence');
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

// --- dBFS and the table ------------------------------------------------------
assert.equal(dbfs(0), -80, 'silence is clamped at -80 dBFS');
assert.equal(Math.round(dbfs(0.5)), -6);
const table = levelsTable([
  { label: 'samples', rms: [0, 0.05, 0.05] },
  { label: '  main', rms: [0, 0.05, 0.001], against: [0, 0.05, 0.05] },
], 300, 60);
const lines = table.split('\n');
assert.match(lines[0]!, new RegExp(`per 300 frames \\(5\\.0 s\\); \\* = more than ${FLAG_DB} dB from ours`));
assert.match(lines[1]!, /frames\s+1-\s+301-\s+601-/);
assert.match(lines[2]!, /^samples\s+-80\.0\s+-26\.0\s+-26\.0\s*$/);
assert.match(lines[3]!, /^ {2}main\s+-80\.0\s+-26\.0\s+-60\.0\*$/, 'the window that stopped is marked');

console.log('levels-plan.spec: ok');
