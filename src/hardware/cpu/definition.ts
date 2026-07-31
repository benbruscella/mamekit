// Generated CPU cores.
//
// One capability, not one per chip: every core lowers the same way — a MAME
// compiler produces a CPU definition, and that definition is emitted as
// auditable IR plus an executable module. The cores differ only in which
// compiler produces them, which is a table, not six packages.

import type { PortDeclaration } from '../ports.ts';

export const CPU_ID = 'cpu';

/** MAME device types with a generated core, in emit order. */
export const CPU_MAME_TYPES = [
  'Z80', 'I8080', 'I8039', 'MB8884', 'M6801U4', 'M6802', 'M6803', 'NSC8105',
  'KONAMI1', 'MC6809', 'MC6809E',
  'RP2A03', 'RP2A03G',
] as const;

export const CPU_PORTS: readonly PortDeclaration[] = [
  { name: 'program', kind: 'bus', note: 'program address space' },
  { name: 'io', kind: 'bus', note: 'I/O address space when the driver maps one' },
  { name: 'irq', kind: 'interrupt-in' },
  { name: 'nmi', kind: 'interrupt-in' },
  { name: 'reset', kind: 'interrupt-in' },
  { name: 'clock', kind: 'clock' },
];

/** Auditable IR for a core; the adjacent .ts is the executable definition. */
export function cpuIrArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.cpu.ir.json`;
}

export function cpuModuleArtifact(type: string): string {
  return `devices/${type.toLowerCase()}.ts`;
}
