import assert from 'node:assert/strict';
import * as ts from 'typescript';
import { LOFI_RESAMPLER_SOURCE } from './lofi-resampler.ts';

const javaScript = ts.transpileModule(`${LOFI_RESAMPLER_SOURCE}\nexport { GeneratedLofiResampler };`, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const { GeneratedLofiResampler } = await import(
  `data:text/javascript;base64,${Buffer.from(javaScript).toString('base64')}`
) as {
  GeneratedLofiResampler: new (sourceRate: number, targetRate: number) => {
    sample(source: { next(): number }): number;
  };
};

/** A tone's amplitude in `samples` at `frequency`, by Goertzel. */
const level = (samples: readonly number[], frequency: number, rate: number): number => {
  const coefficient = 2 * Math.cos(2 * Math.PI * frequency / rate);
  let s1 = 0;
  let s2 = 0;
  for (const value of samples) {
    const s = value + coefficient * s1 - s2;
    s2 = s1;
    s1 = s;
  }
  return Math.sqrt(s1 * s1 + s2 * s2 - coefficient * s1 * s2) / samples.length;
};
const decibels = (ratio: number): number => 20 * Math.log10(ratio);

// MAME's f0/f1 tables add to one, so a constant passes through unchanged once
// the four-group window has filled.
{
  const resampler = new GeneratedLofiResampler(8_135, 48_000);
  const constant = { next: () => 0.5 };
  const samples = Array.from({ length: 100 }, () => resampler.sample(constant));
  assert.ok(samples.slice(50).every(value => Math.abs(value - 0.5) < 1e-6));
}

// Up: the TMS5220's 8,135 Hz stream (clock / 80) to 48 kHz. Interpolation
// keeps the images of a 3 kHz tone at 5.1 and 11.1 kHz down by 13 and 29 dB;
// holding each sample left them at -5 and -11 dB, and Gauntlet's speech ran
// 8-11 dB bright against MAME (#194).
{
  const rate = 8_135;
  const tone = 3_000;
  let index = 0;
  const source = { next: () => Math.sin(2 * Math.PI * tone * index++ / rate) };
  const resampler = new GeneratedLofiResampler(rate, 48_000);
  const samples = Array.from({ length: 48_000 }, () => resampler.sample(source)).slice(4_800);
  const fundamental = level(samples, tone, 48_000);
  assert.ok(fundamental > 0.3, `the tone passes (${fundamental})`);
  const lower = decibels(level(samples, rate - tone, 48_000) / fundamental);
  const upper = decibels(level(samples, rate + tone, 48_000) / fundamental);
  assert.ok(lower < -10, `image at ${rate - tone} Hz is ${lower} dB`);
  assert.ok(upper < -25, `image at ${rate + tone} Hz is ${upper} dB`);
}

// Down: a source above the target averages groups of 1 + fs / ft samples
// (38 for a 1.79 MHz POKEY at 48 kHz), so it reads that many per group and
// the long-run rates agree.
{
  let read = 0;
  const source = { next: () => (read++, 0) };
  const resampler = new GeneratedLofiResampler(1_789_772, 48_000);
  for (let index = 0; index < 48_000; index++) resampler.sample(source);
  assert.equal(read % 38, 0, 'whole groups of 38');
  assert.ok(Math.abs(read - 1_789_772) < 38 * 2, `one second reads ${read} source samples`);
}

console.log('lofi-resampler.spec: unity gain, interpolated images and decimation passed');
