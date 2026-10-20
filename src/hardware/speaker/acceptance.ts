import type { AudioFrameRenderer, AudioProbeContext } from '../audio-probe.ts';
import { createStreamWorkletProbe } from '../stream-acceptance.ts';
import { STREAM_AUDIO_WORKLET_ARTIFACT } from './definition.ts';

export function createStreamProbe(context: AudioProbeContext): Promise<AudioFrameRenderer> {
  return createStreamWorkletProbe(context, STREAM_AUDIO_WORKLET_ARTIFACT);
}
