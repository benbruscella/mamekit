import type { PortDeclaration } from '../ports.ts';

export const YM2151_ID = 'ym2151';
export const YM2151_MAME_TYPES = ['YM2151'] as const;
export const YM2151_IR_ARTIFACT = 'audio/ym2151.audio.ir.json';
export const YM2151_WORKLET_ARTIFACT = 'audio/ym2151-worklet.ts';
/** POKEY plan, lowered here because the OPM worklet hosts its engine. */
export const POKEY_IR_ARTIFACT = 'audio/pokey.audio.ir.json';
export const YM2151_MASTER_GAIN = 0.7;
export const YM2151_PORTS: readonly PortDeclaration[] = [
  { name: 'write', kind: 'registers', note: 'address/data port pair' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out', note: 'eight OPM FM channels' },
];
