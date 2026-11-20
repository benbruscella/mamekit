export const POKEY_ID = 'pokey';
export const POKEY_MAME_TYPES = ['POKEY'];
export const POKEY_PORTS = [
    { name: 'registers', kind: 'registers', note: 'read/write through the bus mapping' },
    { name: 'clock', kind: 'clock' },
    { name: 'audio', kind: 'audio-out', note: 'its sound_stream, mixed with the other streams' },
];
