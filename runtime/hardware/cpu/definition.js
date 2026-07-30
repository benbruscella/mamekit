// Generated CPU cores.
//
// One capability, not one per chip: every core lowers the same way — a MAME
// compiler produces a CPU definition, and that definition is emitted as
// auditable IR plus an executable module. The cores differ only in which
// compiler produces them, which is a table, not six packages.
export const CPU_ID = 'cpu';
/** MAME device types with a generated core, in emit order. */
export const CPU_MAME_TYPES = [
    'Z80', 'I8080', 'I8039', 'M6803', 'KONAMI1', 'MC6809',
    'RP2A03', 'RP2A03G',
];
export const CPU_PORTS = [
    { name: 'program', kind: 'bus', note: 'program address space' },
    { name: 'io', kind: 'bus', note: 'I/O address space when the driver maps one' },
    { name: 'irq', kind: 'interrupt-in' },
    { name: 'nmi', kind: 'interrupt-in' },
    { name: 'reset', kind: 'interrupt-in' },
    { name: 'clock', kind: 'clock' },
];
/** Auditable IR for a core; the adjacent .ts is the executable definition. */
export function cpuIrArtifact(type) {
    return `devices/${type.toLowerCase()}.cpu.ir.json`;
}
export function cpuModuleArtifact(type) {
    return `devices/${type.toLowerCase()}.ts`;
}
