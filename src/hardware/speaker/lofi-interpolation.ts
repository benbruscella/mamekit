// The cubic tables of MAME's default stream resampler (`audio_resampler_lofi`
// in src/emu/resampler.cpp), which the stream mixer and the worklets that
// resample a chip both read. Emitted worklets take this file's text, so it
// stands alone.
export const LOFI_INTERPOLATION = (() => {
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
