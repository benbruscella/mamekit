// Zilog Z80, lowered from MAME's expanded z80.lst opcode DSL.

import type { PortDeclaration } from '../ports.ts';

export const Z80_ID = 'z80';
export const Z80_MAME_TYPES = ['Z80'] as const;

/** Auditable CPU IR; the adjacent .ts is the executable definition. */
export const Z80_IR_ARTIFACT = 'devices/z80.cpu.ir.json';
export const Z80_MODULE_ARTIFACT = 'devices/z80.ts';

export const Z80_PORTS: readonly PortDeclaration[] = [
  { name: 'program', kind: 'bus', note: 'program address space' },
  { name: 'io', kind: 'bus', note: 'I/O address space when the driver maps one' },
  { name: 'irq', kind: 'interrupt-in' },
  { name: 'nmi', kind: 'interrupt-in' },
  { name: 'reset', kind: 'interrupt-in' },
  { name: 'clock', kind: 'clock' },
];
