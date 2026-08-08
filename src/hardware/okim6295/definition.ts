import type { PortDeclaration } from '../ports.ts';

export const OKIM6295_ID = 'okim6295';
export const OKIM6295_MAME_TYPES = ['OKIM6295'] as const;
export const OKIM6295_IR_ARTIFACT = 'audio/okim6295.audio.ir.json';
export const OKIM6295_WORKLET_ARTIFACT = 'audio/okim6295-worklet.ts';
export const OKIM6295_MASTER_GAIN = 0.7;
export const OKIM6295_PORTS: readonly PortDeclaration[] = [
  { name: 'command', kind: 'registers', note: 'two-byte sample/voice command and status' },
  { name: 'clock', kind: 'clock', note: 'pin 7 selects divisor 132 or 165' },
  { name: 'audio', kind: 'audio-out', note: 'four ADPCM voices' },
];
