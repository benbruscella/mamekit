// Acceptance probe registry.
//
// Separate from registry.ts because these run in Node against dist artifacts,
// while registry.ts reaches into src/mame at generation time. Keeping them
// apart means the acceptance harness never pulls the compiler in.

import type { AudioProbeFactory } from './audio-probe.ts';
import { createAy8910Probe } from './ay8910/acceptance.ts';
import { createDiscreteProbe } from './discrete-sn76477/acceptance.ts';
import { createNamcoWsgProbe } from './namco-wsg/acceptance.ts';
import { createYm2203Probe } from './ym2203/acceptance.ts';

/**
 * Keyed by the sound kind the generator writes into config.json. A target
 * whose kind has no probe fails acceptance rather than silently skipping its
 * audio contract.
 */
export const AUDIO_PROBES: Readonly<Record<string, AudioProbeFactory>> = {
  wsg: createNamcoWsgProbe,
  ay8910: createAy8910Probe,
  ym2203: createYm2203Probe,
  discrete: createDiscreteProbe,
};

export type { AudioFrameRenderer, AudioProbeContext, ProbeSoundWrite } from './audio-probe.ts';
