export const M68705_ID = 'm68705';
export const M68705_MAME_TYPES = ['M68705P5'];
export const M68705_ARTIFACT = 'devices/m68705p5.runtime.json';
export const M68705_PORTS = [
    { name: 'program', kind: 'bus', note: 'internal program ROM and RAM' },
    { name: 'ports', kind: 'registers', note: 'three programmable I/O ports and DDRs' },
    { name: 'timer', kind: 'clock', note: 'programmable timer/counter input' },
    { name: 'irq', kind: 'interrupt-in', note: 'external interrupt line' },
];
