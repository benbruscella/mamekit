import type { PortDeclaration } from '../ports.ts';

export const C64_ID = 'c64';
export const C64_MAME_TYPES = [
  'MOS6526', 'MOS6567', 'MOS6569', 'PLS100',
  'PET_DATASSETTE_PORT', 'PET_USER_PORT', 'CBM_IEC', 'CBM_IEC_SLOT', 'RAM',
  'C64_EXPANSION_SLOT',
] as const;
export const C64_PORTS: readonly PortDeclaration[] = [
  { name: 'registers', kind: 'registers' },
  { name: 'clock', kind: 'clock' },
  { name: 'irq', kind: 'interrupt-out' },
];
