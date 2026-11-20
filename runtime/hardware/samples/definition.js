export const SAMPLES_ID = 'samples';
export const SAMPLES_MAME_TYPES = ['SAMPLES'];
export const SAMPLES_PORTS = [
    { name: 'control', kind: 'registers', note: 'start, stop, playing and channel volume, called by the driver' },
    { name: 'audio', kind: 'audio-out', note: 'one sound_stream a channel, mixed with the other streams' },
];
