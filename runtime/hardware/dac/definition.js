export const DAC_ID = 'dac';
export const DAC_MAME_TYPES = [
    'DAC_1BIT',
    'DAC_4BIT_R2R',
    'DAC_8BIT_R2R',
    'MC1408',
    'AD7533',
];
export const DAC_WORKLET_ARTIFACT = 'audio/dac-worklet.ts';
export const DAC_MASTER_GAIN = 0.5;
export const DAC_PORTS = [
    { name: 'write', kind: 'registers', note: 'parallel digital sample write' },
    { name: 'audio', kind: 'audio-out' },
];
