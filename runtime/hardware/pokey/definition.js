export const POKEY_ID = 'pokey';
export const POKEY_MAME_TYPES = ['POKEY'];
export const POKEY_IR_ARTIFACT = 'audio/pokey.audio.ir.json';
export const POKEY_WORKLET_ARTIFACT = 'audio/pokey-worklet.ts';
export const POKEY_MASTER_GAIN = 0.7;
export const POKEY_PORTS = [
    { name: 'write', kind: 'registers', note: 'sixteen audio/control registers' },
    { name: 'clock', kind: 'clock' },
    { name: 'audio', kind: 'audio-out', note: 'four polynomial/divider channels' },
];
