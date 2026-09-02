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
import { createSn76489Probe } from './sn76489/acceptance.ts';
import { createPokeyProbe } from './pokey/acceptance.ts';
import { createDacProbe } from './dac/acceptance.ts';
import { createSamplesProbe } from './samples/acceptance.ts';
import { createYm2151Probe } from './ym2151/acceptance.ts';
import { createBerzerkSoundProbe } from './berzerk-sound/acceptance.ts';

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
  sn76489: createSn76489Probe,
  pokey: createPokeyProbe,
  dac: createDacProbe,
  samples: createSamplesProbe,
  ym2151: createYm2151Probe,
  berzerk: createBerzerkSoundProbe,
  exidy: createBerzerkSoundProbe,
};

export type { AudioFrameRenderer, AudioProbeContext, ProbeSoundWrite } from './audio-probe.ts';
