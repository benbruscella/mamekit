import type { PortDeclaration } from '../ports.ts';

export const VECTOR_ID = 'vector';
export const VECTOR_MAME_TYPES = ['DVG', 'VECTOR'] as const;

export const VECTOR_PORTS: readonly PortDeclaration[] = [
  { name: 'memory', kind: 'bus', note: 'vector display-list reads from the CPU address space' },
  { name: 'control', kind: 'registers', note: 'go/reset and completion state' },
  { name: 'video', kind: 'video', note: 'additive vector beam endpoints' },
];
