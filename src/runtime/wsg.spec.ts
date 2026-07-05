// Self-test for the Namco WSG core. Run with: node src/runtime/wsg.spec.ts
// (plain Node, no DOM). Exit code 0 = all PASS.

import { NamcoWSG } from './wsg.ts';

const CLOCK = 96000; // Galaga: 18.432 MHz / 6 / 32

let failures = 0;
function check(name: string, cond: boolean, detail: string = ''): void {
  if (cond) {
    console.log(`PASS  ${name}${detail ? `  (${detail})` : ''}`);
  } else {
    console.error(`FAIL  ${name}${detail ? `  (${detail})` : ''}`);
    failures++;
  }
}

/** Synthetic 8-waveform PROM: wf0 = square 15/0, wf1 = ramp 0..15, rest = center (8). */
function makeProm(): Uint8Array {
  const prom = new Uint8Array(0x100).fill(0x08);
  for (let i = 0; i < 32; i++) {
    prom[i] = i < 16 ? 0x0f : 0x00;              // waveform 0: square
    prom[32 + i] = Math.round((i * 15) / 31);    // waveform 1: ramp
  }
  return prom;
}

// pacman_sound_w helpers (voice 0 register slots; ch N adds N*5 to 0x11..0x15)
function setVoice0Freq(wsg: NamcoWSG, freq: number): void {
  wsg.write(0x10, freq & 0x0f);
  wsg.write(0x11, (freq >> 4) & 0x0f);
  wsg.write(0x12, (freq >> 8) & 0x0f);
  wsg.write(0x13, (freq >> 12) & 0x0f);
  wsg.write(0x14, (freq >> 16) & 0x0f);
}

// ---------------------------------------------------------------------------
// (a) silence when volume 0
{
  const wsg = new NamcoWSG(makeProm(), CLOCK);
  wsg.write(0x05, 0);          // voice 0: waveform 0 (square)
  setVoice0Freq(wsg, 0x2000);
  wsg.write(0x15, 0);          // volume 0
  const out = new Float32Array(4096);
  wsg.render(out);
  let maxAbs = 0;
  for (const s of out) maxAbs = Math.max(maxAbs, Math.abs(s));
  check('silence at volume 0', maxAbs === 0, `maxAbs=${maxAbs}`);
}

// ---------------------------------------------------------------------------
// (b) nonzero output when volume 15
{
  const wsg = new NamcoWSG(makeProm(), CLOCK);
  wsg.write(0x05, 0);
  setVoice0Freq(wsg, 0x2000);
  wsg.write(0x15, 15);
  const out = new Float32Array(4096);
  wsg.render(out);
  let maxAbs = 0;
  for (const s of out) maxAbs = Math.max(maxAbs, Math.abs(s));
  // one voice, sample in [-8,7], volume 15, MIX_RES = 384 -> peak 8*15/384 = 0.3125
  check('nonzero at volume 15', maxAbs > 0.25 && maxAbs <= 0.3125 + 1e-6, `maxAbs=${maxAbs.toFixed(4)}`);
}

// ---------------------------------------------------------------------------
// (c) measured period matches programmed frequency within 1%
// freq register F -> tone = F * clock / 2^20 Hz; F = 0x2000 @ 96 kHz -> 750 Hz,
// i.e. a period of exactly 128 output samples.
{
  const wsg = new NamcoWSG(makeProm(), CLOCK);
  wsg.write(0x05, 0);          // square wave -> clean zero crossings
  setVoice0Freq(wsg, 0x2000);
  wsg.write(0x15, 15);
  const out = new Float32Array(CLOCK); // 1 second
  wsg.render(out);

  let crossings = 0;
  let first = -1;
  let last = -1;
  for (let i = 1; i < out.length; i++) {
    if (out[i - 1] <= 0 && out[i] > 0) {
      crossings++;
      if (first < 0) first = i;
      last = i;
    }
  }
  const expectedPeriod = (1 << 20) / 0x2000; // 128 samples
  const measuredPeriod = crossings > 1 ? (last - first) / (crossings - 1) : NaN;
  const err = Math.abs(measuredPeriod - expectedPeriod) / expectedPeriod;
  check(
    'period matches programmed frequency (<1% error)',
    Number.isFinite(measuredPeriod) && err < 0.01,
    `expected=${expectedPeriod}, measured=${measuredPeriod.toFixed(3)}, err=${(err * 100).toFixed(4)}%`,
  );
}

// ---------------------------------------------------------------------------
// (d) mixing multiple voices at full volume never leaves [-1, 1]
{
  const wsg = new NamcoWSG(makeProm(), CLOCK);
  // voice 0: square, full volume
  wsg.write(0x05, 0);
  setVoice0Freq(wsg, 0x2000);
  wsg.write(0x15, 15);
  // voice 1: square, full volume, different pitch (regs 0x16..0x19 = freq bits 4..19)
  wsg.write(0x0a, 0);
  wsg.write(0x18, 0x3);        // freq = 0x3000
  wsg.write(0x1a, 15);
  // voice 2: ramp, full volume
  wsg.write(0x0f, 1);
  wsg.write(0x1d, 0x5);        // freq = 0x5000
  wsg.write(0x1f, 15);

  const out = new Float32Array(CLOCK);
  wsg.render(out);
  let maxAbs = 0;
  for (const s of out) maxAbs = Math.max(maxAbs, Math.abs(s));
  check('3-voice full-volume mix stays in [-1, 1]', maxAbs <= 1, `maxAbs=${maxAbs.toFixed(4)}`);
  check('3-voice mix actually sums voices', maxAbs > 0.4, `maxAbs=${maxAbs.toFixed(4)}`);
}

// ---------------------------------------------------------------------------
// (e) soundEnable(false) silences output (namco.cpp m_sound_enable)
{
  const wsg = new NamcoWSG(makeProm(), CLOCK);
  wsg.write(0x05, 0);
  setVoice0Freq(wsg, 0x2000);
  wsg.write(0x15, 15);
  wsg.soundEnable(false);
  const out = new Float32Array(1024).fill(0.5); // ensure render() overwrites
  wsg.render(out);
  let maxAbs = 0;
  for (const s of out) maxAbs = Math.max(maxAbs, Math.abs(s));
  check('soundEnable(false) mutes output', maxAbs === 0, `maxAbs=${maxAbs}`);
}

// ---------------------------------------------------------------------------
console.log(failures === 0 ? '\nAll WSG tests passed.' : `\n${failures} WSG test(s) FAILED.`);
process.exitCode = failures === 0 ? 0 : 1;
