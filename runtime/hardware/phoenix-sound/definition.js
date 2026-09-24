// Phoenix's custom analogue effects board and its MM6221AA melody generator.
export const PHOENIX_SOUND_ID = 'phoenix-sound';
export const PHOENIX_SOUND_MAME_TYPES = ['PHOENIX_SOUND', 'TMS36XX'];
export const PHOENIX_SOUND_IR_ARTIFACT = 'audio/phoenix-sound.audio.ir.json';
export const PHOENIX_SOUND_WORKLET_ARTIFACT = 'audio/phoenix-sound-worklet.ts';
export const PHOENIX_SOUND_PORTS = [
    { name: 'control', kind: 'registers', note: 'two source control latches' },
    { name: 'clock', kind: 'clock' },
    { name: 'audio', kind: 'audio-out', note: 'effects, noise and fixed melodies' },
];
