// Acceptance probe registry.
//
// Separate from registry.ts because these run in Node against dist artifacts,
// while registry.ts reaches into src/mame at generation time. Keeping them
// apart means the acceptance harness never pulls the compiler in.

import type { AudioProbeFactory } from './audio-probe.ts';
import { createBerzerkSoundProbe } from './berzerk-sound/acceptance.ts';
import { createGameboyProbe } from './gameboy/acceptance.ts';
import { createTiaProbe } from './a2600/acceptance.ts';
import { createSidProbe } from './c64/acceptance.ts';
import { createStreamProbe } from './speaker/acceptance.ts';

/**
 * Keyed by the sound kind the generator writes into config.json. A target
 * whose kind has no probe fails acceptance rather than silently skipping its
 * audio contract.
 */
export const AUDIO_PROBES: Readonly<Record<string, AudioProbeFactory>> = {
  berzerk: createBerzerkSoundProbe,
  exidy: createBerzerkSoundProbe,
  gameboy: createGameboyProbe,
  tia: createTiaProbe,
  sid: createSidProbe,
  stream: createStreamProbe,
};

export type { AudioFrameRenderer, AudioProbeContext, ProbeSoundWrite } from './audio-probe.ts';
