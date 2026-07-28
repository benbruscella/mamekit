// Namco WSG: the wavetable sound generator on the Galaga/Pac-Man boards.

import type { PortDeclaration } from '../ports.ts';

export const NAMCO_WSG_ID = 'namco-wsg';
export const NAMCO_WSG_MAME_TYPES = ['NAMCO_WSG'] as const;

export const NAMCO_WSG_IR_ARTIFACT = 'audio/namco-wsg.audio.ir.json';
export const NAMCO_WSG_WORKLET_ARTIFACT = 'audio/wsg-worklet.ts';

/** MAME's route gain for the WSG is 0.90 * 10/16. */
export const NAMCO_WSG_MASTER_GAIN = 0.5625;

export const NAMCO_WSG_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'voice registers in shared RAM' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out' },
];
