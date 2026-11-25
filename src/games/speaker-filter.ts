// MAME's default speaker effect (audio_effects/filter.cpp, its highpass), as
// the browser plays it: a Web Audio biquad on the RBJ topology. The harness
// runs it over our capture to hear what reaches the listener; the comparison
// tools run it over MAME's -wavwrite, which sound.cpp records before the
// effect chain (`output_push`), so both sides are what a listener hears.

import type { GeneratedSpeakerFilterPlan } from '../ir/audio-protocol.ts';

export function applySpeakerFilter(
  input: Float32Array,
  filter: GeneratedSpeakerFilterPlan | undefined,
  sampleRate: number,
): Float32Array {
  const output = Float32Array.from(input);
  if (filter?.type !== 'highpass') return output;
  const omega = 2 * Math.PI * filter.frequency / sampleRate;
  const cosine = Math.cos(omega);
  const alpha = Math.sin(omega) / (2 * filter.q);
  const a0 = 1 + alpha;
  const b0 = (1 + cosine) / 2 / a0;
  const b1 = -(1 + cosine) / a0;
  const b2 = b0;
  const a1 = -2 * cosine / a0;
  const a2 = (1 - alpha) / a0;
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  for (let index = 0; index < output.length; index++) {
    const x0 = output[index]!;
    const y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    output[index] = y0;
    x2 = x1;
    x1 = x0;
    y2 = y1;
    y1 = y0;
  }
  return output;
}
