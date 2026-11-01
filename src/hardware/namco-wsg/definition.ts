// Namco WSG: the wavetable sound generator on the Galaga/Pac-Man boards.

import type { PortDeclaration } from '../ports.ts';

export const NAMCO_WSG_ID = 'namco-wsg';
export const NAMCO_WSG_MAME_TYPES = ['NAMCO_WSG', 'POLEPOS_WSG'] as const;

export const NAMCO_WSG_IR_ARTIFACT = 'audio/namco-wsg.audio.ir.json';
export const NAMCO_WSG_WORKLET_ARTIFACT = 'audio/wsg-worklet.ts';
export const POLEPOS_WSG_IR_ARTIFACT = 'audio/polepos-wsg.audio.ir.json';
export const POLEPOS_WSG_WORKLET_ARTIFACT = 'audio/polepos-wsg-worklet.ts';


export const NAMCO_WSG_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers', note: 'voice registers in shared RAM' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out' },
];
