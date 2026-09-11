// A MAME discrete soundboard built around an SN76477 complex sound generator.
//
// The MAME class is named per driver (GALAXIAN_AUDIO and kin), so there is no
// fixed device type to claim. The board is recognised by what it contains — an
// SN76477 used by the same target — never by a game or board name.
export const DISCRETE_SN76477_ID = 'discrete-sn76477';
export const DISCRETE_SN76477_PORTS = [
    { name: 'control', kind: 'registers', note: 'discrete control node writes' },
    { name: 'audio', kind: 'audio-out' },
];
