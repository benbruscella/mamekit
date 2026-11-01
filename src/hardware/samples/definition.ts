import type { PortDeclaration } from '../ports.ts';

export const SAMPLES_ID = 'samples';
export const SAMPLES_MAME_TYPES = ['SAMPLES'] as const;

export const SAMPLES_PORTS: readonly PortDeclaration[] = [
  { name: 'control', kind: 'registers', note: 'start, stop, playing and channel volume, called by the driver' },
  { name: 'audio', kind: 'audio-out', note: 'one sound_stream a channel, mixed with the other streams' },
];
