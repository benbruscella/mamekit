export const TMS5220_ID = 'tms5220';
export const TMS5220_MAME_TYPES = ['TMS5220C', 'TMS5220'];
export const TMS5220_MASTER_GAIN = 1;
export const TMS5220_PORTS = [
    { name: 'data', kind: 'registers', note: 'FIFO data bus, strobed by /WS' },
    { name: 'ready', kind: 'interrupt-out', note: '/READY and /INT pins' },
    { name: 'clock', kind: 'clock' },
    { name: 'audio', kind: 'audio-out', note: 'LPC speech, clock/80' },
];
/** IR artifact, and so the module slug the app imports. */
export function tms5220IrArtifact(type) {
    return `devices/${type.toLowerCase()}.device.ir.json`;
}
export function tms5220ModuleArtifact(type) {
    return `devices/${type.toLowerCase()}.ts`;
}
