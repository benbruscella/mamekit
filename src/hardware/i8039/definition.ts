// Intel MCS-48 (8039), lowered from MAME's mcs48 core.

import type { PortDeclaration } from '../ports.ts';

export const I8039_ID = 'i8039';
export const I8039_MAME_TYPES = ['I8039'] as const;

/** Auditable CPU IR; the adjacent .ts is the executable definition. */
export const I8039_IR_ARTIFACT = 'devices/i8039.cpu.ir.json';
export const I8039_MODULE_ARTIFACT = 'devices/i8039.ts';

export const I8039_PORTS: readonly PortDeclaration[] = [
  { name: 'program', kind: 'bus', note: 'program address space' },
  { name: 'io', kind: 'bus', note: 'I/O address space when the driver maps one' },
  { name: 'irq', kind: 'interrupt-in' },
  { name: 'nmi', kind: 'interrupt-in' },
  { name: 'reset', kind: 'interrupt-in' },
  { name: 'clock', kind: 'clock' },
];
