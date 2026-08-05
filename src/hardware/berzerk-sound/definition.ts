import type { PortDeclaration } from '../ports.ts';
export const BERZERK_SOUND_ID = 'berzerk-sound';
export const BERZERK_SOUND_MAME_TYPES = ['EXIDY', 'S14001A', 'FILTER_VOLUME'] as const;
export const BERZERK_SOUND_IR_ARTIFACT = 'audio/berzerk-sound.audio.ir.json';
export const BERZERK_SOUND_WORKLET_ARTIFACT = 'audio/berzerk-sound-worklet.ts';
export const BERZERK_SOUND_PORTS: readonly PortDeclaration[] = [
  { name: 'control', kind: 'registers', note: '6840 effects and speech controls' },
  { name: 'audio', kind: 'audio-out', note: 'effects plus S14001A speech' },
];
