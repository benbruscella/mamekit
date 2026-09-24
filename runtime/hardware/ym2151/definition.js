export const YM2151_ID = 'ym2151';
export const YM2151_MAME_TYPES = ['YM2151'];
export const YM2151_IR_ARTIFACT = 'audio/ym2151.audio.ir.json';
export const YM2151_WORKLET_ARTIFACT = 'audio/ym2151-worklet.ts';
export const YM2151_MASTER_GAIN = 0.7;
export const YM2151_PORTS = [
    { name: 'write', kind: 'registers', note: 'address/data port pair' },
    { name: 'clock', kind: 'clock' },
    { name: 'audio', kind: 'audio-out', note: 'eight OPM FM channels' },
];
