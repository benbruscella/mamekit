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
export const LOFI_RESAMPLER_SOURCE = `// audio_resampler_lofi in src/emu/resampler.cpp.
const LOFI_INTERPOLATION = (() => {
  const f0 = new Float32Array(0x1001);
  const f1 = new Float32Array(0x1001);
  for (let i = 1; i !== 4096; i++) {
    const p = Math.fround(i / 4096);
    f0[i] = (p - p * p * p) / 6;
  }
  for (let i = 1; i !== 2049; i++) {
    const p = Math.fround(i / 4096);
    f1[i] = p + (p * p - p * p * p) / 2;
  }
  // When interpolating, f1 is added and f0 is subtracted, and the total must be 1.
  for (let i = 2049; i !== 4096; i++) f1[i] = 1 + f0[i]! + f0[4096 - i]! - f1[4096 - i]!;
  f0[0] = 0;
  f0[0x1000] = 0;
  f1[0] = 0;
  f1[0x1000] = 1;
  return { f0, f1 };
})();

/** A source the resampler pulls one sample at a time, at the source rate. */
interface GeneratedLofiSource {
  next(): number;
}

class GeneratedLofiResampler {
  private readonly divide: number;
  private readonly step: number;
  private phase = 0;
  private s0 = 0;
  private s1 = 0;
  private s2 = 0;
  private s3 = 0;

  constructor(sourceRate: number, targetRate: number) {
    // Both rates are u32 in MAME.
    const fs = Math.max(1, Math.floor(sourceRate));
    const ft = Math.max(1, Math.floor(targetRate));
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
