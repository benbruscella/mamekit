/**
 * Ours against MAME, left and right apart: a stereo board's two channels as
 * the browser plays them (`<capture>.stereo.wav`) beside MAME's -wavwrite,
 * which keeps its speaker's channels. The mono comparison averages them and
 * cannot say whether a sound is on the wrong side. Pure; against.ts reads the
 * files.
 */

import { readFileSync } from 'node:fs';
import { dbfs, windowRms } from './levels-plan.ts';

/** A PCM16 WAV's channels apart, as -1..1, and its rate. */
export function readPcm16WavChannels(path: string): { rate: number; channels: Float32Array[] } {
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
  const channels = Array.from({ length: format.channels }, () => new Float32Array(count));
  for (let index = 0; index < count; index++) {
    for (let channel = 0; channel < format.channels; channel++) {
      channels[channel]![index] = data.readInt16LE((index * format.channels + channel) * 2) / 32768;
    }
  }
  return { rate: format.rate, channels };
}

export interface StereoComparison {
  seconds: number;
  /** Ours over MAME, each side, in dB. */
  leftDb: number;
  rightDb: number;
  /** How wide each is: the side signal (L-R)/2 against the mid (L+R)/2, in dB. */
  width: { ours: number; mame: number };
  /**
   * How each of our channels' loudness over time follows MAME's: against the
   * same side, and against the other. Crossed above same is a swapped pair.
   */
  envelope: { same: number; crossed: number };
}

/** Loudness windows: 50 ms, short enough to follow notes. */
const WINDOW_SECONDS = 0.05;

const meanSquare = (windows: readonly number[]) =>
  Math.sqrt(windows.reduce((sum, value) => sum + value * value, 0) / Math.max(1, windows.length));

function correlation(a: readonly number[], b: readonly number[]): number {
  const count = Math.min(a.length, b.length);
  if (count < 2) return 0;
  let meanA = 0;
  let meanB = 0;
  for (let index = 0; index < count; index++) { meanA += a[index]!; meanB += b[index]!; }
  meanA /= count;
  meanB /= count;
  let cross = 0;
  let squaresA = 0;
  let squaresB = 0;
  for (let index = 0; index < count; index++) {
    const x = a[index]! - meanA;
    const y = b[index]! - meanB;
    cross += x * y;
    squaresA += x * x;
    squaresB += y * y;
  }
  return squaresA && squaresB ? cross / Math.sqrt(squaresA * squaresB) : 0;
}

/** Ours (left, right) against MAME's (left, right), over the time both cover. */
export function compareStereo(
  ours: { rate: number; channels: Float32Array[] },
  mame: { rate: number; channels: Float32Array[] },
): StereoComparison {
  if (ours.channels.length !== 2 || mame.channels.length !== 2) {
    throw new Error(`stereo needs two channels a side (ours ${ours.channels.length}, MAME ${mame.channels.length})`);
  }
  const seconds = Math.min(ours.channels[0]!.length / ours.rate, mame.channels[0]!.length / mame.rate);
  const cut = (side: { rate: number; channels: Float32Array[] }) =>
    side.channels.map(channel => channel.subarray(0, Math.floor(seconds * side.rate)));
  const envelopes = (side: { rate: number; channels: Float32Array[] }) => {
    const [left, right] = cut(side) as [Float32Array, Float32Array];
    const mid = left.map((value, index) => (value + right[index]!) / 2);
    const difference = left.map((value, index) => (value - right[index]!) / 2);
    return [left, right, mid, difference].map(channel => windowRms(channel, side.rate, WINDOW_SECONDS));
  };
  const [oursLeft, oursRight, oursMid, oursSide] = envelopes(ours) as number[][];
  const [mameLeft, mameRight, mameMid, mameSide] = envelopes(mame) as number[][];
  const ratio = (a: number[], b: number[]) => dbfs(meanSquare(a)) - dbfs(meanSquare(b));
  return {
    seconds,
    leftDb: ratio(oursLeft!, mameLeft!),
    rightDb: ratio(oursRight!, mameRight!),
    width: { ours: ratio(oursSide!, oursMid!), mame: ratio(mameSide!, mameMid!) },
    envelope: {
      same: (correlation(oursLeft!, mameLeft!) + correlation(oursRight!, mameRight!)) / 2,
      crossed: (correlation(oursLeft!, mameRight!) + correlation(oursRight!, mameLeft!)) / 2,
    },
  };
}
