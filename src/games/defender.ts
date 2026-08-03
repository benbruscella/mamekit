import { sourceTarget } from './source-contract.ts';

export const defender = sourceTarget({
  game: 'defender',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'defender_state', name: 'defender' },
  screen: { width: 292, height: 240 },
  soundKind: 'dac',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowUp', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      banked: 'e92faf5c',
      maincpu: '0c13db38',
      proms: 'cb532938',
      soundcpu: 'd8826f3d',
    },
    checkpoints: {
      1: { video: 'a2855ce8', state: 'ae9ab990' },
      60: { video: 'b0931d7b', state: '646f777f' },
      180: { video: 'd53b927f', state: 'aba4b814' },
      300: { video: 'ec285eb8', state: '1d4666d4' },
      600: { video: '51e2f8ec', state: '6668bd3e' },
      900: { video: '926ea52a', state: '4d1654d6' },
      1200: { video: 'ec285eb8', state: '64f76f30' },
    },
    audio: {
      writes: 1,
      nonzeroWrites: 0,
      writeHash: '890cc90a',
      pcmHash: 'b5dca251',
      rms: 1,
    },
  },
});
