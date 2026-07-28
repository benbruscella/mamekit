// Motorola 6803, lowered from MAME's m6800 family core.

import type { PortDeclaration } from '../ports.ts';

export const M6803_ID = 'm6803';
export const M6803_MAME_TYPES = ['M6803'] as const;

/** Auditable CPU IR; the adjacent .ts is the executable definition. */
export const M6803_IR_ARTIFACT = 'devices/m6803.cpu.ir.json';
export const M6803_MODULE_ARTIFACT = 'devices/m6803.ts';

export const M6803_PORTS: readonly PortDeclaration[] = [
  { name: 'program', kind: 'bus', note: 'program address space' },
  { name: 'io', kind: 'bus', note: 'I/O address space when the driver maps one' },
  { name: 'irq', kind: 'interrupt-in' },
  { name: 'nmi', kind: 'interrupt-in' },
  { name: 'reset', kind: 'interrupt-in' },
  { name: 'clock', kind: 'clock' },
];
