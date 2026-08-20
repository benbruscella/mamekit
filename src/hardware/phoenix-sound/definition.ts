// Phoenix's custom analogue effects board and its MM6221AA melody generator.

import type { PortDeclaration } from '../ports.ts';

export const PHOENIX_SOUND_ID = 'phoenix-sound';
export const PHOENIX_SOUND_MAME_TYPES = ['PHOENIX_SOUND', 'TMS36XX'] as const;
export const PHOENIX_SOUND_IR_ARTIFACT = 'audio/phoenix-sound.audio.ir.json';
export const PHOENIX_SOUND_WORKLET_ARTIFACT = 'audio/phoenix-sound-worklet.ts';

export const PHOENIX_SOUND_PORTS: readonly PortDeclaration[] = [
  { name: 'control', kind: 'registers', note: 'two source control latches' },
  { name: 'clock', kind: 'clock' },
  { name: 'audio', kind: 'audio-out', note: 'effects, noise and fixed melodies' },
];
