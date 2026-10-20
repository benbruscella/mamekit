import type { AudioFrameRenderer, AudioProbeContext } from '../audio-probe.ts';
import { createStreamWorkletProbe } from '../stream-acceptance.ts';
import { C64_AUDIO_WORKLET_ARTIFACT } from './definition.ts';

export function createSidProbe(context: AudioProbeContext): Promise<AudioFrameRenderer> {
  return createStreamWorkletProbe(context, C64_AUDIO_WORKLET_ARTIFACT);
}
