// Konami-1: an encrypted 6809 variant.

import type { PortDeclaration } from '../ports.ts';

export const KONAMI1_ID = 'konami1';
export const KONAMI1_MAME_TYPES = ['KONAMI1'] as const;

/** Auditable CPU IR; the adjacent .ts is the executable definition. */
export const KONAMI1_IR_ARTIFACT = 'devices/konami1.cpu.ir.json';
export const KONAMI1_MODULE_ARTIFACT = 'devices/konami1.ts';

export const KONAMI1_PORTS: readonly PortDeclaration[] = [
  { name: 'program', kind: 'bus', note: 'program address space' },
  { name: 'io', kind: 'bus', note: 'I/O address space when the driver maps one' },
  { name: 'irq', kind: 'interrupt-in' },
  { name: 'nmi', kind: 'interrupt-in' },
  { name: 'reset', kind: 'interrupt-in' },
  { name: 'clock', kind: 'clock' },
];
