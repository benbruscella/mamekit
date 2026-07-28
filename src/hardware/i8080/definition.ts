// Intel 8080, lowered from the 256 cases in MAME's execute_one switch.

import type { PortDeclaration } from '../ports.ts';

export const I8080_ID = 'i8080';
export const I8080_MAME_TYPES = ['I8080'] as const;

/** Auditable CPU IR; the adjacent .ts is the executable definition. */
export const I8080_IR_ARTIFACT = 'devices/i8080.cpu.ir.json';
export const I8080_MODULE_ARTIFACT = 'devices/i8080.ts';

export const I8080_PORTS: readonly PortDeclaration[] = [
  { name: 'program', kind: 'bus', note: 'program address space' },
  { name: 'io', kind: 'bus', note: 'I/O address space when the driver maps one' },
  { name: 'irq', kind: 'interrupt-in' },
  { name: 'nmi', kind: 'interrupt-in' },
  { name: 'reset', kind: 'interrupt-in' },
  { name: 'clock', kind: 'clock' },
];
