// AY-3-8910 PSG, plus the secondary stream devices MAME mixes into the same
// speaker: an MSM5205 ADPCM core and an R2R ladder DAC.
//
// These are one capability rather than three because the generated worklet
// hosts them together — MAME routes them into a single mix, and the AY worklet
// source embeds the MSM5205 plan. Splitting them would mean two packages
// silently agreeing on one artifact.

import type { PortDeclaration } from '../ports.ts';

export const AY8910_ID = 'ay8910';

/**
 * MSM5205 and R2R DACs are claimed only alongside an AY: on a board with
 * no AY there is no worklet to mix them into, and extraction says so.
 */
export const AY8910_MAME_TYPES = [
  'AY8910',
  'MSM5205',
  'DAC_4BIT_R2R',
  'DAC_8BIT_R2R',
] as const;

export const AY8910_IR_ARTIFACT = 'audio/ay8910.audio.ir.json';
export const AY8910_WORKLET_ARTIFACT = 'audio/ay8910-worklet.ts';
export const MSM5205_IR_ARTIFACT = 'audio/msm5205.audio.ir.json';

/** The AY bank runs hot against the other cores; this sits it level with them. */
export const AY8910_MASTER_GAIN = 0.7;

export const AY8910_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'address/data port pair per chip' },
  { name: 'port-a', kind: 'input', note: 'general-purpose I/O port A' },
  { name: 'port-b', kind: 'input', note: 'general-purpose I/O port B' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out' },
];
