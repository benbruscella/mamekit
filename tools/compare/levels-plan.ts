/**
 * `mamekit levels`: each sound chip's level over time, where one whole-run
 * figure hides when a sound stopped (TMNT's title sample, #255). Pure: WAV
 * windows and the table; levels.ts runs the sides.
 */

import { readFileSync } from 'node:fs';

/** A PCM16 WAV's samples as -1..1 (channels averaged), and its rate. */
export function readPcm16Wav(path: string): { rate: number; samples: Float32Array } {
  const bytes = readFileSync(path);
  if (bytes.toString('ascii', 0, 4) !== 'RIFF') throw new Error(`${path}: not a WAV`);
  let offset = 12;
  let format: { channels: number; rate: number; bits: number; codec: number } | undefined;
  let data: Buffer | undefined;
  while (offset + 8 <= bytes.length) {
    const id = bytes.toString('ascii', offset, offset + 4);
    const size = bytes.readUInt32LE(offset + 4);
    if (id === 'fmt ') {
      format = { codec: bytes.readUInt16LE(offset + 8), channels: bytes.readUInt16LE(offset + 10),
        rate: bytes.readUInt32LE(offset + 12), bits: bytes.readUInt16LE(offset + 22) };
    }
    if (id === 'data') data = bytes.subarray(offset + 8, offset + 8 + size);
    offset += 8 + size + (size & 1);
  }
  if (!format || !data) throw new Error(`${path}: no fmt or data chunk`);
  if (format.codec !== 1 || format.bits !== 16) throw new Error(`${path}: PCM16 expected, not codec ${format.codec} at ${format.bits} bits`);
  const count = Math.floor(data.length / 2 / format.channels);
  const samples = new Float32Array(count);
  for (let index = 0; index < count; index++) {
    let sum = 0;
    for (let channel = 0; channel < format.channels; channel++) sum += data.readInt16LE((index * format.channels + channel) * 2);
    samples[index] = sum / format.channels / 32768;
  }
  return { rate: format.rate, samples };
}

/**
 * RMS per window of `seconds`, DC removed per window: MAME's -wavwrite keeps a
 * board's DC bias and the browser's output is AC-coupled, and a bias would
 * read as level.
 */
export function windowRms(samples: Float32Array, rate: number, seconds: number): number[] {
  const size = Math.max(1, Math.round(rate * seconds));
  const out: number[] = [];
  for (let start = 0; start < samples.length; start += size) {
    const end = Math.min(samples.length, start + size);
    let mean = 0;
    for (let index = start; index < end; index++) mean += samples[index]!;
    mean /= end - start;
    let squares = 0;
    for (let index = start; index < end; index++) squares += (samples[index]! - mean) ** 2;
    out.push(Math.sqrt(squares / (end - start)));
  }
  return out;
}

/** dBFS, silence clamped at -80 as the comparison's audio is. */
export function dbfs(rms: number): number {
  return 20 * Math.log10(Math.max(rms, 1e-4));
}

export interface LevelSeries {
  /** `ym2151`, `ym2151 (main)`, `mix (MAME)`. */
  label: string;
  rms: number[];
  /** Ours, when this row is another run's: a window more than FLAG_DB from it is marked. */
  against?: number[];
}

/** A window this far from the series it is set against is marked with `*`. */
export const FLAG_DB = 3;

/** Rows of series, columns of windows, in dBFS; `*` beside a window that moved past FLAG_DB. */
export function levelsTable(series: readonly LevelSeries[], window: number, refresh: number): string {
  const windows = Math.max(0, ...series.map(entry => entry.rms.length));
  const width = Math.max(14, ...series.map(entry => entry.label.length + 2));
  const header = `${'frames'.padEnd(width)}${Array.from({ length: windows }, (_, index) =>
    `${index * window + 1}-`.padStart(8)).join('')}`;
  const lines = [`levels in dBFS per ${window} frames (${(window / refresh).toFixed(1)} s); * = more than ${FLAG_DB} dB from ours`, header];
  for (const entry of series) {
    const cells = Array.from({ length: windows }, (_, index) => {
      const value = entry.rms[index];
      if (value === undefined) return '-'.padStart(8);
      const moved = entry.against?.[index] !== undefined && Math.abs(dbfs(value) - dbfs(entry.against[index]!)) > FLAG_DB;
      return `${dbfs(value).toFixed(1)}${moved ? '*' : ' '}`.padStart(8);
    });
    lines.push(`${entry.label.padEnd(width)}${cells.join('')}`);
  }
  return lines.join('\n');
}
