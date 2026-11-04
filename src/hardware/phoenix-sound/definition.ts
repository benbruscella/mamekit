// Phoenix's custom analogue effects board (phoenix_a.cpp).

import type { PortDeclaration } from '../ports.ts';

export const PHOENIX_SOUND_ID = 'phoenix-sound';
export const PHOENIX_SOUND_MAME_TYPES = ['PHOENIX_SOUND'] as const;

export const PHOENIX_SOUND_PORTS: readonly PortDeclaration[] = [
  { name: 'control', kind: 'registers', note: 'two source control latches' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out', note: 'effects and noise' },
];
