import type { PortDeclaration } from '../ports.ts';

export const DISCRETE_ID = 'discrete';
/** MAME's discrete sound device (discrete.cpp), whose node table a driver supplies. */
export const DISCRETE_MAME_TYPES = ['DISCRETE'] as const;

export const DISCRETE_PORTS: readonly PortDeclaration[] = [
  { name: 'inputs', kind: 'registers', note: 'write and write_line to the table\'s DISCRETE_INPUT_* nodes, from the driver' },
  { name: 'audio', kind: 'audio-out', note: 'one sound_stream output per DISCRETE_OUTPUT node, mixed with the other streams' },
];
