// Motorola 6809.

import type { PortDeclaration } from '../ports.ts';

export const MC6809_ID = 'mc6809';
export const MC6809_MAME_TYPES = ['MC6809'] as const;

/** Auditable CPU IR; the adjacent .ts is the executable definition. */
export const MC6809_IR_ARTIFACT = 'devices/mc6809.cpu.ir.json';
export const MC6809_MODULE_ARTIFACT = 'devices/mc6809.ts';

export const MC6809_PORTS: readonly PortDeclaration[] = [
  { name: 'program', kind: 'bus', note: 'program address space' },
  { name: 'io', kind: 'bus', note: 'I/O address space when the driver maps one' },
  { name: 'irq', kind: 'interrupt-in' },
  { name: 'nmi', kind: 'interrupt-in' },
  { name: 'reset', kind: 'interrupt-in' },
  { name: 'clock', kind: 'clock' },
];
