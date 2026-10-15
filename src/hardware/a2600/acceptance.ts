import type { AudioFrameRenderer, AudioProbeContext } from '../audio-probe.ts';
import { createStreamWorkletProbe } from '../stream-acceptance.ts';
import { A2600_AUDIO_WORKLET_ARTIFACT } from './definition.ts';

export function createTiaProbe(context: AudioProbeContext): Promise<AudioFrameRenderer> {
  return createStreamWorkletProbe(context, A2600_AUDIO_WORKLET_ARTIFACT);
}
