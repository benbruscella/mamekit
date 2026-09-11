export const SAMPLES_ID = 'samples';
export const SAMPLES_MAME_TYPES = ['SAMPLES'];
export const SAMPLES_IR_ARTIFACT = 'audio/samples.audio.ir.json';
export const SAMPLES_WORKLET_ARTIFACT = 'audio/samples-worklet.ts';
export const SAMPLES_MASTER_GAIN = 0.65;
export const SAMPLES_PORTS = [
    { name: 'control', kind: 'registers', note: 'start, stop and channel volume' },
    { name: 'audio', kind: 'audio-out', note: 'locally rendered sample channels' },
];
