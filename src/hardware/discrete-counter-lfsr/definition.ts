// A MAME discrete soundboard built from a counter chain and an LFSR noise
// source. Like the SN76477 boards its MAME class is named per driver, so it is
// recognised by the control methods the class exposes.

import type { PortDeclaration } from '../ports.ts';

export const DISCRETE_COUNTER_LFSR_ID = 'discrete-counter-lfsr';

/** The control surface that identifies this topology in MAME source. */
export const DISCRETE_COUNTER_LFSR_METHODS = ['pitch_w', 'lfo_freq_w', 'sound_w'] as const;

export const DISCRETE_COUNTER_LFSR_PORTS: readonly PortDeclaration[] = [
  { name: 'control', kind: 'registers', note: 'pitch, LFO and sound control writes' },
  { name: 'audio', kind: 'audio-out' },
];
