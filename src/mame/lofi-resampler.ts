import { readFileSync } from 'node:fs';

/**
 * MAME's default stream resampler, `audio_resampler_lofi` in
 * src/emu/resampler.cpp, as emitted worklet source.
 *
 * A device stream runs at its own rate (a POKEY at its 1.79 MHz clock) and
 * MAME's sound manager brings it to the output rate. LOFI averages each group
 * of `1 + fs / ft` source samples, then interpolates between four of those
 * averages with the cubic functions f0 and f1, stepping a 24-bit phase. Taking
 * one source sample per output sample instead aliases every square-wave edge
 * back into the audible band (Gauntlet's POKEY ran 6-9 dB bright above 4 kHz,
 * #194).
 *
 * MAME's `apply` recomputes the phase from the absolute output index on each
 * update; streaming it here accumulates the same integer step, which drifts by
 * under 1/2^24 of a group per sample.
 */
const INTERPOLATION_SOURCE = readFileSync(new URL('../hardware/speaker/lofi-interpolation.ts', import.meta.url), 'utf8')
  .replace(/^(?:\/\/.*\n)+/, '').replace('export const', 'const');

export const LOFI_RESAMPLER_SOURCE = `// audio_resampler_lofi in src/emu/resampler.cpp.
${INTERPOLATION_SOURCE}
/** A source the resampler pulls one sample at a time, at the source rate. */
interface GeneratedLofiSource {
  next(): number;
}

class GeneratedLofiResampler {
  private divide = 1;
  private step = 0;
  private readonly targetRate: number;
  private phase = 0;
  private s0 = 0;
  private s1 = 0;
  private s2 = 0;
  private s3 = 0;

  constructor(sourceRate: number, targetRate: number) {
    this.targetRate = targetRate;
    this.setSourceRate(sourceRate);
  }

  /** The stream changed rate (set_sample_rate). What it already rendered stays in the window. */
  setSourceRate(sourceRate: number): void {
    // Both rates are u32 in MAME.
    const fs = Math.max(1, Math.floor(sourceRate));
    const ft = Math.max(1, Math.floor(this.targetRate));
    this.divide = fs <= ft ? 1 : 1 + Math.floor(fs / ft);
    this.step = Math.floor(Math.floor(fs * 0x1000000 / ft) / this.divide);
  }

  /** One output sample. The four-group window starts on silence, MAME's history. */
  sample(source: GeneratedLofiSource): number {
    const { f0, f1 } = LOFI_INTERPOLATION;
    const cphase = this.phase >>> 12;
    const out = -this.s0 * f0[0x1000 - cphase]! + this.s1 * f1[0x1000 - cphase]! +
      this.s2 * f1[cphase]! - this.s3 * f0[cphase]!;
    this.phase += this.step;
    if (this.phase >= 0x1000000) {
      this.phase -= 0x1000000;
      this.s0 = this.s1;
      this.s1 = this.s2;
      this.s2 = this.s3;
      let sum = 0;
      for (let i = 0; i < this.divide; i++) sum += source.next();
      this.s3 = sum / this.divide;
    }
    return out;
  }
}
`;
