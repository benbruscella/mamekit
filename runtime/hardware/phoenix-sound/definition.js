// Phoenix's custom analogue effects board (phoenix_a.cpp).
export const PHOENIX_SOUND_ID = 'phoenix-sound';
export const PHOENIX_SOUND_MAME_TYPES = ['PHOENIX_SOUND'];
export const PHOENIX_SOUND_PORTS = [
    { name: 'control', kind: 'registers', note: 'two source control latches' },
    { name: 'clock', kind: 'clock' },
    { name: 'audio', kind: 'audio-out', note: 'effects and noise' },
];
