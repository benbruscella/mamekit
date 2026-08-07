import { sourceTarget } from './source-contract.ts';

export const defender = sourceTarget({
  game: 'defender',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'defender_state', name: 'defender' },
  screen: { width: 292, height: 240 },
  soundKind: 'dac',
  minimumAudioRms: 0.05,
  audioRequirements: [{
    method: 'dac.data_w',
    fromFrame: 500,
    minimumNonzeroWrites: 100,
  }],
  actions: [
    // A fresh Defender CMOS image pauses in its source-defined operator flow.
    // Exercise the cabinet's real Auto Up and Advance lines before coin/start,
    // then leave enough time for the sound command strobe to reach PIA 2.
    { atFrame: 280, code: 'Digit9', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 320, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 380, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 440, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 500, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 620, code: 'Digit5', heldFrames: 8, releasedFrames: 20 },
    { atFrame: 800, code: 'Digit1', heldFrames: 8, releasedFrames: 20 },
    { atFrame: 950, code: 'Space', heldFrames: 30, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      banked: 'e92faf5c',
      maincpu: '0c13db38',
      proms: 'cb532938',
      soundcpu: 'd8826f3d',
    },
    checkpoints: {
      1: { video: 'a2855ce8', state: '88adfb0b' },
      60: { video: 'b0931d7b', state: '57d066f2' },
      180: { video: 'd53b927f', state: '74e44278' },
      300: { video: 'ec285eb8', state: '57b6984f' },
      600: { video: '88ef2d54', state: 'a2445e72' },
      900: { video: '8882498b', state: '2192feb0' },
      1200: { video: 'aaef91c5', state: '5c1c22a4' },
    },
    audio: {
      writes: 22081,
      nonzeroWrites: 20000,
      writeHash: '30531b49',
      pcmHash: '6da12bb9',
      rms: 0.833931,
    },
  },
});
